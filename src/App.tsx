import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CollectionsSection from './components/CollectionsSection';
import MarketplaceSection from './components/MarketplaceSection';
import TrendingSection from './components/TrendingSection';
import TransactionsSection from './components/TransactionsSection';
import StatisticsSection from './components/StatisticsSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import UniqDetailPage from './pages/UniqDetailPage';
import TransactionsPage from './pages/TransactionsPage';
import MarketplacePage from './pages/MarketplacePage';
import Collections from './components/pages/Collections';
import Statistics from './components/pages/Statistics';
import CollectionDetailPage from './components/pages/CollectionDetailPage';
import CreatorPage from './pages/CreatorPage';
import { useTranslation } from './contexts/TranslationContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedUniq, setSelectedUniq] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const { currentLang, setCurrentLang } = useTranslation();

  // Gestion de la navigation avec support multilingue
  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    // Vérifier si le premier segment est une langue
    if (segments.length > 0 && ['en', 'fr', 'de'].includes(segments[0])) {
      const lang = segments[0] as 'en' | 'fr' | 'de';
      
      // Déterminer la page actuelle après la langue
      if (segments.length > 1) {
        setCurrentPage(segments[1]);
      } else {
        setCurrentPage('home');
      }
    } else {
      // Si pas de langue dans l'URL, rediriger avec la langue actuelle
      const newPath = `/${currentLang}${path === '/' ? '' : path}`;
      window.history.replaceState({}, '', newPath);
      setCurrentPage('home');
    }
  }, [currentLang]); // Retirer setCurrentLang des dépendances

  // Écouter les changements d'URL pour la navigation (navigation arrière/avant)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const segments = path.split('/').filter(Boolean);
      
      if (segments.length > 0 && ['en', 'fr', 'de'].includes(segments[0])) {
        const lang = segments[0] as 'en' | 'fr' | 'de';
        if (lang !== currentLang) {
          setCurrentLang(lang);
        }
        
        if (segments.length > 1) {
          setCurrentPage(segments[1]);
        } else {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentLang, setCurrentLang]);

  const navigateToPage = (page: string, data?: any) => {
    setCurrentPage(page);
    
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Mettre à jour l'URL avec la langue et la page
    const newPath = page === 'home' ? `/${currentLang}` : `/${currentLang}/${page}`;
    window.history.pushState({}, '', newPath);
    
    if (data) {
      if (page === 'collection-detail') {
        setSelectedCollection(data);
      } else if (page === 'creator') {
        setSelectedCreator(data);
      } else {
        setSelectedUniq(data);
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'uniq-detail':
        return <UniqDetailPage uniq={selectedUniq} onNavigate={navigateToPage} />;
      case 'transactions':
        return <TransactionsPage onNavigate={navigateToPage} />;
      case 'marketplace':
        return <MarketplacePage onNavigate={navigateToPage} />;
      case 'collections':
        return <Collections onNavigate={navigateToPage} />;
      case 'statistics':
        return <Statistics onNavigate={navigateToPage} />;
      case 'collection-detail':
        return <CollectionDetailPage collectionData={selectedCollection} onNavigate={navigateToPage} />;
      case 'creator':
        return <CreatorPage creator={selectedCreator} onNavigate={navigateToPage} />;
      default:
        return (
          <>
            <HeroSection onNavigate={navigateToPage} />
            <CollectionsSection onNavigate={navigateToPage} />
            <MarketplaceSection onNavigate={navigateToPage} />
            <TrendingSection onNavigate={navigateToPage} />
            <TransactionsSection onNavigate={navigateToPage} />
            <StatisticsSection onNavigate={navigateToPage} />
            <AboutSection onNavigate={navigateToPage} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        onNavigate={navigateToPage} 
        currentPage={currentPage}
        selectedUniq={selectedUniq}
        selectedCollection={selectedCollection}
        selectedCreator={selectedCreator}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;