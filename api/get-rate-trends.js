import { createClient } from "@supabase/supabase-js";
import { getCountryFromCity } from "../scrapers/geo-utils.js";
import rateLimit from "../lib/rate-limit.js";
import { handleCors } from "../lib/cors.js";
import { secureLog } from "../lib/logger.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// Rate limiter : 20 requêtes par minute par IP
const limiter = rateLimit({ interval: 60000, limit: 20 });

export default async function handler(req, res) {
  // CORS sécurisé
  if (handleCors(req, res)) return;

  try {
    // Rate limiting
    await limiter.check(req, res);

    const { profession, location, experience_level, months = 6 } = req.query;

    // ⚠️ NOUVEAU : Sanitization des inputs
    const sanitizeInput = (input) => {
      if (!input) return null;
      return String(input)
        .replace(/[^\w\s-]/g, "")
        .trim()
        .slice(0, 100);
    };

    const sanitizedProfession = sanitizeInput(profession);
    const sanitizedLocation = sanitizeInput(location);
    const sanitizedExperience = sanitizeInput(experience_level);
    const sanitizedMonths = Math.min(Math.max(parseInt(months) || 6, 1), 24); // Entre 1 et 24 mois

    if (!sanitizedProfession || !sanitizedLocation || !sanitizedExperience) {
      return res.status(400).json({
        error:
          "Missing required parameters: profession, location, experience_level",
      });
    }

    // Calculer la date de début
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - sanitizedMonths);
    const startDateStr = startDate.toISOString().split("T")[0];

    const geoData = await getCountryFromCity(sanitizedLocation);
    const countryName = geoData?.country || sanitizedLocation.toLowerCase();

    // Requête pour obtenir l'historique
    const { data, error } = await supabase
      .from("market_rates_history")
      .select("*")
      .eq("profession", sanitizedProfession)
      .eq("country", countryName)
      .eq("experience_level", sanitizedExperience)
      .gte("snapshot_date", startDateStr)
      .order("snapshot_date", { ascending: true });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(200).json({
        trend: [],
        evolution: null,
        message: "No historical data available yet",
      });
    }

    // Agréger par date
    const aggregated = data.reduce((acc, record) => {
      const date = record.snapshot_date;
      if (!acc[date]) {
        acc[date] = {
          date,
          rates: [],
          cities: new Set(),
        };
      }
      acc[date].rates.push(record.rate_daily);
      acc[date].cities.add(record.city);
      return acc;
    }, {});

    // Calculer les moyennes
    const trend = Object.values(aggregated).map((snapshot) => ({
      date: snapshot.date,
      avgRate: Math.round(
        snapshot.rates.reduce((a, b) => a + b, 0) / snapshot.rates.length,
      ),
      minRate: Math.min(...snapshot.rates),
      maxRate: Math.max(...snapshot.rates),
      sampleSize: snapshot.rates.length,
      cities: Array.from(snapshot.cities),
    }));

    // Calculer l'évolution (%)
    let evolution = null;
    if (trend.length >= 2) {
      const oldestRate = trend[0].avgRate;
      const newestRate = trend[trend.length - 1].avgRate;
      evolution = {
        percentage: Math.round(((newestRate - oldestRate) / oldestRate) * 100),
        oldRate: oldestRate,
        newRate: newestRate,
        direction:
          newestRate > oldestRate
            ? "up"
            : newestRate < oldestRate
              ? "down"
              : "stable",
      };
    }

    return res.status(200).json({
      trend,
      evolution,
      period: `${sanitizedMonths} months`,
      profession: sanitizedProfession,
      location: sanitizedLocation,
      experience_level: sanitizedExperience,
    });
  } catch (error) {
    // Rate limit exceeded
    if (error.message === "Rate limit exceeded") {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    secureLog.error("Error fetching rate trends:", error);
    return res.status(500).json({ error: "Failed to fetch rate trends" });
  }
}
