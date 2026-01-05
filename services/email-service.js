import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
        footerNote: 'Cet email vous a été envoyé car vous avez demandé une analyse sur pricingpro.fr'
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
        footerNote: 'You received this email because you requested an analysis on pricingpro.fr'
      }
    };

    const t = translations[language];

    const skillsList = formData.skills && formData.skills.length > 0
      ? formData.skills.join(', ')
      : (language === 'fr' ? 'Aucune compétence ajoutée' : 'No skills added');

    const htmlContent = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 18px; font-weight: 600; color: #9333ea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #f3e8ff; }
    .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }
    .profile-item { background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 3px solid #9333ea; }
    .profile-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; margin-bottom: 5px; }
    .profile-value { font-size: 16px; color: #111827; font-weight: 500; }
    .rates-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; }
    .rate-card { background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); padding: 20px; border-radius: 10px; text-align: center; border: 2px solid #e9d5ff; }
    .rate-card.featured { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); border: none; }
    .rate-card.featured .rate-label, .rate-card.featured .rate-value { color: white; }
    .rate-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
    .rate-value { font-size: 28px; color: #9333ea; font-weight: 700; }
    .market-comparison { background: #f9fafb; padding: 20px; border-radius: 10px; margin-top: 15px; }
    .market-item { display: table; width: 100%; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
    .market-item:last-child { border-bottom: none; }
    .market-label { display: table-cell; font-size: 14px; color: #6b7280; font-weight: 500; text-align: left; }
    .market-value { display: table-cell; font-size: 16px; color: #111827; font-weight: 600; text-align: right; width: 100px; font-variant-numeric: tabular-nums; }
    .advice-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b; margin-top: 15px; }
    .advice-box p { margin: 0; color: #78350f; line-height: 1.6; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white !important; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 30px; text-align: center; }
    .footer { background: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
    .footer-logo { font-size: 20px; font-weight: 700; color: #9333ea; margin-bottom: 10px; }
    @media only screen and (max-width: 600px) { .rates-container { grid-template-columns: 1fr; } .profile-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>📊 ${t.subject.split(' - ')[0]}</h1></div>
    <div class="content">
      <p style="font-size: 16px; color: #111827; margin-bottom: 20px;">${t.greeting},</p>
      <div class="section">
        <div class="section-title">${t.profile}</div>
        <div class="profile-grid">
          <div class="profile-item"><div class="profile-label">${t.profession}</div><div class="profile-value">${formData.profession || 'N/A'}</div></div>
          <div class="profile-item"><div class="profile-label">${t.location}</div><div class="profile-value">${formData.location || 'N/A'}</div></div>
          <div class="profile-item"><div class="profile-label">${t.experienceLevel}</div><div class="profile-value">${formData.experienceLevel || 'N/A'}</div></div>
          <div class="profile-item"><div class="profile-label">${t.experience}</div><div class="profile-value">${formData.experience || 0} ${language === 'fr' ? 'ans' : 'years'}</div></div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">${t.market}</div>
        <div class="market-comparison">
          <div class="market-item"><div class="market-label">${t.marketMin}</div><div class="market-value">${results.market.min}€/j</div></div>
          <div class="market-item"><div class="market-label">${t.marketAvg}</div><div class="market-value">${results.market.avg}€/j</div></div>
          <div class="market-item"><div class="market-label">${t.marketMax}</div><div class="market-value">${results.market.max}€/j</div></div>
        </div>
      </div>
      <div style="text-align: center;"><a href="https://pricingpro.fr/#calculator" class="cta-button">${t.cta}</a></div>
    </div>
    <div class="footer"><div class="footer-logo">PricingPro</div><p>${t.footer}</p></div>
  </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'PricingPro <contact@pricingpro.fr>',
      to: [email],
      subject: t.subject,
      html: htmlContent,
    });

    return { success: !error, data };
  } catch (e) { return { success: false }; }
}