import React from "react";
import { TrendingUp, Globe, Moon, Sun } from "lucide-react";

const UnifiedHeader = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  onLogoClick,
}) => {
  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Titre */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo-square.png"
            alt="Logo PricingPro"
            className="w-10 h-10 rounded-xl shadow-lg object-contain"
          />

          <div className="text-left">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              PricingPro
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Calculateur de tarifs intelligent
            </p>
          </div>
        </button>

        {/* Actions à droite */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">
              {language === "fr" ? "EN" : "FR"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default UnifiedHeader;
