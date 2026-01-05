import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import Calculator from './Calculator';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [darkMode, setDarkMode] = useState(() => {
    // Charger la préférence dark mode depuis localStorage
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Appliquer le dark mode au document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Sauvegarder la préférence
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
    window.scrollTo(0, 0);
  };

  const goToHome = () => {
    window.location.hash = '';
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  if (currentPage === 'calculator') {
    return <Calculator onBackToHome={goToHome} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  return <LandingPage onStartCalculator={goToCalculator} darkMode={darkMode} setDarkMode={setDarkMode} />;
};

export default App;
