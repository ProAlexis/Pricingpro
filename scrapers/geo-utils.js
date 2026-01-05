// Mapping manuel des villes principales
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

// Cache pour les résultats Nominatim
const geocodeCache = new Map();

/**
 * Obtenir le pays depuis une ville (avec cache et fallback Nominatim)
 */
export async function getCountryFromCity(cityName) {
  if (!cityName) return null;
  
  const normalizedCity = cityName.toLowerCase().trim();
  
  // 1. Checker le mapping manuel d'abord
  if (CITY_TO_COUNTRY[normalizedCity]) {
    return {
      city: cityName,
      country: CITY_TO_COUNTRY[normalizedCity]
    };
  }
  
  // 2. Checker le cache
  if (geocodeCache.has(normalizedCity)) {
    return geocodeCache.get(normalizedCity);
  }
  
  // 3. Fallback: Appeler Nominatim (gratuit)
  try {
    console.log(`🌍 Geocoding "${cityName}" via Nominatim...`);
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'PricingPro/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Nominatim request failed');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0 && data[0].address) {
      const country = (data[0].address.country || '').toLowerCase();
      const result = {
        city: cityName,
        country: country || 'unknown'
      };
      
      // Sauvegarder dans le cache
      geocodeCache.set(normalizedCity, result);
      
      // Respecter la limite de 1 req/sec de Nominatim
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      return result;
    }
  } catch (error) {
    console.error(`❌ Error geocoding "${cityName}":`, error.message);
  }
  
  // Fallback ultime: retourner null
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
    // Format: "Paris, France"
    return {
      city: parts[0],
      country: parts[1].toLowerCase()
    };
  } else {
    // Format: "Paris" (juste la ville)
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