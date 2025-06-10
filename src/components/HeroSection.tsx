import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative h-[40vh] min-h-[500px] overflow-hidden">
      {/* Background avec dégradé moderne */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/40 to-blue-900/30"></div>
      
      {/* Image de fond avec opacité dégradée vers le bas */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Gaming Background"
          className="w-full h-full object-cover"
        />
        {/* Dégradé d'opacité vers le bas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90"></div>
        {/* Overlay coloré moderne */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/40 to-violet-900/60"></div>
      </div>

      {/* Particules flottantes pour l'effet moderne */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-violet-400/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-300/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
              {t('home.heroTitle')}
            </span>
            <span className="block mt-2">
              son <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent font-extrabold">
                {t('home.heroSubtitle')}
              </span>
            </span>
          </h1>
          
          <button className="group relative bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-700 hover:via-violet-700 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 border border-purple-500/30">
            <span className="relative z-10">{t('home.exploreButton')}</span>
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Éléments décoratifs flottants */}
      <div className="absolute top-16 left-16 w-24 h-24 opacity-10 rotate-12 animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg blur-sm"></div>
      </div>
      <div className="absolute top-32 right-24 w-16 h-16 opacity-15 -rotate-12 animate-pulse" style={{animationDelay: '1.5s'}}>
        <div className="w-full h-full bg-gradient-to-br from-violet-400 to-purple-400 rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-24 left-32 w-20 h-20 opacity-10 rotate-45 animate-pulse" style={{animationDelay: '3s'}}>
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-violet-400 rounded-lg blur-sm"></div>
      </div>
    </section>
  );
};

export default HeroSection;