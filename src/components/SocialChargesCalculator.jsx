import React from "react";
import { Calculator, Info } from "lucide-react";

// Taux de charges sociales par statut (France 2026)
// Note: Les taux sont calculés sur le CA/brut pour obtenir le net
const SOCIAL_CHARGES = {
  "auto-entrepreneur": {
    name: { fr: "Auto-entrepreneur", en: "Self-employed" },
    rate: 0.212, // 21.2% du CA pour prestations de service BNC (URSSAF 2026)
    description: {
      fr: "Charges sociales simplifiées (21.2%)",
      en: "Simplified social contributions (21.2%)",
    },
    details: {
      fr: "Cotisations sociales : 21.2% • CFE : ~300€/an • Formation : 0.2%",
      en: "Social contributions: 21.2% • Business tax: ~€300/year • Training: 0.2%",
    },
  },
  sasu: {
    name: { fr: "SASU (Président)", en: "SASU (President)" },
    rate: 0.54, // ~54% charges patronales + salariales du brut
    description: {
      fr: "Assimilé salarié - Régime général",
      en: "Employee status - General regime",
    },
    details: {
      fr: "Charges patronales : ~42% • Charges salariales : ~22% • IS : 15-25%",
      en: "Employer contributions: ~42% • Employee contributions: ~22% • Corp. tax: 15-25%",
    },
  },
  eurl: {
    name: { fr: "EURL (Gérant majoritaire)", en: "EURL (Majority manager)" },
    rate: 0.45, // ~45% charges TNS du bénéfice
    description: {
      fr: "Travailleur non-salarié (TNS)",
      en: "Self-employed worker (TNS)",
    },
    details: {
      fr: "Cotisations sociales : ~45% du bénéfice • IS : 15-25%",
      en: "Social contributions: ~45% of profit • Corp. tax: 15-25%",
    },
  },
  portage: {
    name: { fr: "Portage salarial", en: "Umbrella company" },
    rate: 0.49, // ~49% charges totales (sociales + frais de gestion)
    description: {
      fr: "Salarié porté - Tout inclus",
      en: "Employee - All inclusive",
    },
    details: {
      fr: "Charges sociales : ~45% • Frais de gestion : 3-10% • RCP incluse",
      en: "Social contributions: ~45% • Management fees: 3-10% • Insurance included",
    },
  },
};

const SocialChargesCalculator = ({
  dailyRate,
  monthlyRate,
  status,
  language = "fr",
}) => {
  const charges = SOCIAL_CHARGES[status];

  if (!charges) return null;

  // Calcul du net
  const dailyNet = Math.round(dailyRate * (1 - charges.rate));
  const monthlyNet = Math.round(monthlyRate * (1 - charges.rate));
  const yearlyNet = monthlyNet * 12;

  // Calcul des charges
  const dailyCharges = dailyRate - dailyNet;
  const monthlyCharges = monthlyRate - monthlyNet;

  const t = {
    fr: {
      netInPocket: "Net dans votre poche",
      socialCharges: "Charges sociales",
      perDay: "/jour",
      perMonth: "/mois",
      perYear: "/an",
      info: "Estimation basée sur le statut",
      afterCharges: "Après charges",
    },
    en: {
      netInPocket: "Net in your pocket",
      socialCharges: "Social contributions",
      perDay: "/day",
      perMonth: "/month",
      perYear: "/year",
      info: "Estimate based on status",
      afterCharges: "After charges",
    },
  }[language];

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {t.netInPocket}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {charges.name[language]} ({Math.round(charges.rate * 100)}%{" "}
            {t.socialCharges.toLowerCase()})
          </p>
        </div>
      </div>

      {/* Net amounts */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {t.perDay}
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {dailyNet}€
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border-2 border-green-600 dark:border-green-400">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {t.perMonth}
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {monthlyNet.toLocaleString()}€
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {t.perYear}
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {yearlyNet.toLocaleString()}€
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Brut mensuel</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {monthlyRate.toLocaleString()}€
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {t.socialCharges}
          </span>
          <span className="font-semibold text-red-600 dark:text-red-400">
            -{monthlyCharges.toLocaleString()}€
          </span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="font-bold text-gray-900 dark:text-white">
            {t.netInPocket}
          </span>
          <span className="font-bold text-green-600 dark:text-green-400">
            {monthlyNet.toLocaleString()}€
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          {t.info}. {charges.description[language]}.
        </p>
      </div>
    </div>
  );
};

export { SocialChargesCalculator, SOCIAL_CHARGES };
