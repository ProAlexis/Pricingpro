import {
  FileText,
  CheckCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

const GenerateurDevis = ({ language = "fr" }) => {
  const navigate = useNavigate();

  const t = {
    fr: {
      badge: "Outil de facturation freelance",
      h1: "Générateur de Devis Professionnel",
      p: "Créez, personnalisez et téléchargez vos devis en PDF gratuitement. Un outil pensé pour les freelances qui veulent être payés au juste prix.",
      cta: "Estimer mon tarif pour créer le devis",
      feature1Title: "Conforme 2026",
      feature1Desc:
        "Mentions légales obligatoires (SIRET, TVA, EI) incluses automatiquement.",
      feature2Title: "Professionnel",
      feature2Desc:
        "Un rendu PDF épuré et moderne qui rassure vos clients et facilite la signature.",
      feature3Title: "Instantané",
      feature3Desc:
        "Générez votre devis en 2 minutes. Vos informations sont mémorisées.",
      seoTitle: "Comment faire un devis freelance en 2026 ?",
      seoText1:
        "La création d'un devis est une étape cruciale. Ce document n'est pas seulement une proposition commerciale, c'est un contrat juridique qui vous protège.",
      seoSubtitle: "Les mentions obligatoires sur votre devis",
      li1: "Vos coordonnées et votre numéro de SIRET.",
      li2: "La mention 'EI' si vous êtes en auto-entreprise.",
      li3: "Le détail de la mission et votre TJM.",
      quote:
        "Avec PricingPro, nous automatisons ces mentions selon votre statut (Auto-entrepreneur, SASU, EURL) pour une conformité totale.",
    },
    en: {
      badge: "Freelance invoicing tool",
      h1: "Professional Quote Generator",
      p: "Create, customize and download your quotes in PDF for free. Designed for freelancers who want to be paid fairly.",
      cta: "Estimate my rate to create the quote",
      feature1Title: "2026 Compliant",
      feature1Desc:
        "Mandatory legal mentions (VAT, Business ID) included automatically.",
      feature2Title: "Professional",
      feature2Desc:
        "A clean PDF layout that reassures your clients and speeds up signing.",
      feature3Title: "Instant",
      feature3Desc:
        "Generate your quote in 2 minutes. Your information is saved.",
      seoTitle: "How to create a freelance quote in 2026?",
      seoText1:
        "Creating a quote is a crucial step. It is not just a commercial proposal, it is a legal contract that protects you.",
      seoSubtitle: "Mandatory mentions on your quote",
      li1: "Your contact details and Business ID.",
      li2: "VAT number (if applicable).",
      li3: "Mission details and your daily rate.",
      quote:
        "With PricingPro, we automate these mentions based on your legal status for total compliance.",
    },
  };

  const labels = t[language] || t.fr;

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: labels.feature1Title,
      desc: labels.feature1Desc,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      title: labels.feature2Title,
      desc: labels.feature2Desc,
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: labels.feature3Title,
      desc: labels.feature3Desc,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-10">
      {/* SEO Meta Tags */}
      <SEO
        title={language === 'fr'
          ? "Générateur de Devis Freelance Gratuit | PDF Professionnel - PricingPro"
          : "Free Freelance Quote Generator | Professional PDF - PricingPro"}
        description={language === 'fr'
          ? "Créez, personnalisez et téléchargez vos devis en PDF gratuitement. Conforme 2026, professionnel et instantané pour freelances."
          : "Create, customize and download your quotes in PDF for free. 2026 compliant, professional and instant for freelancers."}
        canonical="https://pricingpro.fr/generateur-devis-freelance"
        lang={language}
      />

      {/* --- HERO SECTION --- */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium text-sm mb-6">
          <FileText className="w-4 h-4" />
          {labels.badge}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          {language === "fr" ? "Générateur de " : ""}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {language === "fr"
              ? "Devis Professionnel"
              : "Professional Quote Generator"}
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          {labels.p}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/calculator")}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
          >
            {labels.cta} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-800">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SEO CONTENT SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {labels.seoTitle}
        </h2>

        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>{labels.seoText1}</p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-4">
            {labels.seoSubtitle}
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>{labels.li1}</li>
            <li>{labels.li2}</li>
            <li>{labels.li3}</li>
          </ul>

          <p className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border-l-4 border-purple-600 italic">
            "{labels.quote}"
          </p>
        </div>
      </section>
    </div>
  );
};

export default GenerateurDevis;
