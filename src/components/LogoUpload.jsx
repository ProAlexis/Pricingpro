import { Upload, X, Image as ImageIcon } from "lucide-react";

const LogoUpload = ({ logo, setLogo, language = "fr" }) => {
  const t = {
    fr: {
      title: "Logo pour le devis (optionnel)",
      subtitle: "Ajoutez votre logo pour personnaliser le devis",
      upload: "Choisir un logo",
      remove: "Supprimer",
      formats: "PNG, JPG (max 2MB)",
    },
    en: {
      title: "Logo for the quote (optional)",
      subtitle: "Add your logo to personalize the quote",
      upload: "Choose a logo",
      remove: "Remove",
      formats: "PNG, JPG (max 2MB)",
    },
  }[language];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier la taille (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert(
        language === "fr"
          ? "Le fichier est trop volumineux (max 2MB)"
          : "File is too large (max 2MB)"
      );
      return;
    }

    // Vérifier le format
    if (!file.type.startsWith("image/")) {
      alert(language === "fr" ? "Format non supporté" : "Unsupported format");
      return;
    }

    // Convertir en base64 pour le stockage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setLogo(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setLogo(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
          <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {t.title}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {t.subtitle}
          </p>

          {logo ? (
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo preview"
                className="w-16 h-16 object-contain bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600"
              />
              <button
                onClick={handleRemove}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                {t.remove}
              </button>
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200">
              <Upload className="w-4 h-4" />
              {t.upload}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {t.formats}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
