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
    console.log('handleLanguageChange called with:', lang);
    console.log('Current language before change:', currentLang);
    
    try {
      // Fermer le menu
      setIsLangMenuOpen(false);
      
      // Changer la langue dans le contexte
      setCurrentLang(lang);
      
      // Mettre à jour l'URL avec la nouvelle langue
      const currentPath = window.location.pathname;
      console.log('Current path:', currentPath);
      
      const pathWithoutLang = currentPath.replace(/^\/(en|fr|de)/, '') || '/';
      console.log('Path without lang:', pathWithoutLang);
      
      const newPath = `/${lang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
      console.log('New path:', newPath);
      
      // Utiliser replaceState au lieu de pushState pour éviter l'historique
      window.history.replaceState({}, '', newPath);
      
      console.log('Language change completed');
    } catch (error) {
      console.error('Error in handleLanguageChange:', error);
    }
  };

  const getCurrentFlag = () => {
    const flags = {
      en: (
        <svg className='w-6 h-4' viewBox='0 0 36 24'>
          <rect width='36' height='24' fill='#012169' />
          <path d='M0,0 L36,24 M36,0 L0,24' stroke='#fff' strokeWidth='2.4' />
          <path d='M18,0 L18,24 M0,12 L36,12' stroke='#fff' strokeWidth='4' />
          <path d='M18,0 L18,24 M0,12 L36,12' stroke='#C8102E' strokeWidth='2.4' />
        </svg>
      ),
      fr: (
        <svg className='w-6 h-4' viewBox='0 0 36 24'>
          <rect width='36' height='24' fill='#ED2939' />
          <rect width='12' height='24' fill='#002395' />
          <rect x='12' width='12' height='24' fill='#fff' />
        </svg>
      ),
      de: (
        <svg className='w-6 h-4' viewBox='0 0 36 24'>
          <rect width='36' height='8' fill='#000' />
          <rect y='8' width='36' height='8' fill='#DD0000' />
          <rect y='16' width='36' height='8' fill='#FFCE00' />
        </svg>
      ),
    };
    return flags[currentLang];
  };

  const getBreadcrumb = () => {
    const breadcrumbClass = "flex items-center space-x-2 text-sm bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-[#7A52D1]/20";
    const linkClass = "hover:text-[#7A52D1] transition-colors duration-200 font-medium";
    const currentClass = "text-[#7A52D1] font-bold";
    const separatorClass = "text-gray-600";

    switch (currentPage) {
      case 'uniq-detail':
        return (
          <div className={breadcrumbClass}>
            <button onClick={() => onNavigate('home')} className={linkClass}>Accueil</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <button onClick={() => onNavigate('collections')} className={linkClass}>Collections</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <button onClick={() => onNavigate('collection-detail')} className={linkClass}>Ultra Genesis</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <span className={currentClass}>NFT #3847</span>
          </div>
        );
      case 'collection-detail':
        return (
          <div className={breadcrumbClass}>
            <button onClick={() => onNavigate('home')} className={linkClass}>Accueil</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <button onClick={() => onNavigate('collections')} className={linkClass}>Collections</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <span className={currentClass}>Collection</span>
          </div>
        );
      case 'transactions':
        return (
          <div className={breadcrumbClass}>
            <button onClick={() => onNavigate('home')} className={linkClass}>Accueil</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <span className={currentClass}>Transactions</span>
          </div>
        );
      case 'marketplace':
        return (
          <div className={breadcrumbClass}>
            <button onClick={() => onNavigate('home')} className={linkClass}>Accueil</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <span className={currentClass}>Marketplace</span>
          </div>
        );
      case 'collections':
        return (
          <div className={breadcrumbClass}>
            <button onClick={() => onNavigate('home')} className={linkClass}>Accueil</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <span className={currentClass}>Collections</span>
          </div>
        );
      case 'statistics':
        return (
          <div className={breadcrumbClass}>
            <button onClick={() => onNavigate('home')} className={linkClass}>Accueil</button>
            <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
            <span className={currentClass}>Statistiques</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-[#7A52D1]/20 sticky top-0 z-50">
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
              className={`relative text-base font-bold transition-all duration-200 pb-1 border-b-2 ${
                currentPage === 'home' 
                  ? 'text-[#7A52D1] border-[#7A52D1]' 
                  : 'text-gray-300 hover:text-white border-transparent hover:border-[#7A52D1]'
              }`}
            >
              ACCUEIL
            </button>
            <button 
              onClick={() => onNavigate('marketplace')} 
              className={`relative text-base font-bold transition-all duration-200 pb-1 border-b-2 ${
                currentPage === 'marketplace' 
                  ? 'text-[#7A52D1] border-[#7A52D1]' 
                  : 'text-gray-300 hover:text-white border-transparent hover:border-[#7A52D1]'
              }`}
            >
              MARKETPLACE
            </button>
            <button 
              onClick={() => onNavigate('collections')} 
              className={`relative text-base font-bold transition-all duration-200 pb-1 border-b-2 ${
                currentPage === 'collections' 
                  ? 'text-[#7A52D1] border-[#7A52D1]' 
                  : 'text-gray-300 hover:text-white border-transparent hover:border-[#7A52D1]'
              }`}
            >
              COLLECTIONS
            </button>
            <button 
              onClick={() => onNavigate('transactions')} 
              className={`relative text-base font-bold transition-all duration-200 pb-1 border-b-2 ${
                currentPage === 'transactions' 
                  ? 'text-[#7A52D1] border-[#7A52D1]' 
                  : 'text-gray-300 hover:text-white border-transparent hover:border-[#7A52D1]'
              }`}
            >
              TRANSACTIONS
            </button>
            <button 
              onClick={() => onNavigate('statistics')} 
              className={`relative text-base font-bold transition-all duration-200 pb-1 border-b-2 ${
                currentPage === 'statistics' 
                  ? 'text-[#7A52D1] border-[#7A52D1]' 
                  : 'text-gray-300 hover:text-white border-transparent hover:border-[#7A52D1]'
              }`}
            >
              STATISTIQUES
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <a 
              href="https://ultratimes.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-1.5 bg-transparent hover:bg-white/10 text-white px-3 py-2 rounded-full transition-all duration-200 text-sm font-bold border-2 border-white/60 shadow-lg"
            >
              <img 
                src="/logo_UT_icon-2.png" 
                alt="Ultra Times Icon" 
                className="w-3.5 h-3.5 object-contain"
              />
              <span>ULTRA TIMES</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {isConnected ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1.5 bg-[#7A52D1] hover:bg-[#6A42C1] text-white px-3 py-2 rounded-full transition-all duration-200 text-sm font-bold border-2 border-[#7A52D1]/60 shadow-lg shadow-[#7A52D1]/25"
                  disabled={isLoading}
                >
                  <Wallet className="w-3.5 h-3.5" />
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
                className="flex items-center space-x-1.5 bg-[#7A52D1] hover:bg-[#6A42C1] text-white px-3 py-2 rounded-full transition-all duration-200 text-sm font-bold border-2 border-[#7A52D1]/60 shadow-lg shadow-[#7A52D1]/25 disabled:opacity-50"
                disabled={isLoading}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span className="hidden lg:block">
                  {isLoading ? 'CONNEXION...' : 'WALLET'}
                </span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Language button clicked, current isLangMenuOpen:', isLangMenuOpen)
                  setIsLangMenuOpen(!isLangMenuOpen)
                }}
                className="flex items-center space-x-1.5 bg-transparent hover:bg-white/10 text-white px-3 py-2 rounded-full transition-all duration-200 text-sm font-bold border-2 border-white/60 shadow-lg"
                ref={langMenuRef}
              >
                {getCurrentFlag()}
                <span>{currentLang.toUpperCase()}</span>
                <span className="text-xs">▼</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-black/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 border border-gray-700/50 z-50">
                  {['en', 'fr', 'de'].map(lang => (
                    <button
                      key={lang}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Language selected:', lang)
                        console.log('Current language:', currentLang)
                        handleLanguageChange(lang as 'en' | 'fr' | 'de')
                      }}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors rounded-lg flex items-center space-x-2 ${
                        currentLang === lang 
                          ? 'bg-[#7A52D1]/20 text-[#7A52D1]' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {lang === 'en' ? (
                          <svg className='w-5 h-3' viewBox='0 0 36 24'>
                            <rect width='36' height='24' fill='#012169' />
                            <path d='M0,0 L36,24 M36,0 L0,24' stroke='#fff' strokeWidth='2.4' />
                            <path d='M18,0 L18,24 M0,12 L36,12' stroke='#fff' strokeWidth='4' />
                            <path d='M18,0 L18,24 M0,12 L36,12' stroke='#C8102E' strokeWidth='2.4' />
                          </svg>
                        ) : lang === 'fr' ? (
                          <svg className='w-5 h-3' viewBox='0 0 36 24'>
                            <rect width='36' height='24' fill='#ED2939' />
                            <rect width='12' height='24' fill='#002395' />
                            <rect x='12' width='12' height='24' fill='#fff' />
                          </svg>
                        ) : (
                          <svg className='w-5 h-3' viewBox='0 0 36 24'>
                            <rect width='36' height='8' fill='#000' />
                            <rect y='8' width='36' height='8' fill='#DD0000' />
                            <rect y='16' width='36' height='8' fill='#FFCE00' />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-medium">{lang.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
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
          <div className="lg:hidden border-t border-[#7A52D1]/20 py-4 bg-black/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} 
                className={`text-left transition-colors font-bold text-base ${
                  currentPage === 'home' ? 'text-[#7A52D1]' : 'text-gray-300 hover:text-white'
                }`}
              >
                ACCUEIL
              </button>
              <button 
                onClick={() => { onNavigate('marketplace'); setIsMenuOpen(false); }} 
                className={`text-left transition-colors font-bold text-base ${
                  currentPage === 'marketplace' ? 'text-[#7A52D1]' : 'text-gray-300 hover:text-white'
                }`}
              >
                MARKETPLACE
              </button>
              <button 
                onClick={() => { onNavigate('collections'); setIsMenuOpen(false); }} 
                className={`text-left transition-colors font-bold text-base ${
                  currentPage === 'collections' ? 'text-[#7A52D1]' : 'text-gray-300 hover:text-white'
                }`}
              >
                COLLECTIONS
              </button>
              <button 
                onClick={() => { onNavigate('transactions'); setIsMenuOpen(false); }} 
                className={`text-left transition-colors font-bold text-base ${
                  currentPage === 'transactions' ? 'text-[#7A52D1]' : 'text-gray-300 hover:text-white'
                }`}
              >
                TRANSACTIONS
              </button>
              <button 
                onClick={() => { onNavigate('statistics'); setIsMenuOpen(false); }} 
                className={`text-left transition-colors font-bold text-base ${
                  currentPage === 'statistics' ? 'text-[#7A52D1]' : 'text-gray-300 hover:text-white'
                }`}
              >
                STATISTIQUES
              </button>
              
              {!isConnected && (
                <button 
                  onClick={handleConnect}
                  className="flex items-center space-x-2 bg-[#7A52D1] hover:bg-[#6A42C1] text-white px-4 py-2.5 rounded-full transition-all duration-200 w-fit text-base font-bold border-2 border-[#7A52D1]/60 shadow-lg shadow-[#7A52D1]/25 disabled:opacity-50"
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
          <div className="py-3 border-t border-[#7A52D1]/10">
            {getBreadcrumb()}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;