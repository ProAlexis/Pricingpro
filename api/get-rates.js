import { createClient } from "@supabase/supabase-js";
import { getCountryFromCity } from "../scrapers/geo-utils.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 60 * 1000;
const rateLimitStore = new Map();

export default async function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress;

  const now = Date.now();
  const windowKey = `${ip}:${Math.floor(now / RATE_LIMIT_WINDOW)}`;

  let data = rateLimitStore.get(windowKey) || {
    count: 0,
    reset: now + RATE_LIMIT_WINDOW,
  };

  if (data.count >= RATE_LIMIT) {
    res.status(429).json({
      error: "Trop de requêtes. Réessaye dans 1 minute.",
      retryAfter: Math.ceil((data.reset - now) / 1000),
    });
    return;
  }

  data.count++;
  rateLimitStore.set(windowKey, data);

  res.setHeader("X-RateLimit-Remaining", RATE_LIMIT - data.count);
  res.setHeader("X-RateLimit-Reset", data.reset);

  const { profession, location, experience_level } = req.query;

  try {
    // 1. Identification du pays via geo-utils
    const geoData = await getCountryFromCity(location);
    const countryName = geoData?.country || location?.toLowerCase();
    const cityName = geoData?.city || location;

    // 2. Construction de la requête
    let query = supabase
      .from("market_rates")
      .select("rate_daily, source, city");

    if (profession) {
      query = query.eq("profession", profession);
    }
    if (experience_level)
      query = query.eq("experience_level", experience_level);

    // Filtrer par pays
    if (countryName && countryName !== "unknown") {
      query = query.ilike("country", countryName);
    } else if (cityName) {
      query = query.ilike("city", cityName);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const rates = data.map((r) => r.rate_daily).filter((r) => r > 0);
      if (rates.length === 0) {
        return res.status(200).json({
          count: 0,
          avg: 0,
          rates: { hourly: 0, daily: 0, monthly: 0 },
        });
      }

      const avgDaily = Math.round(
        rates.reduce((a, b) => a + b, 0) / rates.length,
      );

      const stats = {
        min: Math.min(...rates),
        max: Math.max(...rates),
        avg: avgDaily,
        count: data.length,
        sources: [...new Set(data.map((r) => r.source).filter(Boolean))],
        cities: [...new Set(data.map((r) => r.city).filter(Boolean))],
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
    console.error("Error fetching rates:", error);
    return res.status(500).json({ error: "Failed to fetch rates" });
  }
}
