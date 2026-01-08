import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import Calculator from "./Calculator";
import UnifiedHeader from "./components/UnifiedHeader";
import DataSources from "./components/DataSources";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

// Import pages légales
import MentionsLegales from "./pages/MentionsLegales";
import MentionsLegalesEN from "./pages/MentionsLegalesEN";
import Confidentialite from "./pages/Confidentialite";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

// Import pages FR & EN
import ProfessionTemplate from "./pages/ProfessionTemplate";
import GenerateurDevis from "./pages/GenerateurDevis";

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [language, setLanguage] = useState("fr");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const location = useLocation();

  // 1. Gestion du Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // 2. Gestion du bouton "Retour" du navigateur (seulement pour la page principale)
  useEffect(() => {
    // Ne gérer les hash que si on est sur la page principale "/"
    if (location.pathname === "/") {
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
    }
  }, [location.pathname]);

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

  // Composant pour la page principale avec navigation hash
  const MainApp = () => (
    <div
      className={`min-h-screen ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900`}
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

  return (
    <>
      {/* Composant pour gérer le scroll automatique et le reset du title */}
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />

      <Routes>
        {/* Page principale avec système de hash existant */}
        <Route path="/" element={<MainApp />} />
        <Route
          path="/calculator"
          element={
            <div className={darkMode ? "dark" : ""}>
              <UnifiedHeader
                language={language}
                setLanguage={setLanguage}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onLogoClick={() => (window.location.href = "/")}
              />
              <main className="pt-20 bg-white dark:bg-gray-900 min-h-screen">
                <Calculator
                  language={language}
                  onBackToHome={() => (window.location.href = "/")}
                />
              </main>
            </div>
          }
        />

        {/* Générateur de devis */}
        <Route
          path="/generateur-devis-freelance"
          element={
            <div className={darkMode ? "dark" : ""}>
              <UnifiedHeader
                language={language}
                setLanguage={setLanguage}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onLogoClick={() => (window.location.href = "/")}
              />
              <main className="pt-20 bg-white dark:bg-gray-900 min-h-screen">
                <GenerateurDevis language={language} />
              </main>
            </div>
          }
        />

        {/* Pages légales */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/mentions-legales-en" element={<MentionsLegalesEN />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route
          path="/confidentialite-en"
          element={<PolitiqueConfidentialite />}
        />

        {/* Pages Professions */}
        <Route path="/:slug" element={<ProfessionTemplate />} />

        {/* 404 - Redirection vers home */}
        <Route path="*" element={<MainApp />} />
      </Routes>
    </>
  );
};

export default App;
