import { useState } from "react";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Info,
  ChevronDown,
  ChevronUp,
  Target,
} from "lucide-react";

const AnnualIncomeSimulator = ({ dailyRate, legalStatus, language = "fr" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customDays, setCustomDays] = useState(200);

  const translations = {
    fr: {
      title: "Simulateur de Revenus Annuels",
      subtitle: "Estimez vos revenus selon différents scénarios de facturation",
      scenario: "Scénario",
      workDays: "Jours facturés",
      grossRevenue: "CA Brut",
      netRevenue: "Revenu Net",
      perMonth: "/mois",
      perYear: "/an",
      custom: "Personnalisé",
      customDays: "Nombre de jours facturés/an",
      charges: "Charges sociales",
      scenarios: {
        intensive: {
          name: "Intensif",
          desc: "20j/mois - Aucune inter-contrat",
          days: 240,
        },
        standard: {
          name: "Standard",
          desc: "17j/mois - Peu d'inter-contrats",
          days: 200,
        },
        flexible: {
          name: "Flexible",
          desc: "15j/mois - Inter-contrats fréquents",
          days: 180,
        },
        partTime: {
          name: "Mi-temps",
          desc: "10j/mois - Activité réduite",
          days: 120,
        },
      },
      info: "Ces estimations sont basées sur votre statut juridique et incluent les charges sociales moyennes.",
      note: "💡 Conseil : La plupart des freelances facturent entre 15-17j/mois en moyenne.",
      breakdown: "Détail des revenus",
      showDetails: "Voir le détail",
      hideDetails: "Masquer le détail",
    },
    en: {
      title: "Annual Income Simulator",
      subtitle: "Estimate your income based on different billing scenarios",
      scenario: "Scenario",
      workDays: "Billed days",
      grossRevenue: "Gross Revenue",
      netRevenue: "Net Income",
      perMonth: "/month",
      perYear: "/year",
      custom: "Custom",
      customDays: "Number of billed days/year",
      charges: "Social contributions",
      scenarios: {
        intensive: {
          name: "Intensive",
          desc: "20d/month - No gaps",
          days: 240,
        },
        standard: {
          name: "Standard",
          desc: "17d/month - Few gaps",
          days: 200,
        },
        flexible: {
          name: "Flexible",
          desc: "15d/month - Frequent gaps",
          days: 180,
        },
        partTime: {
          name: "Part-time",
          desc: "10d/month - Reduced activity",
          days: 120,
        },
      },
      info: "These estimates are based on your legal status and include average social contributions.",
      note: "💡 Tip: Most freelancers bill between 15-17 days/month on average.",
      breakdown: "Income breakdown",
      showDetails: "Show details",
      hideDetails: "Hide details",
    },
  };

  const t = translations[language];

  // Taux de charges selon le statut
  const chargeRates = {
    "auto-entrepreneur": 0.212,
    sasu: 0.54,
    eurl: 0.45,
    portage: 0.49,
  };

  const chargeRate = chargeRates[legalStatus] || 0.22;

  const calculateRevenue = (days) => {
    const grossAnnual = dailyRate * days;
    const charges = Math.round(grossAnnual * chargeRate);
    const netAnnual = grossAnnual - charges;
    const netMonthly = Math.round(netAnnual / 12);

    return {
      days,
      grossAnnual,
      charges,
      netAnnual,
      netMonthly,
    };
  };

  const scenarios = [
    {
      id: "intensive",
      ...t.scenarios.intensive,
      ...calculateRevenue(t.scenarios.intensive.days),
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "standard",
      ...t.scenarios.standard,
      ...calculateRevenue(t.scenarios.standard.days),
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "flexible",
      ...t.scenarios.flexible,
      ...calculateRevenue(t.scenarios.flexible.days),
      color: "from-green-600 to-emerald-600",
    },
    {
      id: "partTime",
      ...t.scenarios.partTime,
      ...calculateRevenue(t.scenarios.partTime.days),
      color: "from-orange-600 to-yellow-600",
    },
  ];

  const customScenario = calculateRevenue(customDays);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all group"
          >
            {/* Gradient header */}
            <div
              className={`bg-gradient-to-r ${scenario.color} text-white p-4`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold">{scenario.name}</h4>
                <div className="flex items-center gap-1 text-sm opacity-90">
                  <Calendar className="w-4 h-4" />
                  <span>{scenario.days}j</span>
                </div>
              </div>
              <p className="text-sm opacity-90">{scenario.desc}</p>
            </div>

            {/* Revenue details */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-3">
                {/* Net Monthly */}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t.netRevenue} {t.perMonth}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(scenario.netMonthly)}
                  </p>
                </div>

                {/* Net Annual */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t.netRevenue} {t.perYear}
                  </p>
                  <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    {formatCurrency(scenario.netAnnual)}
                  </p>
                </div>

                {/* Gross Annual (collapsible) */}
                {isExpanded && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        {t.grossRevenue}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(scenario.grossAnnual)}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600 dark:text-red-400">
                      <span>{t.charges}</span>
                      <span className="font-semibold">
                        -{formatCurrency(scenario.charges)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle details button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            {t.hideDetails}
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            {t.showDetails}
          </>
        )}
      </button>

      {/* Custom Scenario */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            {t.custom}
          </h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.customDays}
            </label>
            <input
              type="range"
              min="50"
              max="250"
              step="5"
              value={customDays}
              onChange={(e) => setCustomDays(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>50j</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {customDays} jours
              </span>
              <span>250j</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {t.netRevenue} {t.perMonth}
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(customScenario.netMonthly)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {t.netRevenue} {t.perYear}
              </p>
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {formatCurrency(customScenario.netAnnual)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info boxes */}
      <div className="space-y-3">
        <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold mb-1">{t.info}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {legalStatus === "auto-entrepreneur" && "~22% de charges"}
              {legalStatus === "sasu" &&
                "~54% de charges (cotisations + salaire)"}
              {legalStatus === "eurl" && "~45% de charges TNS"}
              {legalStatus === "portage" &&
                "~49% tout inclus (charges + frais)"}
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <span className="text-2xl flex-shrink-0">💡</span>
          <p className="text-sm text-gray-700 dark:text-gray-300">{t.note}</p>
        </div>
      </div>
    </div>
  );
};

export default AnnualIncomeSimulator;
