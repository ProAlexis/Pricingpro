import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Loader2,
  Calendar,
} from "lucide-react";

const RateTrendChart = ({ formData, results, language = "fr" }) => {
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(6);

  const translations = {
    fr: {
      title: "Évolution du TJM",
      subtitle: "Historique sur",
      months: "mois",
      evolution: "Évolution",
      up: "En hausse",
      down: "En baisse",
      stable: "Stable",
      noData: "Pas encore d'historique disponible",
      noDataDesc:
        "Les données d'évolution seront disponibles après plusieurs mises à jour hebdomadaires.",
      avgRate: "TJM moyen",
      period: "Période",
    },
    en: {
      title: "Rate Evolution",
      subtitle: "History over",
      months: "months",
      evolution: "Evolution",
      up: "Increasing",
      down: "Decreasing",
      stable: "Stable",
      noData: "No historical data available yet",
      noDataDesc:
        "Evolution data will be available after several weekly updates.",
      avgRate: "Average daily rate",
      period: "Period",
    },
  };

  const t = translations[language];

  useEffect(() => {
    if (formData.profession && formData.location && formData.experienceLevel) {
      fetchTrends();
    }
  }, [
    formData.profession,
    formData.location,
    formData.experienceLevel,
    selectedPeriod,
  ]);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const apiUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:3000/api/get-rate-trends"
          : "/api/get-rate-trends";

      const response = await fetch(
        `${apiUrl}?profession=${formData.profession}&location=${formData.location}&experience_level=${formData.experienceLevel}&months=${selectedPeriod}`
      );

      if (response.ok) {
        const data = await response.json();
        setTrendData(data);
      }
    } catch (error) {
      console.error("Error fetching trends:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            {language === "fr"
              ? "Chargement de l'historique..."
              : "Loading history..."}
          </span>
        </div>
      </div>
    );
  }

  if (!trendData || !trendData.trend || trendData.trend.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t.noData}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.noDataDesc}
          </p>
        </div>
      </div>
    );
  }

  const { trend, evolution } = trendData;
  const maxRate = Math.max(...trend.map((d) => d.maxRate));
  const minRate = Math.min(...trend.map((d) => d.minRate));
  const range = maxRate - minRate;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {t.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.subtitle} {selectedPeriod} {t.months}
          </p>
        </div>

        {/* Period selector */}
        <div className="flex gap-2">
          {[3, 6, 12].map((months) => (
            <button
              key={months}
              onClick={() => setSelectedPeriod(months)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === months
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {months}
              {language === "fr" ? "m" : "mo"}
            </button>
          ))}
        </div>
      </div>

      {/* Evolution badge */}
      {evolution && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6 ${
            evolution.direction === "up"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
              : evolution.direction === "down"
              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {evolution.direction === "up" ? (
            <TrendingUp className="w-5 h-5" />
          ) : evolution.direction === "down" ? (
            <TrendingDown className="w-5 h-5" />
          ) : (
            <Minus className="w-5 h-5" />
          )}
          <span className="font-bold">
            {evolution.percentage > 0 ? "+" : ""}
            {evolution.percentage}%
          </span>
          <span className="text-sm">
            {evolution.direction === "up"
              ? t.up
              : evolution.direction === "down"
              ? t.down
              : t.stable}
          </span>
          <span className="text-sm opacity-75">
            ({evolution.oldRate}€ → {evolution.newRate}€)
          </span>
        </div>
      )}

      {/* Simple line chart */}
      <div className="relative h-48 mb-4">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="50"
            x2="800"
            y2="50"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-200 dark:text-gray-700"
            strokeDasharray="5,5"
          />
          <line
            x1="0"
            y1="100"
            x2="800"
            y2="100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-200 dark:text-gray-700"
            strokeDasharray="5,5"
          />
          <line
            x1="0"
            y1="150"
            x2="800"
            y2="150"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-200 dark:text-gray-700"
            strokeDasharray="5,5"
          />

          {/* Line path */}
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-purple-600"
            points={trend
              .map((point, idx) => {
                const x = (idx / (trend.length - 1)) * 800;
                const y = 190 - ((point.avgRate - minRate) / range) * 180;
                return `${x},${y}`;
              })
              .join(" ")}
          />

          {/* Data points */}
          {trend.map((point, idx) => {
            const x = (idx / (trend.length - 1)) * 800;
            const y = 190 - ((point.avgRate - minRate) / range) * 180;
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="5"
                fill="currentColor"
                className="text-purple-600"
              />
            );
          })}
        </svg>
      </div>

      {/* Timeline */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
        <span>
          {new Date(trend[0].date).toLocaleDateString(
            language === "fr" ? "fr-FR" : "en-US",
            { month: "short", year: "numeric" }
          )}
        </span>
        <span>
          {new Date(trend[trend.length - 1].date).toLocaleDateString(
            language === "fr" ? "fr-FR" : "en-US",
            { month: "short", year: "numeric" }
          )}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t dark:border-gray-700">
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {language === "fr" ? "Début" : "Start"}
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {trend[0].avgRate}€
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {language === "fr" ? "Actuel" : "Current"}
          </div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {trend[trend.length - 1].avgRate}€
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {language === "fr" ? "Max" : "Max"}
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {maxRate}€
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateTrendChart;
