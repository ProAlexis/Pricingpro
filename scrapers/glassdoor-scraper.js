import { getCountryFromCity } from './geo-utils.js';

// Données Glassdoor simulées (salaires convertis en TJM)
// En production, vous scrapez vraiment Glassdoor avec Puppeteer
const GLASSDOOR_SALARY_DATA = {
  'web-dev': {
    junior: { annual: 35000, daily: 175 },
    mid: { annual: 50000, daily: 250 },
    senior: { annual: 70000, daily: 350 }
  },
  'mobile-dev': {
    junior: { annual: 40000, daily: 200 },
    mid: { annual: 55000, daily: 275 },
    senior: { annual: 75000, daily: 375 }
  },
  'data-analyst': {
    junior: { annual: 38000, daily: 190 },
    mid: { annual: 55000, daily: 275 },
    senior: { annual: 75000, daily: 375 }
  },
  'data-scientist': {
    junior: { annual: 45000, daily: 225 },
    mid: { annual: 65000, daily: 325 },
    senior: { annual: 90000, daily: 450 }
  },
  'ui-designer': {
    junior: { annual: 32000, daily: 160 },
    mid: { annual: 45000, daily: 225 },
    senior: { annual: 60000, daily: 300 }
  },
  'graphic-designer': {
    junior: { annual: 28000, daily: 140 },
    mid: { annual: 40000, daily: 200 },
    senior: { annual: 55000, daily: 275 }
  },
  'copywriter': {
    junior: { annual: 26000, daily: 130 },
    mid: { annual: 38000, daily: 190 },
    senior: { annual: 52000, daily: 260 }
  },
  'marketing': {
    junior: { annual: 35000, daily: 175 },
    mid: { annual: 52000, daily: 260 },
    senior: { annual: 72000, daily: 360 }
  },
  'seo': {
    junior: { annual: 30000, daily: 150 },
    mid: { annual: 45000, daily: 225 },
    senior: { annual: 65000, daily: 325 }
  },
  'project-manager': {
    junior: { annual: 40000, daily: 200 },
    mid: { annual: 58000, daily: 290 },
    senior: { annual: 80000, daily: 400 }
  },
  'consultant': {
    junior: { annual: 42000, daily: 210 },
    mid: { annual: 65000, daily: 325 },
    senior: { annual: 95000, daily: 475 }
  },
  'devops': {
    junior: { annual: 42000, daily: 210 },
    mid: { annual: 60000, daily: 300 },
    senior: { annual: 85000, daily: 425 }
  },
  'fullstack-dev': {
    junior: { annual: 38000, daily: 190 },
    mid: { annual: 55000, daily: 275 },
    senior: { annual: 75000, daily: 375 }
  },
  'backend-dev': {
    junior: { annual: 38000, daily: 190 },
    mid: { annual: 55000, daily: 275 },
    senior: { annual: 75000, daily: 375 }
  },
  'product-manager': {
    junior: { annual: 45000, daily: 225 },
    mid: { annual: 65000, daily: 325 },
    senior: { annual: 90000, daily: 450 }
  }
};

// Villes avec multiplicateurs Glassdoor
const GLASSDOOR_CITIES = {
  france: [
    { name: 'paris', multiplier: 1.25 },
    { name: 'lyon', multiplier: 1.08 },
    { name: 'toulouse', multiplier: 1.02 }
  ],
  uk: [
    { name: 'london', multiplier: 1.35 },
    { name: 'manchester', multiplier: 1.12 }
  ],
  germany: [
    { name: 'berlin', multiplier: 1.18 },
    { name: 'munich', multiplier: 1.28 }
  ],
  usa: [
    { name: 'san francisco', multiplier: 1.55 },
    { name: 'new york', multiplier: 1.50 }
  ]
};

export async function scrapeGlassdoorRates() {
  console.log('🔍 Scraping Glassdoor salary data...');
  
  const rates = [];
  const experienceLevels = ['junior', 'mid', 'senior'];
  
  for (const [professionKey, experienceData] of Object.entries(GLASSDOOR_SALARY_DATA)) {
    for (const [country, cities] of Object.entries(GLASSDOOR_CITIES)) {
      for (const cityData of cities) {
        for (const experienceLevel of experienceLevels) {
          const data = experienceData[experienceLevel];
          
          // Géocoder la ville
          const geoData = await getCountryFromCity(cityData.name);
          
          const rate_daily = Math.round(data.daily * cityData.multiplier);
          const rate_hourly = Math.round(rate_daily / 8);
          
          rates.push({
            profession: professionKey,
            location: cityData.name,
            city: cityData.name,
            country: geoData.country,
            source: 'glassdoor',
            rate_daily: rate_daily,
            rate_hourly: rate_hourly,
            experience_level: experienceLevel,
            last_updated: new Date().toISOString()
          });
        }
      }
    }
    
    if (rates.length % 50 === 0) {
      console.log(`✅ ${rates.length} Glassdoor rates generated...`);
    }
  }
  
  console.log(`✅ Scraped ${rates.length} rates from Glassdoor`);
  return rates;
}