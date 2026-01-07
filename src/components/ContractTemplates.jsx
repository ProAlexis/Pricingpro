import { useState } from "react";
import { FileText, Download, Check, AlertCircle } from "lucide-react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

const ContractTemplates = ({ formData, legalStatus, language = "fr" }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    company: "",
    siret: "",
    address: "",
    email: "",
    phone: "",
  });
  const [clientInfo, setClientInfo] = useState({
    name: "",
    company: "",
    address: "",
    siret: "",
  });
  const [generating, setGenerating] = useState(false);

  const translations = {
    fr: {
      title: "Templates de Documents Juridiques",
      subtitle: "Téléchargez des templates professionnels prêts à l'emploi",
      templates: {
        mission: {
          name: "Contrat de Mission Freelance",
          desc: "Contrat cadre pour missions freelance (CDD, régie, forfait)",
          icon: "📝",
        },
        cgv: {
          name: "Conditions Générales de Vente (CGV)",
          desc: "CGV conformes à la loi française pour freelances",
          icon: "📋",
        },
        mentions: {
          name: "Mentions Légales",
          desc: "Mentions légales pour votre site web",
          icon: "⚖️",
        },
        nda: {
          name: "Accord de Confidentialité (NDA)",
          desc: "Clause de confidentialité bilatérale",
          icon: "🔒",
        },
      },
      download: "Télécharger",
      preview: "Aperçu",
      customize: "Personnaliser",
      fillInfo: "Remplissez vos informations",
      yourInfo: "Vos informations",
      clientInfo: "Informations client (optionnel)",
      name: "Nom complet",
      company: "Entreprise",
      siret: "SIRET",
      address: "Adresse",
      email: "Email",
      phone: "Téléphone",
      generate: "Générer le document Word",
      generating: "Génération en cours...",
      close: "Fermer",
      warning:
        "Ces templates sont fournis à titre informatif. Consultez un avocat pour vous assurer qu'ils correspondent à votre situation.",
      disclaimer:
        "⚠️ Ces documents sont des modèles génériques. Adaptez-les à votre situation et faites-les valider par un professionnel du droit.",
    },
    en: {
      title: "Legal Document Templates",
      subtitle: "Download professional ready-to-use templates",
      templates: {
        mission: {
          name: "Freelance Mission Contract",
          desc: "Framework contract for freelance missions",
          icon: "📝",
        },
        cgv: {
          name: "Terms and Conditions",
          desc: "T&C compliant with French law for freelancers",
          icon: "📋",
        },
        mentions: {
          name: "Legal Notice",
          desc: "Legal notice for your website",
          icon: "⚖️",
        },
        nda: {
          name: "Non-Disclosure Agreement (NDA)",
          desc: "Bilateral confidentiality clause",
          icon: "🔒",
        },
      },
      download: "Download",
      preview: "Preview",
      customize: "Customize",
      fillInfo: "Fill in your information",
      yourInfo: "Your information",
      clientInfo: "Client information (optional)",
      name: "Full name",
      company: "Company",
      siret: "Business ID",
      address: "Address",
      email: "Email",
      phone: "Phone",
      generate: "Generate Word document",
      generating: "Generating...",
      close: "Close",
      warning:
        "These templates are provided for informational purposes. Consult a lawyer to ensure they fit your situation.",
      disclaimer:
        "⚠️ These documents are generic templates. Adapt them to your situation and have them validated by a legal professional.",
    },
  };

  const t = translations[language];

  // Fonction helper pour créer un titre
  const createHeading = (text, level = HeadingLevel.HEADING_1) => {
    return new Paragraph({
      text: text,
      heading: level,
      spacing: { before: 400, after: 200 },
    });
  };

  // Fonction helper pour créer un paragraphe
  const createParagraph = (text, options = {}) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          ...options,
        }),
      ],
      spacing: { before: 120, after: 120 },
    });
  };

  // Fonction helper pour créer un paragraphe avec du texte en gras
  const createBoldParagraph = (boldText, normalText = "") => {
    return new Paragraph({
      children: [
        new TextRun({ text: boldText, bold: true }),
        new TextRun({ text: normalText }),
      ],
      spacing: { before: 120, after: 120 },
    });
  };

  // Générer le contrat de mission
  const generateMissionContract = () => {
    const date = new Date().toLocaleDateString(
      language === "fr" ? "fr-FR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    return new Document({
      sections: [
        {
          properties: {},
          children: [
            // Titre principal
            new Paragraph({
              text: "CONTRAT DE PRESTATION DE SERVICES",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 400 },
            }),
            new Paragraph({
              text:
                language === "fr" ? "MISSION FREELANCE" : "FREELANCE MISSION",
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 },
            }),

            // Les parties
            createHeading(
              language === "fr"
                ? "Entre les soussignés :"
                : "Between the undersigned:",
              HeadingLevel.HEADING_1
            ),

            createBoldParagraph(
              language === "fr" ? "LE PRESTATAIRE :" : "THE SERVICE PROVIDER:",
              ""
            ),
            createParagraph(userInfo.name || "[NOM DU PRESTATAIRE]"),
            createParagraph(userInfo.company || ""),
            createParagraph(`SIRET : ${userInfo.siret || "[À COMPLÉTER]"}`),
            createParagraph(`Adresse : ${userInfo.address || "[À COMPLÉTER]"}`),
            createParagraph(`Email : ${userInfo.email || "[À COMPLÉTER]"}`),
            createParagraph(`Téléphone : ${userInfo.phone || "[À COMPLÉTER]"}`),

            createParagraph(""), // Ligne vide

            createBoldParagraph(
              language === "fr" ? "LE CLIENT :" : "THE CLIENT:",
              ""
            ),
            createParagraph(clientInfo.name || "[NOM DU CLIENT]"),
            createParagraph(clientInfo.company || "[SOCIÉTÉ DU CLIENT]"),
            clientInfo.siret
              ? createParagraph(`SIRET : ${clientInfo.siret}`)
              : createParagraph(""),
            createParagraph(
              `Adresse : ${clientInfo.address || "[ADRESSE DU CLIENT]"}`
            ),

            createParagraph(""), // Ligne vide

            createBoldParagraph(
              language === "fr"
                ? "IL A ÉTÉ CONVENU CE QUI SUIT :"
                : "IT HAS BEEN AGREED AS FOLLOWS:",
              ""
            ),

            // Articles
            createHeading(
              language === "fr" ? "ARTICLE 1 - OBJET" : "ARTICLE 1 - OBJECT",
              HeadingLevel.HEADING_2
            ),
            createParagraph(
              "Le prestataire s'engage à fournir les services suivants :"
            ),
            createParagraph("[DÉCRIRE LA MISSION EN DÉTAIL]"),

            createHeading(
              language === "fr" ? "ARTICLE 2 - DURÉE" : "ARTICLE 2 - DURATION",
              HeadingLevel.HEADING_2
            ),
            createParagraph(
              "La mission débutera le [DATE DE DÉBUT] et se terminera le [DATE DE FIN]."
            ),

            createHeading(
              language === "fr"
                ? "ARTICLE 3 - RÉMUNÉRATION"
                : "ARTICLE 3 - COMPENSATION",
              HeadingLevel.HEADING_2
            ),
            createParagraph("Les parties conviennent d'une rémunération de :"),
            createParagraph("- Tarif journalier : [MONTANT]€ HT/jour"),
            createParagraph(
              "- Modalités de facturation : [MENSUELLE/À LA LIVRAISON]"
            ),
            createParagraph(
              "- Conditions de paiement : [30 JOURS/À RÉCEPTION]"
            ),

            createHeading(
              language === "fr"
                ? "ARTICLE 4 - OBLIGATIONS DU PRESTATAIRE"
                : "ARTICLE 4 - SERVICE PROVIDER OBLIGATIONS",
              HeadingLevel.HEADING_2
            ),
            createParagraph("Le prestataire s'engage à :"),
            createParagraph(
              "- Réaliser la mission avec diligence et professionnalisme"
            ),
            createParagraph("- Respecter les délais convenus"),
            createParagraph(
              "- Informer le client de tout retard ou difficulté"
            ),

            createHeading(
              language === "fr"
                ? "ARTICLE 5 - OBLIGATIONS DU CLIENT"
                : "ARTICLE 5 - CLIENT OBLIGATIONS",
              HeadingLevel.HEADING_2
            ),
            createParagraph("Le client s'engage à :"),
            createParagraph(
              "- Fournir les informations nécessaires à la réalisation de la mission"
            ),
            createParagraph("- Régler les factures dans les délais convenus"),
            createParagraph("- Donner un accès aux ressources nécessaires"),

            createHeading(
              language === "fr"
                ? "ARTICLE 6 - PROPRIÉTÉ INTELLECTUELLE"
                : "ARTICLE 6 - INTELLECTUAL PROPERTY",
              HeadingLevel.HEADING_2
            ),
            createParagraph("[DÉFINIR LA PROPRIÉTÉ DES LIVRABLES]"),

            createHeading(
              language === "fr"
                ? "ARTICLE 7 - CONFIDENTIALITÉ"
                : "ARTICLE 7 - CONFIDENTIALITY",
              HeadingLevel.HEADING_2
            ),
            createParagraph(
              "Les parties s'engagent à garder confidentielles toutes informations échangées."
            ),

            createHeading(
              language === "fr"
                ? "ARTICLE 8 - RÉSILIATION"
                : "ARTICLE 8 - TERMINATION",
              HeadingLevel.HEADING_2
            ),
            createParagraph(
              "Le contrat peut être résilié par l'une ou l'autre des parties avec un préavis de [DURÉE]."
            ),

            createHeading(
              language === "fr"
                ? "ARTICLE 9 - LOI APPLICABLE"
                : "ARTICLE 9 - APPLICABLE LAW",
              HeadingLevel.HEADING_2
            ),
            createParagraph("Le présent contrat est soumis au droit français."),

            // Signatures
            createParagraph(""), // Ligne vide
            createParagraph(""), // Ligne vide
            createParagraph(`Fait en deux exemplaires à [VILLE], le ${date}`),
            createParagraph(""), // Ligne vide

            new Paragraph({
              children: [
                new TextRun({ text: "Le Prestataire", bold: true }),
                new TextRun({
                  text: "                                        ",
                }),
                new TextRun({ text: "Le Client", bold: true }),
              ],
              spacing: { before: 400 },
            }),
            createParagraph(""),
            createParagraph(
              "[SIGNATURE]                                        [SIGNATURE]"
            ),
          ],
        },
      ],
    });
  };

  // Générer les CGV
  const generateCGV = () => {
    const date = new Date().toLocaleDateString(
      language === "fr" ? "fr-FR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    return new Document({
      sections: [
        {
          properties: {},
          children: [
            // Titre
            new Paragraph({
              text: "CONDITIONS GÉNÉRALES DE VENTE",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 200 },
            }),
            new Paragraph({
              text: userInfo.company || userInfo.name || "[VOTRE ENTREPRISE]",
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 },
            }),

            // Articles
            createHeading(
              "Article 1 - Champ d'application",
              HeadingLevel.HEADING_2
            ),
            createParagraph(
              `Les présentes conditions générales de vente s'appliquent à toutes les prestations de services réalisées par ${
                userInfo.name || "[VOTRE NOM]"
              }.`
            ),

            createHeading("Article 2 - Commandes", HeadingLevel.HEADING_2),
            createParagraph(
              "Toute commande implique l'acceptation sans réserve des présentes CGV."
            ),

            createHeading("Article 3 - Prix", HeadingLevel.HEADING_2),
            createParagraph("Les prix sont exprimés en euros hors taxes (HT)."),
            createParagraph(
              legalStatus === "auto-entrepreneur"
                ? "TVA non applicable, art. 293 B du CGI."
                : "TVA applicable selon le taux en vigueur."
            ),

            createHeading(
              "Article 4 - Modalités de paiement",
              HeadingLevel.HEADING_2
            ),
            createParagraph("Le paiement s'effectue :"),
            createParagraph("- Par virement bancaire"),
            createParagraph(
              "- Délai de paiement : 30 jours à réception de facture"
            ),
            createParagraph(
              "- En cas de retard : pénalités de 3 fois le taux d'intérêt légal"
            ),

            createHeading(
              "Article 5 - Délais de livraison",
              HeadingLevel.HEADING_2
            ),
            createParagraph(
              "Les délais de livraison sont indicatifs et ne sont pas garantis."
            ),

            createHeading(
              "Article 6 - Propriété intellectuelle",
              HeadingLevel.HEADING_2
            ),
            createParagraph(
              "Les livrables restent la propriété du prestataire jusqu'au paiement intégral."
            ),

            createHeading("Article 7 - Responsabilité", HeadingLevel.HEADING_2),
            createParagraph(
              "Le prestataire ne peut être tenu responsable que de ses fautes prouvées."
            ),

            createHeading("Article 8 - Force majeure", HeadingLevel.HEADING_2),
            createParagraph(
              "Le prestataire ne pourra être tenu responsable en cas de force majeure."
            ),

            createHeading("Article 9 - Litiges", HeadingLevel.HEADING_2),
            createParagraph(
              "En cas de litige, les parties s'efforceront de trouver une solution amiable."
            ),
            createParagraph(
              "À défaut, compétence exclusive est attribuée aux tribunaux de [VILLE]."
            ),

            // Coordonnées
            createParagraph(""), // Ligne vide
            createHeading("Coordonnées :", HeadingLevel.HEADING_2),
            createParagraph(userInfo.name || "[VOTRE NOM]"),
            createParagraph(userInfo.company || ""),
            createParagraph(userInfo.siret ? `SIRET: ${userInfo.siret}` : ""),
            createParagraph(userInfo.address || "[VOTRE ADRESSE]"),
            createParagraph(userInfo.email || "[VOTRE EMAIL]"),
            createParagraph(userInfo.phone || "[VOTRE TÉLÉPHONE]"),

            createParagraph(""), // Ligne vide
            createParagraph(`Dernière mise à jour : ${date}`),
          ],
        },
      ],
    });
  };

  // Générer les mentions légales
  const generateMentions = () => {
    const date = new Date().toLocaleDateString(
      language === "fr" ? "fr-FR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    return new Document({
      sections: [
        {
          properties: {},
          children: [
            // Titre
            new Paragraph({
              text: "MENTIONS LÉGALES",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 600 },
            }),

            // Sections
            createHeading("Éditeur du site", HeadingLevel.HEADING_2),
            createParagraph(`Nom : ${userInfo.name || "[VOTRE NOM]"}`),
            userInfo.company
              ? createParagraph(`Entreprise : ${userInfo.company}`)
              : createParagraph(""),
            createParagraph(`SIRET : ${userInfo.siret || "[VOTRE SIRET]"}`),
            createParagraph(
              `Adresse : ${userInfo.address || "[VOTRE ADRESSE]"}`
            ),
            createParagraph(`Email : ${userInfo.email || "[VOTRE EMAIL]"}`),
            createParagraph(
              `Téléphone : ${userInfo.phone || "[VOTRE TÉLÉPHONE]"}`
            ),
            createParagraph(""),
            legalStatus === "auto-entrepreneur"
              ? createParagraph(
                  "Auto-entrepreneur - Immatriculation à l'URSSAF"
                )
              : createParagraph(""),
            legalStatus === "sasu"
              ? createParagraph("SASU - Immatriculation au RCS")
              : createParagraph(""),
            legalStatus === "eurl"
              ? createParagraph("EURL - Immatriculation au RCS")
              : createParagraph(""),

            createHeading("Directeur de publication", HeadingLevel.HEADING_2),
            createParagraph(userInfo.name || "[VOTRE NOM]"),

            createHeading("Hébergeur", HeadingLevel.HEADING_2),
            createParagraph("[NOM DE L'HÉBERGEUR]"),
            createParagraph("[ADRESSE DE L'HÉBERGEUR]"),
            createParagraph("[TÉLÉPHONE DE L'HÉBERGEUR]"),

            createHeading("Propriété intellectuelle", HeadingLevel.HEADING_2),
            createParagraph(
              "L'ensemble du contenu de ce site (textes, images, vidéos) est protégé par le droit d'auteur."
            ),
            createParagraph(
              "Toute reproduction est interdite sans autorisation écrite."
            ),

            createHeading(
              "Données personnelles (RGPD)",
              HeadingLevel.HEADING_2
            ),
            createParagraph(
              "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données."
            ),
            createParagraph(`Contact : ${userInfo.email || "[VOTRE EMAIL]"}`),

            createHeading("Cookies", HeadingLevel.HEADING_2),
            createParagraph(
              "Ce site utilise des cookies pour améliorer l'expérience utilisateur."
            ),
            createParagraph(
              "Vous pouvez les désactiver dans les paramètres de votre navigateur."
            ),

            createParagraph(""), // Ligne vide
            createParagraph(`Dernière mise à jour : ${date}`),
          ],
        },
      ],
    });
  };

  // Générer le NDA
  const generateNDA = () => {
    const date = new Date().toLocaleDateString(
      language === "fr" ? "fr-FR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    return new Document({
      sections: [
        {
          properties: {},
          children: [
            // Titre
            new Paragraph({
              text: "ACCORD DE CONFIDENTIALITÉ (NDA)",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 200 },
            }),
            new Paragraph({
              text:
                language === "fr"
                  ? "ACCORD DE NON-DIVULGATION"
                  : "NON-DISCLOSURE AGREEMENT",
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 },
            }),

            // Parties
            createHeading("Entre les soussignés :", HeadingLevel.HEADING_1),

            createBoldParagraph("PARTIE 1 :", ""),
            createParagraph(userInfo.name || "[VOTRE NOM]"),
            createParagraph(userInfo.company || ""),
            createParagraph(`Adresse : ${userInfo.address || "[À COMPLÉTER]"}`),

            createParagraph(""), // Ligne vide

            createBoldParagraph("PARTIE 2 :", ""),
            createParagraph(clientInfo.name || "[NOM DE LA PARTIE 2]"),
            createParagraph(clientInfo.company || "[SOCIÉTÉ]"),
            createParagraph(`Adresse : ${clientInfo.address || "[ADRESSE]"}`),

            createParagraph(""), // Ligne vide

            createBoldParagraph("IL A ÉTÉ CONVENU CE QUI SUIT :", ""),

            // Articles
            createHeading("Article 1 - Définitions", HeadingLevel.HEADING_2),
            createParagraph(
              '"Informations Confidentielles" désigne toute information, de quelque nature que ce soit, échangée entre les parties dans le cadre de leur collaboration.'
            ),

            createHeading(
              "Article 2 - Engagement de confidentialité",
              HeadingLevel.HEADING_2
            ),
            createParagraph("Les parties s'engagent à :"),
            createParagraph(
              "- Ne pas divulguer les Informations Confidentielles à des tiers"
            ),
            createParagraph(
              "- Utiliser ces informations uniquement dans le cadre de la mission"
            ),
            createParagraph(
              "- Protéger ces informations avec le même soin que leurs propres informations confidentielles"
            ),

            createHeading("Article 3 - Exceptions", HeadingLevel.HEADING_2),
            createParagraph(
              "Ne sont pas considérées comme confidentielles les informations :"
            ),
            createParagraph("- Déjà publiques au moment de la divulgation"),
            createParagraph("- Obtenues légalement d'un tiers"),
            createParagraph(
              "- Développées indépendamment par la partie réceptrice"
            ),

            createHeading("Article 4 - Durée", HeadingLevel.HEADING_2),
            createParagraph(
              "Le présent accord prend effet à compter de sa signature et reste en vigueur pendant une durée de [DURÉE] à compter de la fin de la collaboration."
            ),

            createHeading("Article 5 - Sanctions", HeadingLevel.HEADING_2),
            createParagraph(
              "En cas de violation de cet accord, la partie fautive s'expose à des dommages et intérêts."
            ),

            createHeading("Article 6 - Loi applicable", HeadingLevel.HEADING_2),
            createParagraph(
              "Le présent accord est régi par le droit français."
            ),

            // Signatures
            createParagraph(""), // Ligne vide
            createParagraph(""), // Ligne vide
            createParagraph(`Fait en deux exemplaires à [VILLE], le ${date}`),
            createParagraph(""), // Ligne vide

            new Paragraph({
              children: [
                new TextRun({ text: "Partie 1", bold: true }),
                new TextRun({
                  text: "                                        ",
                }),
                new TextRun({ text: "Partie 2", bold: true }),
              ],
              spacing: { before: 400 },
            }),
            createParagraph(""),
            createParagraph(
              "[SIGNATURE]                                        [SIGNATURE]"
            ),
          ],
        },
      ],
    });
  };

  // Générer et télécharger le document
  const generateContract = async (templateType) => {
    setGenerating(true);

    try {
      let doc;
      const templateNames = {
        mission: "Contrat_Mission",
        cgv: "CGV",
        mentions: "Mentions_Legales",
        nda: "NDA",
      };

      // Générer le document selon le type
      switch (templateType) {
        case "mission":
          doc = generateMissionContract();
          break;
        case "cgv":
          doc = generateCGV();
          break;
        case "mentions":
          doc = generateMentions();
          break;
        case "nda":
          doc = generateNDA();
          break;
        default:
          throw new Error("Type de template inconnu");
      }

      // Générer le blob et télécharger
      const blob = await Packer.toBlob(doc);
      const date = new Date().toISOString().split("T")[0];
      saveAs(blob, `${templateNames[templateType]}_${date}.docx`);
    } catch (error) {
      console.error("Erreur lors de la génération du document:", error);
      alert(
        language === "fr"
          ? "Erreur lors de la génération du document"
          : "Error generating document"
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>
      </div>

      {/* Warning */}
      <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-lg">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-800 dark:text-orange-200">
            {t.disclaimer}
          </p>
        </div>
      </div>

      {/* User Info Form */}
      {selectedTemplate && (
        <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {t.fillInfo}
          </h4>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.company}
                </label>
                <input
                  type="text"
                  value={userInfo.company}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Ma Société SARL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.siret}
                </label>
                <input
                  type="text"
                  value={userInfo.siret}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, siret: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="123 456 789 00012"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="contact@exemple.fr"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.address}
                </label>
                <input
                  type="text"
                  value={userInfo.address}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="123 rue Example, 75001 Paris"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>

            <button
              onClick={() => generateContract(selectedTemplate)}
              disabled={generating}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <Download className="w-5 h-5 animate-pulse" />
                  {t.generating}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  {t.generate}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(t.templates).map(([key, template]) => (
          <div
            key={key}
            className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer group"
            onClick={() => setSelectedTemplate(key)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{template.icon}</span>
              {selectedTemplate === key && (
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              )}
            </div>

            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {template.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {template.desc}
            </p>

            {selectedTemplate === key && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    generateContract(key);
                  }}
                  disabled={generating}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {t.download}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractTemplates;
