import { scrapeEnhancedMaltRates } from './malt-scraper-enhanced.js';
import { scrapeGlassdoorRates } from './glassdoor-scraper.js';
import { scrapeUpworkRates } from './upwork-scraper.js';
import { insertRates } from './supabase-client.js';
import { supabase } from './supabase-client.js';

async function main() {
  console.log('🚀 Starting MULTI-SOURCE scraping (Malt + Glassdoor + Upwork)...\n');
  
  // 1. Vider l'ancienne table
  console.log('🗑️  Clearing old data...');
  const { error: deleteError } = await supabase
    .from('market_rates')
    .delete()
    .neq('id', 0);
  
  if (deleteError) {
    console.error('Error clearing data:', deleteError);
  } else {
    console.log('✅ Old data cleared\n');
  }
  
  // 2. Scraper les 3 sources
  console.log('📊 Scraping from 3 sources...\n');
  
  const maltRates = await scrapeEnhancedMaltRates();
  const glassdoorRates = await scrapeGlassdoorRates();
  const upworkRates = await scrapeUpworkRates();
  
  const allRates = [...maltRates, ...glassdoorRates, ...upworkRates];
  
  console.log(`\n📈 Total rates collected: ${allRates.length}`);
  console.log(`  - Malt: ${maltRates.length}`);
  console.log(`  - Glassdoor: ${glassdoorRates.length}`);
  console.log(`  - Upwork: ${upworkRates.length}`);
  
  // 3. Insérer par batches
  console.log('\n💾 Inserting into Supabase...');
  const batchSize = 100;
  let inserted = 0;
  
  for (let i = 0; i < allRates.length; i += batchSize) {
    const batch = allRates.slice(i, i + batchSize);
    const result = await insertRates(batch);
    if (result) {
      inserted += batch.length;
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${allRates.length} rates inserted`);
    }
  }
  
  console.log('\n✅ MULTI-SOURCE scraping completed!');
  console.log(`📊 Your database now has data from Malt, Glassdoor AND Upwork!`);
}

main().catch(console.error);