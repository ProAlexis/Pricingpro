import { useState } from "react";
import { GitCompare, TrendingUp, X, Plus, ArrowRight } from "lucide-react";

const ProfessionComparison = ({
  currentFormData,
  onCompare,
  language = "fr",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comparisons, setComparisons] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState("");

  const translations = {
    fr: {
      title: "Comparer avec d'autres professions",
      subtitle: "Découvrez comment vos tarifs se comparent à d'autres métiers",
      addProfession: "Ajouter une profession",
      compare: "Comparer",
      close: "Fermer",
      selectProfession: "Sélectionnez une profession",
      daily: "/jour",
      monthly: "/mois",
      difference: "Différence",
      higher: "Plus élevé",
      lower: "Plus bas",
      same: "Identique",
      remove: "Retirer",
      currentProfession: "Votre profession actuelle",
      noComparison: "Ajoutez des professions pour comparer les tarifs",
      maxComparisons: "Maximum 3 comparaisons",
    },
    en: {
      title: "Compare with other professions",
      subtitle: "Discover how your rates compare to other professions",
      addProfession: "Add profession",
      compare: "Compare",
      close: "Close",
      selectProfession: "Select a profession",
      daily: "/day",
      monthly: "/month",
      difference: "Difference",
      higher: "Higher",
      lower: "Lower",
      same: "Same",
      remove: "Remove",
      currentProfession: "Your current profession",
      noComparison: "Add professions to compare rates",
      maxComparisons: "Maximum 3 comparisons",
    },
  };

  const t = translations[language];

  const professions = [
    {
      value: "web-dev",
      label: { fr: "Développeur Web", en: "Web Developer" },
      base: 400,
    },
    {
      value: "mobile-dev",
      label: { fr: "Développeur Mobile", en: "Mobile Developer" },
      base: 450,
    },
    {
      value: "fullstack-dev",
      label: { fr: "Développeur Full-Stack", en: "Full-Stack Developer" },
      base: 400,
    },
    {
      value: "backend-dev",
      label: { fr: "Développeur Backend", en: "Backend Developer" },
      base: 400,
    },
    {
      value: "data-analyst",
      label: { fr: "Data Analyst", en: "Data Analyst" },
      base: 500,
    },
    {
      value: "data-scientist",
      label: { fr: "Data Scientist", en: "Data Scientist" },
      base: 550,
    },
    {
      value: "devops",
      label: { fr: "DevOps Engineer", en: "DevOps Engineer" },
      base: 500,
    },
    {
      value: "ui-designer",
      label: { fr: "Designer UI/UX", en: "UI/UX Designer" },
      base: 400,
    },
    {
      value: "graphic-designer",
      label: { fr: "Graphiste", en: "Graphic Designer" },
      base: 300,
    },
    {
      value: "copywriter",
      label: { fr: "Rédacteur", en: "Copywriter" },
      base: 250,
    },
    {
      value: "marketing",
      label: { fr: "Consultant Marketing", en: "Marketing Consultant" },
      base: 450,
    },
    { value: "seo", label: { fr: "Expert SEO", en: "SEO Expert" }, base: 400 },
    {
      value: "project-manager",
      label: { fr: "Chef de Projet", en: "Project Manager" },
      base: 500,
    },
    {
      value: "product-manager",
      label: { fr: "Product Manager", en: "Product Manager" },
      base: 550,
    },
    {
      value: "consultant",
      label: { fr: "Consultant Business", en: "Business Consultant" },
      base: 600,
    },
  ];

  // Simuler le calcul d'un tarif pour une profession
  const calculateRateForProfession = (professionValue) => {
    const profession = professions.find((p) => p.value === professionValue);
    if (!profession) return null;

    const baseRate = profession.base;
    const experienceMultiplier =
      1 + parseInt(currentFormData.experience) * 0.08;
    const skillsBonus = currentFormData.skills.length * 30;

    // Appliquer les mêmes multiplicateurs que pour le calcul actuel
    const locationMultipliers = {
      france: 1,
      portugal: 0.7,
      uk: 1.3,
      germany: 1.2,
      usa: 1.5,
    };

    const locationMultiplier =
      locationMultipliers[currentFormData.location] || 1;

    const dailyRate = Math.round(
      (baseRate * experienceMultiplier + skillsBonus) * locationMultiplier,
    );
    const hourlyRate = Math.round(dailyRate / 8);
    const monthlyRate = Math.round(dailyRate * 20);

    return {
      profession: profession.label[language],
      professionValue,
      daily: dailyRate,
      hourly: hourlyRate,
      monthly: monthlyRate,
    };
  };

  const addComparison = () => {
    if (!selectedProfession || comparisons.length >= 3) return;

    // Éviter les doublons
    if (comparisons.some((c) => c.professionValue === selectedProfession)) {
      alert(
        language === "fr"
          ? "Cette profession est déjà dans la comparaison"
          : "This profession is already in the comparison",
      );
      return;
    }

    const newComparison = calculateRateForProfession(selectedProfession);
    if (newComparison) {
      setComparisons([...comparisons, newComparison]);
      setSelectedProfession("");
    }
  };

  const removeComparison = (professionValue) => {
    setComparisons(
      comparisons.filter((c) => c.professionValue !== professionValue),
    );
  };

  // Calculer le tarif actuel
  const currentProfession = professions.find(
    (p) => p.value === currentFormData.profession,
  );
  const currentRate = onCompare
    ? calculateRateForProfession(currentFormData.profession)
    : null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDifference = (comparisonRate, currentRateValue) => {
    const diff = comparisonRate - currentRateValue;
    const percentage = Math.round((diff / currentRateValue) * 100);

    return {
      amount: Math.abs(diff),
      percentage: Math.abs(percentage),
      isHigher: diff > 0,
      isLower: diff < 0,
      isSame: diff === 0,
    };
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all font-medium"
      >
        <GitCompare className="w-5 h-5" />
        {t.title}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
                <p className="text-sm opacity-90">{t.subtitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Add profession form */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="flex gap-3">
                  <select
                    value={selectedProfession}
                    onChange={(e) => setSelectedProfession(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={comparisons.length >= 3}
                  >
                    <option value="">{t.selectProfession}</option>
                    {professions
                      .filter((p) => p.value !== currentFormData.profession)
                      .map((prof) => (
                        <option key={prof.value} value={prof.value}>
                          {prof.label[language]}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={addComparison}
                    disabled={!selectedProfession || comparisons.length >= 3}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    {t.addProfession}
                  </button>
                </div>
                {comparisons.length >= 3 && (
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                    {t.maxComparisons}
                  </p>
                )}
              </div>

              {/* Comparison Grid */}
              {comparisons.length === 0 ? (
                <div className="text-center py-12">
                  <GitCompare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t.noComparison}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Current Profession Card */}
                  {currentRate && (
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm opacity-90">
                          {t.currentProfession}
                        </span>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">
                        {currentRate.profession}
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm opacity-75">
                            {language === "fr"
                              ? "Tarif journalier"
                              : "Daily rate"}
                          </p>
                          <p className="text-3xl font-bold">
                            {formatCurrency(currentRate.daily)}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-white/20">
                          <p className="text-sm opacity-75">
                            {language === "fr"
                              ? "Tarif mensuel"
                              : "Monthly rate"}
                          </p>
                          <p className="text-xl font-semibold">
                            {formatCurrency(currentRate.monthly)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comparison Cards */}
                  {comparisons.map((comparison) => {
                    const diff = currentRate
                      ? getDifference(comparison.daily, currentRate.daily)
                      : null;

                    return (
                      <div
                        key={comparison.professionValue}
                        className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 relative"
                      >
                        <button
                          onClick={() =>
                            removeComparison(comparison.professionValue)
                          }
                          className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pr-8">
                          {comparison.profession}
                        </h3>

                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {language === "fr"
                                ? "Tarif journalier"
                                : "Daily rate"}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {formatCurrency(comparison.daily)}
                            </p>
                          </div>

                          {diff && !diff.isSame && (
                            <div
                              className={`flex items-center gap-2 text-sm ${diff.isHigher ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              <ArrowRight
                                className={`w-4 h-4 ${diff.isHigher ? "rotate-45" : "rotate-[-45deg]"}`}
                              />
                              <span className="font-semibold">
                                {diff.isHigher
                                  ? `+${diff.percentage}%`
                                  : `-${diff.percentage}%`}
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">
                                ({formatCurrency(diff.amount)})
                              </span>
                            </div>
                          )}

                          <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {language === "fr"
                                ? "Tarif mensuel"
                                : "Monthly rate"}
                            </p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                              {formatCurrency(comparison.monthly)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:dark-gray-900">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfessionComparison;
