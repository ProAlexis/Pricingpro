import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll vers le haut à chaque changement de page/route
    window.scrollTo(0, 0);
    
    // Réinitialiser le title si on retourne à la page d'accueil
    if (pathname === '/') {
      document.title = 'PricingPro';
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
