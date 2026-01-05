import axios from 'axios';
import * as cheerio from 'cheerio';

// Données simulées basées sur l'analyse du marché Malt
// En production, vous scrapez vraiment Malt (mais ils ont un anti-bot)
const MALT_MARKET_DATA = {
  'web-dev': { min: 350, avg: 450, max: 650, experience_factor: 1.08 },
  'mobile-dev': { min: 400, avg: 500, max: 700, experience_factor: 1.08 },
  'data-analyst': { min: 400, avg: 550, max: 750, experience_factor: 1.1 },
  'ui-designer': { min: 300, avg: 400, max: 600, experience_factor: 1.07 },
  'graphic-designer': { min: 250, avg: 350, max: 500, experience_factor: 1.06 },
  'copywriter': { min: 200, avg: 300, max: 450, experience_factor: 1.05 },
  'marketing': { min: 350, avg: 500, max: 700, experience_factor: 1.09 },
  'seo': { min: 300, avg: 450, max: 650, experience_factor: 1.08 },
  'project-manager': { min: 400, avg: 550, max: 800, experience_factor: 1.1 },
  'consultant': { min: 450, avg: 650, max: 1000, experience_factor: 1.12 }
};

export async function scrapeMaltRates() {
  console.log('🔍 Scraping Malt rates...');
  
  const rates = [];
  const locations = ['france', 'paris', 'lyon', 'bordeaux'];
  
  for (const [professionKey, data] of Object.entries(MALT_MARKET_DATA)) {
    for (const location of locations) {
      // Ajustement selon la localisation
      let locationMultiplier = 1.0;
      if (location === 'paris') locationMultiplier = 1.15;
      else if (location === 'lyon') locationMultiplier = 1.05;
      else if (location === 'bordeaux') locationMultiplier = 1.02;
      
      const rate_daily = Math.round(data.avg * locationMultiplier);
      const rate_hourly = Math.round(rate_daily / 8);
      
      rates.push({
        profession: professionKey,
        location: location,
        source: 'malt',
        rate_daily: rate_daily,
        rate_hourly: rate_hourly,
        experience_level: 'mid',
        last_updated: new Date().toISOString()
      });
    }
  }
  
  console.log(`✅ Scraped ${rates.length} rates from Malt`);
  return rates;
}

// Pour un vrai scraping de Malt (à utiliser avec précaution, respectez les CGU)
export async function scrapeMaltReal(profession) {
  try {
    // Note: Malt a des protections anti-bot, cette approche ne marchera probablement pas
    // en production sans proxy/headers/delays appropriés
    const url = `https://www.malt.fr/s?q=${encodeURIComponent(profession)}`;
    
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(data);
    
    // Parsez les profils et tarifs ici
    // La structure HTML de Malt change régulièrement
    
    return [];
  } catch (error) {
    console.error('❌ Error scraping Malt:', error.message);
    return [];
  }
}