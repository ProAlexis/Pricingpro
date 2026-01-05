import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialiser Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Mapping manuel des villes principales (pour éviter les appels API)
const CITY_TO_COUNTRY = {
  // France
  'france': 'france',
  'paris': 'france',
  'lyon': 'france',
  'bordeaux': 'france',
  'marseille': 'france',
  'toulouse': 'france',
  'nice': 'france',
  'nantes': 'france',
  'lille': 'france',
  'strasbourg': 'france',
  'montpellier': 'france',
  'rennes': 'france',
  'reims': 'france',
  'grenoble': 'france',
  
  // Portugal
  'portugal': 'portugal',
  'lisbon': 'portugal',
  'lisboa': 'portugal',
  'porto': 'portugal',
  'braga': 'portugal',
  'coimbra': 'portugal',
  'faro': 'portugal',
  
  // UK
  'uk': 'uk',
  'united kingdom': 'uk',
  'london': 'uk',
  'manchester': 'uk',
  'birmingham': 'uk',
  'leeds': 'uk',
  'glasgow': 'uk',
  'edinburgh': 'uk',
  'liverpool': 'uk',
  'bristol': 'uk',
  
  // Germany
  'germany': 'germany',
  'berlin': 'germany',
  'munich': 'germany',
  'frankfurt': 'germany',
  'hamburg': 'germany',
  'cologne': 'germany',
  'stuttgart': 'germany',
  
  // USA
  'usa': 'usa',
  'united states': 'usa',
  'new york': 'usa',
  'san francisco': 'usa',
  'los angeles': 'usa',
  'chicago': 'usa',
  'boston': 'usa',
  'seattle': 'usa',
  'austin': 'usa',
  'denver': 'usa',
  
  // Spain
  'spain': 'spain',
  'madrid': 'spain',
  'barcelona': 'spain',
  'valencia': 'spain',
  'seville': 'spain',
  
  // Netherlands
  'netherlands': 'netherlands',
  'amsterdam': 'netherlands',
  'rotterdam': 'netherlands',
  'utrecht': 'netherlands',
  
  // Belgium
  'belgium': 'belgium',
  'brussels': 'belgium',
  'antwerp': 'belgium',
  'ghent': 'belgium',
  
  // Switzerland
  'switzerland': 'switzerland',
  'zurich': 'switzerland',
  'geneva': 'switzerland',
  'basel': 'switzerland',
};

/**
 * Obtenir le pays depuis le cache Supabase
 */
async function getCachedGeocode(cityName) {
  const normalizedCity = cityName.toLowerCase().trim();
  
  const { data, error } = await supabase
    .from('city_geocoding')
    .select('*')
    .eq('city', normalizedCity)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return {
    city: cityName,
    country: data.country,
    countryCode: data.country_code
  };
}

/**
 * Sauvegarder le résultat dans le cache Supabase
 */
async function saveCachedGeocode(cityName, country, countryCode = null) {
  const normalizedCity = cityName.toLowerCase().trim();
  
  const { error } = await supabase
    .from('city_geocoding')
    .upsert({
      city: normalizedCity,
      country: country,
      country_code: countryCode,
      last_updated: new Date().toISOString()
    }, {
      onConflict: 'city'
    });
  
  if (error) {
    console.error('❌ Error saving geocode cache:', error);
  } else {
    console.log(`✅ Cached: ${cityName} → ${country}`);
  }
}

/**
 * Appeler Nominatim pour géocoder une ville
 */
async function geocodeWithNominatim(cityName) {
  try {
    console.log(`🌍 Geocoding "${cityName}" via Nominatim...`);
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'PricingPro/1.0 (contact@pricingpro.com)'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Nominatim request failed');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      console.log('📍 Nominatim response:', JSON.stringify(data[0], null, 2));
      
      const address = data[0].address || {};
      const displayName = data[0].display_name || '';
      
      // Extraire le pays de plusieurs façons possibles
      let country = address.country || '';
      let countryCode = address.country_code || '';
      
      // Si pas de country, essayer de parser depuis display_name
      if (!country && displayName) {
        const parts = displayName.split(',').map(s => s.trim());
        country = parts[parts.length - 1]; // Dernier élément = pays
      }
      
      country = country.toLowerCase();
      countryCode = countryCode.toUpperCase();
      
      console.log(`📌 Extracted: country="${country}", code="${countryCode}"`);
      
      if (country && country !== 'unknown') {
        // Sauvegarder dans le cache
        await saveCachedGeocode(cityName, country, countryCode);
        
        // Respecter la limite de 1 req/sec de Nominatim
        await new Promise(resolve => setTimeout(resolve, 1100));
        
        return {
          city: cityName,
          country: country,
          countryCode: countryCode
        };
      }
    }
  } catch (error) {
    console.error(`❌ Error geocoding "${cityName}":`, error.message);
  }
  
  return null;
}

/**
 * Obtenir le pays depuis une ville (avec cache persistant et fallback Nominatim)
 */
export async function getCountryFromCity(cityName) {
  if (!cityName) return null;
  
  const normalizedCity = cityName.toLowerCase().trim();
  
  // 1. Checker le mapping manuel d'abord (plus rapide)
  if (CITY_TO_COUNTRY[normalizedCity]) {
    return {
      city: cityName,
      country: CITY_TO_COUNTRY[normalizedCity]
    };
  }
  
  // 2. Checker le cache Supabase
  const cached = await getCachedGeocode(cityName);
  if (cached) {
    console.log(`💾 Cache hit: ${cityName} → ${cached.country}`);
    return cached;
  }
  
  // 3. Fallback: Appeler Nominatim (gratuit mais lent)
  const geocoded = await geocodeWithNominatim(cityName);
  
  if (geocoded) {
    return geocoded;
  }
  
  // Fallback ultime
  return {
    city: cityName,
    country: 'unknown'
  };
}

/**
 * Parser une localisation comme "Paris, France" ou "Paris"
 */
export function parseLocation(locationString) {
  if (!locationString) return { city: null, country: null };
  
  const parts = locationString.split(',').map(s => s.trim());
  
  if (parts.length >= 2) {
    return {
      city: parts[0],
      country: parts[1].toLowerCase()
    };
  } else {
    return {
      city: parts[0],
      country: null
    };
  }
}

/**
 * Normaliser un nom de pays
 */
export function normalizeCountry(country) {
  const normalized = country.toLowerCase().trim();
  
  const countryAliases = {
    'united states': 'usa',
    'united states of america': 'usa',
    'us': 'usa',
    'uk': 'uk',
    'united kingdom': 'uk',
    'great britain': 'uk',
    'england': 'uk',
    'deutschland': 'germany',
    'allemagne': 'germany',
    'españa': 'spain',
    'espagne': 'spain',
  };
  
  return countryAliases[normalized] || normalized;
}