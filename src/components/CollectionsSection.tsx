import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Users, Eye, ArrowRight, Zap } from 'lucide-react';

interface CollectionsSectionProps {
  onNavigate?: (page: string, data?: any) => void;
}

const CollectionsSection = ({ onNavigate }: CollectionsSectionProps) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

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

    const cards = document.querySelectorAll('.collection-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const collections = [
    {
      title: "Ultra Genesis",
      subtitle: "Collection Exclusive",
      description: "Les premiers NFTs Ultra avec des utilitaires gaming uniques",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop&q=80",
      gradient: "from-[#7A52D1]/30 to-blue-500/30",
      stats: {
        floor: "245.5 UOS",
        volume: "1.2M UOS",
        owners: "3.4K",
        items: "10K"
      },
      verified: true,
      trending: true,
      rarity: "Legendary"
    },
    {
      title: "Cosmic Warriors",
      subtitle: "Gaming Collection",
      description: "Guerriers cosmiques avec pouvoirs spéciaux dans l'écosystème Ultra",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&h=400&fit=crop&q=80",
      gradient: "from-purple-500/30 to-pink-500/30",
      stats: {
        floor: "89.2 UOS",
        volume: "856K UOS",
        owners: "2.1K",
        items: "5K"
      },
      verified: true,
      trending: false,
      rarity: "Epic"
    },
    {
      title: "Digital Legends",
      subtitle: "Art Collection",
      description: "Œuvres d'art numériques créées par les meilleurs artistes Ultra",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&q=80",
      gradient: "from-yellow-500/30 to-orange-500/30",
      stats: {
        floor: "156.8 UOS",
        volume: "2.1M UOS",
        owners: "4.7K",
        items: "7.5K"
      },
      verified: true,
      trending: true,
      rarity: "Rare"
    },
    {
      title: "Mystic Creatures",
      subtitle: "Fantasy Collection",
      description: "Créatures mystiques avec des capacités magiques uniques",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&q=80",
      gradient: "from-green-500/30 to-teal-500/30",
      stats: {
        floor: "43.9 UOS",
        volume: "634K UOS",
        owners: "1.8K",
        items: "15K"
      },
      verified: false,
      trending: false,
      rarity: "Common"
    },
    {
      title: "Cyber Punks Elite",
      subtitle: "Futuristic Collection",
      description: "Personnages cyberpunk avec technologies avancées",
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600&h=400&fit=crop&q=80",
      gradient: "from-cyan-500/30 to-blue-500/30",
      stats: {
        floor: "198.4 UOS",
        volume: "1.8M UOS",
        owners: "2.9K",
        items: "3K"
      },
      verified: true,
      trending: true,
      rarity: "Legendary"
    },
    {
      title: "Ultra Racers",
      subtitle: "Racing Collection",
      description: "Véhicules de course futuristes pour les compétitions Ultra",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop&q=80",
      gradient: "from-red-500/30 to-orange-500/30",
      stats: {
        floor: "312.7 UOS",
        volume: "3.2M UOS",
        owners: "1.2K",
        items: "2K"
      },
      verified: true,
      trending: true,
      rarity: "Mythic"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'text-red-400 bg-red-400/20';
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/20';
      case 'Epic': return 'text-purple-400 bg-purple-400/20';
      case 'Rare': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-slate-900/50 to-black relative overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(122, 82, 209, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#7A52D1]/20 backdrop-blur-sm border border-[#7A52D1]/30 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-[#7A52D1]" />
            <span className="text-sm text-white font-medium">Collections Tendances</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Collections
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Exclusives
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les collections NFT les plus populaires sur Ultra, créées par des artistes et développeurs de renommée mondiale
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collections.map((collection, index) => (
            <div 
              key={index}
              data-index={index}
              className={`collection-card group relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 flex flex-col ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} group-hover:opacity-80 transition-opacity duration-300`}></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  {collection.verified && (
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-2 py-1 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400 font-medium">Vérifié</span>
                    </div>
                  )}
                  {collection.trending && (
                    <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-2 py-1 flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-red-400 font-medium">Tendance</span>
                    </div>
                  )}
                </div>

                {/* Rarity Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`${getRarityColor(collection.rarity)} backdrop-blur-sm border border-current/30 rounded-full px-3 py-1`}>
                    <span className="text-xs font-bold">{collection.rarity}</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-[#7A52D1] hover:bg-[#6A42C1] text-white px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Voir Collection</span>
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-1">{collection.title}</h3>
                  <p className="text-sm text-[#7A52D1] font-medium mb-2">{collection.subtitle}</p>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{collection.description}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Floor Price</div>
                    <div className="text-sm font-bold text-white">{collection.stats.floor}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Volume</div>
                    <div className="text-sm font-bold text-[#7A52D1]">{collection.stats.volume}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Propriétaires</div>
                    <div className="text-sm font-bold text-white">{collection.stats.owners}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Items</div>
                    <div className="text-sm font-bold text-white">{collection.stats.items}</div>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => onNavigate && onNavigate('collection-detail', collection)}
                  className="w-full bg-gradient-to-r from-[#7A52D1]/20 to-blue-500/20 hover:from-[#7A52D1]/30 hover:to-blue-500/30 border border-[#7A52D1]/30 hover:border-[#7A52D1]/50 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 group mt-auto"
                >
                  <span>Explorer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7A52D1]/0 via-[#7A52D1]/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => onNavigate && onNavigate('collections')}
            className="group bg-gradient-to-r from-[#7A52D1] via-violet-600 to-blue-600 hover:from-[#6A42C1] hover:via-violet-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#7A52D1]/30 hover:shadow-[#7A52D1]/50 border border-[#7A52D1]/30"
          >
            <span className="flex items-center space-x-2">
              <span>Voir Toutes les Collections</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;