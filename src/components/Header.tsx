import React from 'react';
import { Wallet, Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
import { useUltraWallet } from '../hooks/useUltraWallet';
import { useTranslation } from '../contexts/TranslationContext';
import LanguageSelector from './layout/LanguageSelector';
import { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const {
    blockchainId,
    isConnected,
    connect,
    disconnect,
    error,
    isLoading
  } = useUltraWallet();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [userInitiated, setUserInitiated] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const { currentLang, setCurrentLang, t } = useTranslation();

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Fermer le dropdown de profil
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileOpen(false);
      }

      // Fermer le dropdown de langue
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gestion des erreurs wallet
  useEffect(() => {
    if (error && userInitiated) {
      console.error('Wallet error:', error);
    }
  }, [error, userInitiated]);

  const handleConnect = async () => {
    setUserInitiated(true);
    await connect();
  };

  const handleDisconnect = async () => {
    setUserInitiated(true);
    setIsProfileOpen(false);
    await disconnect();
  };

  const handleLanguageChange = (lang: 'en' | 'fr' | 'de') => {
    setCurrentLang(lang);
    setIsLangMenuOpen(false);
    
    // Mettre à jour l'URL avec la nouvelle langue
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(en|fr|de)/, '') || '/';
    const newPath = `/${lang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    window.history.pushState({}, '', newPath);
  };

  const getCurrentFlag = () => {
    const flags = {
      en: '🇺🇸',
      fr: '🇫🇷',
      de: '🇩🇪'
    };
    return <span className="text-lg">{flags[currentLang]}</span>;
  };

  const getBreadcrumb = () => {
    switch (currentPage) {
      case 'uniq-detail':
        return (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <button onClick={() => onNavigate('home')} className="hover:text-white">{t('nav.home')}</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => onNavigate('home')} className="hover:text-white">{t('nav.collections')}</button>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-white">Ultra's Power Collection</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-white">Ultra Power</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Uniq 38</span>
          </div>
        );
      case 'transactions':
        return (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <button onClick={() => onNavigate('home')} className="hover:text-white">{t('nav.home')}</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{t('nav.transactions')}</span>
          </div>
        );
      case 'marketplace':
        return (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <button onClick={() => onNavigate('home')} className="hover:text-white">{t('nav.home')}</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => onNavigate('home')} className="hover:text-white">{t('nav.collections')}</button>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-white">Ultra's Power Collection</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{t('nav.marketplace')}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo_UT_blanc_hor.png" 
                alt="Ultra Times Logo" 
                className="h-8 object-contain"
              />
            </button>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <button 
              onClick={() => onNavigate('home')} 
              className={`relative text-sm font-medium transition-all duration-200 pb-1 ${
                currentPage === 'home' 
                  ? 'text-purple-400 border-b-2 border-purple-400' 
                  : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-purple-400'
              }`}
            >
              ACCUEIL
            </button>
            <button 
              onClick={() => onNavigate('marketplace')} 
              className={`relative text-sm font-medium transition-all duration-200 pb-1 ${
                currentPage === 'marketplace' 
                  ? 'text-purple-400 border-b-2 border-purple-400' 
                  : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-purple-400'
              }`}
            >
              MARKETPLACE
            </button>
            <button 
              onClick={() => onNavigate('transactions')} 
              className={`relative text-sm font-medium transition-all duration-200 pb-1 ${
                currentPage === 'transactions' 
                  ? 'text-purple-400 border-b-2 border-purple-400' 
                  : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-purple-400'
              }`}
            >
              TRANSACTION
            </button>
            <a 
              href="#collections" 
              className="relative text-sm font-medium text-gray-300 hover:text-white hover:border-b-2 hover:border-purple-400 transition-all duration-200 pb-1"
            >
              COLLECTION
            </a>
            <a 
              href="#stats" 
              className="relative text-sm font-medium text-gray-300 hover:text-white hover:border-b-2 hover:border-purple-400 transition-all duration-200 pb-1"
            >
              STATISTIQUE
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <button className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium border border-purple-500/50 shadow-lg shadow-purple-500/25">
              <span className="text-sm">⏰</span>
              <span>ULTRA TIMES</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            {isConnected ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium border border-green-500/50 shadow-lg shadow-green-500/25"
                  disabled={isLoading}
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden lg:block">
                    {blockchainId ? `${blockchainId.slice(0, 6)}...${blockchainId.slice(-4)}` : 'CONNECTÉ'}
                  </span>
                  <span className="text-xs">▼</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 border border-gray-700/50">
                    <div className="px-4 py-2 border-b border-gray-700/50">
                      <p className="text-xs text-gray-400">Connecté à</p>
                      <p className="text-sm text-white truncate">
                        {blockchainId}
                      </p>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800/50 transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Déconnexion...' : 'Déconnecter'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium border border-blue-500/50 shadow-lg shadow-blue-500/25 disabled:opacity-50"
                disabled={isLoading}
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden lg:block">
                  {isLoading ? 'CONNEXION...' : 'WALLET'}
                </span>
              </button>
            )}

            <div className="bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600/50 rounded-full shadow-lg shadow-gray-500/10">
              <LanguageSelector
                isOpen={isLangMenuOpen}
                setIsOpen={setIsLangMenuOpen}
                currentLang={currentLang}
                handleLanguageChange={handleLanguageChange}
                getCurrentFlag={getCurrentFlag}
                langMenuRef={langMenuRef}
              />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-purple-500/20 py-4 bg-black/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} 
                className={`text-left transition-colors font-medium ${
                  currentPage === 'home' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                ACCUEIL
              </button>
              <button 
                onClick={() => { onNavigate('marketplace'); setIsMenuOpen(false); }} 
                className={`text-left transition-colors font-medium ${
                  currentPage === 'marketplace' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                MARKETPLACE
              </button>
              <button 
                onClick={() => { onNavigate('transactions'); setIsMenuOpen(false); }} 
                className={`text-left transition-colors font-medium ${
                  currentPage === 'transactions' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                TRANSACTION
              </button>
              <a href="#collections" className="text-gray-300 hover:text-white transition-colors font-medium">
                COLLECTION
              </a>
              <a href="#stats" className="text-gray-300 hover:text-white transition-colors font-medium">
                STATISTIQUE
              </a>
              
              {!isConnected && (
                <button 
                  onClick={handleConnect}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-full transition-all duration-200 w-fit text-sm font-medium border border-blue-500/50 shadow-lg shadow-blue-500/25 disabled:opacity-50"
                  disabled={isLoading}
                >
                  <Wallet className="w-4 h-4" />
                  <span>{isLoading ? 'CONNEXION...' : 'WALLET'}</span>
                </button>
              )}
            </nav>
          </div>
        )}
        
        {currentPage !== 'home' && (
          <div className="py-3 border-t border-purple-500/10">
            {getBreadcrumb()}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;