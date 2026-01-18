// lib/validators.js - Validations réutilisables

// Regex email stricte (RFC 5322 compliant)
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const validateEmail = (email) => {
  if (!email) return false;
  if (email.length > 254) return false;
  if (!EMAIL_REGEX.test(email)) return false;

  // Vérifications supplémentaires
  const [local, domain] = email.split("@");

  // Local part ne doit pas dépasser 64 caractères
  if (local.length > 64) return false;

  // Domain doit avoir au moins 2 parties (ex: gmail.com)
  if (!domain || domain.split(".").length < 2) return false;

  // TLD doit avoir au moins 2 caractères
  const tld = domain.split(".").pop();
  if (tld.length < 2) return false;

  return true;
};
