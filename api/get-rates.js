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
    // Sanitization des inputs pour éviter les injections
    const sanitizeInput = (input) => {
      if (!input) return null;
      // Retire les caractères potentiellement dangereux
      return String(input).replace(/[^\w\s-]/g, '').trim();
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
      // Priorité au pays si identifié
      query = query.ilike("country", countryName);
    } else if (cityName && cityName !== "unknown") {
      // Fallback sur la ville si pas de pays
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
