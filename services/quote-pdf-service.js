import jsPDF from 'jspdf';

export function generateQuotePDF(quoteData, language = 'fr') {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = 20;

  const t = {
    fr: {
      quote: 'DEVIS',
      quoteNumber: 'Devis N°',
      date: 'Date',
      validUntil: 'Valable jusqu\'au',
      from: 'De',
      to: 'À',
      description: 'Description',
      quantity: 'Quantité',
      unitPrice: 'Prix unitaire',
      total: 'Total',
      subtotal: 'Sous-total HT',
      vat: 'TVA',
      totalTTC: 'Total TTC',
      paymentTerms: 'Conditions de paiement',
      footer: 'Merci de votre confiance',
      siret: 'SIRET',
      days: 'jours',
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
      quantity: 'Quantity',
      unitPrice: 'Unit price',
      total: 'Total',
      subtotal: 'Subtotal',
      vat: 'VAT',
      totalTTC: 'Total',
      paymentTerms: 'Payment terms',
      footer: 'Thank you for your trust',
      siret: 'Business ID',
      days: 'days',
      legalStatus: {
        'auto-entrepreneur': 'Self-employed',
        'sasu': 'SASU',
        'eurl': 'EURL',
        'portage': 'Umbrella company'
      }
    }
  };

  const labels = t[language];

  // Logo (si présent)
  if (quoteData.logo) {
    try {
      doc.addImage(quoteData.logo, 'PNG', 15, yPos, 30, 30);
    } catch (e) {
      console.error('Error adding logo:', e);
    }
  }

  // Titre DEVIS
  doc.setFontSize(28);
  doc.setTextColor(147, 51, 234); // Purple
  doc.text(labels.quote, pageWidth - 15, yPos + 10, { align: 'right' });

  yPos += 20;

  // Informations du devis
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`${labels.quoteNumber}: ${quoteData.quoteNumber}`, pageWidth - 15, yPos, { align: 'right' });
  yPos += 6;
  
  const today = new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US');
  doc.text(`${labels.date}: ${today}`, pageWidth - 15, yPos, { align: 'right' });
  yPos += 6;
  
  const validDate = new Date();
  validDate.setDate(validDate.getDate() + quoteData.validityDays);
  doc.text(`${labels.validUntil}: ${validDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}`, pageWidth - 15, yPos, { align: 'right' });

  yPos = 70;

  // Section FROM (Freelance)
  doc.setFontSize(11);
  doc.setTextColor(147, 51, 234);
  doc.text(labels.from.toUpperCase(), 15, yPos);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  yPos += 7;
  doc.setFont(undefined, 'bold');
  doc.text(quoteData.freelanceName, 15, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 5;
  
  doc.setTextColor(100, 100, 100);
  doc.text(quoteData.freelanceEmail, 15, yPos);
  yPos += 5;
  doc.text(quoteData.freelancePhone, 15, yPos);
  yPos += 5;
  
  const addressLines = doc.splitTextToSize(quoteData.freelanceAddress, 80);
  doc.text(addressLines, 15, yPos);
  yPos += addressLines.length * 5;
  
  if (quoteData.freelanceSiret) {
    doc.text(`${labels.siret}: ${quoteData.freelanceSiret}`, 15, yPos);
    yPos += 5;
  }
  
  if (quoteData.legalStatus) {
    doc.text(labels.legalStatus[quoteData.legalStatus] || quoteData.legalStatus, 15, yPos);
  }

  // Section TO (Client)
  yPos = 70;
  doc.setFontSize(11);
  doc.setTextColor(147, 51, 234);
  doc.text(labels.to.toUpperCase(), pageWidth - 90, yPos);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  yPos += 7;
  doc.setFont(undefined, 'bold');
  doc.text(quoteData.clientName, pageWidth - 90, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 5;
  
  doc.setTextColor(100, 100, 100);
  if (quoteData.clientCompany) {
    doc.text(quoteData.clientCompany, pageWidth - 90, yPos);
    yPos += 5;
  }
  doc.text(quoteData.clientEmail, pageWidth - 90, yPos);
  yPos += 5;
  
  const clientAddressLines = doc.splitTextToSize(quoteData.clientAddress, 80);
  doc.text(clientAddressLines, pageWidth - 90, yPos);

  yPos = 120;

  // Titre de la mission
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text(quoteData.missionTitle, 15, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 10;

  // Description
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const descLines = doc.splitTextToSize(quoteData.missionDescription, pageWidth - 30);
  doc.text(descLines, 15, yPos);
  yPos += descLines.length * 5 + 2;

  // Table header
  doc.setFillColor(147, 51, 234);
  doc.rect(15, yPos, pageWidth - 30, 10, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text(labels.description, 20, yPos + 6.4);
  doc.text(labels.quantity, pageWidth - 90, yPos + 6.4);
  doc.text(labels.unitPrice, pageWidth - 60, yPos + 6.4);
  doc.text(labels.total, pageWidth - 25, yPos + 6.4, { align: 'right' });
  doc.setFont(undefined, 'normal');
  
  yPos += 15;

  // Table content
  doc.setTextColor(0, 0, 0);
  doc.text(quoteData.missionTitle, 20, yPos);
  doc.text(`${quoteData.daysCount} ${labels.days}`, pageWidth - 90, yPos);
  doc.text(`${quoteData.dailyRate}€`, pageWidth - 60, yPos);
  doc.text(`${quoteData.totalHT.toLocaleString('fr-FR').replace(/\s/g, ' ')}€`, pageWidth - 25, yPos, { align: 'right' });
  
  yPos += 10;

  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 10;

  // Totals
  doc.setFontSize(11);
  
  // Subtotal
  doc.setTextColor(100, 100, 100);
  doc.text(labels.subtotal, pageWidth - 70, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  // CORRECTION LIGNE 192
  doc.text(`${quoteData.totalHT.toLocaleString('fr-FR').replace(/\s/g, ' ')}€`, pageWidth - 25, yPos, { align: 'right' });
  doc.setFont(undefined, 'normal');
  yPos += 8;

  // VAT
  if (quoteData.vatApplicable) {
    doc.setTextColor(100, 100, 100);
    doc.text(`${labels.vat} (${quoteData.vatRate}%)`, pageWidth - 70, yPos);
    doc.setTextColor(0, 0, 0);
    // CORRECTION LIGNE 200
    doc.text(`${quoteData.totalTVA.toLocaleString('fr-FR').replace(/\s/g, ' ')}€`, pageWidth - 25, yPos, { align: 'right' });
    yPos += 8;
  }

  // Total TTC
  doc.setFillColor(243, 232, 255);
  doc.rect(pageWidth - 80, yPos - 5, 65, 12, 'F');
  
  doc.setFontSize(13);
  doc.setTextColor(147, 51, 234);
  doc.setFont(undefined, 'bold');
  doc.text(labels.totalTTC, pageWidth - 70, yPos + 3);
  // CORRECTION LIGNE 210
  doc.text(`${quoteData.totalTTC.toLocaleString('fr-FR').replace(/\s/g, ' ')}€`, pageWidth - 25, yPos + 3, { align: 'right' });
  doc.setFont(undefined, 'normal');
  
  yPos += 20;

  // Payment terms
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text(`${labels.paymentTerms}:`, 15, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 6;
  
  doc.setTextColor(100, 100, 100);
  const paymentText = quoteData.paymentTerms === '100%' 
    ? '100% à la livraison'
    : quoteData.paymentTerms === '50/50'
    ? '50% d\'acompte, 50% à la livraison'
    : '30% d\'acompte, 70% à la livraison';
  doc.text(paymentText, 15, yPos);

  // Footer
  yPos = pageHeight - 30;
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(labels.footer, pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;
  doc.text(quoteData.freelanceName, pageWidth / 2, yPos, { align: 'center' });

  // Save
  doc.save(`Devis_${quoteData.quoteNumber}_${quoteData.clientName.replace(/\s/g, '_')}.pdf`);
}