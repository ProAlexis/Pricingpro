import { createClient } from "@supabase/supabase-js";
import { getCountryFromCity } from "../scrapers/geo-utils.js";
import rateLimit from "../lib/rate-limit.js";
import { handleCors } from "../lib/cors.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

const limiter = rateLimit({ interval: 60000, limit: 30 });

export default async function handler(req, res) {
  // CORS sécurisé
  if (handleCors(req, res)) return;

  try {
    // Rate limiting
    await limiter.check(req, res);

    const { profession, location, experience_level } = req.query;

    // Sanitization des inputs pour éviter les injections
    const sanitizeInput = (input) => {
      if (!input) return null;
      return String(input)
        .replace(/[^\w\s-]/g, "")
        .trim();
    };

    const sanitizedProfession = sanitizeInput(profession);
    const sanitizedLocation = sanitizeInput(location);
    const sanitizedExperience = sanitizeInput(experience_level);

    // 1. Identification du pays via geo-utils
    const geoData = await getCountryFromCity(sanitizedLocation);
    const countryName = geoData?.country || sanitizedLocation?.toLowerCase();
    const cityName = geoData?.city || sanitizedLocation;

    // 2. Construction de la requête
    let query = supabase.from("market_rates").select("*");

    if (sanitizedProfession) {
      query = query.eq("profession", sanitizedProfession);
    }
    if (sanitizedExperience) {
      query = query.eq("experience_level", sanitizedExperience);
    }

    // Filtrer par pays ou ville
    if (countryName && countryName !== "unknown") {
      query = query.ilike("country", countryName);
    } else if (cityName && cityName !== "unknown") {
      query = query.ilike("city", cityName);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const rates = data.map((r) => r.rate_daily);
      const avgDaily = Math.round(
        rates.reduce((a, b) => a + b, 0) / rates.length,
      );
      const stats = {
        min: Math.min(...rates),
        max: Math.max(...rates),
        avg: avgDaily,
        count: data.length,
        sources: [...new Set(data.map((r) => r.source))],
        cities: [...new Set(data.map((r) => r.city))],
        experience_level: experience_level || "all",
        rates: {
          hourly: Math.round(avgDaily / 8),
          daily: avgDaily,
          monthly: Math.round(avgDaily * 20),
        },
      };

      return res.status(200).json(stats);
    }

    return res.status(200).json({
      min: 0,
      max: 0,
      avg: 0,
      count: 0,
      rates: { hourly: 0, daily: 0, monthly: 0 },
    });
  } catch (error) {
    // Rate limit exceeded
    if (error.message === "Rate limit exceeded") {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    console.error("Error fetching rates:", error);
    return res.status(500).json({ error: "Failed to fetch rates" });
  }
}
