import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import Calculator from "./Calculator";
import UnifiedHeader from "./components/UnifiedHeader";
import DataSources from "./components/DataSources";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

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

  const [calculatorKey, setCalculatorKey] = useState(0);

  const navigate = useNavigate();
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

  // 2. Gestion du bouton "Retour" et synchronisation de l'URL
  useEffect(() => {
    if (location.pathname === "/calculator") {
      setCurrentPage("calculator");
    } else if (location.pathname === "/sources") {
      setCurrentPage("sources");
    } else if (location.pathname === "/") {
      setCurrentPage("landing");
    }
  }, [location.pathname]);

  // Gestion dynamique de la langue pour le SEO
  useEffect(() => {
    document.documentElement.lang = language; // Change <html lang="fr"> en "en"
    if (language === "en") {
      document.title = "PricingPro - Tools for freelancers";
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          "Calculate your ideal freelance rate based on market data.",
        );
    } else {
      document.title = "PricingPro - Outils pour Freelance";
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          "Découvrez combien facturer en tant que freelance avec PricingPro.",
        );
    }
  }, [language]);

  const goToCalculator = () => {
    navigate("/calculator");
    setCurrentPage("calculator");
    setCalculatorKey((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const goToHome = () => {
    navigate("/");
    setCurrentPage("landing");
    window.scrollTo(0, 0);
  };

  const goToSources = () => {
    navigate("/sources");
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
        onNavigateToCalculator={goToCalculator}
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
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900 transition-colors duration-300`}
    >
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

      {/* HEADER */}
      <UnifiedHeader
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogoClick={goToHome}
        onNavigateToCalculator={goToCalculator}
      />

      {/* CONTENU PRINCIPAL */}
      <main className="pt-20 flex-grow">
        <Routes>
          {/* Page principale */}
          <Route
            path="/"
            element={
              <>
                {currentPage === "landing" && (
                  <LandingPage
                    onStartCalculator={goToCalculator}
                    language={language}
                  />
                )}
                {currentPage === "calculator" && (
                  <Calculator
                    key={calculatorKey}
                    onBackToHome={goToHome}
                    language={language}
                  />
                )}
                {currentPage === "sources" && (
                  <DataSources language={language} />
                )}
              </>
            }
          />

          {/* Route directe Calculator */}
          <Route
            path="/calculator"
            element={
              <Calculator
                key={calculatorKey}
                language={language}
                onBackToHome={goToHome}
              />
            }
          />

          {/* Sources de données */}
          <Route
            path="/sources"
            element={<DataSources language={language} />}
          />

          {/* Générateur de devis */}
          <Route
            path="/generateur-devis-freelance"
            element={<GenerateurDevis language={language} />}
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

          {/* 404 */}
          <Route
            path="*"
            element={
              <LandingPage
                onStartCalculator={goToCalculator}
                language={language}
              />
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer language={language} />
    </div>
  );
};

export default App;
