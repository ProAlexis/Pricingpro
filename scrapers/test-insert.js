import { scrapeMaltRates } from './malt-scraper.js';
import { insertRates, getRates } from './supabase-client.js';

async function main() {
  console.log('🚀 Starting Malt scraping test...\n');
  
  // 1. Scraper les données de Malt
  const maltRates = await scrapeMaltRates();
  
  // 2. Insérer dans Supabase
  console.log('\n💾 Inserting into Supabase...');
  const result = await insertRates(maltRates);
  
  if (result) {
    console.log('\n✅ Success! Data inserted into database');
    
    // 3. Vérifier en récupérant les données
    console.log('\n📊 Fetching data from database...');
    const allRates = await getRates();
    console.log(`Found ${allRates.length} rates in database`);
    
    // Afficher quelques exemples
    console.log('\n📋 Sample data:');
    console.table(allRates.slice(0, 5));
  }
}

main().catch(console.error);