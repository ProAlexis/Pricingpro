import { useState, useEffect } from "react";
import { FileText, Download, Check, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
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

  // CHARGER les infos au démarrage
  useEffect(() => {
    const savedInfo = localStorage.getItem("pricingpro_user_info");
    if (savedInfo) {
      setUserInfo(JSON.parse(savedInfo));
    }
  }, []);

  // SAUVEGARDER quand userInfo change
  useEffect(() => {
    localStorage.setItem("pricingpro_user_info", JSON.stringify(userInfo));
  }, [userInfo]);

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
      },
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
              HeadingLevel.HEADING_1,
            ),

            createBoldParagraph(
              language === "fr" ? "LE PRESTATAIRE :" : "THE SERVICE PROVIDER:",
              "",
            ),
            createParagraph(
              userInfo.name ||
                (language === "fr"
                  ? "[NOM DU PRESTATAIRE]"
                  : "[PROVIDER NAME]"),
            ),
            createParagraph(userInfo.company || ""),
            createParagraph(
              `${language === "fr" ? "SIRET :" : "Business ID:"} ${userInfo.siret || (language === "fr" ? "[À COMPLÉTER]" : "[TO COMPLETE]")}`,
            ),
            createParagraph(
              `${language === "fr" ? "Adresse :" : "Address:"} ${userInfo.address || (language === "fr" ? "[À COMPLÉTER]" : "[TO COMPLETE]")}`,
            ),
            createParagraph(
              `Email : ${userInfo.email || (language === "fr" ? "[À COMPLÉTER]" : "[TO COMPLETE]")}`,
            ),
            createParagraph(
              `${language === "fr" ? "Téléphone :" : "Phone:"} ${userInfo.phone || (language === "fr" ? "[À COMPLÉTER]" : "[TO COMPLETE]")}`,
            ),

            createParagraph(""), // Ligne vide

            createBoldParagraph(
              language === "fr" ? "LE CLIENT :" : "THE CLIENT:",
              "",
            ),
            createParagraph(
              clientInfo.name ||
                (language === "fr" ? "[NOM DU CLIENT]" : "[CLIENT NAME]"),
            ),
            createParagraph(
              clientInfo.company ||
                (language === "fr"
                  ? "[SOCIÉTÉ DU CLIENT]"
                  : "[CLIENT COMPANY]"),
            ),
            clientInfo.siret
              ? createParagraph(
                  `${language === "fr" ? "SIRET :" : "Business ID :"} ${clientInfo.siret}`,
                )
              : createParagraph(""),
            createParagraph(
              `${language === "fr" ? "Adresse :" : "Address:"} ${clientInfo.address || (language === "fr" ? "[ADRESSE DU CLIENT]" : "[CLIENT ADDRESS]")}`,
            ),

            createParagraph(""), // Ligne vide

            createBoldParagraph(
              language === "fr"
                ? "IL A ÉTÉ CONVENU CE QUI SUIT :"
                : "IT HAS BEEN AGREED AS FOLLOWS:",
              "",
            ),

            // Articles
            createHeading(
              language === "fr" ? "ARTICLE 1 - OBJET" : "ARTICLE 1 - OBJECT",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le prestataire s'engage à fournir les services suivants :"
                : "The service provider agrees to provide the following services:",
            ),
            createParagraph(
              language === "fr"
                ? "[DÉCRIRE LA MISSION EN DÉTAIL]"
                : "[DESCRIBE THE MISSION IN DETAIL]",
            ),

            createHeading(
              language === "fr" ? "ARTICLE 2 - DURÉE" : "ARTICLE 2 - DURATION",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "La mission débutera le [DATE DE DÉBUT] et se terminera le [DATE DE FIN]."
                : "The mission will start on [START DATE] and end on [END DATE].",
            ),

            createHeading(
              language === "fr"
                ? "ARTICLE 3 - RÉMUNÉRATION"
                : "ARTICLE 3 - COMPENSATION",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Les parties conviennent d'une rémunération de :"
                : "The parties agree on a compensation of:",
            ),
            createParagraph(
              `${language === "fr" ? "- Tarif journalier :" : "- Daily rate:"} ${formData?.dailyRate || "[MONTANT]"}€ HT/jour`,
            ),

            // ARTICLE 4 - OBLIGATIONS
            createHeading(
              language === "fr"
                ? "ARTICLE 4 - OBLIGATIONS DU PRESTATAIRE"
                : "ARTICLE 4 - SERVICE PROVIDER OBLIGATIONS",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le prestataire s'engage à :"
                : "The service provider undertakes to:",
            ),
            createParagraph(
              language === "fr"
                ? "- Réaliser la mission avec diligence et professionnalisme"
                : "- Perform the mission with diligence and professionalism",
            ),
            createParagraph(
              language === "fr"
                ? "- Respecter les délais convenus"
                : "- Respect the agreed deadlines",
            ),
            createParagraph(
              language === "fr"
                ? "- Informer le client de tout retard ou difficulté"
                : "- Inform the client of any delay or difficulty",
            ),

            // ARTICLE 5 - CLIENT OBLIGATIONS
            createHeading(
              language === "fr"
                ? "ARTICLE 5 - OBLIGATIONS DU CLIENT"
                : "ARTICLE 5 - CLIENT OBLIGATIONS",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le client s'engage à :"
                : "The client undertakes to:",
            ),
            createParagraph(
              language === "fr"
                ? "- Fournir les informations nécessaires à la réalisation de la mission"
                : "- Provide the information necessary for the performance of the mission",
            ),
            createParagraph(
              language === "fr"
                ? "- Régler les factures dans les délais convenus"
                : "- Settle invoices within the agreed deadlines",
            ),
            createParagraph(
              language === "fr"
                ? "- Donner un accès aux ressources nécessaires"
                : "- Provide access to the necessary resources",
            ),

            // ARTICLE 6 & 7 - IP & CONFIDENTIALITY
            createHeading(
              language === "fr"
                ? "ARTICLE 6 - PROPRIÉTÉ INTELLECTUELLE"
                : "ARTICLE 6 - INTELLECTUAL PROPERTY",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le prestataire cède au client l'intégralité des droits de propriété intellectuelle sur les livrables à compter du paiement complet de la prestation."
                : "The provider assigns all intellectual property rights to the deliverables upon full payment.",
            ),

            createHeading(
              language === "fr"
                ? "ARTICLE 7 - CONFIDENTIALITÉ"
                : "ARTICLE 7 - CONFIDENTIALITY",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Les parties s'engagent à garder confidentielles toutes informations échangées."
                : "The parties undertake to keep all exchanged information confidential.",
            ),

            // ARTICLE 8 & 9 - TERMINATION & LAW
            createHeading(
              language === "fr"
                ? "ARTICLE 8 - RÉSILIATION"
                : "ARTICLE 8 - TERMINATION",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le contrat peut être résilié par l'une ou l'autre des parties avec un préavis de [DURÉE]."
                : "The contract may be terminated by either party with a notice period of [DURATION].",
            ),

            createHeading(
              language === "fr"
                ? "ARTICLE 9 - LOI APPLICABLE"
                : "ARTICLE 9 - APPLICABLE LAW",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le présent contrat est soumis au droit français."
                : "This contract is governed by French law.",
            ),

            // Signatures
            createParagraph(""), // Ligne vide
            createParagraph(""), // Ligne vide
            createParagraph(
              language === "fr"
                ? `Fait en deux exemplaires à [VILLE], le ${date}`
                : `Done in duplicate in [CITY], on ${date}`,
            ),
            createParagraph(""), // Ligne vide

            new Paragraph({
              children: [
                new TextRun({
                  text: language === "fr" ? "Le Prestataire" : "The Provider",
                  bold: true,
                }),
                new TextRun({
                  text: "                                        ",
                }),
                new TextRun({
                  text: language === "fr" ? "Le Client" : "The Client",
                  bold: true,
                }),
              ],
              spacing: { before: 400 },
            }),
            createParagraph(""),
            createParagraph(
              "[SIGNATURE]                                        [SIGNATURE]",
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
      },
    );

    return new Document({
      sections: [
        {
          properties: {},
          children: [
            // Titre
            new Paragraph({
              text:
                language === "fr"
                  ? "CONDITIONS GÉNÉRALES DE VENTE"
                  : "TERMS AND CONDITIONS",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 200 },
            }),
            new Paragraph({
              text:
                userInfo.company ||
                userInfo.name ||
                (language === "fr" ? "[VOTRE ENTREPRISE]" : "[YOUR COMPANY]"),
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 },
            }),

            // Article 1
            createHeading(
              language === "fr"
                ? "Article 1 - Champ d'application"
                : "Article 1 - Scope of Application",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? `Les présentes conditions générales de vente s'appliquent à toutes les prestations de services réalisées par ${userInfo.name || "[VOTRE NOM]"}.`
                : `These general terms and conditions apply to all services provided by ${userInfo.name || "[YOUR NAME]"}.`,
            ),

            // Article 2
            createHeading(
              language === "fr"
                ? "Article 2 - Commandes"
                : "Article 2 - Orders",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Toute commande implique l'acceptation sans réserve des présentes CGV."
                : "Any order implies the unreserved acceptance of these T&Cs.",
            ),

            // Article 3
            createHeading(
              language === "fr" ? "Article 3 - Prix" : "Article 3 - Pricing",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Les prix sont exprimés en euros hors taxes (HT)."
                : "Prices are expressed in euros excluding taxes (VAT).",
            ),
            createParagraph(
              legalStatus === "auto-entrepreneur"
                ? language === "fr"
                  ? "TVA non applicable, art. 293 B du CGI."
                  : "VAT not applicable, art. 293 B of the CGI."
                : language === "fr"
                  ? "TVA applicable selon le taux en vigueur."
                  : "VAT applicable at the current rate.",
            ),

            // Article 4
            createHeading(
              language === "fr"
                ? "Article 4 - Modalités de paiement"
                : "Article 4 - Payment Terms",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le paiement s'effectue :"
                : "Payment is made:",
            ),
            createParagraph(
              language === "fr"
                ? "- Par virement bancaire"
                : "- By bank transfer",
            ),
            createParagraph(
              language === "fr"
                ? "- Délai de paiement : 30 jours à réception de facture"
                : "- Payment term: 30 days from receipt of invoice",
            ),
            createParagraph(
              language === "fr"
                ? "- En cas de retard : pénalités de 3 fois le taux d'intérêt légal"
                : "- In case of late payment: penalties of 3 times the legal interest rate",
            ),

            // Article 5
            createHeading(
              language === "fr"
                ? "Article 5 - Délais de livraison"
                : "Article 5 - Delivery Deadlines",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Les délais de livraison sont indicatifs et ne sont pas garantis."
                : "Delivery times are indicative and are not guaranteed.",
            ),

            // Article 6
            createHeading(
              language === "fr"
                ? "Article 6 - Propriété intellectuelle"
                : "Article 6 - Intellectual Property",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Les livrables restent la propriété du prestataire jusqu'au paiement intégral."
                : "Deliverables remain the property of the provider until full payment.",
            ),

            // Article 7
            createHeading(
              language === "fr"
                ? "Article 7 - Responsabilité"
                : "Article 7 - Liability",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le prestataire ne peut être tenu responsable que de ses fautes prouvées."
                : "The provider can only be held responsible for proven faults.",
            ),

            // Article 8
            createHeading(
              language === "fr"
                ? "Article 8 - Force majeure"
                : "Article 8 - Force Majeure",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le prestataire ne pourra être tenu responsable en cas de force majeure."
                : "The provider cannot be held responsible in case of force majeure.",
            ),

            // Article 9
            createHeading(
              language === "fr"
                ? "Article 9 - Litiges"
                : "Article 9 - Disputes",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "En cas de litige, les parties s'efforceront de trouver une solution amiable."
                : "In the event of a dispute, the parties will endeavor to find an amicable solution.",
            ),
            createParagraph(
              language === "fr"
                ? "À défaut, compétence exclusive est attribuée aux tribunaux de [VILLE]."
                : "Failing that, exclusive jurisdiction is granted to the courts of [CITY].",
            ),

            // Coordonnées
            createParagraph(""),
            createHeading(
              language === "fr" ? "Coordonnées :" : "Contact Information:",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              userInfo.name ||
                (language === "fr" ? "[VOTRE NOM]" : "[YOUR NAME]"),
            ),
            createParagraph(userInfo.company || ""),
            createParagraph(
              `${language === "fr" ? "SIRET :" : "Business ID :"} ${userInfo.siret || (language === "fr" ? "[À COMPLÉTER]" : "[TO COMPLETE]")}`,
            ),
            createParagraph(
              userInfo.address ||
                (language === "fr" ? "[VOTRE ADRESSE]" : "[YOUR ADDRESS]"),
            ),
            createParagraph(
              userInfo.email ||
                (language === "fr" ? "[VOTRE EMAIL]" : "[YOUR EMAIL]"),
            ),
            createParagraph(
              userInfo.phone ||
                (language === "fr" ? "[VOTRE TÉLÉPHONE]" : "[YOUR PHONE]"),
            ),

            createParagraph(""),
            createParagraph(
              language === "fr"
                ? `Dernière mise à jour : ${date}`
                : `Last update: ${date}`,
            ),
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
      },
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
              `Adresse : ${userInfo.address || "[VOTRE ADRESSE]"}`,
            ),
            createParagraph(`Email : ${userInfo.email || "[VOTRE EMAIL]"}`),
            createParagraph(
              `Téléphone : ${userInfo.phone || "[VOTRE TÉLÉPHONE]"}`,
            ),
            createParagraph(""),
            legalStatus === "auto-entrepreneur"
              ? createParagraph(
                  "Auto-entrepreneur - Immatriculation à l'URSSAF",
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
              "L'ensemble du contenu de ce site (textes, images, vidéos) est protégé par le droit d'auteur.",
            ),
            createParagraph(
              "Toute reproduction est interdite sans autorisation écrite.",
            ),

            createHeading(
              "Données personnelles (RGPD)",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.",
            ),
            createParagraph(`Contact : ${userInfo.email || "[VOTRE EMAIL]"}`),

            createHeading("Cookies", HeadingLevel.HEADING_2),
            createParagraph(
              "Ce site utilise des cookies pour améliorer l'expérience utilisateur.",
            ),
            createParagraph(
              "Vous pouvez les désactiver dans les paramètres de votre navigateur.",
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
      },
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
            createHeading(
              language === "fr"
                ? "Entre les soussignés :"
                : "Between the undersigned:",
              HeadingLevel.HEADING_1,
            ),

            createBoldParagraph(
              language === "fr" ? "PARTIE 1 :" : "PARTY 1:",
              "",
            ),
            createParagraph(userInfo.name || "[VOTRE NOM]"),
            createParagraph(userInfo.company || ""),
            createParagraph(
              `${language === "fr" ? "Adresse :" : "Address:"} ${userInfo.address || "[À COMPLÉTER]"}`,
            ),

            createParagraph(""), // Ligne vide

            createBoldParagraph(
              language === "fr" ? "PARTIE 2 :" : "PARTY 2:",
              "",
            ),
            createParagraph(clientInfo.name || "[NOM DE LA PARTIE 2]"),
            createParagraph(clientInfo.company || "[SOCIÉTÉ]"),
            createParagraph(
              `${language === "fr" ? "Adresse :" : "Address:"} ${clientInfo.address || "[ADRESSE]"}`,
            ),

            createParagraph(""), // Ligne vide

            createBoldParagraph(
              language === "fr"
                ? "IL A ÉTÉ CONVENU CE QUI SUIT :"
                : "IT HAS BEEN AGREED AS FOLLOWS:",
              "",
            ),

            // Articles
            createHeading(
              language === "fr"
                ? "Article 1 - Définitions"
                : "Article 1 - Definitions",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? '"Informations Confidentielles" désigne toute information, de quelque nature que ce soit, échangée entre les parties dans le cadre de leur collaboration.'
                : '"Confidential Information" means any information, of any nature whatsoever, exchanged between the parties as part of their collaboration.',
            ),

            createHeading(
              language === "fr"
                ? "Article 2 - Engagement de confidentialité"
                : "Article 2 - Confidentiality Undertaking",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Les parties s'engagent à :"
                : "The parties undertake to:",
            ),
            createParagraph(
              language === "fr"
                ? "- Ne pas divulguer les Informations Confidentielles à des tiers"
                : "- Not disclose Confidential Information to third parties",
            ),
            createParagraph(
              language === "fr"
                ? "- Utiliser ces informations uniquement dans le cadre de la mission"
                : "- Use this information only within the scope of the mission",
            ),

            createHeading(
              language === "fr"
                ? "Article 3 - Exceptions"
                : "Article 3 - Exceptions",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Ne sont pas considérées comme confidentielles les informations :"
                : "Information shall not be considered confidential if it is:",
            ),
            createParagraph(
              language === "fr"
                ? "- Déjà publiques au moment de la divulgation"
                : "- Already public at the time of disclosure",
            ),
            createParagraph(
              language === "fr"
                ? "- Obtenues légalement d'un tiers"
                : "- Legally obtained from a third party",
            ),

            createHeading(
              language === "fr" ? "Article 4 - Durée" : "Article 4 - Duration",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le présent accord prend effet à compter de sa signature et reste en vigueur pendant une durée de [DURÉE] à compter de la fin de la collaboration."
                : "This agreement shall take effect upon signature and remain in force for a period of [DURATION] from the end of the collaboration.",
            ),

            createHeading(
              language === "fr"
                ? "Article 5 - Sanctions"
                : "Article 5 - Penalties",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "En cas de violation de cet accord, la partie fautive s'expose à des dommages et intérêts."
                : "In the event of a breach of this agreement, the defaulting party may be liable for damages.",
            ),

            createHeading(
              language === "fr"
                ? "Article 6 - Loi applicable"
                : "Article 6 - Governing Law",
              HeadingLevel.HEADING_2,
            ),
            createParagraph(
              language === "fr"
                ? "Le présent accord est régi par le droit français."
                : "This agreement is governed by French law.",
            ),

            // Signatures
            createParagraph(""), // Ligne vide
            createParagraph(""), // Ligne vide
            createParagraph(
              language === "fr"
                ? `Fait en deux exemplaires à [VILLE], le ${date}`
                : `Done in duplicate in [CITY], on ${date}`,
            ),
            createParagraph(""), // Ligne vide

            new Paragraph({
              children: [
                new TextRun({
                  text: language === "fr" ? "Partie 1" : "Party 1",
                  bold: true,
                }),
                new TextRun({
                  text: "                                        ",
                }),
                new TextRun({
                  text: language === "fr" ? "Partie 2" : "Party 2",
                  bold: true,
                }),
              ],
              spacing: { before: 400 },
            }),
            createParagraph(""),
            createParagraph(
              "[SIGNATURE]                                        [SIGNATURE]",
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

      // Toast success
      const successMsg =
        language === "fr"
          ? `Document "${t.templates[templateType].name}" généré !`
          : `Document "${t.templates[templateType].name}" generated!`;

      toast.success(successMsg, {
        icon: "📁",
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Erreur...", error);
      toast.error(
        language === "fr"
          ? "Erreur lors de la génération"
          : "Error generating document",
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
          {/* Badge du template sélectionné */}
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border-2 border-purple-300 dark:border-purple-700">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {t.templates[selectedTemplate].icon}
              </span>
              <div>
                <p className="text-xs font-medium text-purple-600 dark:text-purple-300 mb-1">
                  {language === "fr"
                    ? "📄 Document sélectionné"
                    : "📄 Selected document"}
                </p>
                <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {t.templates[selectedTemplate].name}
                </p>
              </div>
            </div>
          </div>

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

            {/* Section Client dans le formulaire */}
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-4">
              {t.clientInfo}
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={clientInfo.name}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="M. Jean Client"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.company}
                </label>
                <input
                  type="text"
                  value={clientInfo.company}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Client SA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.siret}
                </label>
                <input
                  type="text"
                  value={clientInfo.siret}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, siret: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="987 654 321 00012"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.address}
                </label>
                <input
                  type="text"
                  value={clientInfo.address}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="456 Avenue du Client, Paris"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractTemplates;
