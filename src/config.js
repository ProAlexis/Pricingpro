// Configuration centralisée de l'application
export const config = {
  siteUrl:
    typeof window !== "undefined"
      ? window.location.origin
      : "https://pricingpro.fr",

  // Métadonnées du site
  siteName: "PricingPro",
  siteDescription: "Calculateur de tarifs intelligent pour freelances",

  // Email de contact
  contactEmail: "contact@pricingpro.fr",

  // Réseaux sociaux (optionnel)
  social: {
    twitter: "@pricingpro",
    linkedin: "pricingpro",
  },
};
