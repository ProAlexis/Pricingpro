import { useState } from "react";
import {
  X,
  FileText,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  CreditCard,
} from "lucide-react";
import LogoUpload from "./LogoUpload";

const QuoteGenerator = ({
  results,
  formData,
  language,
  logo,
  setLogo,
  legalStatus,
  onClose,
  onGenerate,
}) => {
  const [quoteData, setQuoteData] = useState({
    // Freelance info
    freelanceName: "",
    freelanceEmail: "",
    freelancePhone: "",
    freelanceAddress: "",
    freelanceSiret: "",
    vatNumber: "",
    capital: "",
    rcs: "",
    companyPortageName: "",
    companyPortageSiret: "",
    companyPortageAddress: "",

    // Client info
    clientName: "",
    clientCompany: "",
    clientEmail: "",
    clientAddress: "",

    // Mission details
    missionTitle: "",
    missionDescription: "",
    daysCount: 10,
    dailyRate: results.daily,

    // Payment & VAT
    paymentTerms: "30/70",
    vatApplicable: legalStatus !== "auto-entrepreneur",
    vatRate: 20,

    // Other
    quoteNumber: `DEV-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000),
    ).padStart(3, "0")}`,
    validityDays: 30,
  });

  const t = {
    fr: {
      title: "Créer mon devis professionnel",
      freelanceInfo: "Mes informations",
      name: "Nom complet",
      email: "Email",
      phone: "Téléphone",
      address: "Adresse complète",
      siret: "SIRET (optionnel)",
      clientInfo: "Informations client",
      clientName: "Nom du client",
      clientCompany: "Entreprise (optionnel)",
      clientEmail: "Email client",
      clientAddress: "Adresse client",
      missionInfo: "Détails de la mission",
      missionTitle: "Titre de la mission",
      missionDescription: "Description de la prestation",
      daysCount: "Nombre de jours",
      dailyRate: "Tarif journalier (€)",
      paymentTerms: "Conditions de paiement",
      payment100: "100% à la livraison",
      payment50: "50% acompte / 50% livraison",
      payment30: "30% acompte / 70% livraison",
      vatApplicable: "TVA applicable",
      vatRate: "Taux TVA (%)",
      vatNumber: "N° de TVA Intracommunautaire",
      capital: "Capital social (€)",
      rcs: "Ville d'immatriculation (RCS)",
      portageCompany: "Nom de la société de portage",
      portageAddress: "Adresse de la société de portage",
      portageSiret: "SIRET de la société de portage",
      quoteNumber: "Numéro de devis",
      validityDays: "Validité (jours)",
      totalHT: "Total HT",
      totalTTC: "Total TTC",
      cancel: "Annuler",
      generate: "Générer le devis PDF",
      placeholders: {
        name: "Jean Dupont",
        email: "contact@exemple.fr",
        phone: "+33 6 12 34 56 78",
        address: "123 rue Exemple, 75001 Paris",
        siret: "siret (ex: 123 456 789 00012)",
        vatNumber: "N° de TVA Intracommunautaire (ex: FR 12...)",
        capital: "Capital social (ex: 1000)",
        rcs: "Ville du Greffe (ex: RCS Paris)",
        portageCompany: "Société (ex: Jump, ITG...)",
        clientName: "Marie Martin",
        clientCompany: "Entreprise SARL Martin",
        missionTitle: "Développement site web e-commerce",
        missionDescription:
          "Création d'un site e-commerce responsive avec système de paiement intégré",
      },
    },
    en: {
      title: "Create professional quote",
      freelanceInfo: "My information",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      address: "Full address",
      siret: "Business ID (optional)",
      clientInfo: "Client information",
      clientName: "Client name",
      clientCompany: "Company (optional)",
      clientEmail: "Client email",
      clientAddress: "Client address",
      missionInfo: "Mission details",
      missionTitle: "Mission title",
      missionDescription: "Service description",
      daysCount: "Number of days",
      dailyRate: "Daily rate (€)",
      paymentTerms: "Payment terms",
      payment100: "100% on delivery",
      payment50: "50% deposit / 50% delivery",
      payment30: "30% deposit / 70% delivery",
      vatApplicable: "VAT applicable",
      vatRate: "VAT rate (%)",
      vatNumber: "VAT Number",
      capital: "Share Capital (€)",
      rcs: "Registration City (RCS)",
      portageCompany: "Umbrella company name",
      portageAddress: "Umbrella company address",
      portageSiret: "Umbrella company Business ID",
      quoteNumber: "Quote number",
      validityDays: "Validity (days)",
      totalHT: "Total excl. VAT",
      totalTTC: "Total incl. VAT",
      cancel: "Cancel",
      generate: "Generate quote PDF",
      placeholders: {
        name: "John Doe",
        email: "contact@example.com",
        phone: "+1 202-555-0123",
        address: "123 Business Ave, New York, NY 10001",
        siret: "Tax ID / Business ID (e.g., 123456789)",
        vatNumber: "VAT Number (e.g., US123456789)",
        capital: "Share Capital (e.g., 1000)",
        rcs: "Registration City (e.g., New York)",
        portageCompany: "Umbrella Company (e.g., Jump, ITG...)",
        clientName: "Jane Smith",
        clientCompany: "Company LLC Smith",
        missionTitle: "E-commerce website development",
        missionDescription:
          "Full creation of a responsive e-commerce platform with integrated payment systems",
      },
    },
  };

  const labels = t[language];

  // Calculs en temps réel
  const totalHT = quoteData.daysCount * quoteData.dailyRate;
  const totalTVA = quoteData.vatApplicable
    ? (totalHT * quoteData.vatRate) / 100
    : 0;
  const totalTTC = totalHT + totalTVA;

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      ...quoteData,
      totalHT,
      totalTVA,
      totalTTC,
      logo,
      legalStatus,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6" />
            <h2 className="text-2xl font-bold">{labels.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Freelance Info */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <User className="w-5 h-5 text-purple-600" />
              {labels.freelanceInfo}
            </h3>
            <div className="mb-6">
              <LogoUpload logo={logo} setLogo={setLogo} language={language} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="freelanceName"
                autoComplete="name"
                required
                placeholder={labels.placeholders.name}
                value={quoteData.freelanceName}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, freelanceName: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                name="freelanceEmail"
                autoComplete="email"
                required
                placeholder={labels.placeholders.email}
                value={quoteData.freelanceEmail}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, freelanceEmail: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="tel"
                name="freelancePhone"
                autoComplete="tel"
                required
                placeholder={labels.placeholders.phone}
                value={quoteData.freelancePhone}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, freelancePhone: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                name="freelanceAddress"
                autoComplete="street-address"
                required
                placeholder={labels.placeholders.address}
                value={quoteData.freelanceAddress}
                onChange={(e) =>
                  setQuoteData({
                    ...quoteData,
                    freelanceAddress: e.target.value,
                  })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                name="freelanceSiret"
                placeholder={labels.placeholders.siret}
                value={quoteData.freelanceSiret}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, freelanceSiret: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white md:col-span-2"
              />
              {/*Champs spécifiques EURL / SASU */}
              {["eurl", "sasu"].includes(legalStatus) && (
                <>
                  <input
                    type="text"
                    placeholder={labels.placeholders.vatNumber}
                    value={quoteData.vatNumber}
                    onChange={(e) =>
                      setQuoteData({ ...quoteData, vatNumber: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder={labels.placeholders.capital}
                    value={quoteData.capital}
                    onChange={(e) =>
                      setQuoteData({ ...quoteData, capital: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    name="random-rcs-field"
                    autoComplete="one-time-code"
                    placeholder={labels.placeholders.rcs}
                    value={quoteData.rcs}
                    onChange={(e) =>
                      setQuoteData({ ...quoteData, rcs: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white md:col-span-2"
                  />
                </>
              )}
              {/* Champs spécifiques Portage Salarial */}
              {legalStatus === "portage" && (
                <>
                  <input
                    type="text"
                    placeholder={labels.placeholders.portageCompany}
                    value={quoteData.companyPortageName}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        companyPortageName: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder={labels.portageSiret}
                    value={quoteData.companyPortageSiret}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        companyPortageSiret: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder={labels.address}
                    value={quoteData.companyPortageAddress}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        companyPortageAddress: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </>
              )}
            </div>
          </section>

          {/* Client Info */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <Building className="w-5 h-5 text-purple-600" />
              {labels.clientInfo}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="clientName"
                autoComplete="off"
                required
                placeholder={labels.placeholders.clientName}
                value={quoteData.clientName}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, clientName: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                name="clientCompany"
                autoComplete="organization"
                placeholder={labels.placeholders.clientCompany}
                value={quoteData.clientCompany}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, clientCompany: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                name="clientEmail"
                required
                placeholder={labels.placeholders.email}
                value={quoteData.clientEmail}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, clientEmail: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                name="clientAddress"
                required
                placeholder={labels.placeholders.address}
                value={quoteData.clientAddress}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, clientAddress: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </section>

          {/* Mission Details */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <Briefcase className="w-5 h-5 text-purple-600" />
              {labels.missionInfo}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder={labels.placeholders.missionTitle}
                value={quoteData.missionTitle}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, missionTitle: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <textarea
                required
                rows={4}
                placeholder={labels.placeholders.missionDescription}
                value={quoteData.missionDescription}
                onChange={(e) =>
                  setQuoteData({
                    ...quoteData,
                    missionDescription: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {labels.daysCount}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quoteData.daysCount}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        daysCount: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {labels.dailyRate}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quoteData.dailyRate}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        dailyRate: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment & VAT */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <CreditCard className="w-5 h-5 text-purple-600" />
              {labels.paymentTerms}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {labels.paymentTerms}
                </label>
                <select
                  value={quoteData.paymentTerms}
                  onChange={(e) =>
                    setQuoteData({ ...quoteData, paymentTerms: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="100%">{labels.payment100}</option>
                  <option value="50/50">{labels.payment50}</option>
                  <option value="30/70">{labels.payment30}</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="vat"
                  checked={quoteData.vatApplicable}
                  onChange={(e) =>
                    setQuoteData({
                      ...quoteData,
                      vatApplicable: e.target.checked,
                    })
                  }
                  className="w-5 h-5"
                />
                <label
                  htmlFor="vat"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {labels.vatApplicable}
                </label>
              </div>

              {quoteData.vatApplicable && (
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={quoteData.vatRate}
                  onChange={(e) =>
                    setQuoteData({
                      ...quoteData,
                      vatRate: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              )}
            </div>
          </section>

          {/* Summary */}
          <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl">
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  {labels.totalHT}
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {totalHT.toLocaleString()}€
                </span>
              </div>
              {quoteData.vatApplicable && (
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    TVA ({quoteData.vatRate}%)
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {totalTVA.toLocaleString()}€
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t-2 border-purple-600">
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {labels.totalTTC}
                </span>
                <span className="font-bold text-purple-600 dark:text-purple-400 text-2xl">
                  {totalTTC.toLocaleString()}€
                </span>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {labels.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              {labels.generate}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteGenerator;
