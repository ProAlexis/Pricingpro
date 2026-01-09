import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ URL:", supabaseUrl);
  console.error("❌ Key:", supabaseKey ? "Received (hidden)" : "Missed");
  throw new Error("Missing Supabase credentials in .env file");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour insérer des tarifs dans la base
export async function insertRates(rates) {
  const { data, error } = await supabase
    .from("market_rates")
    .insert(rates)
    .select();

  if (error) {
    console.error("❌ Error inserting rates:", error.message);
    return null;
  }

  const count = data ? data.length : 0;
  console.log("✅ Successfully inserted", count, "rates");
  return data;
}

// Fonction pour récupérer tous les tarifs
export async function getRates(profession = null, location = null) {
  let query = supabase.from("market_rates").select("*");

  if (profession) {
    query = query.eq("profession", profession);
  }

  if (location) {
    query = query.eq("location", location);
  }

  const { data, error } = await query;

  if (error) {
    console.error("❌ Error fetching rates:", error.message);
    return null;
  }

  return data;
}
