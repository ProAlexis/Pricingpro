import React from "react";
import { Globe, Moon, Sun, Calculator, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnifiedHeader = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  onLogoClick,
}) => {
  const navigate = useNavigate();

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
              {language === "fr"
                ? "Outils pour freelances"
                : "Tools for freelancers"}
            </p>
          </div>
        </button>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Menu Navigation (Adaptatif Mobile/Desktop) */}
          <nav className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 md:pr-4 mr-1 md:mr-2">
            <button
              onClick={() => navigate("/calculator")}
              className="flex items-center gap-2 px-2 md:px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              title={language === "fr" ? "Calculateur" : "Calculator"}
            >
              <Calculator className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">
                {language === "fr" ? "Calculateur" : "Calculator"}
              </span>
            </button>

            <button
              onClick={() => navigate("/generateur-devis-freelance")}
              className="flex items-center gap-2 px-2 md:px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              title={language === "fr" ? "Devis" : "Quote"}
            >
              <FileText className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">
                {language === "fr" ? "Devis" : "Quote"}
              </span>
            </button>
          </nav>

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
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium text-sm">
              {language === "fr" ? "EN" : "FR"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default UnifiedHeader;
