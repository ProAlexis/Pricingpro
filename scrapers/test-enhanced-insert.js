import { scrapeEnhancedMaltRates } from './malt-scraper-enhanced.js';
import { insertRates, getRates } from './supabase-client.js';
import { supabase } from './supabase-client.js';

async function main() {
  console.log('🚀 Starting ENHANCED Malt scraping...\n');
  
  // 1. Vider l'ancienne table
  console.log('🗑️  Clearing old data...');
  const { error: deleteError } = await supabase
    .from('market_rates')
    .delete()
    .neq('id', 0); // Delete all
  
  if (deleteError) {
    console.error('Error clearing data:', deleteError);
  } else {
    console.log('✅ Old data cleared\n');
  }
  
  // 2. Scraper les nouvelles données enrichies
  const enhancedRates = await scrapeEnhancedMaltRates();
  
  // 3. Insérer par batches de 100 (plus stable)
  console.log('\n💾 Inserting into Supabase in batches...');
  const batchSize = 100;
  let inserted = 0;
  
  for (let i = 0; i < enhancedRates.length; i += batchSize) {
    const batch = enhancedRates.slice(i, i + batchSize);
    const result = await insertRates(batch);
    if (result) {
      inserted += batch.length;
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${enhancedRates.length} rates inserted`);
    }
  }
  
  // 4. Vérifier les données
  console.log('\n📊 Verifying data...');
  const allRates = await getRates();
  console.log(`✅ Total rates in database: ${allRates.length}`);
  
  // Stats par pays
  const byCountry = allRates.reduce((acc, rate) => {
    acc[rate.country] = (acc[rate.country] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n📈 Rates by country:');
  console.table(byCountry);
  
  // Stats par niveau d'expérience
  const byExperience = allRates.reduce((acc, rate) => {
    acc[rate.experience_level] = (acc[rate.experience_level] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n📈 Rates by experience level:');
  console.table(byExperience);
  
  console.log('\n✅ ENHANCED scraping completed!');
}

main().catch(console.error);