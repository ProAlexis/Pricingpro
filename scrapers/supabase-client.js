import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour insérer des tarifs dans la base
export async function insertRates(rates) {
  const { data, error } = await supabase
    .from('market_rates')
    .insert(rates)
    .select();

  if (error) {
    console.error('❌ Error inserting rates:', error);
    return null;
  }

  console.log('✅ Successfully inserted', data.length, 'rates');
  return data;
}

// Fonction pour récupérer tous les tarifs
export async function getRates(profession = null, location = null) {
  let query = supabase.from('market_rates').select('*');

  if (profession) {
    query = query.eq('profession', profession);
  }

  if (location) {
    query = query.eq('location', location);
  }

  const { data, error } = await query;

  if (error) {
    console.error('❌ Error fetching rates:', error);
    return null;
  }

  return data;
}