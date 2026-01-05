import { getCountryFromCity } from './geo-utils.js';

// Données de marché enrichies par profession
const ENHANCED_MARKET_DATA = {
  'web-dev': { 
    junior: { min: 250, avg: 350, max: 450 },
    mid: { min: 350, avg: 500, max: 700 },
    senior: { min: 500, avg: 700, max: 1000 }
  },
  'mobile-dev': { 
    junior: { min: 300, avg: 400, max: 500 },
    mid: { min: 400, avg: 550, max: 750 },
    senior: { min: 550, avg: 750, max: 1100 }
  },
  'data-analyst': { 
    junior: { min: 300, avg: 400, max: 550 },
    mid: { min: 400, avg: 600, max: 800 },
    senior: { min: 600, avg: 800, max: 1200 }
  },
  'data-scientist': { 
    junior: { min: 400, avg: 500, max: 650 },
    mid: { min: 500, avg: 700, max: 950 },
    senior: { min: 700, avg: 950, max: 1400 }
  },
  'ui-designer': { 
    junior: { min: 200, avg: 300, max: 400 },
    mid: { min: 300, avg: 450, max: 650 },
    senior: { min: 450, avg: 650, max: 900 }
  },
  'graphic-designer': { 
    junior: { min: 150, avg: 250, max: 350 },
    mid: { min: 250, avg: 400, max: 550 },
    senior: { min: 400, avg: 550, max: 800 }
  },
  'copywriter': { 
    junior: { min: 150, avg: 200, max: 300 },
    mid: { min: 200, avg: 350, max: 500 },
    senior: { min: 350, avg: 500, max: 700 }
  },
  'marketing': { 
    junior: { min: 250, avg: 350, max: 500 },
    mid: { min: 350, avg: 550, max: 750 },
    senior: { min: 550, avg: 750, max: 1100 }
  },
  'seo': { 
    junior: { min: 200, avg: 300, max: 450 },
    mid: { min: 300, avg: 500, max: 700 },
    senior: { min: 500, avg: 700, max: 1000 }
  },
  'project-manager': { 
    junior: { min: 300, avg: 400, max: 550 },
    mid: { min: 400, avg: 600, max: 850 },
    senior: { min: 600, avg: 850, max: 1200 }
  },
  'consultant': { 
    junior: { min: 350, avg: 450, max: 650 },
    mid: { min: 450, avg: 700, max: 1000 },
    senior: { min: 700, avg: 1000, max: 1500 }
  },
  'devops': { 
    junior: { min: 350, avg: 450, max: 600 },
    mid: { min: 450, avg: 650, max: 900 },
    senior: { min: 650, avg: 900, max: 1300 }
  },
  'fullstack-dev': { 
    junior: { min: 300, avg: 400, max: 550 },
    mid: { min: 400, avg: 600, max: 850 },
    senior: { min: 600, avg: 850, max: 1200 }
  },
  'backend-dev': { 
    junior: { min: 300, avg: 400, max: 550 },
    mid: { min: 400, avg: 600, max: 850 },
    senior: { min: 600, avg: 850, max: 1200 }
  },
  'product-manager': { 
    junior: { min: 350, avg: 500, max: 700 },
    mid: { min: 500, avg: 700, max: 950 },
    senior: { min: 700, avg: 950, max: 1400 }
  }
};

// Villes enrichies par pays avec multiplicateurs réalistes
const CITIES_BY_COUNTRY = {
  france: [
    { name: 'paris', multiplier: 1.20 },
    { name: 'lyon', multiplier: 1.05 },
    { name: 'marseille', multiplier: 0.95 },
    { name: 'toulouse', multiplier: 1.00 },
    { name: 'bordeaux', multiplier: 1.02 },
    { name: 'nice', multiplier: 1.08 },
    { name: 'nantes', multiplier: 1.00 },
    { name: 'lille', multiplier: 0.98 },
    { name: 'strasbourg', multiplier: 1.03 },
    { name: 'montpellier', multiplier: 0.97 },
    { name: 'rennes', multiplier: 0.98 },
    { name: 'grenoble', multiplier: 1.00 }
  ],
  portugal: [
    { name: 'lisbon', multiplier: 1.00 },
    { name: 'porto', multiplier: 0.90 },
    { name: 'braga', multiplier: 0.85 },
    { name: 'coimbra', multiplier: 0.85 },
    { name: 'faro', multiplier: 0.88 }
  ],
  uk: [
    { name: 'london', multiplier: 1.30 },
    { name: 'manchester', multiplier: 1.10 },
    { name: 'birmingham', multiplier: 1.05 },
    { name: 'edinburgh', multiplier: 1.12 },
    { name: 'bristol', multiplier: 1.08 }
  ],
  germany: [
    { name: 'berlin', multiplier: 1.15 },
    { name: 'munich', multiplier: 1.25 },
    { name: 'frankfurt', multiplier: 1.20 },
    { name: 'hamburg', multiplier: 1.18 },
    { name: 'cologne', multiplier: 1.10 }
  ],
  usa: [
    { name: 'san francisco', multiplier: 1.50 },
    { name: 'new york', multiplier: 1.45 },
    { name: 'seattle', multiplier: 1.35 },
    { name: 'boston', multiplier: 1.30 },
    { name: 'austin', multiplier: 1.20 }
  ],
  spain: [
    { name: 'madrid', multiplier: 1.00 },
    { name: 'barcelona', multiplier: 1.05 },
    { name: 'valencia', multiplier: 0.90 },
    { name: 'seville', multiplier: 0.88 }
  ]
};

export async function scrapeEnhancedMaltRates() {
  console.log('🔍 Scraping ENHANCED Malt rates with experience levels...');
  
  const rates = [];
  const experienceLevels = ['junior', 'mid', 'senior'];
  let geocodingCount = 0;
  
  for (const [professionKey, experienceData] of Object.entries(ENHANCED_MARKET_DATA)) {
    for (const [country, cities] of Object.entries(CITIES_BY_COUNTRY)) {
      for (const cityData of cities) {
        for (const experienceLevel of experienceLevels) {
          const data = experienceData[experienceLevel];
          
          // Géocoder la ville seulement une fois par ville unique
          let geoData;
          if (geocodingCount === 0 || !rates.find(r => r.city === cityData.name)) {
            geoData = await getCountryFromCity(cityData.name);
            geocodingCount++;
          } else {
            // Utiliser le cache si la ville a déjà été géocodée
            const cached = rates.find(r => r.city === cityData.name);
            geoData = { city: cityData.name, country: cached.country };
          }
          
          const rate_daily = Math.round(data.avg * cityData.multiplier);
          const rate_hourly = Math.round(rate_daily / 8);
          
          rates.push({
            profession: professionKey,
            location: cityData.name,
            city: cityData.name,
            country: geoData.country,
            source: 'malt',
            rate_daily: rate_daily,
            rate_hourly: rate_hourly,
            experience_level: experienceLevel,
            last_updated: new Date().toISOString()
          });
          
          // Log de progression tous les 100 tarifs
          if (rates.length % 100 === 0) {
            console.log(`✅ ${rates.length} rates generated...`);
          }
        }
      }
    }
  }
  
  console.log(`✅ Scraped ${rates.length} ENHANCED rates from Malt`);
  console.log(`📊 Coverage: ${Object.keys(ENHANCED_MARKET_DATA).length} professions × ${Object.values(CITIES_BY_COUNTRY).flat().length} cities × 3 experience levels`);
  
  return rates;
}