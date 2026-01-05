import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Users, Award, Download, Globe, Calculator, Briefcase, MapPin, Clock, Loader2 } from 'lucide-react';

const PricingCalculator = () => {
  const [language, setLanguage] = useState('fr');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profession: '',
    location: 'france',
    experience: '',
    skills: [],
    workType: 'freelance'
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const translations = {
    fr: {
      title: "PricingPro",
      subtitle: "Calculateur de Tarifs Intelligent",
      tagline: "Découvrez combien vous devriez vraiment facturer",
      step1Title: "Votre Profil",
      step2Title: "Compétences & Expérience",
      step3Title: "Vos Résultats",
      profession: "Profession",
      selectProfession: "Sélectionnez votre métier",
      location: "Localisation",
      experience: "Années d'expérience",
      workType: "Type de travail",
      freelance: "Freelance",
      employee: "Salarié",
      skills: "Compétences spécifiques",
      addSkill: "Ajouter une compétence",
      next: "Suivant",
      back: "Retour",
      calculate: "Calculer mes tarifs",
      marketComparison: "Comparaison Marché",
      yourRate: "Votre Tarif Recommandé",
      marketMin: "Minimum Marché",
      marketAvg: "Moyenne Marché",
      marketMax: "Maximum Marché",
      perHour: "/heure",
      perDay: "/jour",
      perMonth: "/mois",
      insights: "Analyses & Conseils",
      exportPDF: "Exporter en PDF",
      newCalculation: "Nouvelle Analyse",
      rateBreakdown: "Détail du Calcul",
      baseRate: "Tarif de base",
      experienceBonus: "Prime d'expérience",
      skillsBonus: "Prime compétences",
      locationAdjustment: "Ajustement géographique",
      recommendation: "Recommandation"
    },
    en: {
      title: "PricingPro",
      subtitle: "Smart Pricing Calculator",
      tagline: "Discover what you should really charge",
      step1Title: "Your Profile",
      step2Title: "Skills & Experience",
      step3Title: "Your Results",
      profession: "Profession",
      selectProfession: "Select your profession",
      location: "Location",
      experience: "Years of experience",
      workType: "Work type",
      freelance: "Freelance",
      employee: "Employee",
      skills: "Specific skills",
      addSkill: "Add a skill",
      next: "Next",
      back: "Back",
      calculate: "Calculate my rates",
      marketComparison: "Market Comparison",
      yourRate: "Your Recommended Rate",
      marketMin: "Market Minimum",
      marketAvg: "Market Average",
      marketMax: "Market Maximum",
      perHour: "/hour",
      perDay: "/day",
      perMonth: "/month",
      insights: "Insights & Advice",
      exportPDF: "Export as PDF",
      newCalculation: "New Analysis",
      rateBreakdown: "Rate Breakdown",
      baseRate: "Base rate",
      experienceBonus: "Experience bonus",
      skillsBonus: "Skills bonus",
      locationAdjustment: "Location adjustment",
      recommendation: "Recommendation"
    }
  };

  const t = translations[language];

  const professions = [
    { value: 'web-dev', label: { fr: 'Développeur Web', en: 'Web Developer' }, base: 400 },
    { value: 'mobile-dev', label: { fr: 'Développeur Mobile', en: 'Mobile Developer' }, base: 450 },
    { value: 'data-analyst', label: { fr: 'Data Analyst', en: 'Data Analyst' }, base: 500 },
    { value: 'ui-designer', label: { fr: 'Designer UI/UX', en: 'UI/UX Designer' }, base: 400 },
    { value: 'graphic-designer', label: { fr: 'Graphiste', en: 'Graphic Designer' }, base: 300 },
    { value: 'copywriter', label: { fr: 'Rédacteur', en: 'Copywriter' }, base: 250 },
    { value: 'marketing', label: { fr: 'Consultant Marketing', en: 'Marketing Consultant' }, base: 450 },
    { value: 'seo', label: { fr: 'Expert SEO', en: 'SEO Expert' }, base: 400 },
    { value: 'project-manager', label: { fr: 'Chef de Projet', en: 'Project Manager' }, base: 500 },
    { value: 'consultant', label: { fr: 'Consultant Business', en: 'Business Consultant' }, base: 600 }
  ];

  const locations = [
    { value: 'france', label: { fr: 'France', en: 'France' }, multiplier: 1 },
    { value: 'portugal', label: { fr: 'Portugal', en: 'Portugal' }, multiplier: 0.7 },
    { value: 'uk', label: { fr: 'Royaume-Uni', en: 'United Kingdom' }, multiplier: 1.3 },
    { value: 'germany', label: { fr: 'Allemagne', en: 'Germany' }, multiplier: 1.2 },
    { value: 'usa', label: { fr: 'États-Unis', en: 'United States' }, multiplier: 1.5 }
  ];

  const calculateRates = async () => {
    setLoading(true);
    setApiError(null);

    try {
      // Appeler l'API Vercel pour récupérer les vraies données
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:3000/api/get-rates'
        : '/api/get-rates';
      
      const response = await fetch(
        `${apiUrl}?profession=${formData.profession}&location=${formData.location}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const marketData = await response.json();

      // Si on a des données du marché
      if (marketData.count > 0) {
        const profession = professions.find(p => p.value === formData.profession);
        const location = locations.find(l => l.value === formData.location);
        
        // Utiliser les vraies données du marché comme base
        const baseRate = marketData.avg;
        const experienceMultiplier = 1 + (parseInt(formData.experience) * 0.08);
        const skillsBonus = formData.skills.length * 30;

        const dailyRate = Math.round(baseRate * experienceMultiplier + skillsBonus);
        const hourlyRate = Math.round(dailyRate / 8);
        const monthlyRate = Math.round(dailyRate * 20);

        const breakdown = {
          base: baseRate,
          experience: Math.round(baseRate * (experienceMultiplier - 1)),
          skills: skillsBonus,
          location: 0
        };

        setResults({
          hourly: hourlyRate,
          daily: dailyRate,
          monthly: monthlyRate,
          market: { 
            min: marketData.min, 
            avg: marketData.avg, 
            max: marketData.max 
          },
          breakdown,
          dataSource: 'real',
          sourceCount: marketData.count
        });
      } else {
        // Fallback aux données simulées si pas de données du marché
        const profession = professions.find(p => p.value === formData.profession);
        const location = locations.find(l => l.value === formData.location);
        
        const baseRate = profession.base;
        const experienceMultiplier = 1 + (parseInt(formData.experience) * 0.08);
        const skillsBonus = formData.skills.length * 30;
        const locationMultiplier = location.multiplier;

        const dailyRate = Math.round((baseRate * experienceMultiplier + skillsBonus) * locationMultiplier);
        const hourlyRate = Math.round(dailyRate / 8);
        const monthlyRate = Math.round(dailyRate * 20);

        const marketMin = Math.round(dailyRate * 0.6);
        const marketAvg = Math.round(dailyRate * 0.85);
        const marketMax = Math.round(dailyRate * 1.4);

        const breakdown = {
          base: baseRate,
          experience: Math.round(baseRate * (experienceMultiplier - 1)),
          skills: skillsBonus,
          location: Math.round(baseRate * (locationMultiplier - 1))
        };

        setResults({
          hourly: hourlyRate,
          daily: dailyRate,
          monthly: monthlyRate,
          market: { min: marketMin, avg: marketAvg, max: marketMax },
          breakdown,
          dataSource: 'simulated'
        });
      }

      setStep(3);
    } catch (error) {
      console.error('Error calculating rates:', error);
      setApiError('Unable to fetch market data. Using estimated values.');
      
      // Fallback to simulated data on error
      const profession = professions.find(p => p.value === formData.profession);
      const location = locations.find(l => l.value === formData.location);
      
      const baseRate = profession.base;
      const experienceMultiplier = 1 + (parseInt(formData.experience) * 0.08);
      const skillsBonus = formData.skills.length * 30;
      const locationMultiplier = location.multiplier;

      const dailyRate = Math.round((baseRate * experienceMultiplier + skillsBonus) * locationMultiplier);
      const hourlyRate = Math.round(dailyRate / 8);
      const monthlyRate = Math.round(dailyRate * 20);

      const marketMin = Math.round(dailyRate * 0.6);
      const marketAvg = Math.round(dailyRate * 0.85);
      const marketMax = Math.round(dailyRate * 1.4);

      const breakdown = {
        base: baseRate,
        experience: Math.round(baseRate * (experienceMultiplier - 1)),
        skills: skillsBonus,
        location: Math.round(baseRate * (locationMultiplier - 1))
      };

      setResults({
        hourly: hourlyRate,
        daily: dailyRate,
        monthly: monthlyRate,
        market: { min: marketMin, avg: marketAvg, max: marketMax },
        breakdown,
        dataSource: 'simulated'
      });
      
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const getInsights = () => {
    if (!results) return [];
    
    const insights = [];
    const professionLabel = professions.find(p => p.value === formData.profession).label[language];
    
    if (parseInt(formData.experience) < 2) {
      insights.push({
        icon: '📈',
        text: language === 'fr' 
          ? 'Avec plus d\'expérience, vous pourriez augmenter vos tarifs de 40-60% dans les 2 prochaines années.'
          : 'With more experience, you could increase your rates by 40-60% in the next 2 years.'
      });
    }

    if (formData.skills.length < 3) {
      insights.push({
        icon: '🎯',
        text: language === 'fr'
          ? 'Développer 2-3 compétences complémentaires pourrait augmenter vos tarifs de 20-30%.'
          : 'Developing 2-3 complementary skills could increase your rates by 20-30%.'
      });
    }

    insights.push({
      icon: '💡',
      text: language === 'fr'
        ? `Les ${professionLabel}s dans votre profil facturent généralement entre ${results.market.min}€ et ${results.market.max}€/jour.`
        : `${professionLabel}s with your profile typically charge between €${results.market.min} and €${results.market.max}/day.`
    });

    if (formData.location === 'portugal') {
      insights.push({
        icon: '🌍',
        text: language === 'fr'
          ? 'Le marché portugais est en croissance. Cibler des clients internationaux peut vous permettre de facturer 50% de plus.'
          : 'The Portuguese market is growing. Targeting international clients can allow you to charge 50% more.'
      });
    }

    return insights;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{language === 'fr' ? 'EN' : 'FR'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">{t.tagline}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? 'Obtenez une analyse personnalisée de vos tarifs basée sur le marché réel et votre profil unique.'
                  : 'Get a personalized analysis of your rates based on real market data and your unique profile.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.step1Title}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.profession}
                  </label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({...formData, profession: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">{t.selectProfession}</option>
                    {professions.map(prof => (
                      <option key={prof.value} value={prof.value}>
                        {prof.label[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.location}
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {locations.map(loc => (
                      <option key={loc.value} value={loc.value}>
                        {loc.label[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.experience}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0-30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.workType}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFormData({...formData, workType: 'freelance'})}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.workType === 'freelance'
                          ? 'border-purple-600 bg-purple-50 text-purple-600 font-medium'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {t.freelance}
                    </button>
                    <button
                      onClick={() => setFormData({...formData, workType: 'employee'})}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.workType === 'employee'
                          ? 'border-purple-600 bg-purple-50 text-purple-600 font-medium'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {t.employee}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.profession || !formData.experience}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.next}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.step2Title}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.skills}
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => setFormData({
                            ...formData,
                            skills: formData.skills.filter((_, i) => i !== idx)
                          })}
                          className="hover:text-purple-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="skillInput"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="React, TypeScript, SEO..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setFormData({
                            ...formData,
                            skills: [...formData.skills, e.target.value.trim()]
                          });
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('skillInput');
                        if (input.value.trim()) {
                          setFormData({
                            ...formData,
                            skills: [...formData.skills, input.value.trim()]
                          });
                          input.value = '';
                        }
                      }}
                      className="px-6 py-3 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      {t.addSkill}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  {t.back}
                </button>
                <button
                  onClick={calculateRates}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  {t.calculate}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && results && (
          <div className="space-y-6">
            {apiError && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm">
                ⚠️ {apiError}
              </div>
            )}

            {results.dataSource === 'real' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm">
                ✅ {language === 'fr' 
                  ? `Données basées sur ${results.sourceCount} tarifs réels du marché`
                  : `Data based on ${results.sourceCount} real market rates`}
              </div>
            )}

            {/* Main Results Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.yourRate}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{results.hourly}€</div>
                  <div className="text-sm text-gray-600">{t.perHour}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-600">
                  <Calculator className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-purple-600 mb-1">{results.daily}€</div>
                  <div className="text-sm text-purple-600 font-medium">{t.perDay}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{results.monthly.toLocaleString()}€</div>
                  <div className="text-sm text-gray-600">{t.perMonth}</div>
                </div>
              </div>

              {/* Market Comparison */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  {t.marketComparison}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32">{t.marketMin}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-400 h-3 rounded-full"
                        style={{ width: `${(results.market.min / results.market.max) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-24 text-right">{results.market.min}€/j</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32">{t.marketAvg}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-400 h-3 rounded-full"
                        style={{ width: `${(results.market.avg / results.market.max) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-24 text-right">{results.market.avg}€/j</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32">{t.yourRate}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                        style={{ width: `${(results.daily / results.market.max) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-24 text-right">{results.daily}€/j</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32">{t.marketMax}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className="bg-green-400 h-3 rounded-full w-full" />
                    </div>
                    <span className="text-sm font-bold w-24 text-right">{results.market.max}€/j</span>
                  </div>
                </div>
              </div>

              {/* Rate Breakdown */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">{t.rateBreakdown}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.baseRate}</span>
                    <span className="font-medium">{results.breakdown.base}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.experienceBonus}</span>
                    <span className="font-medium text-green-600">+{results.breakdown.experience}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.skillsBonus}</span>
                    <span className="font-medium text-green-600">+{results.breakdown.skills}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.locationAdjustment}</span>
                    <span className={`font-medium ${results.breakdown.location >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.breakdown.location >= 0 ? '+' : ''}{results.breakdown.location}€
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-purple-600">
                    <span className="font-bold text-purple-600">{t.recommendation}</span>
                    <span className="font-bold text-purple-600">{results.daily}€/jour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                {t.insights}
              </h4>
              <div className="space-y-4">
                {getInsights().map((insight, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-purple-50 rounded-lg">
                    <span className="text-2xl">{insight.icon}</span>
                    <p className="text-gray-700">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setStep(1);
                  setResults(null);
                  setFormData({
                    profession: '',
                    location: 'france',
                    experience: '',
                    skills: [],
                    workType: 'freelance'
                  });
                }}
                className="flex-1 border-2 border-purple-600 text-purple-600 py-4 rounded-lg font-medium hover:bg-purple-50 transition-all"
              >
                {t.newCalculation}
              </button>
              <button
                onClick={() => alert(language === 'fr' ? 'Fonctionnalité d\'export à venir !' : 'Export feature coming soon!')}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t.exportPDF}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-600 text-sm">
        <p>
          {language === 'fr' 
            ? '💡 Les tarifs sont basés sur des données de marché réelles et ajustés selon votre profil.'
            : '💡 Rates are based on real market data and adjusted according to your profile.'}
        </p>
      </div>
    </div>
  );
};

export default PricingCalculator;