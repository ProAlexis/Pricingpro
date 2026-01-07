import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Check } from "lucide-react";

const ExportData = ({ results, formData, language = "fr" }) => {
  const [exported, setExported] = useState(false);

  const translations = {
    fr: {
      exportCSV: "Exporter en CSV",
      exportExcel: "Exporter en Excel",
      exportHistory: "Exporter l'historique",
      exported: "Exporté !",
      description:
        "Téléchargez vos données pour les utiliser dans Excel, Google Sheets ou d'autres outils.",
    },
    en: {
      exportCSV: "Export to CSV",
      exportExcel: "Export to Excel",
      exportHistory: "Export history",
      exported: "Exported!",
      description:
        "Download your data to use in Excel, Google Sheets or other tools.",
    },
  };

  const t = translations[language];

  // Fonction pour convertir un objet en ligne CSV
  const objectToCSVRow = (obj, headers) => {
    return headers
      .map((header) => {
        const value = obj[header];
        if (value === null || value === undefined) return "";
        // Échapper les guillemets et entourer de guillemets si nécessaire
        const stringValue = String(value);
        if (
          stringValue.includes(",") ||
          stringValue.includes('"') ||
          stringValue.includes("\n")
        ) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(",");
  };

  // Exporter le calcul actuel en CSV
  const exportCurrentCalculation = () => {
    const headers =
      language === "fr"
        ? [
            "Profession",
            "Localisation",
            "Expérience (années)",
            "Niveau",
            "Compétences",
            "Tarif Horaire",
            "Tarif Journalier",
            "Tarif Mensuel",
            "Date",
          ]
        : [
            "Profession",
            "Location",
            "Experience (years)",
            "Level",
            "Skills",
            "Hourly Rate",
            "Daily Rate",
            "Monthly Rate",
            "Date",
          ];

    const data = {
      Profession: formData.profession,
      Localisation: formData.location,
      "Expérience (années)": formData.experience,
      Niveau: formData.experienceLevel,
      Compétences: formData.skills.join("; "),
      "Tarif Horaire": results.hourly + "€",
      "Tarif Journalier": results.daily + "€",
      "Tarif Mensuel": results.monthly + "€",
      Date: new Date().toLocaleDateString(
        language === "fr" ? "fr-FR" : "en-US",
      ),
    };

    const csvContent = [headers.join(","), objectToCSVRow(data, headers)].join(
      "\n",
    );

    downloadCSV(
      csvContent,
      `PricingPro_Calcul_${new Date().toISOString().split("T")[0]}.csv`,
    );
  };

  // Exporter tout l'historique en CSV
  const exportHistory = () => {
    try {
      const history = JSON.parse(
        localStorage.getItem("pricingpro_history") || "[]",
      );

      if (history.length === 0) {
        alert(
          language === "fr"
            ? "Aucun historique à exporter"
            : "No history to export",
        );
        return;
      }

      const headers =
        language === "fr"
          ? [
              "Date",
              "Profession",
              "Localisation",
              "Expérience",
              "Niveau",
              "Compétences",
              "Tarif Horaire",
              "Tarif Journalier",
              "Tarif Mensuel",
            ]
          : [
              "Date",
              "Profession",
              "Location",
              "Experience",
              "Level",
              "Skills",
              "Hourly Rate",
              "Daily Rate",
              "Monthly Rate",
            ];

      const rows = history.map((entry) => {
        const date = new Date(entry.date).toLocaleDateString(
          language === "fr" ? "fr-FR" : "en-US",
        );
        return {
          Date: date,
          Profession: entry.formData.profession,
          Localisation: entry.formData.location,
          Expérience: entry.formData.experience,
          Niveau: entry.formData.experienceLevel,
          Compétences: entry.formData.skills.join("; "),
          "Tarif Horaire": entry.results.hourly + "€",
          "Tarif Journalier": entry.results.daily + "€",
          "Tarif Mensuel": entry.results.monthly + "€",
        };
      });

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => objectToCSVRow(row, headers)),
      ].join("\n");

      downloadCSV(
        csvContent,
        `PricingPro_Historique_${new Date().toISOString().split("T")[0]}.csv`,
      );
    } catch (error) {
      console.error("Error exporting history:", error);
      alert(
        language === "fr" ? "Erreur lors de l'export" : "Error exporting data",
      );
    }
  };

  // Fonction pour télécharger le CSV
  const downloadCSV = (content, filename) => {
    // Ajouter le BOM UTF-8 pour Excel
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Animation de confirmation
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  // Exporter en format Excel (HTML table qui s'ouvre dans Excel)
  const exportToExcel = () => {
    const history = JSON.parse(
      localStorage.getItem("pricingpro_history") || "[]",
    );

    if (history.length === 0) {
      // Si pas d'historique, exporter uniquement le calcul actuel
      const tableHTML = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="UTF-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th { background-color: #9333ea; color: white; padding: 10px; border: 1px solid #ddd; font-weight: bold; }
            td { padding: 8px; border: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f9fafb; }
          </style>
        </head>
        <body>
          <h2>PricingPro - ${language === "fr" ? "Analyse de Tarifs" : "Rate Analysis"}</h2>
          <table>
            <thead>
              <tr>
                <th>${language === "fr" ? "Profession" : "Profession"}</th>
                <th>${language === "fr" ? "Localisation" : "Location"}</th>
                <th>${language === "fr" ? "Expérience" : "Experience"}</th>
                <th>${language === "fr" ? "Niveau" : "Level"}</th>
                <th>${language === "fr" ? "Compétences" : "Skills"}</th>
                <th>${language === "fr" ? "Tarif Horaire" : "Hourly Rate"}</th>
                <th>${language === "fr" ? "Tarif Journalier" : "Daily Rate"}</th>
                <th>${language === "fr" ? "Tarif Mensuel" : "Monthly Rate"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${formData.profession}</td>
                <td>${formData.location}</td>
                <td>${formData.experience}</td>
                <td>${formData.experienceLevel}</td>
                <td>${formData.skills.join(", ")}</td>
                <td>${results.hourly}€</td>
                <td>${results.daily}€</td>
                <td>${results.monthly}€</td>
              </tr>
            </tbody>
          </table>
        </body>
        </html>
      `;

      downloadExcel(
        tableHTML,
        `PricingPro_Calcul_${new Date().toISOString().split("T")[0]}.xls`,
      );
    } else {
      // Exporter tout l'historique
      const rows = history
        .map((entry) => {
          const date = new Date(entry.date).toLocaleDateString(
            language === "fr" ? "fr-FR" : "en-US",
          );
          return `
          <tr>
            <td>${date}</td>
            <td>${entry.formData.profession}</td>
            <td>${entry.formData.location}</td>
            <td>${entry.formData.experience}</td>
            <td>${entry.formData.experienceLevel}</td>
            <td>${entry.formData.skills.join(", ")}</td>
            <td>${entry.results.hourly}€</td>
            <td>${entry.results.daily}€</td>
            <td>${entry.results.monthly}€</td>
          </tr>
        `;
        })
        .join("");

      const tableHTML = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="UTF-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th { background-color: #9333ea; color: white; padding: 10px; border: 1px solid #ddd; font-weight: bold; }
            td { padding: 8px; border: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f9fafb; }
          </style>
        </head>
        <body>
          <h2>PricingPro - ${language === "fr" ? "Historique des Calculs" : "Calculation History"}</h2>
          <table>
            <thead>
              <tr>
                <th>${language === "fr" ? "Date" : "Date"}</th>
                <th>${language === "fr" ? "Profession" : "Profession"}</th>
                <th>${language === "fr" ? "Localisation" : "Location"}</th>
                <th>${language === "fr" ? "Expérience" : "Experience"}</th>
                <th>${language === "fr" ? "Niveau" : "Level"}</th>
                <th>${language === "fr" ? "Compétences" : "Skills"}</th>
                <th>${language === "fr" ? "Tarif Horaire" : "Hourly Rate"}</th>
                <th>${language === "fr" ? "Tarif Journalier" : "Daily Rate"}</th>
                <th>${language === "fr" ? "Tarif Mensuel" : "Monthly Rate"}</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
        </html>
      `;

      downloadExcel(
        tableHTML,
        `PricingPro_Historique_${new Date().toISOString().split("T")[0]}.xls`,
      );
    }
  };

  const downloadExcel = (content, filename) => {
    const blob = new Blob([content], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {language === "fr" ? "Exporter vos données" : "Export your data"}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.description}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {/* Export CSV */}
        <button
          onClick={exportCurrentCalculation}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group"
        >
          {exported ? (
            <>
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-600">{t.exported}</span>
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t.exportCSV}
              </span>
            </>
          )}
        </button>

        {/* Export Excel */}
        <button
          onClick={exportToExcel}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-all group"
        >
          <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {t.exportExcel}
          </span>
        </button>
      </div>

      {/* Export History Button */}
      <button
        onClick={exportHistory}
        className="w-full mt-3 px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
      >
        {t.exportHistory}
      </button>
    </div>
  );
};

export default ExportData;
