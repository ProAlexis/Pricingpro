import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import Calculator from "./Calculator";
import UnifiedHeader from "./components/UnifiedHeader";
import DataSources from "./components/DataSources";
import ScrollToTop from "./components/ScrollToTop";

// Import pages légales
import MentionsLegales from "./pages/MentionsLegales";
import MentionsLegalesEN from "./pages/MentionsLegalesEN";
import Confidentialite from "./pages/Confidentialite";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

// Import pages FR
import DeveloppeurWebFR from "./pages/professions/fr/DeveloppeurWeb";
import DataScientistFR from "./pages/professions/fr/DataScientist";
import DesignerUXFR from "./pages/professions/fr/DesignerUX";
import ConsultantMarketingFR from "./pages/professions/fr/ConsultantMarketing";
import DevOpsFR from "./pages/professions/fr/DevOps";
import DeveloppeurMobileFR from "./pages/professions/fr/DeveloppeurMobile";
import DeveloppeurFullStackFR from "./pages/professions/fr/DeveloppeurFullStack";
import DeveloppeurBackendFR from "./pages/professions/fr/DeveloppeurBackend";
import DataAnalystFR from "./pages/professions/fr/DataAnalyst";
import GraphisteFR from "./pages/professions/fr/Graphiste";
import RedacteurFR from "./pages/professions/fr/Redacteur";
import ExpertSEOFR from "./pages/professions/fr/ExpertSEO";
import ChefDeProjetFR from "./pages/professions/fr/ChefDeProjet";
import ProductManagerFR from "./pages/professions/fr/ProductManager";
import ConsultantBusinessFR from "./pages/professions/fr/ConsultantBusiness";

// Import pages EN
import WebDeveloperEN from "./pages/professions/en/WebDeveloper";
import DataScientistEN from "./pages/professions/en/DataScientist";
import UXDesignerEN from "./pages/professions/en/UXDesigner";
import MarketingConsultantEN from "./pages/professions/en/MarketingConsultant";
import DevOpsEngineerEN from "./pages/professions/en/DevOpsEngineer";
import MobileDeveloperEN from "./pages/professions/en/MobileDeveloper";
import FullStackDeveloperEN from "./pages/professions/en/FullStackDeveloper";
import BackendDeveloperEN from "./pages/professions/en/BackendDeveloper";
import DataAnalystEN from "./pages/professions/en/DataAnalyst";
import GraphicDesignerEN from "./pages/professions/en/GraphicDesigner";
import CopywriterEN from "./pages/professions/en/Copywriter";
import SEOExpertEN from "./pages/professions/en/SEOExpert";
import ProjectManagerEN from "./pages/professions/en/ProjectManager";
import ProductManagerEN from "./pages/professions/en/ProductManager";
import BusinessConsultantEN from "./pages/professions/en/BusinessConsultant";

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

      <Routes>
        {/* Page principale avec système de hash existant */}
        <Route path="/" element={<MainApp />} />

        {/* Pages professions FR */}
        <Route path="/tarif-developpeur-web" element={<DeveloppeurWebFR />} />
        <Route path="/tarif-data-scientist" element={<DataScientistFR />} />
        <Route path="/tarif-designer-ux" element={<DesignerUXFR />} />
        <Route
          path="/tarif-consultant-marketing"
          element={<ConsultantMarketingFR />}
        />
        <Route path="/tarif-devops" element={<DevOpsFR />} />
        <Route
          path="/tarif-developpeur-mobile"
          element={<DeveloppeurMobileFR />}
        />
        <Route
          path="/tarif-developpeur-fullstack"
          element={<DeveloppeurFullStackFR />}
        />
        <Route
          path="/tarif-developpeur-backend"
          element={<DeveloppeurBackendFR />}
        />
        <Route path="/tarif-data-analyst" element={<DataAnalystFR />} />
        <Route path="/tarif-graphiste" element={<GraphisteFR />} />
        <Route path="/tarif-redacteur" element={<RedacteurFR />} />
        <Route path="/tarif-expert-seo" element={<ExpertSEOFR />} />
        <Route path="/tarif-chef-de-projet" element={<ChefDeProjetFR />} />
        <Route path="/tarif-product-manager" element={<ProductManagerFR />} />
        <Route
          path="/tarif-consultant-business"
          element={<ConsultantBusinessFR />}
        />

        {/* Pages professions EN */}
        <Route path="/web-developer-rate" element={<WebDeveloperEN />} />
        <Route path="/data-scientist-rate" element={<DataScientistEN />} />
        <Route path="/ux-designer-rate" element={<UXDesignerEN />} />
        <Route
          path="/marketing-consultant-rate"
          element={<MarketingConsultantEN />}
        />
        <Route path="/devops-rate" element={<DevOpsEngineerEN />} />
        <Route path="/mobile-developer-rate" element={<MobileDeveloperEN />} />
        <Route
          path="/fullstack-developer-rate"
          element={<FullStackDeveloperEN />}
        />
        <Route
          path="/backend-developer-rate"
          element={<BackendDeveloperEN />}
        />
        <Route path="/data-analyst-rate" element={<DataAnalystEN />} />
        <Route path="/graphic-designer-rate" element={<GraphicDesignerEN />} />
        <Route path="/copywriter-rate" element={<CopywriterEN />} />
        <Route path="/seo-expert-rate" element={<SEOExpertEN />} />
        <Route path="/project-manager-rate" element={<ProjectManagerEN />} />
        <Route path="/product-manager-rate" element={<ProductManagerEN />} />
        <Route
          path="/business-consultant-rate"
          element={<BusinessConsultantEN />}
        />

        {/* Pages légales */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/mentions-legales-en" element={<MentionsLegalesEN />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route
          path="/confidentialite-en"
          element={<PolitiqueConfidentialite />}
        />

        {/* 404 - Redirection vers home */}
        <Route path="*" element={<MainApp />} />
      </Routes>
    </>
  );
};

export default App;
