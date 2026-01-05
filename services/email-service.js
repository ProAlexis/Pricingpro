import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envoyer l'email avec l'analyse de tarifs
 */
export async function sendRateAnalysisEmail({ email, results, formData, language = 'fr' }) {
  try {
    const translations = {
      fr: {
        subject: '📊 Votre Analyse de Tarifs Personnalisée - PricingPro',
        greeting: 'Bonjour',
        intro: 'Voici votre analyse de tarifs personnalisée basée sur votre profil :',
        profile: 'Votre profil',
        profession: 'Profession',
        location: 'Localisation',
        experience: 'Expérience',
        experienceLevel: 'Niveau',
        skills: 'Compétences',
        results: 'Vos tarifs recommandés',
        hourly: 'Tarif horaire',
        daily: 'Tarif journalier',
        monthly: 'Tarif mensuel',
        market: 'Comparaison marché',
        marketMin: 'Minimum marché',
        marketAvg: 'Moyenne marché',
        marketMax: 'Maximum marché',
        advice: 'Nos conseils',
        adviceText: 'Vos tarifs sont compétitifs ! Continuez à développer vos compétences pour augmenter votre valeur sur le marché.',
        cta: 'Recalculer mes tarifs',
        footer: 'PricingPro - Le calculateur de tarifs le plus précis du marché',
        footerNote: 'Cet email vous a été envoyé car vous avez demandé une analyse sur PricingPro.com'
      },
      en: {
        subject: '📊 Your Personalized Rate Analysis - PricingPro',
        greeting: 'Hello',
        intro: 'Here is your personalized rate analysis based on your profile:',
        profile: 'Your profile',
        profession: 'Profession',
        location: 'Location',
        experience: 'Experience',
        experienceLevel: 'Level',
        skills: 'Skills',
        results: 'Your recommended rates',
        hourly: 'Hourly rate',
        daily: 'Daily rate',
        monthly: 'Monthly rate',
        market: 'Market comparison',
        marketMin: 'Market minimum',
        marketAvg: 'Market average',
        marketMax: 'Market maximum',
        advice: 'Our advice',
        adviceText: 'Your rates are competitive! Keep developing your skills to increase your market value.',
        cta: 'Recalculate my rates',
        footer: 'PricingPro - The most accurate pricing calculator on the market',
        footerNote: 'You received this email because you requested an analysis on PricingPro.com'
      }
    };

    const t = translations[language];

    // Formater les compétences
    const skillsList = formData.skills && formData.skills.length > 0
      ? formData.skills.join(', ')
      : (language === 'fr' ? 'Aucune compétence ajoutée' : 'No skills added');

    // Créer le HTML de l'email
    const htmlContent = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #9333ea;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f3e8ff;
    }
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 15px;
    }
    .profile-item {
      background: #f9fafb;
      padding: 15px;
      border-radius: 8px;
      border-left: 3px solid #9333ea;
    }
    .profile-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .profile-value {
      font-size: 16px;
      color: #111827;
      font-weight: 500;
    }
    .rates-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 20px;
    }
    .rate-card {
      background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      border: 2px solid #e9d5ff;
    }
    .rate-card.featured {
      background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
      border: none;
    }
    .rate-card.featured .rate-label,
    .rate-card.featured .rate-value {
      color: white;
    }
    .rate-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .rate-value {
      font-size: 28px;
      color: #9333ea;
      font-weight: 700;
    }
    .market-comparison {
      background: #f9fafb;
      padding: 20px;
      border-radius: 10px;
      margin-top: 15px;
    }
    .market-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .market-item:last-child {
      border-bottom: none;
    }
    .market-label {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }
    .market-value {
      font-size: 16px;
      color: #111827;
      font-weight: 600;
    }
    .advice-box {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 20px;
      border-radius: 10px;
      border-left: 4px solid #f59e0b;
      margin-top: 15px;
    }
    .advice-box p {
      margin: 0;
      color: #78350f;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 30px;
      text-align: center;
    }
    .footer {
      background: #f9fafb;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    .footer-logo {
      font-size: 20px;
      font-weight: 700;
      color: #9333ea;
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 600px) {
      .rates-container {
        grid-template-columns: 1fr;
      }
      .profile-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📊 ${t.subject.split(' - ')[0]}</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Greeting -->
      <p style="font-size: 16px; color: #111827; margin-bottom: 20px;">
        ${t.greeting},
      </p>
      <p style="font-size: 14px; color: #6b7280; margin-bottom: 30px;">
        ${t.intro}
      </p>

      <!-- Profile Section -->
      <div class="section">
        <div class="section-title">${t.profile}</div>
        <div class="profile-grid">
          <div class="profile-item">
            <div class="profile-label">${t.profession}</div>
            <div class="profile-value">${formData.profession || 'N/A'}</div>
          </div>
          <div class="profile-item">
            <div class="profile-label">${t.location}</div>
            <div class="profile-value">${formData.location || 'N/A'}</div>
          </div>
          <div class="profile-item">
            <div class="profile-label">${t.experienceLevel}</div>
            <div class="profile-value">${formData.experienceLevel || 'N/A'}</div>
          </div>
          <div class="profile-item">
            <div class="profile-label">${t.experience}</div>
            <div class="profile-value">${formData.experience || 0} ${language === 'fr' ? 'ans' : 'years'}</div>
          </div>
        </div>
        <div class="profile-item" style="margin-top: 15px;">
          <div class="profile-label">${t.skills}</div>
          <div class="profile-value">${skillsList}</div>
        </div>
      </div>

      <!-- Rates Section -->
      <div class="section">
        <div class="section-title">${t.results}</div>
        <div class="rates-container">
          <div class="rate-card">
            <div class="rate-label">${t.hourly}</div>
            <div class="rate-value">${results.hourly}€</div>
          </div>
          <div class="rate-card featured">
            <div class="rate-label">${t.daily}</div>
            <div class="rate-value">${results.daily}€</div>
          </div>
          <div class="rate-card">
            <div class="rate-label">${t.monthly}</div>
            <div class="rate-value">${results.monthly.toLocaleString()}€</div>
          </div>
        </div>
      </div>

      <!-- Market Comparison -->
      <div class="section">
        <div class="section-title">${t.market}</div>
        <div class="market-comparison">
          <div class="market-item">
            <span class="market-label">${t.marketMin}</span>
            <span class="market-value">${results.market.min}€/j</span>
          </div>
          <div class="market-item">
            <span class="market-label">${t.marketAvg}</span>
            <span class="market-value">${results.market.avg}€/j</span>
          </div>
          <div class="market-item">
            <span class="market-label">${t.marketMax}</span>
            <span class="market-value">${results.market.max}€/j</span>
          </div>
        </div>
      </div>

      <!-- Advice -->
      <div class="section">
        <div class="section-title">💡 ${t.advice}</div>
        <div class="advice-box">
          <p>${t.adviceText}</p>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align: center;">
        <a href="https://pricingpro.fr/#calculator" class="cta-button">
          ${t.cta}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">PricingPro</div>
      <p>${t.footer}</p>
      <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
        ${t.footerNote}
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Envoyer l'email
    const { data, error } = await resend.emails.send({
      from: 'PricingPro <contact@pricingpro.com>',
      to: [email],
      subject: t.subject,
      html: htmlContent,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error };
    }

    console.log('✅ Email sent successfully:', data);
    return { success: true, data };

  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
}