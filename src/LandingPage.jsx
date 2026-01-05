import React, { useState } from 'react';
import { TrendingUp, DollarSign, Globe, Database, Users, CheckCircle, Star, ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';

const LandingPage = ({ onStartCalculator }) => {
  const [language, setLanguage] = useState('fr');

  const translations = {
    fr: {
      hero: {
        title: "Découvrez Votre Vraie Valeur",
        subtitle: "Calculateur de Tarifs Intelligent",
        description: "Basé sur 1000+ tarifs réels du marché, notre outil IA vous dit exactement combien facturer selon votre profil.",
        cta: "Calculer mes tarifs gratuitement",
        badge: "✨ 100% Gratuit · Données réelles · Sans inscription"
      },
      stats: {
        title: "Des données qui font la différence",
        rates: "Tarifs réels",
        countries: "Pays couverts",
        professions: "Professions",
        users: "Utilisateurs satisfaits"
      },
      features: {
        title: "Pourquoi PricingPro ?",
        subtitle: "L'outil le plus complet pour fixer vos tarifs",
        list: [
          {
            icon: "database",
            title: "Données Réelles",
            description: "1000+ tarifs scrapés en temps réel depuis Malt, Upwork et autres plateformes freelance"
          },
          {
            icon: "globe",
            title: "Multi-Pays",
            description: "France, Portugal, UK, Allemagne, USA, Espagne - Tarifs ajustés par ville et région"
          },
          {
            icon: "trending",
            title: "3 Niveaux d'Expérience",
            description: "Junior, Confirmé, Senior - Des recommandations précises selon votre niveau"
          },
          {
            icon: "shield",
            title: "100% Gratuit",
            description: "Pas de carte bancaire, pas d'inscription. Accédez à toutes les données immédiatement"
          },
          {
            icon: "zap",
            title: "Instantané",
            description: "Résultats en moins de 3 secondes. Comparez-vous au marché en temps réel"
          },
          {
            icon: "chart",
            title: "Insights Personnalisés",
            description: "Recommandations concrètes pour augmenter vos tarifs de 20-50%"
          }
        ]
      },
      howItWorks: {
        title: "Comment ça marche ?",
        steps: [
          { number: "1", title: "Votre Profil", description: "Choisissez votre métier, localisation et niveau d'expérience" },
          { number: "2", title: "Vos Compétences", description: "Ajoutez vos compétences spécifiques pour un calcul précis" },
          { number: "3", title: "Vos Résultats", description: "Obtenez votre tarif recommandé + comparaison au marché" }
        ]
      },
      testimonials: {
        title: "Ils ont augmenté leurs tarifs",
        list: [
          {
            name: "Sophie L.",
            role: "Développeuse Web • Paris",
            content: "J'ai découvert que je facturais 30% en dessous du marché. Grâce à PricingPro, j'ai ajusté mes tarifs et mes clients ont accepté sans problème !",
            rating: 5
          },
          {
            name: "Marc D.",
            role: "Designer UI/UX • Lyon",
            content: "L'outil le plus précis que j'ai testé. Les données par ville font vraiment la différence. Je recommande à tous mes collègues freelances.",
            rating: 5
          },
          {
            name: "Ana R.",
            role: "Data Analyst • Lisbonne",
            content: "En tant que freelance au Portugal, difficile de savoir quoi facturer. PricingPro m'a donné la confiance pour négocier avec des clients internationaux.",
            rating: 5
          }
        ]
      },
      cta: {
        title: "Prêt à découvrir votre vraie valeur ?",
        subtitle: "Rejoignez des milliers de freelances qui facturent ce qu'ils valent vraiment",
        button: "Calculer mes tarifs maintenant"
      },
      about: {
        title: "À propos de PricingPro",
        description: "PricingPro est le calculateur de tarifs le plus précis du marché pour les freelances et consultants. Nos données proviennent de milliers de tarifs réels collectés sur les principales plateformes freelance."
      },
      dataSources: {
        title: "Nos sources de données",
        malt: "Plateforme #1 en France",
        glassdoor: "Salaires vérifiés",
        upwork: "Marché international"
      },
      footer: {
        tagline: "PricingPro - Le calculateur de tarifs le plus précis du marché",
        links: ["À propos", "Comment ça marche", "Données", "Contact"],
        legal: "© 2026 PricingPro. Toutes les données sont anonymisées et agrégées."
      }
    },
    en: {
      hero: {
        title: "Discover Your True Worth",
        subtitle: "Smart Pricing Calculator",
        description: "Based on 1000+ real market rates, our AI tool tells you exactly what to charge based on your profile.",
        cta: "Calculate my rates for free",
        badge: "✨ 100% Free · Real Data · No signup required"
      },
      stats: {
        title: "Data that makes a difference",
        rates: "Real rates",
        countries: "Countries covered",
        professions: "Professions",
        users: "Satisfied users"
      },
      features: {
        title: "Why PricingPro?",
        subtitle: "The most complete tool to set your rates",
        list: [
          {
            icon: "database",
            title: "Real Data",
            description: "1000+ rates scraped in real-time from Malt, Upwork and other freelance platforms"
          },
          {
            icon: "globe",
            title: "Multi-Country",
            description: "France, Portugal, UK, Germany, USA, Spain - Rates adjusted by city and region"
          },
          {
            icon: "trending",
            title: "3 Experience Levels",
            description: "Junior, Mid-level, Senior - Precise recommendations based on your level"
          },
          {
            icon: "shield",
            title: "100% Free",
            description: "No credit card, no signup. Access all data immediately"
          },
          {
            icon: "zap",
            title: "Instant",
            description: "Results in less than 3 seconds. Compare yourself to the market in real-time"
          },
          {
            icon: "chart",
            title: "Personalized Insights",
            description: "Concrete recommendations to increase your rates by 20-50%"
          }
        ]
      },
      howItWorks: {
        title: "How it works?",
        steps: [
          { number: "1", title: "Your Profile", description: "Choose your profession, location and experience level" },
          { number: "2", title: "Your Skills", description: "Add your specific skills for precise calculation" },
          { number: "3", title: "Your Results", description: "Get your recommended rate + market comparison" }
        ]
      },
      testimonials: {
        title: "They increased their rates",
        list: [
          {
            name: "Sophie L.",
            role: "Web Developer • Paris",
            content: "I discovered I was charging 30% below market rate. Thanks to PricingPro, I adjusted my rates and my clients accepted without issue!",
            rating: 5
          },
          {
            name: "Marc D.",
            role: "UI/UX Designer • Lyon",
            content: "The most accurate tool I've tested. City-specific data really makes a difference. I recommend it to all my freelance colleagues.",
            rating: 5
          },
          {
            name: "Ana R.",
            role: "Data Analyst • Lisbon",
            content: "As a freelancer in Portugal, it's hard to know what to charge. PricingPro gave me confidence to negotiate with international clients.",
            rating: 5
          }
        ]
      },
      cta: {
        title: "Ready to discover your true worth?",
        subtitle: "Join thousands of freelancers who charge what they're really worth",
        button: "Calculate my rates now"
      },
      about: {
        title: "About PricingPro",
        description: "PricingPro is the most accurate pricing calculator on the market for freelancers and consultants. Our data comes from thousands of real rates collected from major freelance platforms."
      },
      dataSources: {
        title: "Our data sources",
        malt: "#1 Platform in France",
        glassdoor: "Verified salaries",
        upwork: "International market"
      },
      footer: {
        tagline: "PricingPro - The most accurate pricing calculator on the market",
        links: ["About", "How it works", "Data", "Contact"],
        legal: "© 2026 PricingPro. All data is anonymized and aggregated."
      }
    }
  };

  const t = translations[language];

  const getIcon = (iconName) => {
    const icons = {
      database: Database,
      globe: Globe,
      trending: TrendingUp,
      shield: Shield,
      zap: Zap,
      chart: BarChart3
    };
    const IconComponent = icons[iconName];
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold text-gray-900 dark:text-white">PricingPro</span>
              <p className="text-xs text-gray-600 dark:text-gray-400">Calculateur de tarifs intelligent</p>
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{language === 'fr' ? 'EN' : 'FR'}</span>
          </button>
        </div>
      </header>

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
          <button
            onClick={onStartCalculator}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            {t.hero.cta}
            <ArrowRight className="w-5 h-5" />
          </button>
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
              <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">{t.stats.rates}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">6</div>
              <div className="text-gray-600 dark:text-gray-400">{t.stats.countries}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-2">15</div>
              <div className="text-gray-600 dark:text-gray-400">{t.stats.professions}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">5000+</div>
              <div className="text-gray-600 dark:text-gray-400">{t.stats.users}</div>
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
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white dark:bg-gray-800">
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
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
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
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t dark:border-gray-700 pt-4">
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t.cta.subtitle}
          </p>
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
      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">
            {t.about.description}
          </p>
        </div>
      </section>

      {/* Section Données */}
      <section id="data" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t.dataSources.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🟣</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Malt</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.dataSources.malt}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🟢</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Glassdoor</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.dataSources.glassdoor}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🔵</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Upwork</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.dataSources.upwork}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PricingPro</span>
          </div>
          <p className="mb-6">{t.footer.tagline}</p>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="#about" className="hover:text-white transition-colors">
              {t.footer.links[0]}
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              {t.footer.links[1]}
            </a>
            <a href="#data" className="hover:text-white transition-colors">
              {t.footer.links[2]}
            </a>
            <a href="mailto:contact@pricingpro.com" className="hover:text-white transition-colors">
              {t.footer.links[3]}
            </a>
          </div>
          <p className="text-sm">{t.footer.legal}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;