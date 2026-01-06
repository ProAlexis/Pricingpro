import 'dotenv/config';
import { scrapeEnhancedMaltRates } from './malt-scraper-enhanced.js';
import { scrapeGlassdoorRates } from './glassdoor-scraper.js';
import { scrapeUpworkRates } from './upwork-scraper.js';
import { insertRates, supabase } from './supabase-client.js';

/**
 * Scraper maître qui combine toutes les sources
 */
export async function runMasterScraper() {
  console.log('🚀 Starting MASTER scraper - All sources combined\n');
  
  try {
    // 1. Vider l'ancienne table
    console.log('🗑️  Clearing old data...');
    const { error: deleteError } = await supabase
      .from('market_rates')
      .delete()
      .neq('id', 0);
    
    if (deleteError) {
      console.error('❌ Error clearing data:', deleteError);
    } else {
      console.log('✅ Old data cleared\n');
    }
    
    // 2. Scraper toutes les sources en parallèle
    console.log('📊 Scraping all sources in parallel...\n');
    
    const [maltRates, glassdoorRates, upworkRates] = await Promise.all([
      scrapeEnhancedMaltRates(),
      scrapeGlassdoorRates(),
      scrapeUpworkRates()
    ]);
    
    // 3. Combiner tous les tarifs
    const allRates = [...maltRates, ...glassdoorRates, ...upworkRates];
    
    console.log('\n📈 Summary:');
    console.log(`  - Malt: ${maltRates.length} rates`);
    console.log(`  - Glassdoor: ${glassdoorRates.length} rates`);
    console.log(`  - Upwork: ${upworkRates.length} rates`);
    console.log(`  - TOTAL: ${allRates.length} rates\n`);
    
    // 4. Insérer par batches de 100
    console.log('💾 Inserting into Supabase in batches...');
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
    
    // 5. Statistiques finales
    console.log('\n📊 Final Statistics:');
    
    // Par source
    const bySource = allRates.reduce((acc, rate) => {
      acc[rate.source] = (acc[rate.source] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📍 By Source:');
    console.table(bySource);
    
    // Par pays
    const byCountry = allRates.reduce((acc, rate) => {
      acc[rate.country] = (acc[rate.country] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n🌍 By Country:');
    console.table(byCountry);
    
    // Par niveau d'expérience
    const byExperience = allRates.reduce((acc, rate) => {
      acc[rate.experience_level] = (acc[rate.experience_level] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📊 By Experience Level:');
    console.table(byExperience);
    
    console.log('\n✅ MASTER scraping completed successfully!');
    
    return {
      success: true,
      totalRates: allRates.length,
      breakdown: {
        malt: maltRates.length,
        glassdoor: glassdoorRates.length,
        upwork: upworkRates.length
      }
    };
    
  } catch (error) {
    console.error('❌ Error in master scraper:', error);
    throw error;
  }
}

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  runMasterScraper()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}