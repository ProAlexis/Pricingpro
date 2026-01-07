import React, { useState } from 'react';
import { FileText, Download, Check, AlertCircle } from 'lucide-react';

const ContractTemplates = ({ formData, legalStatus, language = 'fr' }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    company: '',
    siret: '',
    address: '',
    email: '',
    phone: ''
  });
  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    address: '',
    siret: ''
  });

  const translations = {
    fr: {
      title: "Templates de Documents Juridiques",
      subtitle: "Téléchargez des templates professionnels prêts à l'emploi",
      templates: {
        mission: {
          name: "Contrat de Mission Freelance",
          desc: "Contrat cadre pour missions freelance (CDD, régie, forfait)",
          icon: "📝"
        },
        cgv: {
          name: "Conditions Générales de Vente (CGV)",
          desc: "CGV conformes à la loi française pour freelances",
          icon: "📋"
        },
        mentions: {
          name: "Mentions Légales",
          desc: "Mentions légales pour votre site web",
          icon: "⚖️"
        },
        nda: {
          name: "Accord de Confidentialité (NDA)",
          desc: "Clause de confidentialité bilatérale",
          icon: "🔒"
        }
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
      generate: "Générer le document",
      close: "Fermer",
      warning: "Ces templates sont fournis à titre informatif. Consultez un avocat pour vous assurer qu'ils correspondent à votre situation.",
      disclaimer: "⚠️ Ces documents sont des modèles génériques. Adaptez-les à votre situation et faites-les valider par un professionnel du droit."
    },
    en: {
      title: "Legal Document Templates",
      subtitle: "Download professional ready-to-use templates",
      templates: {
        mission: {
          name: "Freelance Mission Contract",
          desc: "Framework contract for freelance missions",
          icon: "📝"
        },
        cgv: {
          name: "Terms and Conditions",
          desc: "T&C compliant with French law for freelancers",
          icon: "📋"
        },
        mentions: {
          name: "Legal Notice",
          desc: "Legal notice for your website",
          icon: "⚖️"
        },
        nda: {
          name: "Non-Disclosure Agreement (NDA)",
          desc: "Bilateral confidentiality clause",
          icon: "🔒"
        }
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
      generate: "Generate document",
      close: "Close",
      warning: "These templates are provided for informational purposes. Consult a lawyer to ensure they fit your situation.",
      disclaimer: "⚠️ These documents are generic templates. Adapt them to your situation and have them validated by a legal professional."
    }
  };

  const t = translations[language];

  const generateContract = (templateType) => {
    let content = '';
    const date = new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    switch (templateType) {
      case 'mission':
        content = `
CONTRAT DE PRESTATION DE SERVICES
${language === 'fr' ? 'MISSION FREELANCE' : 'FREELANCE MISSION'}

${language === 'fr' ? 'Entre les soussignés :' : 'Between the undersigned:'}

${language === 'fr' ? 'LE PRESTATAIRE :' : 'THE SERVICE PROVIDER:'}
${userInfo.name}
${userInfo.company ? userInfo.company : ''}
SIRET : ${userInfo.siret || '[À COMPLÉTER]'}
Adresse : ${userInfo.address || '[À COMPLÉTER]'}
Email : ${userInfo.email || '[À COMPLÉTER]'}
Téléphone : ${userInfo.phone || '[À COMPLÉTER]'}

${language === 'fr' ? 'LE CLIENT :' : 'THE CLIENT:'}
${clientInfo.name || '[NOM DU CLIENT]'}
${clientInfo.company || '[SOCIÉTÉ DU CLIENT]'}
${clientInfo.siret ? `SIRET : ${clientInfo.siret}` : ''}
Adresse : ${clientInfo.address || '[ADRESSE DU CLIENT]'}

${language === 'fr' ? 'IL A ÉTÉ CONVENU CE QUI SUIT :' : 'IT HAS BEEN AGREED AS FOLLOWS:'}

${language === 'fr' ? 'ARTICLE 1 - OBJET' : 'ARTICLE 1 - OBJECT'}
Le prestataire s'engage à fournir les services suivants :
[DÉCRIRE LA MISSION EN DÉTAIL]

${language === 'fr' ? 'ARTICLE 2 - DURÉE' : 'ARTICLE 2 - DURATION'}
La mission débutera le [DATE DE DÉBUT] et se terminera le [DATE DE FIN].

${language === 'fr' ? 'ARTICLE 3 - RÉMUNÉRATION' : 'ARTICLE 3 - COMPENSATION'}
Les parties conviennent d'une rémunération de :
- Tarif journalier : [MONTANT]€ HT/jour
- Modalités de facturation : [MENSUELLE/À LA LIVRAISON]
- Conditions de paiement : [30 JOURS/À RÉCEPTION]

${language === 'fr' ? 'ARTICLE 4 - OBLIGATIONS DU PRESTATAIRE' : 'ARTICLE 4 - SERVICE PROVIDER OBLIGATIONS'}
Le prestataire s'engage à :
- Réaliser la mission avec diligence et professionnalisme
- Respecter les délais convenus
- Informer le client de tout retard ou difficulté

${language === 'fr' ? 'ARTICLE 5 - OBLIGATIONS DU CLIENT' : 'ARTICLE 5 - CLIENT OBLIGATIONS'}
Le client s'engage à :
- Fournir les informations nécessaires à la réalisation de la mission
- Régler les factures dans les délais convenus
- Donner un accès aux ressources nécessaires

${language === 'fr' ? 'ARTICLE 6 - PROPRIÉTÉ INTELLECTUELLE' : 'ARTICLE 6 - INTELLECTUAL PROPERTY'}
[DÉFINIR LA PROPRIÉTÉ DES LIVRABLES]

${language === 'fr' ? 'ARTICLE 7 - CONFIDENTIALITÉ' : 'ARTICLE 7 - CONFIDENTIALITY'}
Les parties s'engagent à garder confidentielles toutes informations échangées.

${language === 'fr' ? 'ARTICLE 8 - RÉSILIATION' : 'ARTICLE 8 - TERMINATION'}
Le contrat peut être résilié par l'une ou l'autre des parties avec un préavis de [DURÉE].

${language === 'fr' ? 'ARTICLE 9 - LOI APPLICABLE' : 'ARTICLE 9 - APPLICABLE LAW'}
Le présent contrat est soumis au droit français.

Fait en deux exemplaires à [VILLE], le ${date}

Le Prestataire                    Le Client
[SIGNATURE]                       [SIGNATURE]
`;
        break;

      case 'cgv':
        content = `
CONDITIONS GÉNÉRALES DE VENTE
${userInfo.company || userInfo.name}

${language === 'fr' ? 'Article 1 - Champ d\'application' : 'Article 1 - Scope'}
Les présentes conditions générales de vente s'appliquent à toutes les prestations de services réalisées par ${userInfo.name || '[VOTRE NOM]'}.

${language === 'fr' ? 'Article 2 - Commandes' : 'Article 2 - Orders'}
Toute commande implique l'acceptation sans réserve des présentes CGV.

${language === 'fr' ? 'Article 3 - Prix' : 'Article 3 - Prices'}
Les prix sont exprimés en euros hors taxes (HT).
${legalStatus === 'auto-entrepreneur' ? 'TVA non applicable, art. 293 B du CGI.' : 'TVA applicable selon le taux en vigueur.'}

${language === 'fr' ? 'Article 4 - Modalités de paiement' : 'Article 4 - Payment terms'}
Le paiement s'effectue :
- Par virement bancaire
- Délai de paiement : 30 jours à réception de facture
- En cas de retard : pénalités de 3 fois le taux d'intérêt légal

${language === 'fr' ? 'Article 5 - Délais de livraison' : 'Article 5 - Delivery times'}
Les délais de livraison sont indicatifs et ne sont pas garantis.

${language === 'fr' ? 'Article 6 - Propriété intellectuelle' : 'Article 6 - Intellectual property'}
Les livrables restent la propriété du prestataire jusqu'au paiement intégral.

${language === 'fr' ? 'Article 7 - Responsabilité' : 'Article 7 - Liability'}
Le prestataire ne peut être tenu responsable que de ses fautes prouvées.

${language === 'fr' ? 'Article 8 - Force majeure' : 'Article 8 - Force majeure'}
Le prestataire ne pourra être tenu responsable en cas de force majeure.

${language === 'fr' ? 'Article 9 - Litiges' : 'Article 9 - Disputes'}
En cas de litige, les parties s'efforceront de trouver une solution amiable.
À défaut, compétence exclusive est attribuée aux tribunaux de [VILLE].

${language === 'fr' ? 'Coordonnées :' : 'Contact:'}
${userInfo.name}
${userInfo.company || ''}
${userInfo.siret ? `SIRET: ${userInfo.siret}` : ''}
${userInfo.address}
${userInfo.email}
${userInfo.phone}

Dernière mise à jour : ${date}
`;
        break;

      case 'mentions':
        content = `
MENTIONS LÉGALES

${language === 'fr' ? 'Éditeur du site' : 'Website publisher'}
Nom : ${userInfo.name || '[VOTRE NOM]'}
${userInfo.company ? `Entreprise : ${userInfo.company}` : ''}
SIRET : ${userInfo.siret || '[VOTRE SIRET]'}
Adresse : ${userInfo.address || '[VOTRE ADRESSE]'}
Email : ${userInfo.email || '[VOTRE EMAIL]'}
Téléphone : ${userInfo.phone || '[VOTRE TÉLÉPHONE]'}

${legalStatus === 'auto-entrepreneur' ? 'Auto-entrepreneur - Immatriculation à l\'URSSAF' : ''}
${legalStatus === 'sasu' ? 'SASU - Immatriculation au RCS' : ''}
${legalStatus === 'eurl' ? 'EURL - Immatriculation au RCS' : ''}

${language === 'fr' ? 'Directeur de publication' : 'Publication director'}
${userInfo.name || '[VOTRE NOM]'}

${language === 'fr' ? 'Hébergeur' : 'Host'}
${language === 'fr' ? '[NOM DE L\'HÉBERGEUR]' : '[HOST NAME]'}
[ADRESSE DE L'HÉBERGEUR]
[TÉLÉPHONE DE L'HÉBERGEUR]

${language === 'fr' ? 'Propriété intellectuelle' : 'Intellectual property'}
L'ensemble du contenu de ce site (textes, images, vidéos) est protégé par le droit d'auteur.
Toute reproduction est interdite sans autorisation écrite.

${language === 'fr' ? 'Données personnelles (RGPD)' : 'Personal data (GDPR)'}
Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
Contact : ${userInfo.email || '[VOTRE EMAIL]'}

${language === 'fr' ? 'Cookies' : 'Cookies'}
Ce site utilise des cookies pour améliorer l'expérience utilisateur.
Vous pouvez les désactiver dans les paramètres de votre navigateur.

Dernière mise à jour : ${date}
`;
        break;

      case 'nda':
        content = `
ACCORD DE CONFIDENTIALITÉ (NDA)
${language === 'fr' ? 'ACCORD DE NON-DIVULGATION' : 'NON-DISCLOSURE AGREEMENT'}

Entre les soussignés :

PARTIE 1 :
${userInfo.name}
${userInfo.company || ''}
Adresse : ${userInfo.address || '[À COMPLÉTER]'}

PARTIE 2 :
${clientInfo.name || '[NOM DE LA PARTIE 2]'}
${clientInfo.company || '[SOCIÉTÉ]'}
Adresse : ${clientInfo.address || '[ADRESSE]'}

${language === 'fr' ? 'IL A ÉTÉ CONVENU CE QUI SUIT :' : 'IT HAS BEEN AGREED AS FOLLOWS:'}

${language === 'fr' ? 'Article 1 - Définitions' : 'Article 1 - Definitions'}
"Informations Confidentielles" désigne toute information, de quelque nature que ce soit, 
échangée entre les parties dans le cadre de leur collaboration.

${language === 'fr' ? 'Article 2 - Engagement de confidentialité' : 'Article 2 - Confidentiality commitment'}
Les parties s'engagent à :
- Ne pas divulguer les Informations Confidentielles à des tiers
- Utiliser ces informations uniquement dans le cadre de la mission
- Protéger ces informations avec le même soin que leurs propres informations confidentielles

${language === 'fr' ? 'Article 3 - Exceptions' : 'Article 3 - Exceptions'}
Ne sont pas considérées comme confidentielles les informations :
- Déjà publiques au moment de la divulgation
- Obtenues légalement d'un tiers
- Développées indépendamment par la partie réceptrice

${language === 'fr' ? 'Article 4 - Durée' : 'Article 4 - Duration'}
Le présent accord prend effet à compter de sa signature et reste en vigueur pendant 
une durée de [DURÉE] à compter de la fin de la collaboration.

${language === 'fr' ? 'Article 5 - Sanctions' : 'Article 5 - Sanctions'}
En cas de violation de cet accord, la partie fautive s'expose à des dommages et intérêts.

${language === 'fr' ? 'Article 6 - Loi applicable' : 'Article 6 - Applicable law'}
Le présent accord est régi par le droit français.

Fait en deux exemplaires à [VILLE], le ${date}

Partie 1                          Partie 2
[SIGNATURE]                       [SIGNATURE]
`;
        break;

      default:
        content = 'Template non trouvé';
    }

    // Télécharger le fichier
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const templateNames = {
      mission: 'Contrat_Mission',
      cgv: 'CGV',
      mentions: 'Mentions_Legales',
      nda: 'NDA'
    };

    link.setAttribute('href', url);
    link.setAttribute('download', `${templateNames[templateType]}_${date.replace(/\s/g, '_')}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <p className="text-gray-600 dark:text-gray-400">
            {t.subtitle}
          </p>
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
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
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
                  onChange={(e) => setUserInfo({...userInfo, company: e.target.value})}
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
                  onChange={(e) => setUserInfo({...userInfo, siret: e.target.value})}
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
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
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
                  onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
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
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>

            <button
              onClick={() => generateContract(selectedTemplate)}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t.generate}
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
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
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
