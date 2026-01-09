import { Link } from "react-router-dom";

const Footer = ({ language = "fr" }) => {
  const t = {
    about: language === "fr" ? "À propos" : "About",
    navigation: language === "fr" ? "Navigation" : "Navigation",
    professions: language === "fr" ? "Métiers" : "Professions",
    contact: language === "fr" ? "Contact" : "Contact",
    home: language === "fr" ? "Accueil" : "Home",
    calculator: language === "fr" ? "Calculateur" : "Calculator",
    dataSources: language === "fr" ? "Sources de données" : "Data sources",
    allProfessions:
      language === "fr" ? "Voir tous les métiers →" : "See all professions →",
    legal: language === "fr" ? "Mentions légales" : "Legal notice",
    privacy: language === "fr" ? "Confidentialité" : "Privacy",
    tagline:
      language === "fr"
        ? "Calculez votre tarif freelance"
        : "Calculate your freelance rate",
    copyright:
      language === "fr" ? "Tous droits réservés." : "All rights reserved.",
  };

  // Top 3 professions les plus recherchées
  const topProfessions = [
    {
      name: language === "fr" ? "Développeur Web" : "Web Developer",
      slug: "/tarif-developpeur-web",
    },
    {
      name: "Data Scientist",
      slug: "/tarif-data-scientist",
    },
    {
      name: "Designer UX/UI",
      slug: "/tarif-designer-ux",
    },
  ];

  // URLs légales ANTI-ADBLOCK (pas de mots "legal", "privacy", "policy", "notice")
  const legalUrls = {
    legal: language === "fr" ? "/mentions-legales" : "/mentions-legales-en",
    privacy: language === "fr" ? "/confidentialite" : "/confidentialite-en",
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Colonne 1 : À propos */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">PricingPro</h3>
            <p className="text-sm text-gray-400">{t.tagline}</p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.hash = "";
                  }}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    setTimeout(() => {
                      window.location.hash = "calculator";
                    }, 100);
                  }}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.calculator}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    setTimeout(() => {
                      window.location.hash = "sources";
                    }, 100);
                  }}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.dataSources}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Top 3 Professions + Lien "Voir tous" */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.professions}</h4>
            <ul className="space-y-2 text-sm">
              {topProfessions.map((profession, idx) => (
                <li key={idx}>
                  <Link
                    to={profession.slug}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {profession.name}
                  </Link>
                </li>
              ))}
              {/* Lien "Voir tous les métiers" */}
              <li className="pt-2">
                <Link
                  to="/"
                  onClick={() => {
                    setTimeout(() => {
                      window.location.hash = "professions";
                    }, 100);
                  }}
                  className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                >
                  {t.allProfessions}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact & Légal (URLs ANTI-ADBLOCK) */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.contact}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:contact@pricingpro.fr"
                  className="hover:text-purple-400 transition-colors"
                >
                  contact@pricingpro.fr
                </a>
              </li>
              <li className="pt-4">
                <Link
                  to={legalUrls.legal}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.legal}
                </Link>
              </li>
              <li>
                <Link
                  to={legalUrls.privacy}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} PricingPro. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
