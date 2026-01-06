import React, { useState } from 'react';
import { Share2, Check, Twitter, Linkedin, Link, MessageCircle } from 'lucide-react';

const ShareButton = ({ results, formData, language }) => {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const translations = {
    fr: {
      share: "Partager mes résultats",
      shareTitle: "Partager sur",
      copied: "Lien copié !",
      copyLink: "Copier le lien",
      shareText: `Je viens de calculer mon tarif freelance sur PricingPro : ${results.daily}€/jour ! 🚀`,
      shareHashtags: "freelance,tarification,PricingPro"
    },
    en: {
      share: "Share my results",
      shareTitle: "Share on",
      copied: "Link copied!",
      copyLink: "Copy link",
      shareText: `I just calculated my freelance rate on PricingPro: €${results.daily}/day! 🚀`,
      shareHashtags: "freelance,pricing,PricingPro"
    }
  };

  const t = translations[language];

  const shareUrl = 'https://pricingpro.fr';

  // Partage natif (Web Share API)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PricingPro - Calculateur de tarifs freelance',
          text: t.shareText,
          url: shareUrl
        });
      } catch (error) {
        // L'utilisateur a annulé ou erreur
        console.log('Share cancelled or failed:', error);
      }
    } else {
      setShowMenu(true);
    }
  };

  // Copier le lien
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${t.shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Partage sur Twitter/X
  const shareOnTwitter = () => {
    const text = encodeURIComponent(t.shareText);
    const url = encodeURIComponent(shareUrl);
    const hashtags = encodeURIComponent(t.shareHashtags);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`,
      '_blank',
      'width=600,height=400'
    );
  };

  // Partage sur LinkedIn
  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
      'width=600,height=600'
    );
  };

  // Partage sur WhatsApp
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${t.shareText}\n\n${shareUrl}`);
    window.open(
      `https://wa.me/?text=${text}`,
      '_blank'
    );
  };

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={handleNativeShare}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
      >
        <Share2 className="w-5 h-5" />
        {t.share}
      </button>

      {/* Menu de partage (fallback si Web Share API n'est pas disponible) */}
      {showMenu && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {t.shareTitle}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {/* Twitter */}
              <button
                onClick={shareOnTwitter}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Twitter className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Twitter
                </span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  LinkedIn
                </span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={shareOnWhatsApp}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
              >
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  WhatsApp
                </span>
              </button>

              {/* Copier le lien */}
              <button
                onClick={copyLink}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                  {copied ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Link className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {copied ? t.copied : t.copyLink}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
