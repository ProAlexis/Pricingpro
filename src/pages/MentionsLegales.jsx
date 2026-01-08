import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à l'accueil
        </Link>

        {/* Contenu */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Mentions Légales
          </h1>

          <div className="prose prose-purple dark:prose-invert max-w-none space-y-8">
            {/* Section 1 : Éditeur */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Éditeur du site
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Nom du site :</strong> PricingPro<br />
                <strong>URL :</strong> https://pricingpro.fr<br />
                <strong>Type :</strong> Suite d'outils professionnels pour freelances<br />
                <strong>Contact :</strong> contact@pricingpro.fr
              </p>
            </section>

            {/* Section 2 : Directeur de publication */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Directeur de la publication
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email :</strong> contact@pricingpro.fr
              </p>
            </section>

            {/* Section 3 : Hébergement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Hébergement
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Hébergeur :</strong> Vercel Inc.<br />
                <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
                <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">vercel.com</a>
              </p>
            </section>

            {/* Section 4 : Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Propriété intellectuelle
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite 
                sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            {/* Section 5 : Données personnelles */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Données personnelles
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
                vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Pour plus d'informations, consultez notre <Link to="/confidentialite" className="text-purple-600 hover:underline">Politique de confidentialité</Link>.
              </p>
            </section>

            {/* Section 6 : Limitation de responsabilité */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Limitation de responsabilité
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                PricingPro fournit des estimations de tarifs freelance basées sur des données de marché. Ces estimations sont fournies 
                à titre indicatif et ne constituent en aucun cas un conseil professionnel, juridique ou fiscal.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Certaines fonctionnalités de la plateforme peuvent être soumises à paiement. Les conditions tarifaires seront clairement indiquées avant toute transaction.
              </p>
            </section>

            {/* Section 7 : Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ce site utilise uniquement des cookies essentiels au fonctionnement du site (préférences de langue, mode sombre). 
                Aucun cookie publicitaire ou de tracking n'est utilisé.
              </p>
            </section>

            {/* Section 8 : Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Nous contacter
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pour toute question ou réclamation concernant le site, vous pouvez nous contacter à l'adresse suivante :
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                <strong>Email :</strong> <a href="mailto:contact@pricingpro.fr" className="text-purple-600 hover:underline">contact@pricingpro.fr</a>
              </p>
            </section>
          </div>

          {/* Date de mise à jour */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dernière mise à jour : Janvier 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
