import { useState, useEffect } from "react";
import {
  History,
  Trash2,
  TrendingUp,
  Calendar,
  X,
  ArrowRight,
} from "lucide-react";

const CalculationHistory = ({ language, onLoadCalculation }) => {
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const translations = {
    fr: {
      title: "Historique de mes calculs",
      noHistory: "Aucun calcul sauvegardé",
      noHistoryDesc: "Vos calculs précédents apparaîtront ici",
      daily: "/jour",
      monthly: "/mois",
      clearAll: "Tout effacer",
      load: "Charger",
      delete: "Supprimer",
      confirmClear: "Êtes-vous sûr de vouloir effacer tout l'historique ?",
      profession: "Profession",
      location: "Localisation",
      experience: "Expérience",
      calculations: "calculs sauvegardés",
    },
    en: {
      title: "Calculation History",
      noHistory: "No saved calculations",
      noHistoryDesc: "Your previous calculations will appear here",
      daily: "/day",
      monthly: "/month",
      clearAll: "Clear all",
      load: "Load",
      delete: "Delete",
      confirmClear: "Are you sure you want to clear all history?",
      profession: "Profession",
      location: "Location",
      experience: "Experience",
      calculations: "saved calculations",
    },
  };

  const t = translations[language];

  // Charger l'historique depuis localStorage
  useEffect(() => {
    loadHistory();
  }, [isOpen]);

  const loadHistory = () => {
    try {
      const savedHistory = localStorage.getItem("pricingpro_history");
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const deleteEntry = (id) => {
    try {
      const updatedHistory = history.filter((entry) => entry.id !== id);
      localStorage.setItem(
        "pricingpro_history",
        JSON.stringify(updatedHistory),
      );
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const clearAllHistory = () => {
    if (window.confirm(t.confirmClear)) {
      try {
        localStorage.removeItem("pricingpro_history");
        setHistory([]);
      } catch (error) {
        console.error("Error clearing history:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProfessionLabel = (value) => {
    const professions = {
      "web-dev": { fr: "Développeur Web", en: "Web Developer" },
      "mobile-dev": { fr: "Développeur Mobile", en: "Mobile Developer" },
      "fullstack-dev": {
        fr: "Développeur Full-Stack",
        en: "Full-Stack Developer",
      },
      "backend-dev": { fr: "Développeur Backend", en: "Backend Developer" },
      "data-analyst": { fr: "Data Analyst", en: "Data Analyst" },
      "data-scientist": { fr: "Data Scientist", en: "Data Scientist" },
      devops: { fr: "DevOps Engineer", en: "DevOps Engineer" },
      "ui-designer": { fr: "Designer UI/UX", en: "UI/UX Designer" },
      "graphic-designer": { fr: "Graphiste", en: "Graphic Designer" },
      copywriter: { fr: "Rédacteur", en: "Copywriter" },
      marketing: { fr: "Consultant Marketing", en: "Marketing Consultant" },
      seo: { fr: "Expert SEO", en: "SEO Expert" },
      "project-manager": { fr: "Chef de Projet", en: "Project Manager" },
      "product-manager": { fr: "Product Manager", en: "Product Manager" },
      consultant: { fr: "Consultant Business", en: "Business Consultant" },
    };
    return professions[value]?.[language] || value;
  };

  const getLocationLabel = (value) => {
    const locations = {
      france: { fr: "France", en: "France" },
      portugal: { fr: "Portugal", en: "Portugal" },
      uk: { fr: "Royaume-Uni", en: "United Kingdom" },
      germany: { fr: "Allemagne", en: "Germany" },
      usa: { fr: "États-Unis", en: "United States" },
    };
    return locations[value]?.[language] || value;
  };

  return (
    <>
      {/* Bouton pour ouvrir l'historique */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center gap-2 group"
      >
        <History className="w-6 h-6" />
        {history.length > 0 && (
          <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {history.length}
          </span>
        )}
      </button>

      {/* Modal d'historique */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="w-6 h-6" />
                <div>
                  <h2 className="text-2xl font-bold">{t.title}</h2>
                  <p className="text-sm opacity-90">
                    {history.length} {t.calculations}
                  </p>
                </div>
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
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t.noHistory}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {t.noHistoryDesc}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(entry.date)}
                        </div>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 transition-colors"
                          title={t.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {t.profession}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {getProfessionLabel(entry.formData.profession)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {t.location}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {getLocationLabel(entry.formData.location)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {t.experience}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {entry.formData.experience}{" "}
                            {language === "fr" ? "ans" : "years"} -{" "}
                            {entry.formData.experienceLevel}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Compétences
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {entry.formData.skills.length > 0
                              ? entry.formData.skills.join(", ")
                              : language === "fr"
                                ? "Aucune"
                                : "None"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {entry.results.daily}€
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {t.daily}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                              {entry.results.monthly}€
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {t.monthly}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onLoadCalculation(entry.results, entry.formData);
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                          {t.load}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {history.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                <button
                  onClick={clearAllHistory}
                  className="w-full px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {t.clearAll}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Exporter aussi la fonction de sauvegarde pour l'utiliser dans Calculator
export const saveCalculationToHistory = (results, formData) => {
  try {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      results,
      formData,
    };

    const savedHistory = localStorage.getItem("pricingpro_history");
    let currentHistory = savedHistory ? JSON.parse(savedHistory) : [];

    currentHistory = [newEntry, ...currentHistory].slice(0, 10);

    localStorage.setItem("pricingpro_history", JSON.stringify(currentHistory));
  } catch (error) {
    console.error("Error saving calculation:", error);
  }
};

export default CalculationHistory;
