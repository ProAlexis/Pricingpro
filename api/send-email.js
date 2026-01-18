import { Resend } from "resend";
import rateLimit from "../lib/rate-limit.js";
import { handleCors } from "../lib/cors.js";
import { secureLog } from "../lib/logger.js";
import { validateEmail } from "../lib/validators.js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiter : 3 emails par minute par IP
const limiter = rateLimit({ interval: 60000, limit: 3 });

export default async function handler(req, res) {
  // CORS sécurisé
  if (handleCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Rate limiting
    await limiter.check(req, res);

    const {
      email,
      results,
      formData,
      language = "fr",
      captchaToken,
    } = req.body;

    // Validation des champs requis
    if (!email || !results || !formData) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validation email stricte
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // ⚠️ Vérification Turnstile CAPTCHA
    if (!captchaToken) {
      return res.status(400).json({ error: "Captcha token is missing" });
    }

    const verifyUrl =
      "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const verificationResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(captchaToken)}`,
    });

    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      secureLog.error(
        "Turnstile verification failed:",
        verificationData["error-codes"],
      );
      return res.status(403).json({ error: "Captcha verification failed" });
    }

    secureLog.info("✅ Turnstile verified");

    // Traductions
    const translations = {
      fr: {
        subject: "🎯 Votre analyse de tarifs personnalisée - PricingPro",
        greeting: "Bonjour",
        intro: "Voici votre analyse complète basée sur votre profil :",
        profile: "Votre Profil",
        profession: "Profession",
        location: "Localisation",
        experience: "Expérience",
        experienceLevel: "Niveau",
        skills: "Compétences",
        results: "Vos tarifs recommandés",
        hourly: "Horaire",
        daily: "Journalier",
        monthly: "Mensuel",
        market: "Comparaison marché",
        min: "Minimum",
        avg: "Moyenne",
        max: "Maximum",
        breakdown: "Détail du calcul",
        base: "Tarif de base",
        expBonus: "Prime d'expérience",
        skillsBonus: "Prime compétences",
        locationAdj: "Ajustement géographique",
        total: "Total recommandé",
        advice: "Conseils personnalisés",
        footer: "Cette analyse est basée sur 3,500+ tarifs réels du marché.",
        cta: "Calculer de nouveaux tarifs",
        thanks: "Merci d'utiliser PricingPro !",
        dataSource: "Données issues de sources officielles publiques",
      },
      en: {
        subject: "🎯 Your personalized rate analysis - PricingPro",
        greeting: "Hello",
        intro: "Here is your complete analysis based on your profile:",
        profile: "Your profile",
        profession: "Profession",
        location: "Location",
        experience: "Experience",
        experienceLevel: "Level",
        skills: "Skills",
        results: "Your recommended rates",
        hourly: "Hourly",
        daily: "Daily",
        monthly: "Monthly",
        market: "Market comparison",
        min: "Minimum",
        avg: "Average",
        max: "Maximum",
        breakdown: "Rate breakdown",
        base: "Base rate",
        expBonus: "Experience bonus",
        skillsBonus: "Skills bonus",
        locationAdj: "Location adjustment",
        total: "Recommended total",
        advice: "Personalized advice",
        footer: "This analysis is based on 3,500+ real market rates.",
        cta: "Calculate new rates",
        thanks: "Thank you for using PricingPro!",
        dataSource: "Data from official public sources",
      },
    };

    const t = translations[language];

    // Mapper les professions
    const professionLabels = {
      "web-dev": { fr: "Développeur Web", en: "Web Developer" },
      "mobile-dev": { fr: "Développeur Mobile", en: "Mobile Developer" },
      "data-analyst": { fr: "Data Analyst", en: "Data Analyst" },
      "ui-designer": { fr: "Designer UI/UX", en: "UI/UX Designer" },
      // ... autres professions
    };

    const locationLabels = {
      france: { fr: "France", en: "France" },
      portugal: { fr: "Portugal", en: "Portugal" },
      uk: { fr: "Royaume-Uni", en: "United Kingdom" },
      germany: { fr: "Allemagne", en: "Germany" },
      usa: { fr: "États-Unis", en: "United States" },
      spain: { fr: "Espagne", en: "Spain" },
    };

    const expKey = formData.experienceLevel?.toLowerCase();
    const experienceLevelLabels = {
      junior: { fr: "Junior (0-2 ans)", en: "Junior (0-2 years)" },
      mid: { fr: "Confirmé (3-7 ans)", en: "Mid-level (3-7 years)" },
      senior: { fr: "Senior (8+ ans)", en: "Senior (8+ years)" },
    };

    const professionLabel =
      professionLabels[formData.profession]?.[language] || formData.profession;
    const locationLabel =
      locationLabels[formData.location]?.[language] || formData.location;
    const experienceLevelLabel =
      experienceLevelLabels[expKey]?.[language] || formData.experienceLevel;

    // Construire le HTML
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                🎯 PricingPro
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                ${t.subject.replace("🎯 ", "")}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Intro -->
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.5; color: #374151;">
                ${t.greeting},<br><br>
                ${t.intro}
              </p>

              <!-- Profile Section -->
              <table role="presentation" style="width: 100%; background-color: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #111827;">
                      📋 ${t.profile}
                    </h2>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 40%;">
                          ${t.profession}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                          ${professionLabel}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                          ${t.location}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                          ${locationLabel}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                          ${t.experienceLevel}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                          ${experienceLevelLabel}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                          ${t.experience}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                          ${formData.experience} ${language === "fr" ? "ans" : "years"}
                        </td>
                      </tr>
                      ${
                        formData.skills && formData.skills.length > 0
                          ? `
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">
                          ${t.skills}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                          ${formData.skills.join(", ")}
                        </td>
                      </tr>
                      `
                          : ""
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Results Section -->
              <table role="presentation" style="width: 100%; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #111827;">
                      💰 ${t.results}
                    </h2>
                  </td>
                </tr>
              </table>

              <!-- Rate Cards -->
              <table role="presentation" style="width: 100%; margin-bottom: 30px;">
                <tr>
                  <td style="width: 33%; padding: 0 5px;">
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 12px; padding: 20px; text-align: center;">
                      <tr>
                        <td>
                          <div style="font-size: 12px; color: #7c3aed; font-weight: 600; margin-bottom: 8px;">${t.hourly}</div>
                          <div style="font-size: 24px; color: #5b21b6; font-weight: bold;">${results.hourly}€</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="width: 33%; padding: 0 5px;">
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); border-radius: 12px; padding: 20px; text-align: center; border: 3px solid #7c3aed;">
                      <tr>
                        <td>
                          <div style="font-size: 12px; color: #ffffff; font-weight: 600; margin-bottom: 8px;">${t.daily}</div>
                          <div style="font-size: 28px; color: #ffffff; font-weight: bold;">${results.daily}€</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="width: 33%; padding: 0 5px;">
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 12px; padding: 20px; text-align: center;">
                      <tr>
                        <td>
                          <div style="font-size: 12px; color: #7c3aed; font-weight: 600; margin-bottom: 8px;">${t.monthly}</div>
                          <div style="font-size: 24px; color: #5b21b6; font-weight: bold;">${results.monthly.toLocaleString()}€</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Market Comparison -->
              <table role="presentation" style="width: 100%; background-color: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #111827;">
                      📊 ${t.market}
                    </h3>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 40%;">
                          ${t.min}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                          ${results.market.min}€/jour
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                          ${t.avg}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                          ${results.market.avg}€/jour
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                          ${t.max}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                          ${results.market.max}€/jour
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Rate Breakdown -->
              <table role="presentation" style="width: 100%; background-color: #eff6ff; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #111827;">
                      🔢 ${t.breakdown}
                    </h3>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 60%;">
                          ${t.base}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600; text-align: right;">
                          ${results.breakdown.base}€
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                          ${t.expBonus}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #059669; font-weight: 600; text-align: right;">
                          +${results.breakdown.experience}€
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                          ${t.skillsBonus}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #059669; font-weight: 600; text-align: right;">
                          +${results.breakdown.skills}€
                        </td>
                      </tr>
                      ${
                        results.breakdown.location !== 0
                          ? `
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                          ${t.locationAdj}:
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: ${results.breakdown.location >= 0 ? "#059669" : "#dc2626"}; font-weight: 600; text-align: right;">
                          ${results.breakdown.location >= 0 ? "+" : ""}${results.breakdown.location}€
                        </td>
                      </tr>
                      `
                          : ""
                      }
                      <tr style="border-top: 2px solid #3b82f6;">
                        <td style="padding: 12px 0 0 0; font-size: 16px; color: #1e40af; font-weight: bold;">
                          ${t.total}:
                        </td>
                        <td style="padding: 12px 0 0 0; font-size: 18px; color: #1e40af; font-weight: bold; text-align: right;">
                          ${results.daily}€/jour
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin: 40px 0;">
                <tr>
                  <td align="center">
                    <a href="https://pricingpro.fr/#calculator" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 16px; font-weight: 600;">
                      ${t.cta}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer Note -->
              <table role="presentation" style="width: 100%; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 16px; margin-top: 30px;">
                <tr>
                  <td style="font-size: 13px; color: #92400e; line-height: 1.6;">
                    💡 <strong>${t.dataSource}</strong><br>
                    ${t.footer}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">
                ${t.thanks}
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                © 2026 PricingPro. ${language === "fr" ? "Tous droits réservés." : "All rights reserved."}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Envoyer l'email via Resend
    const data = await resend.emails.send({
      from: "PricingPro <noreply@pricingpro.fr>",
      to: [email],
      subject: t.subject,
      html: htmlContent,
    });

    return res.status(200).json({
      success: true,
      messageId: data.id,
    });
  } catch (error) {
    // Rate limit exceeded
    if (error.message === "Rate limit exceeded") {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    secureLog.error("Error sending email:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
}
