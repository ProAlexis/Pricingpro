// CORS sécurisé - domaines autorisés uniquement
const ALLOWED_ORIGINS = [
  "https://pricingpro.fr",
  "https://www.pricingpro.fr",
  "http://localhost:5173", // Dev local
  "http://localhost:3000", // Dev local alternative
];

export const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;

  // Vérifier si l'origine est autorisée
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (process.env.NODE_ENV === "development") {
    // En dev, autoriser localhost
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400"); // 24h
};

export const handleCors = (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }

  return false;
};
