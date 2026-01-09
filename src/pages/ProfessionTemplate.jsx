// src/pages/ProfessionTemplate.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { professionsData } from "../data/professionData";

// On importe ton composant UI existant qui contient tout le design
import ProfessionPage from "./ProfessionPage";

const ProfessionTemplate = () => {
  const { slug } = useParams(); // On récupère ce qu'il y a dans l'URL (ex: "tarif-developpeur-web")
  const [foundKey, setFoundKey] = useState(null);
  const [detectedLang, setDetectedLang] = useState("fr");

  useEffect(() => {
    const key = Object.keys(professionsData).find((k) => {
      const p = professionsData[k];

      // Est-ce un URL français ?
      if (p.slug.fr === slug) {
        setDetectedLang("fr");
        return true;
      }
      // Est-ce un URL anglais ?
      if (p.slug.en === slug) {
        setDetectedLang("en");
        return true;
      }
      return false;
    });

    setFoundKey(key || null);
  }, [slug]);

  // Si on ne trouve pas de métier correspondant à l'URL
  if (!foundKey)
    return (
      <div className="text-center p-20 text-white">404 - Métier non trouvé</div>
    );

  return (
    <ProfessionPage
      profession={professionsData[foundKey]}
      professionKey={foundKey} // ex: "developpeur-web"
      initialLanguage={detectedLang} // "fr" ou "en" détecté via l'URL
    />
  );
};

export default ProfessionTemplate;
