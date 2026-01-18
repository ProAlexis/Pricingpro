import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Award,
  MapPin,
  Briefcase,
  ArrowRight,
  Calendar,
  Calculator as CalculatorIcon,
} from "lucide-react";
import UnifiedHeader from "../components/UnifiedHeader";
import SEO from "../components/SEO";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ProfessionPage = ({
  profession,
  professionKey,
  initialLanguage = "fr",
}) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [trendData, setTrendData] = useState(null);
  const [loadingTrend, setLoadingTrend] = useState(true);
  const [chartFilters, setChartFilters] = useState({
    location: "France",
    experience: "Intermédiaire (2-5 ans)",
  });

  const navigate = useNavigate();

  // Get language-specific data
  const data = profession[language];
  const slug = profession.slug[language];

  // Gestion du Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Gestion du changement de langue
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // Redirect to the URL for the new language
    const newSlug = profession.slug[newLang];
    navigate(`/${newSlug}`);
  };

  // API: get-rate-trends
  useEffect(() => {
    const fetchTrends = async () => {
      setLoadingTrend(true);
      try {
        const params = new URLSearchParams({
          profession: professionKey,
          location: chartFilters.location,
          experience_level: chartFilters.experience,
          months: 6,
        });

        const response = await fetch(`/api/get-rate-trends?${params}`);
        const result = await response.json();

        // 🔥 SÉCURITÉ : On vérifie qu'on a assez de recul temporel
        if (result.trend && result.trend.length >= 2) {
          const firstDate = new Date(result.trend[0].date).getTime();
          const lastDate = new Date(
            result.trend[result.trend.length - 1].date,
          ).getTime();

          // Si les dates sont différentes (au moins 15 jours d'écart)
          const daysDiff = (lastDate - firstDate) / (1000 * 60 * 60 * 24);

          if (daysDiff >= 15) {
            // ✅ On a de vraies données historiques
            setTrendData(data);
          } else {
            // ❌ Pas assez d'écart temporel
            setTrendData({ trend: [], evolution: null });
          }
        } else {
          // ❌ Pas assez de points de données
          setTrendData({ trend: [], evolution: null });
        }
      } catch (err) {
        console.error("Erreur fetching trends:", err);
        setTrendData({ trend: [], evolution: null });
      } finally {
        setLoadingTrend(false);
      }
    };

    fetchTrends();
  }, [professionKey, chartFilters]);

  // SEO: Update page title and meta
  useEffect(() => {
    document.title = data.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", data.metaDescription);
    }

    // Add/update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://pricingpro.fr/${slug}`);

    // Schema.org markup
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.h1,
      description: data.metaDescription,
      inLanguage: language,
      author: {
        "@type": "Organization",
        name: "PricingPro",
      },
      publisher: {
        "@type": "Organization",
        name: "PricingPro",
        logo: {
          "@type": "ImageObject",
          url: "https://pricingpro.fr/logo.png",
        },
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };

    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.text = JSON.stringify(schema);
    scriptTag.id = "profession-schema";

    // Remove old schema if exists
    const oldSchema = document.getElementById("profession-schema");
    if (oldSchema) {
      document.head.removeChild(oldSchema);
    }

    document.head.appendChild(scriptTag);

    return () => {
      const schemaToRemove = document.getElementById("profession-schema");
      if (schemaToRemove) {
        document.head.removeChild(schemaToRemove);
      }
    };
  }, [slug, data.title, data.metaDescription, data.h1, language]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const t = {
    home: language === "fr" ? "Accueil" : "Home",
    calculateCTA:
      language === "fr"
        ? "Calculer mon tarif personnalisé"
        : "Calculate my personalized rate",
    avgRatesTitle:
      language === "fr" ? "Tarif moyen en 2026" : "Average rate in 2026",
    hourlyRate: language === "fr" ? "Tarif Horaire" : "Hourly Rate",
    dailyRate: language === "fr" ? "Tarif Journalier (TJM)" : "Daily Rate",
    monthlyRate: language === "fr" ? "Tarif Mensuel" : "Monthly Rate",
    dataNote:
      language === "fr"
        ? "💡 Données 2026 : Ces tarifs sont basés sur l'analyse de 3500+ missions réelles et rapports officiels (Malt, Stack Overflow, Glassdoor, Upwork et données publiques institutionnelles)."
        : "💡 2026 Data: These rates are based on the analysis of 3,500+ real freelance missions and official reports (Malt, Stack Overflow, Glassdoor, Upwork, and institutional public data).",
    experienceTitle:
      language === "fr" ? "Tarif selon l'expérience" : "Rate by experience",
    locationTitle:
      language === "fr" ? "Tarif selon la localisation" : "Rate by location",
    skillsTitle:
      language === "fr"
        ? "Compétences qui paient le plus"
        : "Top-paying skills",
    skillBonus:
      language === "fr"
        ? (bonus) => `Augmente le TJM de ${bonus}€ en moyenne`
        : (bonus) => `Increases daily rate by €${bonus} on average`,
    negotiationTitle:
      language === "fr"
        ? "💰 Comment négocier votre tarif"
        : "💰 How to negotiate your rate",
    faqTitle:
      language === "fr"
        ? "❓ Questions fréquentes"
        : "❓ Frequently asked questions",
    relatedTitle: language === "fr" ? "Voir aussi" : "See also",
    avgRate: language === "fr" ? "TJM moyen" : "Average daily rate",
    finalCTATitle:
      language === "fr"
        ? "Calculez votre tarif personnalisé"
        : "Calculate your personalized rate",
    finalCTASubtitle:
      language === "fr"
        ? "Obtenez un tarif précis basé sur votre expérience, vos compétences et votre localisation"
        : "Get an accurate rate based on your experience, skills, and location",
    finalCTAButton:
      language === "fr"
        ? "Calculer maintenant (Gratuit)"
        : "Calculate now (Free)",
    perDay: language === "fr" ? "/jour" : "/day",
    perMonth: language === "fr" ? "/mois" : "/month",
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${data.name} Freelance`,
    description: data.metaDescription,
    url: `https://pricingpro.fr/${slug}`,
    priceRange: `${data.avgRates.daily - 100}-${data.avgRates.daily + 100}€`,
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    offers: {
      "@type": "Offer",
      price: data.avgRates.daily,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: data.avgRates.daily,
        priceCurrency: "EUR",
        unitText: "DAY",
      },
    },
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark" : ""} bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}
    >
      {/* SEO Meta Tags */}
      <SEO
        title={data.title}
        description={data.metaDescription}
        canonical={`https://pricingpro.fr/${slug}`}
        structuredData={structuredData}
        lang={language}
      />

      {/* Header unifié avec language switcher actif */}
      <UnifiedHeader
        language={language}
        setLanguage={handleLanguageChange}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogoClick={handleLogoClick}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-purple-600">
            {t.home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{data.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {data.h1}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {data.intro}
          </p>

          {/* CTA Button */}
          <Link
            to="/#calculator"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all"
          >
            <CalculatorIcon className="w-6 h-6" />
            {t.calculateCTA}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Average Rates Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            {t.avgRatesTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t.hourlyRate}
              </p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {data.avgRates.hourly}€<span className="text-lg">/h</span>
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t.dailyRate}
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {data.avgRates.daily}€
                <span className="text-lg">{t.perDay}</span>
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t.monthlyRate}
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {data.avgRates.monthly}€
                <span className="text-lg">{t.perMonth}</span>
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t.dataNote}
            </p>
          </div>
        </div>

        {/* --- Section Tendances (GRAPHIQUE) --- */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                {language === "fr" ? "Tendances du marché" : "Market Trends"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {language === "fr"
                  ? "Évolution réelle des tarifs constatés"
                  : "Real-time evolution of market rates"}
              </p>
            </div>

            {/* Badge d'évolution dynamique calculé par ton API */}
            {trendData?.evolution && (
              <div
                className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                  trendData.evolution.direction === "up"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                }`}
              >
                <span className="text-xl font-bold">
                  {trendData.evolution.direction === "up" ? "↑" : "↓"}{" "}
                  {trendData.evolution.percentage}%
                </span>
                <span className="text-xs uppercase font-bold tracking-wider">
                  6 {language === "fr" ? "mois" : "months"}
                </span>
              </div>
            )}
          </div>

          <div className="h-[350px] w-full">
            {loadingTrend ? (
              <div className="h-full flex items-center justify-center text-gray-400 animate-pulse italic">
                {language === "fr"
                  ? "Analyse des données en cours..."
                  : "Analyzing market data..."}
              </div>
            ) : trendData?.trend?.length > 0 ? (
              /* Si on a des données, on affiche le graphique Recharts */
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData.trend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke={darkMode ? "#9ca3af" : "#6b7280"}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(str) =>
                      new Date(str).toLocaleDateString(
                        language === "fr" ? "fr-FR" : "en-US",
                        { month: "short" },
                      )
                    }
                  />
                  <YAxis
                    stroke={darkMode ? "#9ca3af" : "#6b7280"}
                    tick={{ fontSize: 12 }}
                    domain={["auto", "auto"]}
                    unit="€"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                    itemStyle={{ color: "#6366f1", fontWeight: "bold" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgRate"
                    stroke="#6366f1"
                    strokeWidth={4}
                    dot={{
                      r: 4,
                      fill: "#6366f1",
                      strokeWidth: 2,
                      stroke: darkMode ? "#111827" : "#fff",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              /* --- ICI LE DESIGN IDENTIQUE AU CALCULATEUR --- */
              <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {language === "fr"
                    ? "Pas encore d'historique disponible"
                    : "No historical data available yet"}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                  {language === "fr"
                    ? "Les données d'évolution seront disponibles après plusieurs mises à jour hebdomadaires."
                    : "Evolution data will be available after several weekly updates."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Experience Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-600" />
            {t.experienceTitle}
          </h2>

          <div className="space-y-4">
            {data.experienceBreakdown.map((level, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {level.level}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {level.years}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {level.tjm}€
                  </p>
                  <p className="text-sm text-gray-500">{t.perDay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-purple-600" />
            {t.locationTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {data.locationBreakdown.map((loc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {loc.flag} {loc.country}
                  </h3>
                </div>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {loc.tjm}€/j
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-purple-600" />
            {t.skillsTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {data.topSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                    +{skill.bonus}€
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.skillBonus(skill.bonus)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Negotiation Tips */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-200 dark:border-purple-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t.negotiationTitle}
          </h2>

          <div className="space-y-4">
            {data.negotiationTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t.faqTitle}
          </h2>

          <div className="space-y-6">
            {data.faq.map((item, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Professions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t.relatedTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {data.relatedProfessions.map((related, idx) => (
              <Link
                key={idx}
                to={related.slug}
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-400 dark:hover:border-purple-600 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 mb-1">
                  {related.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.avgRate} : {related.avgTjm}€{t.perDay}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.finalCTATitle}
          </h2>
          <p className="text-purple-100 mb-6 text-lg">{t.finalCTASubtitle}</p>
          <Link
            to="/#calculator"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all"
          >
            <CalculatorIcon className="w-6 h-6" />
            {t.finalCTAButton}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionPage;
