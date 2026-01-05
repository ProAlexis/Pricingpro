import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import Calculator from './Calculator';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    // Écouter les changements d'URL
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#calculator') {
        setCurrentPage('calculator');
      } else {
        setCurrentPage('landing');
      }
    };

    handleHashChange(); // Check initial URL
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const goToCalculator = () => {
    window.location.hash = '#calculator';
    setCurrentPage('calculator');
    window.scrollTo(0, 0); // Scroll to top
  };

  const goToHome = () => {
    window.location.hash = '';
    setCurrentPage('landing');
    window.scrollTo(0, 0); // Scroll to top
  };

  if (currentPage === 'calculator') {
    return <Calculator onBackToHome={goToHome} />;
  }

  return <LandingPage onStartCalculator={goToCalculator} />;
};

export default App;