import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PolitiqueConfidentialite = () => {
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
            Privacy Policy
          </h1>

          <div className="prose prose-purple dark:prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-600 dark:text-gray-400">
                Protecting your personal data is a priority for PricingPro. This
                privacy policy informs you about how we collect, use, and
                protect your data.
              </p>
            </section>

            {/* Section 1: Data We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Data We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                1.1. Data You Provide Directly
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                When using our rate calculator, you may provide:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>Your profession</li>
                <li>Your experience level</li>
                <li>Your location (country)</li>
                <li>Your technical skills</li>
                <li>Your email address (optional, to receive the report)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                1.2. Data Collected Automatically
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2">
                <li>IP address (anonymized)</li>
                <li>Browser type and device</li>
                <li>Pages visited and visit duration</li>
                <li>Preferences (language, dark mode) stored locally</li>
              </ul>
            </section>

            {/* Section 2: How We Use Your Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. How We Use Your Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We use your data only to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>Calculate your personalized rate</li>
                <li>Send you the report by email (if requested)</li>
                <li>Improve our service and algorithms</li>
                <li>Produce anonymized statistics</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                <strong>We never sell your data to third parties.</strong>
              </p>
            </section>

            {/* Section 3: Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Cookies and Similar Technologies
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                PricingPro only uses essential cookies:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>
                  <strong>localStorage:</strong> Saves your preferences
                  (language, dark mode)
                </li>
                <li>
                  <strong>No advertising cookies</strong>
                </li>
                <li>
                  <strong>No third-party trackers</strong> (Google Analytics,
                  Facebook Pixel, etc.)
                </li>
              </ul>
            </section>

            {/* Section 4: Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Sharing Your Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We only share your data with:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>
                  <strong>Vercel</strong> (site hosting)
                </li>
                <li>
                  <strong>Resend</strong> (email sending, if you request a
                  report)
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                These providers are GDPR compliant and may only use your data to
                provide their services.
              </p>
            </section>

            {/* Section 5: Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Data Retention Period
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2">
                <li>
                  <strong>Calculation data:</strong> 30 days (for statistics)
                </li>
                <li>
                  <strong>Emails:</strong> 12 months (for customer support)
                </li>
                <li>
                  <strong>Server logs:</strong> 90 days
                </li>
              </ul>
            </section>

            {/* Section 6: Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Your Rights (GDPR)
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Under GDPR, you have the following rights:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>
                  <strong>Right of access:</strong> Obtain a copy of your data
                </li>
                <li>
                  <strong>Right to rectification:</strong> Correct inaccurate
                  data
                </li>
                <li>
                  <strong>Right to erasure:</strong> Delete your data
                </li>
                <li>
                  <strong>Right to portability:</strong> Retrieve your data in a
                  structured format
                </li>
                <li>
                  <strong>Right to object:</strong> Object to the processing of
                  your data
                </li>
                <li>
                  <strong>Right to restriction:</strong> Limit the processing of
                  your data
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                To exercise these rights, contact us at:{" "}
                <a
                  href="mailto:contact@pricingpro.fr"
                  className="text-purple-600 hover:underline"
                >
                  contact@pricingpro.fr
                </a>
              </p>
            </section>

            {/* Section 7: Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We implement security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2 mt-2">
                <li>HTTPS encryption (SSL/TLS)</li>
                <li>Secure servers (Vercel)</li>
                <li>Limited data access</li>
                <li>Regular backups</li>
              </ul>
            </section>

            {/* Section 8: Policy Changes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We may update this privacy policy at any time. Changes will be
                posted on this page with a new update date.
              </p>
            </section>

            {/* Section 9: Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                For any questions regarding this privacy policy or your personal
                data:
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:contact@pricingpro.fr"
                  className="text-purple-600 hover:underline"
                >
                  contact@pricingpro.fr
                </a>
                <br />
                <strong>Adress :</strong> Paris, France
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                If you believe your rights are not being respected, you may file
                a complaint with the CNIL:
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

export default PolitiqueConfidentialite;
