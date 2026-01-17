#!/usr/bin/env node

/**
 * Script de test pour diagnostiquer les problèmes de scraping
 *
 * Usage: node test-scraper-connection.js
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

console.log('🔍 Testing Scraper Connection & Permissions...\n');

// 1. Vérifier les variables d'environnement
console.log('📋 Step 1: Checking Environment Variables');
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY'
];

let envOk = true;
for (const varName of requiredEnvVars) {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Set`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    envOk = false;
  }
}

if (!envOk) {
  console.error('\n❌ Missing environment variables! Create a .env file with your Supabase credentials.');
  process.exit(1);
}

console.log('\n✅ All environment variables found\n');

// 2. Tester la connexion Supabase
console.log('📋 Step 2: Testing Supabase Connection');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

try {
  // Test de lecture
  console.log('📖 Testing READ permission on market_rates...');
  const { data: readData, error: readError } = await supabase
    .from('market_rates')
    .select('*')
    .limit(1);

  if (readError) {
    console.error('❌ READ failed:', readError.message);
  } else {
    console.log(`✅ READ successful (${readData?.length || 0} rows)`);
  }

  // Test d'insertion (puis suppression immédiate)
  console.log('📝 Testing INSERT permission on market_rates...');
  const testData = {
    profession: 'test-connection',
    country: 'test',
    city: 'test',
    experience_level: 'test',
    rate_daily: 0,
    rate_hourly: 0,
    source: 'test',
    data_sources: 'connection-test'
  };

  const { data: insertData, error: insertError } = await supabase
    .from('market_rates')
    .insert([testData])
    .select();

  if (insertError) {
    console.error('❌ INSERT failed:', insertError.message);
    console.error('   This is likely a Row Level Security (RLS) issue.');
    console.error('   See .github/SCRAPER_DIAGNOSTIC.md for solutions.');
  } else {
    console.log('✅ INSERT successful');

    // Nettoyer le test
    if (insertData && insertData[0]?.id) {
      console.log('🧹 Cleaning up test data...');
      const { error: deleteError } = await supabase
        .from('market_rates')
        .delete()
        .eq('id', insertData[0].id);

      if (deleteError) {
        console.error('⚠️  DELETE failed (but INSERT works):', deleteError.message);
      } else {
        console.log('✅ DELETE successful');
      }
    }
  }

  // Test de comptage
  console.log('\n📊 Current data in market_rates:');
  const { count, error: countError } = await supabase
    .from('market_rates')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('❌ COUNT failed:', countError.message);
  } else {
    console.log(`✅ Total rates in database: ${count || 0}`);
  }

  // Test de market_rates_history
  console.log('\n📊 Testing market_rates_history table:');
  const { data: historyData, error: historyError } = await supabase
    .from('market_rates_history')
    .select('*')
    .limit(1);

  if (historyError) {
    console.error('❌ market_rates_history access failed:', historyError.message);
  } else {
    console.log('✅ market_rates_history accessible');
  }

  console.log('\n✅ Connection test completed successfully!');
  console.log('\nYou can now run the full scraper with: node run-scraper.js');

} catch (error) {
  console.error('\n❌ Unexpected error:', error.message);
  console.error('\nFull error:', error);
  process.exit(1);
}
