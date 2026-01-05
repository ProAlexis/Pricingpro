import { getCountryFromCity } from './geo-utils.js';

async function testGeocoding() {
  console.log('🧪 Testing geocoding system with cache...\n');
  
  const testCities = [
    'Paris',      // Dans le mapping manuel
    'Annecy',     // Petite ville, pas dans mapping
    'Chambéry',   // Petite ville, pas dans mapping
    'Annecy',     // 2ème fois - devrait venir du cache
    'Évora',      // Ville portugaise
  ];
  
  for (const city of testCities) {
    console.log(`\n🔍 Testing: ${city}`);
    const result = await getCountryFromCity(city);
    console.log(`✅ Result: ${result.city} → ${result.country}`);
  }
  
  console.log('\n✅ All tests completed!');
}

testGeocoding().catch(console.error);