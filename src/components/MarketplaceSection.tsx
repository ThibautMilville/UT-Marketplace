import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Eye, Heart, ShoppingCart, Zap, Timer, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface MarketplaceSectionProps {
  onNavigate?: (page: string, data?: any) => void;
}

const MarketplaceSection = ({ onNavigate }: MarketplaceSectionProps) => {
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.marketplace-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const items = [
    {
      id: "UA-001",
      title: "Ultra Apes #0001",
      collection: "Ultra Apes Collection",
      price: "125.5",
      priceUSD: "251.0",
      image: "/collections/ultra-apes.jpeg",
      edition: "1/15",
      rarity: "Legendary",
      creator: "UltraTeam",
      verified: true,
      trending: true,
      timeLeft: "2h 15m",
      likes: 234,
      views: 1567
    },
    {
      id: "CP-001",
      title: "Cypherpunk #0001",
      collection: "Cypherpunk Revolution",
      price: "234.8",
      priceUSD: "469.6",
      image: "/collections/cypherpunk.jpg",
      edition: "1/15",
      rarity: "Mythic",
      creator: "CyberArt",
      verified: true,
      trending: true,
      timeLeft: "5h 42m",
      likes: 456,
      views: 2890
    },
    {
      id: "PA-001",
      title: "Phygital Artifact #0001",
      collection: "Phygital Artifacts",
      price: "298.9",
      priceUSD: "597.8",
      image: "/collections/phygital.png",
      edition: "1/15",
      rarity: "Mythic",
      creator: "PhygitalMaster",
      verified: true,
      trending: true,
      timeLeft: "1d 3h",
      likes: 589,
      views: 3445
    },
    {
      id: "AG-001",
      title: "Ashes Genesis #0001",
      collection: "Ashes Genesis",
      price: "456.8",
      priceUSD: "913.6",
      image: "/collections/ashes.png",
      edition: "1/15",
      rarity: "Mythic",
      creator: "AshesTeam",
      verified: true,
      trending: true,
      timeLeft: "12h 30m",
      likes: 678,
      views: 4234
    },
    {
      id: "FG-001",
      title: "Freedom Gamer #0001",
      collection: "Freedom Gamers Elite",
      price: "167.2",
      priceUSD: "334.4",
      image: "/collections/freedom-gamers.png",
      edition: "1/15",
      rarity: "Legendary",
      creator: "FreedomCreator",
      verified: true,
      trending: false,
      timeLeft: "6h 15m",
      likes: 312,
      views: 1234
    },
    {
      id: "UB-001",
      title: "Ultra Boat #0001",
      collection: "Ultra Boat Adventures",
      price: "89.8",
      priceUSD: "179.6",
      image: "/collections/ultra-boat.jpeg",
      edition: "1/15",
      rarity: "Epic",
      creator: "BoatArt",
      verified: true,
      trending: true,
      timeLeft: "4h 20m",
      likes: 189,
      views: 956
    },
    {
      id: "DC-001",
      title: "Digital Counsellor #0001",
      collection: "Digital Counsellor",
      price: "156.8",
      priceUSD: "313.6",
      image: "/collections/counsellor.png",
      edition: "1/15",
      rarity: "Epic",
      creator: "DigitalArts",
      verified: true,
      trending: false,
      timeLeft: "8h 45m",
      likes: 234,
      views: 1567
    },
    {
      id: "UF-001",
      title: "Ultra Fashion #0001",
      collection: "Ultra Fashion Elite",
      price: "134.6",
      priceUSD: "269.2",
      image: "/collections/ultra-clothes-1.png",
      edition: "1/15",
      rarity: "Epic",
      creator: "FashionMaster",
      verified: true,
      trending: false,
      timeLeft: "15h 10m",
      likes: 298,
      views: 1789
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'Mythic': return { bg: 'from-red-500 to-pink-500', text: 'text-red-400', border: 'border-red-400/30' };
      case 'Legendary': return { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-400', border: 'border-yellow-400/30' };
      case 'Epic': return { bg: 'from-purple-500 to-violet-500', text: 'text-purple-400', border: 'border-purple-400/30' };
      case 'Rare': return { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-400', border: 'border-blue-400/30' };
      default: return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-400', border: 'border-gray-400/30' };
    }
  };

  const handleItemClick = (item: any) => {
    if (onNavigate) {
      // Adapter les données pour UniqDetailPage
      const adaptedItem = {
        id: item.id,
        name: item.title, // title -> name
        collection: item.collection,
        price: parseFloat(item.price), // Convertir string en number
        priceUSD: parseFloat(item.priceUSD), // Convertir string en number
        image: item.image,
        rarity: item.rarity,
        creator: item.creator,
        verified: item.verified,
        trending: item.trending,
        timeLeft: item.timeLeft,
        likes: item.likes,
        views: item.views,
        edition: item.edition
      };
      onNavigate('uniq-detail', adaptedItem);
    }
  };

  const toggleLike = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-slate-900/50 to-black relative overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 75% 25%, rgba(122, 82, 209, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#7A52D1]/20 backdrop-blur-sm border border-[#7A52D1]/30 rounded-full px-4 py-2 mb-6">
            <ShoppingCart className="w-4 h-4 text-[#7A52D1]" />
            <span className="text-sm text-white font-medium">{t('home.marketplace.subtitle')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {t('home.marketplace.title').split(' ')[0]}
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              {t('home.marketplace.title').split(' ')[1]}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('home.marketplace.subtitle')}
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {items.map((item, index) => {
            const rarityStyle = getRarityColor(item.rarity);
            return (
              <div 
                key={item.id}
                data-index={index}
                onClick={() => handleItemClick(item)}
                className={`marketplace-card group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                  visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    {item.verified && (
                      <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-2 py-1 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-400 font-medium">{t('marketplace.verified')}</span>
                      </div>
                    )}
                    {item.trending && (
                      <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-2 py-1 flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-red-400" />
                        <span className="text-xs text-red-400 font-medium">{t('marketplace.trending')}</span>
                      </div>
                    )}
                  </div>

                  {/* Rarity Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`bg-gradient-to-r ${rarityStyle.bg} text-white text-xs px-3 py-1 rounded-full font-bold uppercase`}>
                      {item.rarity}
                    </div>
                  </div>

                  {/* Edition Badge */}
                  {item.edition && (
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      {item.edition}
                    </div>
                  )}

                  {/* Time Left */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <Timer className="w-3 h-3" />
                    <span>{item.timeLeft}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                      <button className="bg-[#7A52D1] hover:bg-[#6A42C1] text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => toggleLike(item.id, e)}
                        className={`p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${
                          likedItems.has(item.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/20 text-white hover:bg-red-500'
                        }`}
                        style={{ transitionDelay: '100ms' }}
                      >
                        <Heart className={`w-5 h-5 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-1 truncate">{item.title}</h3>
                    <p className="text-sm text-[#7A52D1] font-medium mb-1">{item.collection}</p>
                    <p className="text-xs text-gray-400">{t('marketplace.by')} {item.creator}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{item.views}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-white">{item.price} UOS</div>
                      <div className="text-sm text-gray-400">${item.priceUSD}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${rarityStyle.text} bg-current/10 ${rarityStyle.border} border`}>
                      {item.rarity}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    }}
                    className="w-full bg-gradient-to-r from-[#7A52D1] to-blue-500 hover:from-[#6A42C1] hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t('marketplace.exploreUniq')}</span>
                  </button>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7A52D1]/0 via-[#7A52D1]/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => onNavigate && onNavigate('marketplace')}
            className="group bg-gradient-to-r from-[#7A52D1] via-violet-600 to-blue-600 hover:from-[#6A42C1] hover:via-violet-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#7A52D1]/30 hover:shadow-[#7A52D1]/50 border border-[#7A52D1]/30"
          >
            <span className="flex items-center space-x-2">
              <span>{t('home.marketplace.exploreNow')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;