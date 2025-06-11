import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Flame, 
  Eye, 
  Heart, 
  Clock, 
  ArrowRight, 
  Star,
  Zap,
  Award,
  Crown,
  Sparkles,
  Activity,
  BarChart3
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface TrendingSectionProps {
  onNavigate?: (page: string, data?: any) => void;
}

const TrendingSection = ({ onNavigate }: TrendingSectionProps) => {
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

    const cards = document.querySelectorAll('.trending-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [selectedPeriod]);

  const trendingData = {
    '24h': [
      {
        rank: 1,
        title: "Ultra Apes #0001",
        collection: "Ultra Apes Collection",
        volume: "245.5K",
        volumeUSD: "$491K",
        volumeChange: 45.2,
        transactions: "156",
        transactionChange: 23.1,
        floorPrice: "125.5 UOS",
        floorPriceUSD: "$251",
        priceChange: 12.8,
        image: "/collections/ultra-apes.jpeg",
        verified: true,
        trending: true,
        rarity: "Legendary",
        owners: "12",
        timeLeft: "2h 15m"
      },
      {
        rank: 2,
        title: "Cypherpunk #0001",
        collection: "Cypherpunk Revolution",
        volume: "189.3K",
        volumeUSD: "$379K",
        volumeChange: 32.7,
        transactions: "98",
        transactionChange: 18.5,
        floorPrice: "234.8 UOS",
        floorPriceUSD: "$470",
        priceChange: -5.3,
        image: "/collections/cypherpunk.jpg",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "9",
        timeLeft: "5h 42m"
      },
      {
        rank: 3,
        title: "Phygital Artifact #0001",
        collection: "Phygital Artifacts",
        volume: "156.8K",
        volumeUSD: "$314K",
        volumeChange: 28.4,
        transactions: "76",
        transactionChange: 15.2,
        floorPrice: "298.9 UOS",
        floorPriceUSD: "$598",
        priceChange: 8.7,
        image: "/collections/phygital.png",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "11",
        timeLeft: "1d 3h"
      },
      {
        rank: 4,
        title: "Ashes Genesis #0001",
        collection: "Ashes Genesis",
        volume: "134.6K",
        volumeUSD: "$269K",
        volumeChange: 19.8,
        transactions: "54",
        transactionChange: 12.3,
        floorPrice: "456.8 UOS",
        floorPriceUSD: "$914",
        priceChange: 6.1,
        image: "/collections/ashes.png",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "13",
        timeLeft: "12h 30m"
      },
      {
        rank: 5,
        title: "Freedom Gamer #0001",
        collection: "Freedom Gamers Elite",
        volume: "123.4K",
        volumeUSD: "$247K",
        volumeChange: 15.6,
        transactions: "43",
        transactionChange: 9.8,
        floorPrice: "167.2 UOS",
        floorPriceUSD: "$334",
        priceChange: -2.4,
        image: "/collections/freedom-gamers.png",
        verified: true,
        trending: false,
        rarity: "Legendary",
        owners: "8",
        timeLeft: "6h 15m"
      },
      {
        rank: 6,
        title: "Ultra Boat #0001",
        collection: "Ultra Boat Adventures",
        volume: "98.7K",
        volumeUSD: "$197K",
        volumeChange: 12.3,
        transactions: "32",
        transactionChange: 7.5,
        floorPrice: "89.8 UOS",
        floorPriceUSD: "$180",
        priceChange: 4.2,
        image: "/collections/ultra-boat.jpeg",
        verified: true,
        trending: true,
        rarity: "Epic",
        owners: "10",
        timeLeft: "4h 20m"
      }
    ],
    '7d': [
      {
        rank: 1,
        title: "Ashes Genesis #0001",
        collection: "Ashes Genesis",
        volume: "1.25M",
        volumeUSD: "$2.5M",
        volumeChange: 67.8,
        transactions: "892",
        transactionChange: 45.2,
        floorPrice: "456.8 UOS",
        floorPriceUSD: "$914",
        priceChange: 23.4,
        image: "/collections/ashes.png",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "13",
        timeLeft: "2h 15m"
      },
      {
        rank: 2,
        title: "Phygital Artifact #0001",
        collection: "Phygital Artifacts",
        volume: "987.3K",
        volumeUSD: "$1.97M",
        volumeChange: 54.1,
        transactions: "567",
        transactionChange: 32.7,
        floorPrice: "298.9 UOS",
        floorPriceUSD: "$598",
        priceChange: 18.9,
        image: "/collections/phygital.png",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "11",
        timeLeft: "1d 3h"
      },
      {
        rank: 3,
        title: "Cypherpunk #0001",
        collection: "Cypherpunk Revolution",
        volume: "756.8K",
        volumeUSD: "$1.51M",
        volumeChange: 43.6,
        transactions: "423",
        transactionChange: 28.4,
        floorPrice: "234.8 UOS",
        floorPriceUSD: "$470",
        priceChange: 15.7,
        image: "/collections/cypherpunk.jpg",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "9",
        timeLeft: "5h 42m"
      },
      {
        rank: 4,
        title: "Ultra Power #0001",
        collection: "Ultra Power Core",
        volume: "634.6K",
        volumeUSD: "$1.27M",
        volumeChange: 38.2,
        transactions: "298",
        transactionChange: 22.1,
        floorPrice: "189.3 UOS",
        floorPriceUSD: "$379",
        priceChange: 12.8,
        image: "/collections/ultra-power.png",
        verified: true,
        trending: false,
        rarity: "Epic",
        owners: "7",
        timeLeft: "6h 15m"
      },
      {
        rank: 5,
        title: "Ultra Apes #0001",
        collection: "Ultra Apes Collection",
        volume: "523.4K",
        volumeUSD: "$1.05M",
        volumeChange: 31.5,
        transactions: "234",
        transactionChange: 18.7,
        floorPrice: "125.5 UOS",
        floorPriceUSD: "$251",
        priceChange: 9.4,
        image: "/collections/ultra-apes.jpeg",
        verified: true,
        trending: true,
        rarity: "Legendary",
        owners: "12",
        timeLeft: "4h 20m"
      },
      {
        rank: 6,
        title: "Digital Counsellor #0001",
        collection: "Digital Counsellor",
        volume: "456.7K",
        volumeUSD: "$913K",
        volumeChange: 27.8,
        transactions: "189",
        transactionChange: 15.3,
        floorPrice: "156.8 UOS",
        floorPriceUSD: "$314",
        priceChange: 6.9,
        image: "/collections/counsellor.png",
        verified: true,
        trending: false,
        rarity: "Epic",
        owners: "7",
        timeLeft: "12h 30m"
      }
    ],
    '30d': [
      {
        rank: 1,
        title: "Ashes Apex #0001",
        collection: "Ashes Apex",
        volume: "4.2M",
        volumeUSD: "$8.4M",
        volumeChange: 89.3,
        transactions: "3.2K",
        transactionChange: 67.8,
        floorPrice: "634.8 UOS",
        floorPriceUSD: "$1,270",
        priceChange: 45.7,
        image: "/collections/ahes-4.png",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "8",
        timeLeft: "2h 15m"
      },
      {
        rank: 2,
        title: "Ashes Revolution #0001",
        collection: "Ashes Revolution",
        volume: "3.8M",
        volumeUSD: "$7.6M",
        volumeChange: 76.4,
        transactions: "2.8K",
        transactionChange: 54.1,
        floorPrice: "567.2 UOS",
        floorPriceUSD: "$1,134",
        priceChange: 38.2,
        image: "/collections/ashes-3.png",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "9",
        timeLeft: "6h 15m"
      },
      {
        rank: 3,
        title: "Ashes Uprising #0001",
        collection: "Ashes Uprising",
        volume: "3.1M",
        volumeUSD: "$6.2M",
        volumeChange: 65.7,
        transactions: "2.1K",
        transactionChange: 43.6,
        floorPrice: "389.5 UOS",
        floorPriceUSD: "$779",
        priceChange: 31.5,
        image: "/collections/ashes-2.png",
        verified: true,
        trending: true,
        rarity: "Legendary",
        owners: "11",
        timeLeft: "4h 20m"
      },
      {
        rank: 4,
        title: "Ashes Genesis #0001",
        collection: "Ashes Genesis",
        volume: "2.7M",
        volumeUSD: "$5.4M",
        volumeChange: 58.9,
        transactions: "1.9K",
        transactionChange: 38.2,
        floorPrice: "456.8 UOS",
        floorPriceUSD: "$914",
        priceChange: 27.8,
        image: "/collections/ashes.png",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "13",
        timeLeft: "1d 3h"
      },
      {
        rank: 5,
        title: "Phygital Artifact #0001",
        collection: "Phygital Artifacts",
        volume: "2.3M",
        volumeUSD: "$4.6M",
        volumeChange: 52.3,
        transactions: "1.6K",
        transactionChange: 32.7,
        floorPrice: "298.9 UOS",
        floorPriceUSD: "$598",
        priceChange: 23.4,
        image: "/collections/phygital.png",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "11",
        timeLeft: "5h 42m"
      },
      {
        rank: 6,
        title: "Cypherpunk #0001",
        collection: "Cypherpunk Revolution",
        volume: "1.9M",
        volumeUSD: "$3.8M",
        volumeChange: 47.1,
        transactions: "1.3K",
        transactionChange: 28.4,
        floorPrice: "234.8 UOS",
        floorPriceUSD: "$470",
        priceChange: 19.6,
        image: "/collections/cypherpunk.jpg",
        verified: true,
        trending: true,
        rarity: "Mythic",
        owners: "9",
        timeLeft: "12h 30m"
      }
    ]
  };

  const getCurrentTrending = () => trendingData[selectedPeriod as keyof typeof trendingData] || trendingData['7d'];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600 text-black';
      case 2: return 'from-gray-300 to-gray-500 text-black';
      case 3: return 'from-amber-600 to-amber-800 text-white';
      default: return 'from-[#7A52D1] to-violet-600 text-white';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'from-red-500 to-pink-500';
      case 'Legendary': return 'from-yellow-500 to-orange-500';
      case 'Epic': return 'from-purple-500 to-violet-500';
      case 'Rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleCardClick = (item: any) => {
    if (onNavigate) {
      onNavigate('uniq-detail', item);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-[#7A52D1]/5 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(122, 82, 209, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#7A52D1]/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#7A52D1]/20 to-violet-600/20 backdrop-blur-sm border border-[#7A52D1]/30 rounded-full px-6 py-3 mb-8">
            <Flame className="w-5 h-5 text-[#7A52D1]" />
            <span className="text-white font-medium">{t('home.trending.live')}</span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {t('home.trending.title')}
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Ultra
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            {t('home.trending.subtitle')}
          </p>

          {/* Period Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-2 border border-[#7A52D1]/20">
              {[
                { key: '24h', label: t('trending.period.24h'), icon: Clock },
                { key: '7d', label: t('trending.period.7d'), icon: BarChart3 },
                { key: '30d', label: t('trending.period.30d'), icon: Activity }
              ].map(period => {
                const IconComponent = period.icon;
                return (
                  <button
                    key={period.key}
                    onClick={() => setSelectedPeriod(period.key)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedPeriod === period.key
                        ? 'bg-gradient-to-r from-[#7A52D1] to-violet-600 text-white shadow-lg shadow-[#7A52D1]/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{period.label}</span>
          </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {getCurrentTrending().map((item, index) => (
            <div
              key={`${selectedPeriod}-${index}`}
              data-index={index}
              onClick={() => handleCardClick(item)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`trending-card group relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-700 transform hover:scale-105 hover:-translate-y-3 cursor-pointer ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                boxShadow: hoveredCard === index ? '0 25px 50px -12px rgba(122, 82, 209, 0.25)' : 'none'
              }}
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-20">
                <div className={`bg-gradient-to-r ${getRankColor(item.rank)} px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg`}>
                  {item.rank === 1 && <Crown className="w-3 h-3" />}
                  {item.rank === 2 && <Award className="w-3 h-3" />}
                  {item.rank === 3 && <Star className="w-3 h-3" />}
                  <span>#{item.rank}</span>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Top Badges */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {item.verified && (
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-2 py-1 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">{t('marketplace.verified')}</span>
                    </div>
                  )}
                                     {item.trending && (
                     <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-2 py-1 flex items-center space-x-1">
                       <Flame className="w-3 h-3 text-red-400 animate-pulse" />
                       <span className="text-xs text-red-400 font-medium">{t('trending.hot')}</span>
                     </div>
                   )}
                </div>

                {/* Rarity Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {item.rarity}
                  </div>
                </div>

                {/* Time Left */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.timeLeft}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#7A52D1]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{t('trending.explore')}</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1 truncate">{item.title}</h3>
                  <p className="text-sm text-[#7A52D1] font-medium mb-2">{item.collection}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">{t('trending.volume')}</span>
                      <div className={`flex items-center space-x-1 text-xs ${
                        item.volumeChange > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.volumeChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{Math.abs(item.volumeChange)}%</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white">{item.volume} UOS</div>
                    <div className="text-xs text-gray-400">{item.volumeUSD}</div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">{t('trending.floor')}</span>
                      <div className={`flex items-center space-x-1 text-xs ${
                        item.priceChange > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.priceChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{Math.abs(item.priceChange)}%</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white">{item.floorPrice}</div>
                    <div className="text-xs text-gray-400">{item.floorPriceUSD}</div>
                  </div>
                </div>
                
                {/* Additional Stats */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-3 h-3" />
                    <span>{item.transactions} tx</span>
                    <div className={`flex items-center space-x-1 ml-2 ${
                      item.transactionChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {item.transactionChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{item.transactionChange}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{item.owners} {t('trending.owners')}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item);
                  }}
                  className="w-full bg-gradient-to-r from-[#7A52D1]/20 to-violet-600/20 hover:from-[#7A52D1]/30 hover:to-violet-600/30 border border-[#7A52D1]/30 hover:border-[#7A52D1]/50 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <Zap className="w-4 h-4 group-hover:text-[#7A52D1] transition-colors" />
                  <span>{t('marketplace.exploreUniq')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7A52D1]/0 via-[#7A52D1]/10 to-violet-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => onNavigate && onNavigate('marketplace')}
            className="group bg-gradient-to-r from-[#7A52D1] via-violet-600 to-blue-600 hover:from-[#6A42C1] hover:via-violet-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#7A52D1]/30 hover:shadow-[#7A52D1]/50 border border-[#7A52D1]/30"
          >
            <span className="flex items-center space-x-2">
              <Flame className="w-5 h-5" />
              <span>Voir Toutes les Tendances</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;