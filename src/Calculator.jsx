import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Users, Award, Download, Globe, Calculator as CalculatorIcon, Briefcase, MapPin, Clock, Loader2, X, Database } from 'lucide-react';
import EmailCapture from './components/EmailCapture';

// Composant pour afficher les sources de données
const DataSourceBadge = ({ sourceCount, sources }) => {
  const getSourceIcon = (source) => {
    const icons = {
      'malt': '🟣',
      'glassdoor': '🟢',
      'upwork': '🔵'
    };
    return icons[source] || '📊';
  };

  const getSourceName = (source) => {
    const names = {
      'malt': 'Malt',
      'glassdoor': 'Glassdoor',
      'upwork': 'Upwork'
    };
    return names[source] || source;
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
              ✅ Données vérifiées et fiables
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            <strong className="text-purple-600 dark:text-purple-400">{sourceCount} tarifs réels</strong> analysés depuis plusieurs plateformes professionnelles
          </p>
          <div className="flex flex-wrap gap-2">
            {sources?.map((source, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700"
              >
                <span className="text-lg">{getSourceIcon(source)}</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {getSourceName(source)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Calculator = ({ onBackToHome }) => {
  const [language, setLanguage] = useState('fr');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profession: '',
    location: 'france',
    experience: '',
    experienceLevel: 'mid',
    skills: [],
    workType: 'freelance'
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [skillInput, setSkillInput] = useState('');
  const [professionSearch, setProfessionSearch] = useState('');

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
      experienceLevel: "Niveau d'expérience",
      junior: "Junior (0-2 ans)",
      mid: "Confirmé (3-7 ans)",
      senior: "Senior (8+ ans)",
      workType: "Type de travail",
      freelance: "Freelance",
      employee: "Salarié",
      skills: "Compétences spécifiques",
      addSkill: "Ajouter",
      skillPlaceholder: "Ex: React, TypeScript...",
      searchProfession: "Rechercher une profession...",
      next: "Suivant",
      back: "Retour",
      calculate: "Calculer mes tarifs",
      calculating: "Calcul en cours...",
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
      recommendation: "Recommandation",
      realDataBadge: "Données basées sur {count} tarifs réels du marché",
      apiErrorMsg: "Impossible de récupérer les données du marché. Utilisation de valeurs estimées."
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
      experienceLevel: "Experience level",
      junior: "Junior (0-2 years)",
      mid: "Mid-level (3-7 years)",
      senior: "Senior (8+ years)",
      workType: "Work type",
      freelance: "Freelance",
      employee: "Employee",
      skills: "Specific skills",
      addSkill: "Add",
      skillPlaceholder: "E.g. React, TypeScript...",
      searchProfession: "Search profession...",
      next: "Next",
      back: "Back",
      calculate: "Calculate my rates",
      calculating: "Calculating...",
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
      recommendation: "Recommendation",
      realDataBadge: "Data based on {count} real market rates",
      apiErrorMsg: "Unable to fetch market data. Using estimated values."
    }
  };

  const t = translations[language];

  const professions = [
    { value: 'web-dev', label: { fr: 'Développeur Web', en: 'Web Developer' }, base: 400 },
    { value: 'mobile-dev', label: { fr: 'Développeur Mobile', en: 'Mobile Developer' }, base: 450 },
    { value: 'fullstack-dev', label: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' }, base: 400 },
    { value: 'backend-dev', label: { fr: 'Développeur Backend', en: 'Backend Developer' }, base: 400 },
    { value: 'data-analyst', label: { fr: 'Data Analyst', en: 'Data Analyst' }, base: 500 },
    { value: 'data-scientist', label: { fr: 'Data Scientist', en: 'Data Scientist' }, base: 550 },
    { value: 'devops', label: { fr: 'DevOps Engineer', en: 'DevOps Engineer' }, base: 500 },
    { value: 'ui-designer', label: { fr: 'Designer UI/UX', en: 'UI/UX Designer' }, base: 400 },
    { value: 'graphic-designer', label: { fr: 'Graphiste', en: 'Graphic Designer' }, base: 300 },
    { value: 'copywriter', label: { fr: 'Rédacteur', en: 'Copywriter' }, base: 250 },
    { value: 'marketing', label: { fr: 'Consultant Marketing', en: 'Marketing Consultant' }, base: 450 },
    { value: 'seo', label: { fr: 'Expert SEO', en: 'SEO Expert' }, base: 400 },
    { value: 'project-manager', label: { fr: 'Chef de Projet', en: 'Project Manager' }, base: 500 },
    { value: 'product-manager', label: { fr: 'Product Manager', en: 'Product Manager' }, base: 550 },
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
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:3000/api/get-rates'
        : '/api/get-rates';
      
      const response = await fetch(
        `${apiUrl}?profession=${formData.profession}&location=${formData.location}&experience_level=${formData.experienceLevel}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const marketData = await response.json();

      if (marketData.count > 0) {
        const profession = professions.find(p => p.value === formData.profession);
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
          sourceCount: marketData.count,
          sources: marketData.sources || ['malt', 'glassdoor', 'upwork'],
          cities: marketData.cities || []
        });
      } else {
        fallbackToSimulated();
      }

      setStep(3);
    } catch (error) {
      console.error('Error calculating rates:', error);
      setApiError(t.apiErrorMsg);
      fallbackToSimulated();
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const fallbackToSimulated = () => {
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
      dataSource: 'simulated',
      sources: ['malt', 'glassdoor', 'upwork']
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && formData.skills.length < 10) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  const resetCalculator = () => {
    if (onBackToHome) {
      onBackToHome();
    }
    setStep(1);
    setResults(null);
    setApiError(null);
    setFormData({
      profession: '',
      location: 'france',
      experience: '',
      experienceLevel: 'mid',
      skills: [],
      workType: 'freelance'
    });
  };

  const getInsights = () => {
    if (!results) return [];
    
    const insights = [];
    const professionLabel = professions.find(p => p.value === formData.profession).label[language];
    
    if (formData.experienceLevel === 'junior') {
      insights.push({
        icon: '🚀',
        text: language === 'fr' 
          ? 'En tant que Junior, vous pouvez augmenter vos tarifs de 50-80% en passant Mid-level dans 2-3 ans.'
          : 'As a Junior, you can increase your rates by 50-80% by becoming Mid-level in 2-3 years.'
      });
    } else if (formData.experienceLevel === 'senior') {
      insights.push({
        icon: '⭐',
        text: language === 'fr' 
          ? 'En tant que Senior, vous êtes dans le top 20% du marché. Considérez le consulting ou la formation pour augmenter vos revenus.'
          : 'As a Senior, you\'re in the top 20% of the market. Consider consulting or training to increase your income.'
      });
    }
    
    if (parseInt(formData.experience) < 2 && formData.experienceLevel !== 'junior') {
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
        ? `Les ${professionLabel}s ${formData.experienceLevel === 'junior' ? 'juniors' : formData.experienceLevel === 'senior' ? 'seniors' : 'confirmés'} facturent généralement entre ${results.market.min}€ et ${results.market.max}€/jour.`
        : `${formData.experienceLevel.charAt(0).toUpperCase() + formData.experienceLevel.slice(1)} ${professionLabel}s typically charge between €${results.market.min} and €${results.market.max}/day.`
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={resetCalculator}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.subtitle}</p>
            </div>
          </button>
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{language === 'fr' ? 'EN' : 'FR'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{t.tagline}</h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? 'Obtenez une analyse personnalisée de vos tarifs basée sur le marché réel et votre profil unique.'
                  : 'Get a personalized analysis of your rates based on real market data and your unique profile.'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{t.step1Title}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.experienceLevel}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setFormData({...formData, experienceLevel: 'junior'})}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-sm ${
                        formData.experienceLevel === 'junior'
                          ? 'border-green-600 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t.junior}
                    </button>
                    <button
                      onClick={() => setFormData({...formData, experienceLevel: 'mid'})}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-sm ${
                        formData.experienceLevel === 'mid'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t.mid}
                    </button>
                    <button
                      onClick={() => setFormData({...formData, experienceLevel: 'senior'})}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-sm ${
                        formData.experienceLevel === 'senior'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t.senior}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.profession}
                  </label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({...formData, profession: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.location}
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {locations.map(loc => (
                      <option key={loc.value} value={loc.value}>
                        {loc.label[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.experience}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0-30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.workType}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFormData({...formData, workType: 'freelance'})}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.workType === 'freelance'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 font-medium'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t.freelance}
                    </button>
                    <button
                      onClick={() => setFormData({...formData, workType: 'employee'})}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.workType === 'employee'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 font-medium'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-pink-600 dark:text-pink-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{t.step2Title}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.skills}
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                    {formData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(idx)}
                          className="hover:text-purple-900 dark:hover:text-purple-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t.skillPlaceholder}
                      maxLength={30}
                    />
                    <button
                      onClick={addSkill}
                      disabled={!skillInput.trim() || formData.skills.length >= 10}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {t.addSkill}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {language === 'fr' 
                      ? `${formData.skills.length}/10 compétences`
                      : `${formData.skills.length}/10 skills`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  {t.back}
                </button>
                <button
                  onClick={calculateRates}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.calculating}
                    </>
                  ) : (
                    t.calculate
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && results && (
          <div className="space-y-6">
            {apiError && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-yellow-800 dark:text-yellow-200 text-sm">
                ⚠️ {apiError}
              </div>
            )}

            {/* NOUVEAU : Badge multi-sources */}
            {results.dataSource === 'real' && results.sources && (
              <DataSourceBadge 
                sourceCount={results.sourceCount} 
                sources={results.sources}
              />
            )}

            {/* Main Results Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{t.yourRate}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <Clock className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{results.hourly}€</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.perHour}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                  <CalculatorIcon className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-300 mb-1">{results.daily}€</div>
                  <div className="text-sm text-purple-600 dark:text-purple-300 font-medium">{t.perDay}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <Briefcase className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{results.monthly.toLocaleString()}€</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.perMonth}</div>
                </div>
              </div>

              {/* Market Comparison */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                  {t.marketComparison}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32 text-gray-700 dark:text-gray-300">{t.marketMin}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-red-400 h-3 rounded-full"
                        style={{ width: `${(results.market.min / results.market.max) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-24 text-right text-gray-900 dark:text-white">{results.market.min}€/j</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32 text-gray-700 dark:text-gray-300">{t.marketAvg}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-yellow-400 h-3 rounded-full"
                        style={{ width: `${(results.market.avg / results.market.max) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-24 text-right text-gray-900 dark:text-white">{results.market.avg}€/j</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32 text-gray-700 dark:text-gray-300">{t.yourRate}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                        style={{ width: `${(results.daily / results.market.max) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-24 text-right text-gray-900 dark:text-white">{results.daily}€/j</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32 text-gray-700 dark:text-gray-300">{t.marketMax}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-green-400 h-3 rounded-full w-full" />
                    </div>
                    <span className="text-sm font-bold w-24 text-right text-gray-900 dark:text-white">{results.market.max}€/j</span>
                  </div>
                </div>
              </div>

              {/* Rate Breakdown */}
              <div className="border-t dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.rateBreakdown}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.baseRate}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{results.breakdown.base}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.experienceBonus}</span>
                    <span className="font-medium text-green-600 dark:text-green-400">+{results.breakdown.experience}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.skillsBonus}</span>
                    <span className="font-medium text-green-600 dark:text-green-400">+{results.breakdown.skills}€</span>
                  </div>
                  {results.breakdown.location !== 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t.locationAdjustment}</span>
                      <span className={`font-medium ${results.breakdown.location >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {results.breakdown.location >= 0 ? '+' : ''}{results.breakdown.location}€
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t-2 border-purple-600 dark:border-purple-400">
                    <span className="font-bold text-purple-600 dark:text-purple-400">{t.recommendation}</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{results.daily}€/jour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
			  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
				<Users className="w-5 h-5 text-purple-600 dark:text-purple-300" />
				{t.insights}
			  </h4>
			  <div className="space-y-4">
				{getInsights().map((insight, idx) => (
				  <div key={idx} className="flex gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
					<span className="text-2xl">{insight.icon}</span>
					<p className="text-gray-700 dark:text-gray-300">{insight.text}</p>
				  </div>
				))}
			  </div>
			</div>

			{/* Email Capture */}
			<EmailCapture 
			  results={results}
			  formData={formData}
			  language={language}
			/>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetCalculator}
                className="flex-1 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 py-4 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
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
      <div className="text-center py-8 text-gray-600 dark:text-gray-400 text-sm px-4">
        <p>
          {language === 'fr' 
            ? '💡 Les tarifs sont basés sur des données de marché réelles et ajustés selon votre profil.'
            : '💡 Rates are based on real market data and adjusted according to your profile.'}
        </p>
      </div>
    </div>
  );
};

export default Calculator;