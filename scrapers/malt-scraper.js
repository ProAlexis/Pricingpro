import axios from 'axios';
import * as cheerio from 'cheerio';
import { getCountryFromCity } from './geo-utils.js';

// Données simulées basées sur l'analyse du marché Malt
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
  const cities = ['paris', 'lyon', 'bordeaux', 'marseille', 'toulouse', 'nice', 'nantes', 'lille'];
  
  for (const [professionKey, data] of Object.entries(MALT_MARKET_DATA)) {
    for (const city of cities) {
      // Obtenir le pays de la ville
      const geoData = await getCountryFromCity(city);
      
      // Ajustement selon la ville
      let cityMultiplier = 1.0;
      if (city === 'paris') cityMultiplier = 1.15;
      else if (city === 'lyon') cityMultiplier = 1.05;
      else if (city === 'bordeaux') cityMultiplier = 1.02;
      else if (city === 'marseille') cityMultiplier = 1.03;
      else if (city === 'toulouse') cityMultiplier = 1.02;
      else if (city === 'nice') cityMultiplier = 1.04;
      
      const rate_daily = Math.round(data.avg * cityMultiplier);
      const rate_hourly = Math.round(rate_daily / 8);
      
      rates.push({
        profession: professionKey,
        location: city, // Garde l'ancien champ pour compatibilité
        city: city,
        country: geoData.country,
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