import { useState } from "react";
import { Globe, Moon, Sun, Calculator, FileText, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnifiedHeader = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  onLogoClick,
  onNavigateToCalculator,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    {
      label: language === "fr" ? "Calculateur" : "Calculator",
      path: "/calculator",
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      label: language === "fr" ? "Devis" : "Quote",
      path: "/generateur-devis-freelance",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const handleNavigate = (path) => {
    if (path === "/calculator" && onNavigateToCalculator) {
      onNavigateToCalculator();
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
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
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                PricingPro
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === "fr"
                  ? "Outils pour freelances"
                  : "Tools for freelancers"}
              </p>
            </div>
          </button>

          {/* Actions à droite */}
          <div className="flex items-center gap-2">
            {/* Navigation Desktop (uniquement visible sur ordi) */}
            <nav className="hidden md:flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-4 mr-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Dark Mode Toggle (visible partout) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Language Toggle (visible partout) */}
            <button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium text-sm">
                {language === "fr" ? "EN" : "FR"}
              </span>
            </button>

            {/* BOUTON BURGER (uniquement sur mobile) */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* PANNEAU MOBILE (s'affiche seulement si isMenuOpen est vrai) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4 animate-in slide-in-from-top duration-300">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 rounded-xl transition-all"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default UnifiedHeader;
