import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MentionsLegalesEN = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to home
        </Link>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Legal Notice
          </h1>

          <div className="prose prose-purple dark:prose-invert max-w-none space-y-8">
            {/* Section 1: Publisher */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Site Publisher
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Site name:</strong> PricingPro<br />
                <strong>URL:</strong> https://pricingpro.fr<br />
                <strong>Type:</strong> Professional toolkit for freelancers<br />
                <strong>Contact:</strong> contact@pricingpro.fr
              </p>
            </section>

            {/* Section 2: Publication Director */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Publication Director
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> contact@pricingpro.fr
              </p>
            </section>

            {/* Section 3: Hosting */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Hosting
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Host:</strong> Vercel Inc.<br />
                <strong>Address:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
                <strong>Website:</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">vercel.com</a>
              </p>
            </section>

            {/* Section 4: Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                All content on this site is subject to French and international copyright and intellectual property laws. 
                All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Reproduction of all or part of this site on any electronic or other medium is strictly prohibited 
                without express authorization from the publication director.
              </p>
            </section>

            {/* Section 5: Personal Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Personal Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                In accordance with the French "Informatique et Libertés" law of January 6, 1978, as amended, and the General Data Protection Regulation (GDPR), 
                you have the right to access, rectify, and delete data concerning you.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                For more information, please consult our <Link to="/privacy-policy" className="text-purple-600 hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            {/* Section 6: Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                The information contained on this site is as accurate as possible and the site is periodically updated, 
                but may contain inaccuracies, omissions or gaps.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                PricingPro provides freelance rate estimates based on market data. These estimates are provided 
                for informational purposes only and do not constitute professional, legal, or tax advice.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Some platform features may be subject to payment. Pricing conditions will be clearly indicated before any transaction.
              </p>
            </section>

            {/* Section 7: Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                This site uses only cookies essential to site functionality (language preferences, dark mode). 
                No advertising or tracking cookies are used.
              </p>
            </section>

            {/* Section 8: Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                For any questions or complaints regarding the site, you can contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                <strong>Email:</strong> <a href="mailto:contact@pricingpro.fr" className="text-purple-600 hover:underline">contact@pricingpro.fr</a>
              </p>
            </section>
          </div>

          {/* Last updated */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegalesEN;
