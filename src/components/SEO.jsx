import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component - Dynamically updates meta tags for each route
 * Fixes Google Search Console "Page avec redirection" by setting proper canonical URLs
 */
const SEO = ({
  title,
  description,
  canonical,
  ogImage = 'https://pricingpro.fr/logo-square.png',
  structuredData = null,
  lang = 'fr',
  noindex = false
}) => {
  const location = useLocation();
  const baseUrl = 'https://pricingpro.fr';

  // Auto-generate canonical if not provided
  const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (property, content, isProperty = false) => {
      if (!content) return;

      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update canonical link
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('language', lang);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:locale', lang === 'fr' ? 'fr_FR' : 'en_US', true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:url', canonicalUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[data-seo-structured]');

      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.setAttribute('data-seo-structured', 'true');
        document.head.appendChild(scriptElement);
      }

      scriptElement.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // We don't remove tags on unmount to avoid flickering
      // They'll be updated by the next page's SEO component
    };
  }, [title, description, canonicalUrl, ogImage, structuredData, lang, noindex]);

  return null; // This component doesn't render anything
};

export default SEO;
