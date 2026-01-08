import fs from "fs";
import { professionsData } from "./src/data/professionData.js";

const BASE_URL = "https://pricingpro.fr";

const generateSitemap = () => {
  // Pages statiques avec leurs configurations
  const staticPages = [
    { url: "/", priority: 1.0 },
    { url: "/calculator", priority: 0.8 },
    { url: "/generateur-devis-freelance", priority: 0.8 },
    { url: "/mentions-legales", priority: 0.3 },
    { url: "/mentions-legales-en", priority: 0.3 },
    { url: "/confidentialite", priority: 0.3 },
    { url: "/confidentialite-en", priority: 0.3 },
  ];

  const professionPages = [];
  const keys = Object.keys(professionsData);

  keys.forEach((key) => {
    const p = professionsData[key];
    if (p && p.slug) {
      // Pour les professions, on crée aussi des objets avec priorité 0.8
      if (p.slug.fr)
        professionPages.push({ url: `/${p.slug.fr}`, priority: 0.8 });
      if (p.slug.en)
        professionPages.push({ url: `/${p.slug.en}`, priority: 0.8 });
    }
  });

  const allPages = [...staticPages, ...professionPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
    <url>
      <loc>${BASE_URL}${page.url}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page.priority}</priority>
    </url>`,
    )
    .join("")}
</urlset>`;

  if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
  }

  fs.writeFileSync("./public/sitemap.xml", sitemap);
  console.log(
    `✅ Sitemap.xml généré proprement ! (${allPages.length} pages répertoriées)`,
  );
};

generateSitemap();
