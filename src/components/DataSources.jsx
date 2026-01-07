import React from "react";
import { Database, ExternalLink, Shield, FileText } from "lucide-react";

const DataSources = ({ language = "fr" }) => {
  const translations = {
    fr: {
      title: "Sources de Données Officielles",
      subtitle:
        "PricingPro utilise exclusivement des données publiques issues de sources officielles et réputées",
      lastUpdate: "Dernière mise à jour",
      dataPolicy: "Politique d'utilisation des données",
      policyText:
        "Toutes les données utilisées sont conformes aux licences CC BY 4.0 et Licence Ouverte 2.0. Nous citons systématiquement nos sources et respectons les conditions d'utilisation de chaque plateforme.",
      mainSources: "Sources Principales",
      secondarySources: "Sources Complémentaires",
      legalFramework: "Cadre Juridique",
      sources: [
        {
          name: "Baromètre Malt 2024-2025",
          url: "https://www.malt.fr/t/barometre-tarifs",
          description:
            "TJM moyens par profession, niveau d'expérience et localisation. Données issues de 500 000+ freelances inscrits sur Malt.",
          dataPoints: "1,620 tarifs",
          update: "Temps réel",
          icon: "database",
        },
        {
          name: "Free-Work IT Earnings",
          url: "https://www.free-work.com/fr/tech-it/earnings",
          description:
            "Rémunérations des freelances et salariés IT. Baromètre contributif mis à jour quotidiennement.",
          dataPoints: "405 tarifs",
          update: "Quotidien",
          icon: "database",
        },
        {
          name: "Stack Overflow Developer Survey 2024",
          url: "https://survey.stackoverflow.co/2024",
          description:
            "Salaires et données démographiques de 49,000+ développeurs dans 177 pays. Datasets CSV téléchargeables.",
          dataPoints: "45 tarifs",
          update: "Annuel",
          icon: "database",
        },
      ],
      complementary: [
        {
          name: "INSEE - Emploi et revenus des indépendants",
          url: "https://www.insee.fr/fr/statistiques/8376600",
          description:
            "Statistiques officielles sur 4,4 millions d'indépendants en France (données 2022).",
          license: "Licence Ouverte 2.0",
        },
        {
          name: "URSSAF Open Data",
          url: "https://open.urssaf.fr",
          description:
            "Données trimestrielles sur les auto-entrepreneurs par secteur d'activité.",
          license: "Licence Ouverte 2.0",
        },
        {
          name: "Opteamis Baromètre P2i",
          url: "https://www.opteamis.com/barometre-it/",
          description:
            "Indice des prestations intellectuelles informatiques en temps réel.",
          license: "Accès public",
        },
      ],
      legal: [
        {
          title: "Licence Ouverte 2.0",
          description:
            "Les données INSEE et URSSAF sont utilisées conformément à la Licence Ouverte 2.0 qui autorise l'exploitation commerciale avec attribution de la source.",
          url: "https://www.data.gouv.fr/pages/legal/licences/etalab-2.0",
        },
        {
          title: "Creative Commons BY 4.0",
          description:
            "Les données Stack Overflow et certaines données européennes sont utilisées sous licence CC BY 4.0 avec citation complète de la source.",
          url: "https://creativecommons.org/licenses/by/4.0/",
        },
        {
          title: "Citations de rapports privés",
          description:
            "Les données Malt et Free-Work sont citées conformément au droit de citation (article 5(3)(d) directive InfoSoc). Nous renvoyons systématiquement vers les sources originales.",
          url: null,
        },
      ],
      disclaimer: "Avertissement",
      disclaimerText:
        "Les tarifs affichés sont des moyennes indicatives basées sur l'agrégation de multiples sources publiques. Ils ne constituent ni une garantie ni une recommandation contractuelle. Chaque freelance doit adapter ses tarifs à son contexte spécifique (expérience, compétences, marché local).",
    },
    en: {
      title: "Official Data Sources",
      subtitle:
        "PricingPro exclusively uses public data from official and reputable sources",
      lastUpdate: "Last updated",
      dataPolicy: "Data Usage Policy",
      policyText:
        "All data used complies with CC BY 4.0 and Licence Ouverte 2.0 licenses. We systematically cite our sources and respect the terms of use of each platform.",
      mainSources: "Main Sources",
      secondarySources: "Complementary Sources",
      legalFramework: "Legal Framework",
      sources: [
        {
          name: "Malt Barometer 2024-2025",
          url: "https://www.malt.fr/t/barometre-tarifs",
          description:
            "Average daily rates by profession, experience level and location. Data from 500,000+ freelancers on Malt.",
          dataPoints: "1,620 rates",
          update: "Real-time",
          icon: "database",
        },
        {
          name: "Free-Work IT Earnings",
          url: "https://www.free-work.com/fr/tech-it/earnings",
          description:
            "Freelance and employee IT compensation. Contributory barometer updated daily.",
          dataPoints: "405 rates",
          update: "Daily",
          icon: "database",
        },
        {
          name: "Stack Overflow Developer Survey 2024",
          url: "https://survey.stackoverflow.co/2024",
          description:
            "Salaries and demographics of 49,000+ developers in 177 countries. Downloadable CSV datasets.",
          dataPoints: "45 rates",
          update: "Annual",
          icon: "database",
        },
      ],
      complementary: [
        {
          name: "INSEE - Employment and income of independents",
          url: "https://www.insee.fr/fr/statistiques/8376600",
          description:
            "Official statistics on 4.4 million independent workers in France (2022 data).",
          license: "Open License 2.0",
        },
        {
          name: "URSSAF Open Data",
          url: "https://open.urssaf.fr",
          description: "Quarterly data on self-employed workers by sector.",
          license: "Open License 2.0",
        },
        {
          name: "Opteamis P2i Barometer",
          url: "https://www.opteamis.com/barometre-it/",
          description: "Real-time IT consulting services index.",
          license: "Public access",
        },
      ],
      legal: [
        {
          title: "Open License 2.0",
          description:
            "INSEE and URSSAF data are used in accordance with Open License 2.0 which allows commercial use with source attribution.",
          url: "https://www.data.gouv.fr/pages/legal/licences/etalab-2.0",
        },
        {
          title: "Creative Commons BY 4.0",
          description:
            "Stack Overflow data and certain European data are used under CC BY 4.0 license with full source citation.",
          url: "https://creativecommons.org/licenses/by/4.0/",
        },
        {
          title: "Private report citations",
          description:
            "Malt and Free-Work data are cited in accordance with citation rights (Article 5(3)(d) InfoSoc Directive). We systematically refer to original sources.",
          url: null,
        },
      ],
      disclaimer: "Disclaimer",
      disclaimerText:
        "The rates displayed are indicative averages based on the aggregation of multiple public sources. They do not constitute a guarantee or contractual recommendation. Each freelancer must adapt their rates to their specific context (experience, skills, local market).",
    },
  };

  const t = translations[language];
  const currentDate = new Date().toLocaleDateString(
    language === "fr" ? "fr-FR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
          <Shield className="w-8 h-8 text-purple-600 dark:text-purple-300" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t.subtitle}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          {t.lastUpdate}: {currentDate}
        </p>
      </div>

      {/* Data Policy */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12">
        <div className="flex items-start gap-4">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
              {t.dataPolicy}
            </h2>
            <p className="text-blue-800 dark:text-blue-200">{t.policyText}</p>
          </div>
        </div>
      </div>

      {/* Main Sources */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t.mainSources}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.sources.map((source, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {source.name}
                  </h3>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {source.update}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {source.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {source.dataPoints}
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  {language === "fr" ? "Voir la source" : "View source"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complementary Sources */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t.secondarySources}
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg divide-y dark:divide-gray-700">
          {t.complementary.map((source, idx) => (
            <div
              key={idx}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {source.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {source.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    {source.license}
                  </span>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 flex-shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Framework */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t.legalFramework}
        </h2>
        <div className="space-y-4">
          {t.legal.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-2">
          {t.disclaimer}
        </h2>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {t.disclaimerText}
        </p>
      </div>
    </div>
  );
};

export default DataSources;
