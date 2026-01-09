import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TrendingUp,
  Database,
  Calculator as CalculatorIcon,
  CheckCircle,
  Star,
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  FileText,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const LandingPage = ({ onStartCalculator, language }) => {
  const navigate = useNavigate();

  const professionsRef = useRef(null);

  // États pour le bouton "Voir Plus"
  const [showAllProfessions, setShowAllProfessions] = useState(false);
  const PROFESSIONS_LIMIT = 9;

  const translations = {
    fr: {
      hero: {
        title: "Découvrez votre vraie valeur",
        subtitle: "Pilotez votre activité freelance de A à Z",
        description:
          "Accédez à 3500+ tarifs réels pour découvrir la vraie valeur de vos services, créez vos devis personnalisés et téléchargez vos contrats juridiques en quelques clics.",
        cta: "Estimer mon tarif",
        badge: "✨ Accès gratuit · Devis & Contrats inclus · Sans inscription",
      },
      stats: {
        title: "Des données qui font la différence",
        rates: "Tarifs réels",
        countries: "Pays couverts",
        professions: "Professions",
        users: "Données à jour",
      },
      features: {
        title: "Pourquoi PricingPro ?",
        subtitle: "L'outil tout-en-un pour vos tarifs, devis et contrats",
        list: [
          {
            icon: "database",
            title: "Données Réelles",
            description: "3500+ tarifs scrapés en temps réel",
          },
          {
            icon: "fileText",
            title: "Contrats & CGV",
            description:
              "Générez instantanément des contrats de mission et des CGV personnalisés au format Word.",
          },
          {
            icon: "checkCircle",
            title: "Devis",
            description:
              "Éditez vos devis pro avec votre logo et vos infos légales, prêt à être envoyés à vos clients.",
          },
          {
            icon: "globe",
            title: "Multi-Pays",
            description:
              "France, Portugal, UK, Allemagne, USA, Espagne - Tarifs ajustés par ville et région",
          },
          {
            icon: "trending",
            title: "3 niveaux d'expérience",
            description:
              "Junior, Confirmé, Senior - Des recommandations précises selon votre niveau",
          },
          {
            icon: "shield",
            title: "Sans engagement",
            description:
              "Pas de carte bancaire, pas d'inscription. Accédez aux fonctionnalités de base immédiatement",
          },
          {
            icon: "zap",
            title: "Instantané",
            description:
              "Résultats en moins de 3 secondes. Comparez-vous au marché en temps réel",
          },
          {
            icon: "chart",
            title: "Insights personnalisés",
            description:
              "Recommandations concrètes pour augmenter vos tarifs de 20-50%",
          },
          {
            icon: "calculator",
            title: "Optimisation Fiscale",
            description:
              "Simulez vos charges sociales et votre revenu net selon votre statut (Auto-entrepreneur, SASU, EURL).",
          },
        ],
      },
      howItWorks: {
        title: "Comment ça marche ?",
        steps: [
          {
            number: "1",
            title: "Votre profil",
            description:
              "Choisissez votre métier, localisation et niveau d'expérience",
          },
          {
            number: "2",
            title: "Vos compétences",
            description:
              "Ajoutez vos compétences spécifiques pour un calcul précis",
          },
          {
            number: "3",
            title: "Outils & Documents",
            description:
              "Accédez à votre tarif et générez vos devis et contrats personnalisés immédiatement",
          },
        ],
      },
      testimonials: {
        title: "Ils ont augmenté leurs tarifs",
        list: [
          {
            name: "Sophie L.",
            role: "Développeuse Web • Paris",
            content:
              "J'ai découvert que je facturais 30% en dessous du marché. Grâce à PricingPro, j'ai ajusté mes tarifs et mes clients ont accepté sans problème !",
            rating: 5,
          },
          {
            name: "Marc D.",
            role: "Designer UI/UX • Lyon",
            content:
              "L'outil le plus précis que j'ai testé. Les données par ville font vraiment la différence. Je recommande à tous mes collègues freelances.",
            rating: 5,
          },
          {
            name: "Ana R.",
            role: "Data Analyst • Lisbonne",
            content:
              "En tant que freelance au Portugal, difficile de savoir quoi facturer. PricingPro m'a donné la confiance pour négocier avec des clients internationaux.",
            rating: 5,
          },
        ],
      },
      cta: {
        title: "Prêt à découvrir votre vraie valeur ?",
        subtitle:
          "Utilisez l'outil le plus précis pour négocier vos prochains contrats",
        button: "Calculer mes tarifs maintenant",
      },
      about: {
        title: "À propos de PricingPro",
        description:
          "PricingPro est le calculateur de tarifs le plus précis du marché pour les freelances et consultants. Nos données proviennent de milliers de tarifs réels collectés sur les principales plateformes freelance.",
      },
    },
    en: {
      hero: {
        title: "Discover your true worth",
        subtitle: "Manage your freelance business from A to Z",
        description:
          "Access 3500+ real market rates to find your true worth, create professional quotes, and download legal contract templates in just a few clicks.",
        cta: "Estimate my rate",
        badge:
          "✨ Free Access · Quotes & Contracts included · No signup required",
      },
      stats: {
        title: "Data that makes a difference",
        rates: "Real rates",
        countries: "Countries covered",
        professions: "Professions",
        users: "Up-to-date data",
      },
      features: {
        title: "Why PricingPro?",
        subtitle: "The all-in-one tool for your rates, quotes, and contracts",
        list: [
          {
            icon: "database",
            title: "Real data",
            description: "3500+ real-world rates scraped in real-time",
          },
          {
            icon: "fileText",
            title: "Contracts & T&Cs",
            description:
              "Instantly generate customized mission contracts and T&Cs in Word format.",
          },
          {
            icon: "checkCircle",
            title: "Quotes",
            description:
              "Edit professional quotes with your logo and legal info, ready to send to your clients.",
          },
          {
            icon: "globe",
            title: "Multi-Country",
            description:
              "France, Portugal, UK, Germany, USA, Spain - Rates adjusted by city and region",
          },
          {
            icon: "trending",
            title: "3 experience levels",
            description:
              "Junior, Mid-level, Senior - Precise recommendations based on your expertise level",
          },
          {
            icon: "shield",
            title: "No commitment",
            description:
              "No credit card, no signup required. Access core features immediately",
          },
          {
            icon: "zap",
            title: "Instant results",
            description:
              "Get results in under 3 seconds. Compare yourself to the market in real-time",
          },
          {
            icon: "chart",
            title: "Personalized insights",
            description:
              "Concrete recommendations to increase your rates by 20-50%",
          },
          {
            icon: "calculator",
            title: "Tax optimization",
            description:
              "Simulate social charges and net income based on your status (Self-employed, SASU, EURL).",
          },
        ],
      },
      howItWorks: {
        title: "How it works?",
        steps: [
          {
            number: "1",
            title: "Your profile",
            description:
              "Choose your profession, location and experience level",
          },
          {
            number: "2",
            title: "Your skills",
            description: "Add your specific skills for precise calculation",
          },
          {
            number: "3",
            title: "Results & Tools",
            description:
              "Get your rate and instantly generate your professional quotes and contracts",
          },
        ],
      },
      testimonials: {
        title: "They increased their rates",
        list: [
          {
            name: "Sophie L.",
            role: "Web Developer • Paris",
            content:
              "I discovered I was charging 30% below market rate. Thanks to PricingPro, I adjusted my rates and my clients accepted without issue!",
            rating: 5,
          },
          {
            name: "Marc D.",
            role: "UI/UX Designer • Lyon",
            content:
              "The most accurate tool I've tested. City-specific data really makes a difference. I recommend it to all my freelance colleagues.",
            rating: 5,
          },
          {
            name: "Ana R.",
            role: "Data Analyst • Lisbon",
            content:
              "As a freelancer in Portugal, it's hard to know what to charge. PricingPro gave me confidence to negotiate with international clients.",
            rating: 5,
          },
        ],
      },
      cta: {
        title: "Ready to discover your true worth?",
        subtitle: "Use the most accurate tool to negotiate your next contracts",
        button: "Calculate my rates now",
      },
      about: {
        title: "About PricingPro",
        description:
          "PricingPro is the most accurate pricing calculator on the market for freelancers and consultants. Our data comes from thousands of real rates collected from major freelance platforms.",
      },
    },
  };

  const t = translations[language];

  const getIcon = (iconName) => {
    const icons = {
      database: Database,
      globe: Globe,
      trending: TrendingUp,
      shield: Shield,
      zap: Zap,
      chart: BarChart3,
      fileText: FileText,
      calculator: CalculatorIcon,
      checkCircle: CheckCircle,
    };
    const IconComponent = icons[iconName] || Database;
    return <IconComponent className="w-6 h-6" />;
  };

  const professionsList = [
    {
      fr: "Développeur Web",
      en: "Web Developer",
      linkFr: "/tarif-developpeur-web",
      linkEn: "/web-developer-rate",
      price: 400,
      tech: "React, Vue, Node.js, TypeScript",
      color: "blue",
      iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    },
    {
      fr: "Data Scientist",
      en: "Data Scientist",
      linkFr: "/tarif-data-scientist",
      linkEn: "/data-scientist-rate",
      price: 550,
      tech: "Python, ML/DL, NLP, Big Data",
      color: "purple",
      iconPath:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
    {
      fr: "Designer UX/UI",
      en: "UX/UI Designer",
      linkFr: "/tarif-designer-ux",
      linkEn: "/ux-designer-rate",
      price: 400,
      tech: "Figma, Design System, UX Research",
      color: "pink",
      iconPath:
        "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    },
    {
      fr: "Consultant Marketing",
      en: "Marketing Consultant",
      linkFr: "/tarif-consultant-marketing",
      linkEn: "/marketing-consultant-rate",
      price: 450,
      tech: "SEO, Google Ads, Growth Hacking",
      color: "green",
      iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    },
    {
      fr: "DevOps Engineer",
      en: "DevOps Engineer",
      linkFr: "/tarif-devops",
      linkEn: "/devops-rate",
      price: 500,
      tech: "Kubernetes, AWS, Terraform, CI/CD",
      color: "orange",
      iconPath:
        "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    },
    {
      fr: "Développeur Mobile",
      en: "Mobile Developer",
      linkFr: "/tarif-developpeur-mobile",
      linkEn: "/mobile-developer-rate",
      price: 450,
      tech: "React Native, Flutter, iOS, Android",
      color: "indigo",
      iconPath:
        "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    },
    {
      fr: "Développeur Full-Stack",
      en: "Full-Stack Developer",
      linkFr: "/tarif-developpeur-fullstack",
      linkEn: "/fullstack-developer-rate",
      price: 400,
      tech: "React, Node.js, PostgreSQL",
      color: "cyan",
      iconPath:
        "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    },
    {
      fr: "Développeur Backend",
      en: "Backend Developer",
      linkFr: "/tarif-developpeur-backend",
      linkEn: "/backend-developer-rate",
      price: 400,
      tech: "Node.js, Python, API REST, MongoDB",
      color: "teal",
      iconPath:
        "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    },
    {
      fr: "Data Analyst",
      en: "Data Analyst",
      linkFr: "/tarif-data-analyst",
      linkEn: "/data-analyst-rate",
      price: 500,
      tech: "SQL, Python, Tableau, Power BI",
      color: "violet",
      iconPath:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
    {
      fr: "Graphiste",
      en: "Graphic Designer",
      linkFr: "/tarif-graphiste",
      linkEn: "/graphic-designer-rate",
      price: 300,
      tech: "Photoshop, Illustrator, Branding",
      color: "rose",
      iconPath:
        "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      fr: "Rédacteur",
      en: "Copywriter",
      linkFr: "/tarif-redacteur",
      linkEn: "/copywriter-rate",
      price: 250,
      tech: "SEO, Content Writing, Storytelling",
      color: "amber",
      iconPath:
        "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    },
    {
      fr: "Expert SEO",
      en: "SEO Expert",
      linkFr: "/tarif-expert-seo",
      linkEn: "/seo-expert-rate",
      price: 550,
      tech: "Technical SEO, Link Building",
      color: "emerald",
      iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    },
    {
      fr: "Chef de Projet",
      en: "Project Manager",
      linkFr: "/tarif-chef-de-projet",
      linkEn: "/project-manager-rate",
      price: 600,
      tech: "Scrum, Agile, JIRA, Leadership",
      color: "sky",
      iconPath:
        "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    },
    {
      fr: "Product Manager",
      en: "Product Manager",
      linkFr: "/tarif-product-manager",
      linkEn: "/product-manager-rate",
      price: 650,
      tech: "Vision Produit, Roadmap, Analytics",
      color: "fuchsia",
      iconPath:
        "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    {
      fr: "Consultant Business",
      en: "Business Consultant",
      linkFr: "/tarif-consultant-business",
      linkEn: "/business-consultant-rate",
      price: 775,
      tech:
        language === "fr"
          ? "Stratégie, Transformation"
          : "Strategy, Transformation",
      color: "yellow",
      iconPath:
        "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
  ];

  const colorClasses = {
    blue: {
      border: "hover:border-blue-500 dark:hover:border-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      groupText: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    },
    purple: {
      border: "hover:border-purple-500 dark:hover:border-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      groupText: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    },
    pink: {
      border: "hover:border-pink-500 dark:hover:border-pink-400",
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-600 dark:text-pink-400",
      groupText: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    },
    green: {
      border: "hover:border-green-500 dark:hover:border-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      groupText: "group-hover:text-green-600 dark:group-hover:text-green-400",
    },
    orange: {
      border: "hover:border-orange-500 dark:hover:border-orange-400",
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400",
      groupText: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
    },
    indigo: {
      border: "hover:border-indigo-500 dark:hover:border-indigo-400",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-600 dark:text-indigo-400",
      groupText: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    },
    cyan: {
      border: "hover:border-cyan-500 dark:hover:border-cyan-400",
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      text: "text-cyan-600 dark:text-cyan-400",
      groupText: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
    },
    teal: {
      border: "hover:border-teal-500 dark:hover:border-teal-400",
      bg: "bg-teal-100 dark:bg-teal-900/30",
      text: "text-teal-600 dark:text-teal-400",
      groupText: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
    },
    violet: {
      border: "hover:border-violet-500 dark:hover:border-violet-400",
      bg: "bg-violet-100 dark:bg-violet-900/30",
      text: "text-violet-600 dark:text-violet-400",
      groupText: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    },
    rose: {
      border: "hover:border-rose-500 dark:hover:border-rose-400",
      bg: "bg-rose-100 dark:bg-rose-900/30",
      text: "text-rose-600 dark:text-rose-400",
      groupText: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    },
    amber: {
      border: "hover:border-amber-500 dark:hover:border-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-600 dark:text-amber-400",
      groupText: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    },
    emerald: {
      border: "hover:border-emerald-500 dark:hover:border-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-600 dark:text-emerald-400",
      groupText:
        "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
    sky: {
      border: "hover:border-sky-500 dark:hover:border-sky-400",
      bg: "bg-sky-100 dark:bg-sky-900/30",
      text: "text-sky-600 dark:text-sky-400",
      groupText: "group-hover:text-sky-600 dark:group-hover:text-sky-400",
    },
    fuchsia: {
      border: "hover:border-fuchsia-500 dark:hover:border-fuchsia-400",
      bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
      text: "text-fuchsia-600 dark:text-fuchsia-400",
      groupText:
        "group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400",
    },
    yellow: {
      border: "hover:border-yellow-500 dark:hover:border-yellow-400",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-600 dark:text-yellow-400",
      groupText: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
              {t.hero.badge}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
            {t.hero.subtitle}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <button
              onClick={onStartCalculator}
              className="w-full sm:w-72 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <CalculatorIcon className="w-5 h-5" />
              {t.hero.cta}
            </button>

            <button
              onClick={() => navigate("/generateur-devis-freelance")}
              className="w-full sm:w-72 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-xl text-lg font-bold shadow-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <FileText className="w-5 h-5" />
              {language === "fr" ? "Créer un devis" : "Create a quote"}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION PROFESSIONS */}
      <section
        id="professions"
        ref={professionsRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {language === "fr"
                ? "Explorer les tarifs par métier"
                : "Explore Rates by Profession"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {language === "fr"
                ? "Analyses détaillées basées sur 3500+ points de données"
                : "Detailed analyses based on 3500+ data points"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionsList
              .slice(
                0,
                showAllProfessions ? professionsList.length : PROFESSIONS_LIMIT,
              )
              .map((prof, idx) => {
                const colors = colorClasses[prof.color];
                return (
                  <Link
                    key={idx}
                    to={language === "fr" ? prof.linkFr : prof.linkEn}
                    className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${colors.border}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl group-hover:scale-110 transition-transform ${colors.bg}`}
                      >
                        <svg
                          className={`w-8 h-8 ${colors.text}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={prof.iconPath}
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors ${colors.groupText}`}
                        >
                          {language === "fr" ? prof.fr : prof.en}
                        </span>
                        <p className={`text-2xl font-bold mb-2 ${colors.text}`}>
                          {prof.price}€/{language === "fr" ? "jour" : "day"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {prof.tech}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAllProfessions(!showAllProfessions)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-all shadow-md group"
            >
              {showAllProfessions ? (
                <>
                  {language === "fr" ? "Voir moins" : "Show less"}
                  <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  {language === "fr"
                    ? `Voir tous les métiers (${professionsList.length})`
                    : `See all professions (${professionsList.length})`}
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t.stats.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                3500+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {t.stats.rates}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                6
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {t.stats.countries}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                15
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {t.stats.professions}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {new Date().getFullYear()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {t.stats.users}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.features.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.list.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-4 bg-white dark:bg-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            {t.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.howItWorks.steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            {t.testimonials.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.list.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t dark:border-gray-700 pt-4">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl mb-8 opacity-90">{t.cta.subtitle}</p>
          <button
            onClick={onStartCalculator}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            {t.cta.button}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">
            {t.about.description}
          </p>
        </div>
      </section>

      {/* Section FAQ pour SEO */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {language === "fr"
              ? "Questions fréquentes"
              : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {language === "fr"
                  ? "Comment PricingPro calcule-t-il les tarifs ?"
                  : "How does PricingPro calculate rates?"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "fr"
                  ? "PricingPro analyse 3500+ tarifs réels collectés depuis Malt, Glassdoor et Upwork. Notre algorithme prend en compte votre profession, localisation, niveau d'expérience et compétences pour vous donner une recommandation précise."
                  : "PricingPro analyzes 3500+ real rates collected from Malt, Glassdoor and Upwork. Our algorithm takes into account your profession, location, experience level and skills to give you an accurate recommendation."}
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {language === "fr"
                  ? "Quelles professions sont couvertes ?"
                  : "Which professions are covered?"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "fr"
                  ? "Développeur Web, Mobile, Full-Stack, Backend, DevOps, Data Analyst, Data Scientist, Designer UI/UX, Graphiste, Rédacteur, Consultant Marketing, Expert SEO, Chef de Projet, Product Manager, Consultant Business."
                  : "Web Developer, Mobile, Full-Stack, Backend, DevOps, Data Analyst, Data Scientist, UI/UX Designer, Graphic Designer, Copywriter, Marketing Consultant, SEO Expert, Project Manager, Product Manager, Business Consultant."}
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {language === "fr"
                  ? "Est-ce vraiment gratuit ?"
                  : "Is it really free?"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "fr"
                  ? "Oui ! L'accès aux fonctionnalités principales (calculateur de tarifs, données de marché, génération de devis et contrats) est gratuit. Pas de carte bancaire, pas d'inscription nécessaire."
                  : "Yes! Access to core features (rate calculator, market data, quote and contract generation) is free. No credit card, no signup required."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
