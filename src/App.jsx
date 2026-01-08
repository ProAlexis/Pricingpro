import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

      {/* LE HEADER : Appelé une seule fois ici, il sera présent sur toutes les routes */}
      <UnifiedHeader
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogoClick={() => {
          if (location.pathname === "/") {
            goToHome();
          } else {
            window.location.href = "/";
          }
        }}
      />

      {/* LE CONTENU PRINCIPAL : flex-grow permet de pousser le footer vers le bas */}
      <main className="pt-20 flex-grow">
        <Routes>
          {/* Page principale avec système de hash */}
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
                  <Calculator onBackToHome={goToHome} language={language} />
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
                language={language}
                onBackToHome={() => (window.location.href = "/")}
              />
            }
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

      {/* LE FOOTER : Appelé une seule fois ici, il apparaîtra sur TOUTES les pages */}
      <Footer language={language} />
    </div>
  );
};

export default App;
