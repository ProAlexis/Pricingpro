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

  const { profession, location, experience_level, months = 6 } = req.query;

  if (!profession || !location || !experience_level) {
    return res.status(400).json({ 
      error: 'Missing required parameters: profession, location, experience_level' 
    });
  }

  try {
    // Calculer la date de début (X mois en arrière)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - parseInt(months));
    const startDateStr = startDate.toISOString().split('T')[0];

    // Requête pour obtenir l'historique
    const { data, error } = await supabase
      .from('market_rates_history')
      .select('*')
      .eq('profession', profession)
      .eq('country', location)
      .eq('experience_level', experience_level)
      .gte('snapshot_date', startDateStr)
      .order('snapshot_date', { ascending: true });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(200).json({
        trend: [],
        evolution: null,
        message: 'No historical data available yet'
      });
    }

    // Agréger par date (moyenne par snapshot_date)
    const aggregated = data.reduce((acc, record) => {
      const date = record.snapshot_date;
      if (!acc[date]) {
        acc[date] = {
          date,
          rates: [],
          cities: new Set()
        };
      }
      acc[date].rates.push(record.rate_daily);
      acc[date].cities.add(record.city);
      return acc;
    }, {});

    // Calculer les moyennes
    const trend = Object.values(aggregated).map(snapshot => ({
      date: snapshot.date,
      avgRate: Math.round(snapshot.rates.reduce((a, b) => a + b, 0) / snapshot.rates.length),
      minRate: Math.min(...snapshot.rates),
      maxRate: Math.max(...snapshot.rates),
      sampleSize: snapshot.rates.length,
      cities: Array.from(snapshot.cities)
    }));

    // Calculer l'évolution (%)
    let evolution = null;
    if (trend.length >= 2) {
      const oldestRate = trend[0].avgRate;
      const newestRate = trend[trend.length - 1].avgRate;
      evolution = {
        percentage: Math.round(((newestRate - oldestRate) / oldestRate) * 100),
        oldRate: oldestRate,
        newRate: newestRate,
        direction: newestRate > oldestRate ? 'up' : newestRate < oldestRate ? 'down' : 'stable'
      };
    }

    return res.status(200).json({
      trend,
      evolution,
      period: `${months} months`,
      profession,
      location,
      experience_level
    });

  } catch (error) {
    console.error('Error fetching rate trends:', error);
    return res.status(500).json({ error: 'Failed to fetch rate trends' });
  }
}
