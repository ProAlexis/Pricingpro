import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { profession, location, experience_level } = req.query;

  try {
    let query = supabase.from('market_rates').select('*');

    if (profession) {
      query = query.eq('profession', profession);
    }

    // Filtrer par pays
    if (location) {
      query = query.eq('country', location);
    }

    // NOUVEAU : Filtrer par niveau d'expérience
    if (experience_level) {
      query = query.eq('experience_level', experience_level);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const rates = data.map(r => r.rate_daily);
      const stats = {
        min: Math.min(...rates),
        max: Math.max(...rates),
        avg: Math.round(rates.reduce((a, b) => a + b, 0) / rates.length),
        count: data.length,
        sources: [...new Set(data.map(r => r.source))],
        cities: [...new Set(data.map(r => r.city))],
        experience_level: experience_level || 'all',
        rates: {
          hourly: Math.round(Math.min(...rates) / 8),
          daily: Math.round(rates.reduce((a, b) => a + b, 0) / rates.length),
          monthly: Math.round((rates.reduce((a, b) => a + b, 0) / rates.length) * 20)
        }
      };
      
      return res.status(200).json(stats);
    }

    return res.status(200).json({ 
      min: 0, 
      max: 0, 
      avg: 0, 
      count: 0,
      rates: { hourly: 0, daily: 0, monthly: 0 }
    });

  } catch (error) {
    console.error('Error fetching rates:', error);
    return res.status(500).json({ error: 'Failed to fetch rates' });
  }
}