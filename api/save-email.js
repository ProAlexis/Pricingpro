import { createClient } from "@supabase/supabase-js";
import { sendRateAnalysisEmail } from "../services/email-service.js";
import rateLimit from "../lib/rate-limit.js";
import { handleCors } from "../lib/cors.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

const limiter = rateLimit({ interval: 60000, limit: 5 });

export default async function handler(req, res) {
  // CORS sécurisé
  if (handleCors(req, res)) return;

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Rate limiting
    await limiter.check(req, res);

    const { email, results, formData, timestamp, captchaToken } = req.body;

    // Validation robuste de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address format" });
    }

    // Protection contre les emails trop longs (DoS)
    if (email.length > 254) {
      return res.status(400).json({ error: "Email address too long" });
    }

    // Validation des données obligatoires
    if (!results || !formData) {
      return res
        .status(400)
        .json({ error: "Missing required data (results or formData)" });
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
        process.env.TURNSTILE_SECRET_KEY,
      )}&response=${encodeURIComponent(captchaToken)}`,
    });

    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      console.error(
        "❌ Turnstile verification failed:",
        verificationData["error-codes"],
      );
      return res.status(403).json({ error: "Captcha verification failed" });
    }

    console.log("✅ Turnstile verified (Human detected)");

    // Fonction de sanitization pour éviter XSS
    const sanitizeText = (text) => {
      if (!text) return null;
      return String(text)
        .replace(/[<>\"']/g, "") // Retire les caractères HTML/JS dangereux
        .trim()
        .slice(0, 200); // Limite la longueur
    };

    // Préparer les données à insérer avec sanitization
    const emailData = {
      email: email.toLowerCase().trim(),
      profession: sanitizeText(formData?.profession) || null,
      location: sanitizeText(formData?.location) || null,
      experience_level: sanitizeText(formData?.experienceLevel) || null,
      years_experience: formData?.experience
        ? parseInt(formData.experience)
        : null,
      skills: Array.isArray(formData?.skills)
        ? formData.skills
            .map((s) => sanitizeText(s))
            .filter(Boolean)
            .slice(0, 20)
        : [],
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
    // Rate limit exceeded
    if (error.message === "Rate limit exceeded") {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    console.error("Error saving email:", error);
    return res.status(500).json({
      error: "Failed to save email",
      details: error.message,
    });
  }
}
