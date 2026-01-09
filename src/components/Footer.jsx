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
      language === "fr" ? "Outils pour freelances" : "Tools for freelancers",
    subTagline:
      language === "fr"
        ? "Calculez votre tarif basé sur des données réelles."
        : "Calculate your rate based on real market data.",
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

  // URLs légales
  const legalUrls = {
    legal: language === "fr" ? "/mentions-legales" : "/mentions-legales-en",
    privacy: language === "fr" ? "/confidentialite" : "/confidentialite-en",
  };

  // Fonction pour remonter en haut de page au clic
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Colonne 1 : BRANDING */}
          <div className="col-span-1 space-y-4">
            <Link
              to="/"
              onClick={handleScrollTop}
              className="flex items-center gap-3 group"
            >
              {/* Le Logo */}
              <img
                src="/logo-square.png"
                alt="Logo PricingPro"
                className="w-10 h-10 rounded-xl shadow-sm object-contain"
              />
              {/* Le Texte */}
              <div className="text-left">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  PricingPro
                </h3>
                <p className="text-xs text-gray-400">{t.tagline}</p>
              </div>
            </Link>

            {/* Sous-titre descriptif */}
            <p className="text-sm text-gray-500 mt-2 max-w-sm md:max-w-[220px] leading-relaxed">
              {t.subTagline}
            </p>
          </div>

          {/* Colonne 2 : Navigation (Liens directs sans #) */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={handleScrollTop}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/calculator"
                  onClick={handleScrollTop}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.calculator}
                </Link>
              </li>
              <li>
                <Link
                  to="/sources"
                  onClick={handleScrollTop}
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
                    onClick={handleScrollTop}
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
                  onClick={handleScrollTop}
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
