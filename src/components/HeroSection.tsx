import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Play } from 'lucide-react';

interface HeroSectionProps {
  onNavigate?: (page: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Découvrez l'Univers",
      subtitle: "Ultra UNIQ",
      description: "La première marketplace UNIQ sur blockchain Ultra avec des expériences gaming révolutionnaires",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop&q=80",
      stats: { collections: "10K+", volume: "50M UOS", users: "100K+" }
    },
    {
      title: "Collectionnez",
      subtitle: "l'Extraordinaire",
      description: "Des UNIQs gaming uniques, des collections exclusives et des expériences immersives",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1920&h=1080&fit=crop&q=80",
      stats: { collections: "500+", volume: "25M UOS", users: "50K+" }
    },
    {
      title: "Tradez avec",
      subtitle: "Confiance",
      description: "Marketplace sécurisée, transactions instantanées et communauté active",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80",
      stats: { collections: "1K+", volume: "100M UOS", users: "200K+" }
    }
  ];

  const currentHero = heroSlides[currentSlide];
  
  return (
    <section className="relative h-screen min-h-[800px] overflow-hidden">
      {/* Background dynamique avec transition */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlays pour lisibilité du texte */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>
            <div className="absolute inset-0 bg-radial-gradient from-black/40 via-black/20 to-black/60"></div>
          </div>
        ))}
      </div>

      {/* Particules animées */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#7A52D1]/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Grille décorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(122, 82, 209, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(122, 82, 209, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center h-full">
            {/* Badge animé avec meilleur contraste */}
            <div className={`inline-flex items-center justify-center space-x-2 bg-black/60 backdrop-blur-md border border-[#7A52D1]/50 rounded-full px-6 py-3 mb-8 transition-all duration-1000 shadow-2xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Zap className="w-4 h-4 text-[#7A52D1]" />
              <span className="text-sm text-white font-medium">Marketplace UNIQ #1 sur Ultra</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Titre principal avec ombres renforcées */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ 
              textShadow: '0 8px 32px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.7)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))'
            }}>
              <span className="block text-white">
                {currentHero.title}
              </span>
              <span className="block mt-2 text-white font-extrabold">
                {currentHero.subtitle}
              </span>
            </h1>
            
            {/* Description avec contraste amélioré */}
            <p className={`text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ 
              textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
            }}>
              {currentHero.description}
            </p>

            {/* Statistiques en temps réel avec fond sombre */}
            <div className={`grid grid-cols-3 gap-8 mb-12 max-w-2xl w-full transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                  {currentHero.stats.collections}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wide">Collections</div>
              </div>
              <div className="text-center bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20">
                <div className="text-3xl md:text-4xl font-bold text-[#7A52D1] mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                  {currentHero.stats.volume}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wide">Volume Total</div>
              </div>
              <div className="text-center bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                  {currentHero.stats.users}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wide">Utilisateurs</div>
              </div>
            </div>

            {/* Boutons d'action avec meilleur contraste */}
            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button 
                onClick={() => onNavigate?.('marketplace')}
                className="group relative bg-gradient-to-r from-[#7A52D1] via-violet-600 to-blue-600 hover:from-[#6A42C1] hover:via-violet-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#7A52D1]/40 hover:shadow-[#7A52D1]/60 border border-[#7A52D1]/30"
              >
                <span className="relative z-10 flex items-center space-x-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  <span>Explorer la Marketplace</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button 
                onClick={() => onNavigate?.('collections')}
                className="group flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/30 hover:bg-black/70 hover:border-white/40 text-white font-medium py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Voir les Collections</span>
              </button>
            </div>

            {/* Indicateurs de slides */}
            <div className={`flex items-center justify-center space-x-3 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-[#7A52D1] scale-125 shadow-lg shadow-[#7A52D1]/50' 
                      : 'bg-white/40 hover:bg-white/60 shadow-md'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Éléments décoratifs flottants améliorés */}
      <div className="absolute top-20 left-20 w-32 h-32 opacity-10 rotate-12 animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-[#7A52D1] to-blue-400 rounded-2xl blur-sm"></div>
      </div>
      <div className="absolute top-40 right-32 w-24 h-24 opacity-15 -rotate-12 animate-pulse" style={{animationDelay: '1.5s'}}>
        <div className="w-full h-full bg-gradient-to-br from-violet-400 to-[#7A52D1] rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-32 left-40 w-28 h-28 opacity-10 rotate-45 animate-pulse" style={{animationDelay: '3s'}}>
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-violet-400 rounded-2xl blur-sm"></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center shadow-lg">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;