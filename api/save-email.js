import { createClient } from "@supabase/supabase-js";
import { sendRateAnalysisEmail } from "../services/email-service.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, results, formData, timestamp, captchaToken } = req.body;

    // Validation basique email
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Vérification Turnstile
    if (!captchaToken) {
      return res.status(400).json({ error: "Captcha token is missing" });
    }

    const verifyUrl =
      "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const verificationResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(
        process.env.TURNSTILE_SECRET_KEY
      )}&response=${encodeURIComponent(captchaToken)}`,
    });

    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      console.error(
        "❌ Turnstile verification failed:",
        verificationData["error-codes"]
      );
      return res.status(403).json({ error: "Captcha verification failed" });
    }

    console.log("✅ Turnstile verified (Human detected)");

    // Préparer les données à insérer
    const emailData = {
      email: email.toLowerCase().trim(),
      profession: formData?.profession || null,
      location: formData?.location || null,
      experience_level: formData?.experienceLevel || null,
      years_experience: formData?.experience
        ? parseInt(formData.experience)
        : null,
      skills: formData?.skills || [],
      recommended_rate_daily: results?.daily || null,
      recommended_rate_hourly: results?.hourly || null,
      recommended_rate_monthly: results?.monthly || null,
      market_min: results?.market?.min || null,
      market_avg: results?.market?.avg || null,
      market_max: results?.market?.max || null,
      data_source: results?.dataSource || "unknown",
      source_count: results?.sourceCount || 0,
      created_at: timestamp || new Date().toISOString(),
    };

    // Insérer dans Supabase
    const { data, error } = await supabase
      .from("email_leads")
      .insert([emailData])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("✅ Email lead saved:", email);

    // Envoyer l'email avec Resend
    try {
      console.log("📧 Attempting to send email to:", email);

      const emailResult = await sendRateAnalysisEmail({
        email,
        results,
        formData,
        language: req.body.language || "fr",
      });

      console.log("📬 Email result:", JSON.stringify(emailResult));

      if (emailResult.success) {
        console.log("✅ Analysis email sent successfully to:", email);
      } else {
        console.error("❌ Failed to send email:", emailResult.error);
      }
    } catch (emailError) {
      console.error("❌ Email sending error:", emailError.message);
      console.error("❌ Error stack:", emailError.stack);
      // Ne pas bloquer la réponse si l'email échoue
    }

    return res.status(200).json({
      success: true,
      message: "Email saved and analysis sent successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error saving email:", error);
    return res.status(500).json({
      error: "Failed to save email",
      details: error.message,
    });
  }
}
