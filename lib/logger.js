// lib/logger.js - Logging sécurisé sans PII en production

// Masquer les emails en production
export const maskEmail = (email) => {
  if (!email) return "N/A";

  if (process.env.NODE_ENV === "production") {
    const [local, domain] = email.split("@");
    if (!local || !domain) return "***@***";
    return `${local[0]}***@${domain}`;
  }
  return email;
};

// Logger qui masque automatiquement les données sensibles
export const secureLog = {
  info: (message, email = null) => {
    if (email) {
      console.log(message, maskEmail(email));
    } else {
      console.log(message);
    }
  },

  error: (message, error = null) => {
    // En production, on ne log pas les stack traces
    if (process.env.NODE_ENV === "production") {
      console.error(message, error?.message || error);
    } else {
      console.error(message, error);
    }
  },
};
