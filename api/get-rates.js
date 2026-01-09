import { createClient } from "@supabase/supabase-js";
import { getCountryFromCity } from "../scrapers/geo-utils.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { profession, location, experience_level } = req.query;

  try {
    // 1. Identification du pays via geo-utils
    const geoData = await getCountryFromCity(location);
    const countryName = geoData?.country || location?.toLowerCase();

    // 2. Construction de la requête
    let query = supabase.from("market_rates").select("*");

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
    console.error("Error fetching rates:", error);
    return res.status(500).json({ error: "Failed to fetch rates" });
  }
}
