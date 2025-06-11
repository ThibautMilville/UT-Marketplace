import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Users, Eye, ArrowRight, Zap } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface CollectionsSectionProps {
  onNavigate?: (page: string, data?: any) => void;
}

const CollectionsSection = ({ onNavigate }: CollectionsSectionProps) => {
  const { t } = useTranslation();
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
      title: "Ultra Apes Collection",
      subtitle: "Collection Exclusive",
      description: "Collection exclusive d'apes Ultra avec des traits uniques et des pouvoirs spéciaux",
      image: "/collections/ultra-apes.jpeg",
      gradient: "from-[#7A52D1]/30 to-blue-500/30",
      stats: {
        floor: "125.5 UOS",
        volume: "45.8K UOS",
        owners: "12",
        items: "15"
      },
      verified: true,
      trending: true,
      rarity: "Legendary"
    },
    {
      title: "Cypherpunk Revolution",
      subtitle: "Art Collection",
      description: "Hackers et rebelles du monde numérique pour les défenseurs de la vie privée",
      image: "/collections/cypherpunk.jpg",
      gradient: "from-purple-500/30 to-pink-500/30",
      stats: {
        floor: "234.8 UOS",
        volume: "67.9K UOS",
        owners: "9",
        items: "15"
      },
      verified: true,
      trending: true,
      rarity: "Mythic"
    },
    {
      title: "Phygital Artifacts",
      subtitle: "Collectibles",
      description: "Artefacts physiques et numériques fusionnés, l'avenir de la collection",
      image: "/collections/phygital.png",
      gradient: "from-yellow-500/30 to-orange-500/30",
      stats: {
        floor: "298.9 UOS",
        volume: "89.5K UOS",
        owners: "11",
        items: "15"
      },
      verified: true,
      trending: true,
      rarity: "Mythic"
    },
    {
      title: "Ashes Genesis",
      subtitle: "Gaming Collection",
      description: "Première collection Ashes avec des designs légendaires dans un univers post-apocalyptique",
      image: "/collections/ashes.png",
      gradient: "from-green-500/30 to-teal-500/30",
      stats: {
        floor: "456.8 UOS",
        volume: "123.4K UOS",
        owners: "13",
        items: "15"
      },
      verified: true,
      trending: true,
      rarity: "Mythic"
    },
    {
      title: "Freedom Gamers Elite",
      subtitle: "Gaming Collection",
      description: "Guerriers de la liberté numérique avec équipements tactiques avancés",
      image: "/collections/freedom-gamers.png",
      gradient: "from-cyan-500/30 to-blue-500/30",
      stats: {
        floor: "167.2 UOS",
        volume: "35.4K UOS",
        owners: "8",
        items: "15"
      },
      verified: true,
      trending: false,
      rarity: "Legendary"
    },
    {
      title: "Ultra Boat Adventures",
      subtitle: "Gaming Collection",
      description: "Navires d'exploration pour les océans virtuels d'Ultra avec capacités uniques",
      image: "/collections/ultra-boat.jpeg",
      gradient: "from-red-500/30 to-orange-500/30",
      stats: {
        floor: "89.8 UOS",
        volume: "29.0K UOS",
        owners: "10",
        items: "15"
      },
      verified: true,
      trending: true,
      rarity: "Epic"
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
            <span className="text-sm text-white font-medium">{t('home.trending.live')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {t('home.collections.title').split(' ')[0]}
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              {t('home.collections.title').split(' ')[1]}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('home.collections.subtitle')}
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
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigate) {
                        // Adapter les données pour CollectionDetailPage
                        const adaptedCollection = {
                          id: collection.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                          name: collection.title,
                          description: collection.description,
                          image: collection.image,
                          banner: collection.image,
                          creator: collection.subtitle === "Collection Exclusive" ? "UltraStudio" : 
                                  collection.subtitle === "Art Collection" ? "CryptoRebels" :
                                  collection.subtitle === "Collectibles" ? "PhygitalLab" :
                                  collection.subtitle === "Gaming Collection" ? "GameForge" : "UltraCreator",
                          verified: collection.verified,
                          totalItems: parseInt(collection.stats.items),
                          items: parseInt(collection.stats.items),
                          owners: parseInt(collection.stats.owners),
                          floorPrice: parseFloat(collection.stats.floor.replace(' UOS', '')),
                          volume: parseFloat(collection.stats.volume.replace('K UOS', '')) * 1000,
                          volumeChange: Math.random() * 20 - 10, // Random change for demo
                          category: collection.subtitle,
                          featured: true,
                          rarity: collection.rarity,
                          trending: collection.trending,
                          likes: Math.floor(Math.random() * 10000),
                          views: Math.floor(Math.random() * 50000),
                          change24h: Math.random() * 20 - 10
                        };
                        onNavigate('collection-detail', adaptedCollection);
                      }
                    }}
                    className="bg-[#7A52D1] hover:bg-[#6A42C1] text-white px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center space-x-2"
                  >
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
                  onClick={() => {
                    if (onNavigate) {
                      // Adapter les données pour CollectionDetailPage
                      const adaptedCollection = {
                        id: collection.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                        name: collection.title,
                        description: collection.description,
                        image: collection.image,
                        banner: collection.image,
                        creator: collection.subtitle === "Collection Exclusive" ? "UltraStudio" : 
                                collection.subtitle === "Art Collection" ? "CryptoRebels" :
                                collection.subtitle === "Collectibles" ? "PhygitalLab" :
                                collection.subtitle === "Gaming Collection" ? "GameForge" : "UltraCreator",
                        verified: collection.verified,
                        totalItems: parseInt(collection.stats.items),
                        items: parseInt(collection.stats.items),
                        owners: parseInt(collection.stats.owners),
                        floorPrice: parseFloat(collection.stats.floor.replace(' UOS', '')),
                        volume: parseFloat(collection.stats.volume.replace('K UOS', '')) * 1000,
                        volumeChange: Math.random() * 20 - 10, // Random change for demo
                        category: collection.subtitle,
                        featured: true,
                        rarity: collection.rarity,
                        trending: collection.trending,
                        likes: Math.floor(Math.random() * 10000),
                        views: Math.floor(Math.random() * 50000),
                        change24h: Math.random() * 20 - 10
                      };
                      onNavigate('collection-detail', adaptedCollection);
                    }
                  }}
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
              <span>{t('home.collections.viewAll')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;