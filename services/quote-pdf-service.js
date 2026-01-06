import jsPDF from 'jspdf';

export function generateQuotePDF(quoteData, language = 'fr') {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Fonction utilitaire pour formater les prix proprement
  const formatPrice = (amount) => {
    return Number(amount).toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).replace(/\s/g, ' '); 
  };

  let yPos = 20;

  const t = {
    fr: {
      quote: 'DEVIS',
      quoteNumber: 'Devis N°',
      date: 'Date',
      validUntil: "Valable jusqu'au",
      from: 'Émetteur',
      to: 'Client',
      description: 'Description',
      quantity: 'Qté',
      unitPrice: 'Prix unit.',
      total: 'Total',
      subtotal: 'Sous-total HT',
      vat: 'TVA',
      totalTTC: 'Total TTC',
      paymentTerms: 'Conditions de paiement',
      footer: 'Merci de votre confiance',
      siret: 'SIRET',
      days: 'j',
      legalStatus: {
        'auto-entrepreneur': 'Auto-entrepreneur',
        'sasu': 'SASU',
        'eurl': 'EURL',
        'portage': 'Portage salarial'
      }
    },
    en: {
      quote: 'QUOTE',
      quoteNumber: 'Quote #',
      date: 'Date',
      validUntil: 'Valid until',
      from: 'From',
      to: 'To',
      description: 'Description',
      quantity: 'Qty',
      unitPrice: 'Unit price',
      total: 'Total',
      subtotal: 'Subtotal',
      vat: 'VAT',
      totalTTC: 'Total',
      paymentTerms: 'Payment terms',
      footer: 'Thank you for your business',
      siret: 'Registration #',
      days: 'd',
      legalStatus: {
        'auto-entrepreneur': 'Self-employed',
        'sasu': 'SASU',
        'eurl': 'EURL',
        'portage': 'Umbrella company'
      }
    }
  };

  const labels = t[language];

  // --- EN-TÊTE ---
  
  // Logo (si présent) ou Titre
  doc.setFontSize(24);
  doc.setTextColor(147, 51, 234); // Purple-600
  doc.setFont(undefined, 'bold');
  doc.text(labels.quote, 15, yPos);
  
  // Infos du Devis (Numéro, Date...) à droite
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.setFont(undefined, 'normal');
  
  const rightColX = pageWidth - 80;
  doc.text(`${labels.quoteNumber}:`, rightColX, yPos);
  doc.setTextColor(0, 0, 0);
  doc.text(quoteData.quoteNumber, pageWidth - 15, yPos, { align: 'right' });
  
  yPos += 6;
  doc.setTextColor(100, 100, 100);
  doc.text(`${labels.date}:`, rightColX, yPos);
  doc.setTextColor(0, 0, 0);
  doc.text(new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-GB'), pageWidth - 15, yPos, { align: 'right' });

  yPos += 6;
  doc.setTextColor(100, 100, 100);
  doc.text(`${labels.validUntil}:`, rightColX, yPos);
  doc.setTextColor(0, 0, 0);
  const validDate = new Date();
  validDate.setDate(validDate.getDate() + parseInt(quoteData.validityDays));
  doc.text(validDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-GB'), pageWidth - 15, yPos, { align: 'right' });


  yPos += 25;

  // --- BLOCS ÉMETTEUR / CLIENT ---
  const leftColX = 15;
  const clientColX = pageWidth / 2 + 10;
  
  // Titres des colonnes
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.setFont(undefined, 'bold');
  doc.text(labels.from.toUpperCase(), leftColX, yPos);
  doc.text(labels.to.toUpperCase(), clientColX, yPos);
  
  yPos += 8;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');

  // Nom Freelance & Client
  doc.text(quoteData.freelanceName || 'Votre Nom', leftColX, yPos);
  doc.text(quoteData.clientName || 'Nom du Client', clientColX, yPos);
  
  yPos += 6;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  // Entreprise (si applicable)
  if (quoteData.clientCompany) {
    doc.text(quoteData.clientCompany, clientColX, yPos);
  }

  // Adresses et Emails (Multilignes)
  const freelanceDetails = [
    quoteData.freelanceEmail,
    quoteData.freelancePhone,
    quoteData.freelanceAddress,
    `${labels.legalStatus[quoteData.legalStatus] || quoteData.legalStatus}`,
    quoteData.freelanceSiret ? `${labels.siret}: ${quoteData.freelanceSiret}` : null
  ].filter(Boolean);

  const clientDetails = [
    quoteData.clientCompany ? null : '',
    quoteData.clientEmail,
    quoteData.clientAddress
  ].filter(Boolean);

  // On écrit ligne par ligne
  let maxLines = Math.max(freelanceDetails.length, clientDetails.length);
  
  for (let i = 0; i < maxLines; i++) {
    if (freelanceDetails[i]) doc.text(freelanceDetails[i], leftColX, yPos);
    if (clientDetails[i]) doc.text(clientDetails[i], clientColX, yPos);
    yPos += 5;
  }

  yPos += 15;

  // --- TABLEAU ---
  
  // En-têtes du tableau
  doc.setFillColor(243, 232, 255); // Purple-50
  doc.rect(15, yPos, pageWidth - 30, 10, 'F');
  
  doc.setFont(undefined, 'bold');
  doc.setTextColor(147, 51, 234); // Purple-600
  doc.text(labels.description, 20, yPos + 7);
  doc.text(labels.quantity, pageWidth - 90, yPos + 7, { align: 'right' }); // Ajusté
  doc.text(labels.unitPrice, pageWidth - 55, yPos + 7, { align: 'right' }); // Ajusté
  doc.text(labels.total, pageWidth - 20, yPos + 7, { align: 'right' });
  
  yPos += 18;
  
  // Ligne de prestation
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(quoteData.missionTitle || 'Mission', 20, yPos);
  
  // === CORRECTION 2 : Utilisation de formatPrice() ===
  doc.setFont(undefined, 'normal');
  doc.text(`${quoteData.daysCount} ${labels.days}`, pageWidth - 90, yPos, { align: 'right' });
  doc.text(`${formatPrice(quoteData.dailyRate)}€`, pageWidth - 55, yPos, { align: 'right' });
  doc.text(`${formatPrice(quoteData.daysCount * quoteData.dailyRate)}€`, pageWidth - 20, yPos, { align: 'right' });
  
  yPos += 6;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  
  // Description multiligne
  if (quoteData.missionDescription) {
    const splitDesc = doc.splitTextToSize(quoteData.missionDescription, 110);
    doc.text(splitDesc, 20, yPos);
    yPos += (splitDesc.length * 5) + 10;
  } else {
    yPos += 10;
  }

  // Ligne de séparation
  doc.setDrawColor(230, 230, 230);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 10;

  // --- TOTAUX ---
  const totalHT = quoteData.daysCount * quoteData.dailyRate;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  // Sous-total
  doc.text(labels.subtotal, pageWidth - 70, yPos);
  doc.text(`${formatPrice(totalHT)}€`, pageWidth - 25, yPos, { align: 'right' });
  yPos += 8;

  // TVA
  if (quoteData.vatApplicable) {
    doc.setTextColor(100, 100, 100);
    doc.text(`${labels.vat} (${quoteData.vatRate}%)`, pageWidth - 70, yPos);
    doc.setTextColor(0, 0, 0);
    doc.text(`${formatPrice(quoteData.totalTVA)}€`, pageWidth - 25, yPos, { align: 'right' });
    yPos += 8;
  }

  // Total TTC
  doc.setFillColor(243, 232, 255);
  doc.rect(pageWidth - 95, yPos - 5, 80, 12, 'F');
  
  doc.setFontSize(13);
  doc.setTextColor(147, 51, 234);
  doc.setFont(undefined, 'bold');
  doc.text(labels.totalTTC, pageWidth - 70, yPos + 3);
  doc.text(`${formatPrice(quoteData.totalTTC)}€`, pageWidth - 25, yPos + 3, { align: 'right' });
  doc.setFont(undefined, 'normal');
  
  yPos += 25;

  // --- PIED DE PAGE ---
  
  // Conditions
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text(`${labels.paymentTerms}:`, 15, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 6;
  
  doc.setTextColor(100, 100, 100);
  const paymentText = quoteData.paymentTerms === '50/50' 
    ? (language === 'fr' ? "50% à la commande, 50% à la livraison" : "50% upfront, 50% on delivery")
    : (language === 'fr' ? "100% à la livraison" : "100% on delivery");
  doc.text(paymentText, 15, yPos);

  // Footer centré
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  const footerY = doc.internal.pageSize.height - 20;
  doc.text(labels.footer, pageWidth / 2, footerY, { align: 'center' });

  // Génération du fichier
  const fileName = `Devis_${quoteData.quoteNumber}_${quoteData.clientName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
}