import { scrapePublicDataRates } from './public-data-scraper.js';
import { insertRates, supabase } from './supabase-client.js';

/**
 * Scraper maître basé sur DONNÉES PUBLIQUES RÉELLES
 * 
 * Sources officielles : Baromètre Malt, Free-Work, Stack Overflow, INSEE
 * Conformément aux licences CC BY 4.0 et Licence Ouverte 2.0
 */
export async function runMasterScraper() {
  console.log('🚀 Starting MASTER scraper - PUBLIC DATA from official sources\n');
  console.log('📊 Sources: Malt Barometer 2024-2025, Free-Work IT, Stack Overflow 2024\n');
  
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
    
    // 2. Scraper les données publiques
    console.log('📊 Scraping public data sources...\n');
    
    const publicRates = await scrapePublicDataRates();
    
    // 3. Utiliser les données publiques
    const allRates = publicRates;
    
    console.log('\n📈 Summary:');
    console.log(`  - Public Data (Malt, Free-Work, Stack Overflow): ${publicRates.length} rates`);
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
    
    // 4.5 Sauvegarder dans l'historique
    console.log('\n📈 Saving historical snapshot...');
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    const historyData = allRates.map(rate => ({
      profession: rate.profession,
      country: rate.country,
      city: rate.city,
      experience_level: rate.experience_level,
      rate_daily: rate.rate_daily,
      rate_hourly: rate.rate_hourly,
      source: rate.source,
      data_sources: rate.data_sources || 'Malt, Free-Work, Stack Overflow',
      snapshot_date: today
    }));
    
    let historyInserted = 0;
    for (let i = 0; i < historyData.length; i += batchSize) {
      const batch = historyData.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('market_rates_history')
        .insert(batch);
      
      if (!error) {
        historyInserted += batch.length;
      } else {
        console.error(`⚠️ Error inserting history batch: ${error.message}`);
      }
    }
    
    console.log(`✅ Historical snapshot saved: ${historyInserted} records for ${today}`);
    
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
        publicData: publicRates.length
      },
      sources: 'Malt Barometer 2024-2025, Free-Work IT, Stack Overflow 2024'
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