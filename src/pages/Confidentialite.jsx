import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Confidentialite = () => {
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
            Politique de Confidentialité
          </h1>

          <div className="prose prose-purple dark:prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-600 dark:text-gray-400">
                La protection de vos données personnelles est une priorité pour
                PricingPro. Cette politique de confidentialité vous informe sur
                la manière dont nous collectons, utilisons et protégeons vos
                données.
              </p>
            </section>

            {/* Section 1 : Données collectées */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Données que nous collectons
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                1.1. Données fournies directement
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Lorsque vous utilisez notre calculateur de tarifs, vous pouvez
                fournir :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>Votre profession</li>
                <li>Votre niveau d'expérience</li>
                <li>Votre localisation (pays)</li>
                <li>Vos compétences techniques</li>
                <li>
                  Votre adresse email (optionnel, pour recevoir le rapport)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                1.2. Données collectées automatiquement
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2">
                <li>Adresse IP (anonymisée)</li>
                <li>Type de navigateur et appareil</li>
                <li>Pages visitées et durée de visite</li>
                <li>Préférences (langue, mode sombre) stockées localement</li>
              </ul>
            </section>

            {/* Section 2 : Utilisation des données */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Comment nous utilisons vos données
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous utilisons vos données uniquement pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>Calculer votre tarif personnalisé</li>
                <li>
                  Vous envoyer le rapport par email (si vous l'avez demandé)
                </li>
                <li>Améliorer notre service et nos algorithmes</li>
                <li>Produire des statistiques anonymisées</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                <strong>Nous ne vendons jamais vos données à des tiers.</strong>
              </p>
            </section>

            {/* Section 3 : Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Cookies et technologies similaires
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                PricingPro utilise uniquement des cookies essentiels :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>
                  <strong>localStorage :</strong> Sauvegarde vos préférences
                  (langue, mode sombre)
                </li>
                <li>
                  <strong>Pas de cookies publicitaires</strong>
                </li>
                <li>
                  <strong>Pas de trackers tiers</strong> (Google Analytics,
                  Facebook Pixel, etc.)
                </li>
              </ul>
            </section>

            {/* Section 4 : Partage des données */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Partage de vos données
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous ne partageons vos données qu'avec :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>
                  <strong>Vercel</strong> (hébergement du site)
                </li>
                <li>
                  <strong>Resend</strong> (envoi d'emails, si vous demandez un
                  rapport)
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Ces prestataires sont conformes au RGPD et ne peuvent utiliser
                vos données que pour fournir leurs services.
              </p>
            </section>

            {/* Section 5 : Durée de conservation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Durée de conservation
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2">
                <li>
                  <strong>Données de calcul :</strong> 30 jours (pour
                  statistiques)
                </li>
                <li>
                  <strong>Emails :</strong> 12 mois (pour support client)
                </li>
                <li>
                  <strong>Logs serveur :</strong> 90 jours
                </li>
              </ul>
            </section>

            {/* Section 6 : Vos droits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Vos droits (RGPD)
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>
                  <strong>Droit d'accès :</strong> Obtenir une copie de vos
                  données
                </li>
                <li>
                  <strong>Droit de rectification :</strong> Corriger des données
                  inexactes
                </li>
                <li>
                  <strong>Droit à l'effacement :</strong> Supprimer vos données
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> Récupérer vos
                  données dans un format structuré
                </li>
                <li>
                  <strong>Droit d'opposition :</strong> Vous opposer au
                  traitement de vos données
                </li>
                <li>
                  <strong>Droit de limitation :</strong> Limiter le traitement
                  de vos données
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Pour exercer ces droits, contactez-nous à :{" "}
                <a
                  href="mailto:contact@pricingpro.fr"
                  className="text-purple-600 hover:underline"
                >
                  contact@pricingpro.fr
                </a>
              </p>
            </section>

            {/* Section 7 : Sécurité */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Sécurité de vos données
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous mettons en œuvre des mesures de sécurité pour protéger vos
                données :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>Chiffrement HTTPS (SSL/TLS)</li>
                <li>Serveurs sécurisés (Vercel)</li>
                <li>Accès limité aux données</li>
                <li>Sauvegardes régulières</li>
              </ul>
            </section>

            {/* Section 8 : Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Modifications de cette politique
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous pouvons modifier cette politique de confidentialité à tout
                moment. Les modifications seront publiées sur cette page avec
                une nouvelle date de mise à jour.
              </p>
            </section>

            {/* Section 9 : Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Nous contacter
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pour toute question concernant cette politique de
                confidentialité ou vos données personnelles :
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                <strong>Email :</strong>{" "}
                <a
                  href="mailto:contact@pricingpro.fr"
                  className="text-purple-600 hover:underline"
                >
                  contact@pricingpro.fr
                </a>
                <br />
                <strong>Adresse :</strong> Paris, France
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Si vous estimez que vos droits ne sont pas respectés, vous
                pouvez déposer une réclamation auprès de la CNIL :
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline ml-1"
                >
                  www.cnil.fr
                </a>
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

export default Confidentialite;
