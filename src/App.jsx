import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Calculator from "./Calculator";
import UnifiedHeader from "./components/UnifiedHeader";
import DataSources from "./components/DataSources";

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [language, setLanguage] = useState("fr");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // 1. Gestion du Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // 2. Gestion du bouton "Retour" du navigateur
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#calculator") {
        setCurrentPage("calculator");
      } else if (hash === "#sources") {
        setCurrentPage("sources");
      } else {
        setCurrentPage("landing");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Vérification au chargement
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const goToCalculator = () => {
    window.location.hash = "#calculator";
    setCurrentPage("calculator");
    window.scrollTo(0, 0);
  };

  const goToHome = () => {
    window.location.hash = "";
    setCurrentPage("landing");
    window.scrollTo(0, 0);
  };

  const goToSources = () => {
    window.location.hash = "#sources";
    setCurrentPage("sources");
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-white dark:bg-gray-900`}
    >
      <UnifiedHeader
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogoClick={goToHome}
      />

      <main className="pt-20">
        {/* Page d'accueil */}
        {currentPage === "landing" && (
          <LandingPage onStartCalculator={goToCalculator} language={language} />
        )}

        {/* Page du Calculateur */}
        {currentPage === "calculator" && (
          <Calculator onBackToHome={goToHome} language={language} />
        )}

        {/* Page des Sources de données */}
        {currentPage === "sources" && <DataSources language={language} />}
      </main>
    </div>
  );
};

export default App;
