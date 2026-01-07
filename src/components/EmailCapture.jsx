import { useState } from "react";
import { Mail, CheckCircle, Loader2, Shield } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

const EmailCapture = ({ results, formData, language }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  const translations = {
    fr: {
      title: "Recevez votre analyse complète par email",
      description:
        "Obtenez un rapport PDF détaillé avec vos tarifs recommandés et des conseils personnalisés pour augmenter vos revenus.",
      placeholder: "votre@email.com",
      button: "Recevoir mon analyse gratuite",
      sending: "Envoi en cours...",
      success: "Email envoyé avec succès !",
      successDetail:
        "Consultez votre boîte de réception dans quelques instants.",
      error: "Erreur lors de l'envoi.",
      errorDetail: "Veuillez réessayer plus tard ou vérifier votre email.",
      privacy: "Vos données restent privées et ne sont jamais partagées",
      benefits: [
        "📊 Rapport PDF détaillé",
        "💡 Conseils personnalisés",
        "📈 Stratégies d'augmentation",
      ],
    },
    en: {
      title: "Receive your complete analysis by email",
      description:
        "Get a detailed PDF report with your recommended rates and personalized advice to increase your income.",
      placeholder: "your@email.com",
      button: "Get my free analysis",
      sending: "Sending...",
      success: "Email sent successfully!",
      successDetail: "Check your inbox in a few moments.",
      error: "Error sending email.",
      errorDetail: "Please try again later or check your email.",
      privacy: "Your data remains private and is never shared",
      benefits: [
        "📊 Detailed PDF report",
        "💡 Personalized advice",
        "📈 Growth strategies",
      ],
    },
  };

  const t = translations[language];

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3. On vérifie la présence du token
    if (!token) {
      setStatus("error");
      setMessage(
        language === "fr"
          ? "Veuillez valider le captcha"
          : "Please verify the captcha",
      );
      return;
    }

    if (!email || !validateEmail(email)) {
      // ... ta logique de validation email existante ...
      return;
    }

    setStatus("loading");

    try {
      const apiUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:3000/api/save-email"
          : "/api/save-email";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          results,
          formData,
          language,
          captchaToken: token, // 4. ON ENVOIE LE TOKEN AU SERVEUR
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage(t.success);
        setEmail("");
        setToken(null); // On réinitialise le token après succès

        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
      setMessage(t.error);

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-2xl p-6 md:p-8 border-2 border-purple-300 dark:border-purple-700 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Icon & Title */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📬 {t.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t.description}
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap gap-2 mb-4">
            {t.benefits.map((benefit, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 border border-purple-200 dark:border-purple-700"
              >
                {benefit}
              </span>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={status === "loading" || status === "success"}
                  className="w-full px-4 py-3 pl-11 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 transition-all"
                  required
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button
                type="submit"
                disabled={
                  status === "loading" || status === "success" || !token
                }
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.sending}
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t.success.split("!")[0]}
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    {t.button}
                  </>
                )}
              </button>
            </div>

            {/* 6. WIDGET TURNSTILE */}
            <div className="flex justify-center py-2">
              <Turnstile
                siteKey="0x4AAAAAACLELsoxdK7GY1Sa"
                onSuccess={(token) => setToken(token)}
                onExpire={() => setToken(null)}
                options={{
                  theme: "auto",
                  size: "normal",
                }}
              />
            </div>

            {/* Status Message */}
            {message && (
              <div
                className={`flex items-start gap-2 p-3 rounded-lg ${
                  status === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : status === "error"
                      ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      : ""
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Mail className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      status === "success"
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {message}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      status === "success"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {status === "success" ? t.successDetail : t.errorDetail}
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{t.privacy}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;
