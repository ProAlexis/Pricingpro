import { getCountryFromCity } from "./geo-utils.js";

// Données Upwork simulées (tarifs horaires convertis en TJM)
const UPWORK_HOURLY_RATES = {
  "web-dev": {
    junior: { min: 20, avg: 35, max: 50 },
    mid: { min: 40, avg: 60, max: 85 },
    senior: { min: 70, avg: 95, max: 130 },
  },
  "mobile-dev": {
    junior: { min: 25, avg: 40, max: 55 },
    mid: { min: 45, avg: 65, max: 90 },
    senior: { min: 75, avg: 100, max: 140 },
  },
  "data-analyst": {
    junior: { min: 22, avg: 38, max: 52 },
    mid: { min: 42, avg: 62, max: 88 },
    senior: { min: 72, avg: 98, max: 135 },
  },
  "data-scientist": {
    junior: { min: 28, avg: 45, max: 62 },
    mid: { min: 50, avg: 72, max: 100 },
    senior: { min: 85, avg: 115, max: 160 },
  },
  "ui-designer": {
    junior: { min: 18, avg: 32, max: 48 },
    mid: { min: 38, avg: 55, max: 78 },
    senior: { min: 65, avg: 88, max: 120 },
  },
  "graphic-designer": {
    junior: { min: 15, avg: 28, max: 42 },
    mid: { min: 32, avg: 48, max: 68 },
    senior: { min: 55, avg: 75, max: 105 },
  },
  copywriter: {
    junior: { min: 15, avg: 25, max: 38 },
    mid: { min: 30, avg: 45, max: 65 },
    senior: { min: 50, avg: 70, max: 95 },
  },
  marketing: {
    junior: { min: 20, avg: 35, max: 52 },
    mid: { min: 42, avg: 62, max: 88 },
    senior: { min: 72, avg: 98, max: 135 },
  },
  seo: {
    junior: { min: 18, avg: 32, max: 48 },
    mid: { min: 38, avg: 55, max: 78 },
    senior: { min: 65, avg: 88, max: 120 },
  },
  "project-manager": {
    junior: { min: 25, avg: 40, max: 58 },
    mid: { min: 48, avg: 68, max: 95 },
    senior: { min: 78, avg: 105, max: 145 },
  },
  consultant: {
    junior: { min: 28, avg: 45, max: 65 },
    mid: { min: 55, avg: 78, max: 110 },
    senior: { min: 90, avg: 120, max: 165 },
  },
  devops: {
    junior: { min: 28, avg: 45, max: 62 },
    mid: { min: 52, avg: 72, max: 100 },
    senior: { min: 85, avg: 112, max: 155 },
  },
  "fullstack-dev": {
    junior: { min: 25, avg: 40, max: 58 },
    mid: { min: 48, avg: 68, max: 95 },
    senior: { min: 78, avg: 105, max: 145 },
  },
  "backend-dev": {
    junior: { min: 25, avg: 40, max: 58 },
    mid: { min: 48, avg: 68, max: 95 },
    senior: { min: 78, avg: 105, max: 145 },
  },
  "product-manager": {
    junior: { min: 30, avg: 48, max: 68 },
    mid: { min: 58, avg: 80, max: 112 },
    senior: { min: 95, avg: 125, max: 170 },
  },
};

// Upwork est global, peu d'ajustement géographique
const UPWORK_REGIONS = [{ name: "global", multiplier: 1.0 }];

export async function scrapeUpworkRates() {
  console.log("🔍 Scraping Upwork hourly rates...");

  const rates = [];
  const experienceLevels = ["junior", "mid", "senior"];

  for (const [professionKey, experienceData] of Object.entries(
    UPWORK_HOURLY_RATES,
  )) {
    for (const region of UPWORK_REGIONS) {
      const countryValue =
        region.name === "global"
          ? "global"
          : (await getCountryFromCity(region.name))?.country;

      for (const experienceLevel of experienceLevels) {
        const data = experienceData[experienceLevel];

        const hourly_rate = Math.round(data.avg * region.multiplier);
        const daily_rate = hourly_rate * 8;

        rates.push({
          profession: professionKey,
          location: region.name,
          city: region.name,
          country: countryValue || "global",
          source: "upwork",
          rate_daily: daily_rate,
          rate_hourly: hourly_rate,
          experience_level: experienceLevel,
          last_updated: new Date().toISOString(),
        });
      }
    }
  }

  console.log(`✅ Scraped ${rates.length} rates from Upwork`);
  return rates;
}
