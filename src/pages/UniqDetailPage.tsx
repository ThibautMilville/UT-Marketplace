import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Eye, 
  Heart, 
  Share2, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Clock, 
  Shield, 
  Star,
  ChevronLeft,
  ChevronRight,
  Copy,
  Zap,
  Award,
  Activity,
  DollarSign
} from 'lucide-react';

interface UniqDetailPageProps {
  uniq: any;
  onNavigate: (page: string) => void;
}

const UniqDetailPage = ({ uniq, onNavigate }: UniqDetailPageProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const mockUniqData = {
    id: "Ultra Genesis #3847",
    name: "Cosmic Warrior Elite",
    collection: "Ultra Genesis Collection",
    creator: "QuantumArtist",
    tokenFactoryId: "3847",
    serialNumber: "1/100",
    rarity: "Legendary",
    onSale: "3",
    maxCopies: "100",
    walletsWithUniq: "97",
    currentPrice: "125.5 UOS",
    currentPriceUSD: "$2,510",
    floorPrice: "89.2 UOS",
    floorPriceUSD: "$1,784",
    averagePrice: "107.8 UOS",
    averagePriceUSD: "$2,156",
    lastSale: "134.7 UOS",
    lastSaleUSD: "$2,694",
    utilities: ["VIP Access", "Exclusive Events", "Governance Rights", "Staking Rewards"],
    attributes: [
      { trait: "Background", value: "Cosmic Nebula", rarity: "5%" },
      { trait: "Armor", value: "Quantum Steel", rarity: "12%" },
      { trait: "Weapon", value: "Plasma Sword", rarity: "8%" },
      { trait: "Eyes", value: "Laser Blue", rarity: "15%" },
      { trait: "Aura", value: "Golden", rarity: "3%" }
    ],
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop&q=80"
    ],
    description: "Un guerrier cosmique d'élite forgé dans les profondeurs de l'espace. Cette UNIQ légendaire représente la fusion parfaite entre technologie avancée et pouvoir mystique. Équipé d'une armure en acier quantique et d'une épée plasma, ce guerrier possède des capacités extraordinaires qui transcendent les lois de la physique traditionnelle.",
    lore: "Dans les confins les plus reculés de la galaxie Ultra, où les étoiles naissent et meurent dans un ballet cosmique éternel, émergent les Guerriers Cosmiques. Ces êtres d'exception sont choisis par l'univers lui-même pour maintenir l'équilibre entre les forces du chaos et de l'ordre. Chaque guerrier porte en lui une fraction de l'énergie primordiale qui a donné naissance aux galaxies.",
    verified: true,
    trending: true,
    views: 15420,
    likes: 892,
    owners: 97
  };

  const relatedUniqs = [
    {
      id: "4521",
      name: "Stellar Guardian #4521",
      collection: "Ultra Genesis",
      price: "98.7 UOS",
      priceUSD: "$1,974",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop&q=80",
      rarity: "Epic"
    },
    {
      id: "2156",
      name: "Void Walker #2156",
      collection: "Ultra Genesis",
      price: "156.3 UOS",
      priceUSD: "$3,126",
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=300&h=300&fit=crop&q=80",
      rarity: "Legendary"
    },
    {
      id: "7834",
      name: "Quantum Mage #7834",
      collection: "Ultra Genesis",
      price: "203.9 UOS",
      priceUSD: "$4,078",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop&q=80",
      rarity: "Mythic"
    }
  ];

  const transactions = [
    {
      type: "VENTE",
      price: "134.7 UOS",
      priceUSD: "$2,694",
      date: "Il y a 2 heures",
      from: "CosmicTrader",
      to: "EliteCollector",
      hash: "0x1a2b3c4d...",
      verified: true
    },
    {
      type: "LISTING",
      price: "125.5 UOS",
      priceUSD: "$2,510",
      date: "Il y a 1 jour",
      from: "EliteCollector",
      to: "Marketplace",
      hash: "0x5e6f7g8h...",
      verified: true
    },
    {
      type: "ACHAT",
      price: "89.2 UOS",
      priceUSD: "$1,784",
      date: "Il y a 3 jours",
      from: "QuantumVault",
      to: "CosmicTrader",
      hash: "0x9i0j1k2l...",
      verified: true
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'from-red-500 to-pink-500';
      case 'Legendary': return 'from-yellow-500 to-orange-500';
      case 'Epic': return 'from-purple-500 to-violet-500';
      case 'Rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VENTE': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ACHAT': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LISTING': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockUniqData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockUniqData.images.length) % mockUniqData.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#7A52D1]/10 to-black text-white">
      {/* Header avec navigation */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#7A52D1]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('marketplace')}
              className="flex items-center space-x-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-xl text-white hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au Marketplace</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-xl transition-all ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-gray-800/50 text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 bg-gray-800/50 rounded-xl text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Section Image */}
          <div className={`space-y-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Image principale */}
            <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 group">
              <div className="relative h-96 lg:h-[500px]">
                <img
                  src={mockUniqData.images[currentImageIndex]}
                  alt={mockUniqData.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                
                {/* Navigation des images */}
                {mockUniqData.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  {mockUniqData.verified && (
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-3 py-1 flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">Vérifié</span>
                    </div>
                  )}
                  {mockUniqData.trending && (
                    <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-3 py-1 flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-red-400 font-medium">Tendance</span>
                    </div>
                  )}
                </div>

                {/* Rarity Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`bg-gradient-to-r ${getRarityColor(mockUniqData.rarity)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {mockUniqData.rarity}
                  </div>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Eye className="w-3 h-3 text-gray-400" />
                      <span className="text-white">{mockUniqData.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Heart className="w-3 h-3 text-gray-400" />
                      <span className="text-white">{mockUniqData.likes}</span>
                    </div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white text-sm">{mockUniqData.serialNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Miniatures */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {mockUniqData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    index === currentImageIndex 
                      ? 'border-[#7A52D1] scale-105' 
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Vue ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Section Détails */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <h1 className="text-4xl font-bold text-white">{mockUniqData.name}</h1>
                <div className={`bg-gradient-to-r ${getRarityColor(mockUniqData.rarity)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                  {mockUniqData.rarity}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-lg">
                <span className="text-gray-400">Collection:</span>
                <span className="text-[#7A52D1] font-medium">{mockUniqData.collection}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Créé par:</span>
                <span className="text-white font-medium">{mockUniqData.creator}</span>
                <Shield className="w-4 h-4 text-green-400" />
              </div>
            </div>

            {/* Prix */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Prix Actuel</div>
                  <div className="text-2xl font-bold text-white">{mockUniqData.currentPrice}</div>
                  <div className="text-sm text-gray-400">{mockUniqData.currentPriceUSD}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Dernière Vente</div>
                  <div className="text-xl font-bold text-green-400">{mockUniqData.lastSale}</div>
                  <div className="text-sm text-gray-400">{mockUniqData.lastSaleUSD}</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Floor Price:</span>
                    <span className="text-white">{mockUniqData.floorPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prix Moyen:</span>
                    <span className="text-white">{mockUniqData.averagePrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
                <div className="text-2xl font-bold text-white mb-1">{mockUniqData.onSale}</div>
                <div className="text-xs text-gray-400">En Vente</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
                <div className="text-2xl font-bold text-white mb-1">{mockUniqData.maxCopies}</div>
                <div className="text-xs text-gray-400">Total Supply</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
                <div className="text-2xl font-bold text-white mb-1">{mockUniqData.owners}</div>
                <div className="text-xs text-gray-400">Propriétaires</div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-[#7A52D1] to-violet-600 hover:from-[#6A42C1] hover:to-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#7A52D1]/30">
                Acheter Maintenant
              </button>
              <button className="px-6 py-4 bg-black/40 border border-[#7A52D1]/30 hover:border-[#7A52D1]/50 text-white rounded-xl transition-all duration-300">
                Faire une Offre
              </button>
            </div>

            {/* Utilités */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#7A52D1]" />
                <span>Utilités</span>
              </h3>
              <div className="space-y-2">
                {mockUniqData.utilities.map((utility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">{utility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-8">
          <div className="flex space-x-8 border-b border-[#7A52D1]/20">
            {[
              { id: 'overview', label: 'Aperçu', icon: Eye },
              { id: 'attributes', label: 'Attributs', icon: Award },
              { id: 'transactions', label: 'Historique', icon: Activity },
              { id: 'related', label: 'Similaires', icon: Users }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 px-2 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-[#7A52D1] border-b-2 border-[#7A52D1]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{mockUniqData.description}</p>
                
                <h4 className="text-lg font-bold text-white mb-3">Histoire</h4>
                <p className="text-gray-300 leading-relaxed">{mockUniqData.lore}</p>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
                <h3 className="text-xl font-bold text-white mb-4">Détails Techniques</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Token ID</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-mono">{mockUniqData.tokenFactoryId}</span>
                      <button className="text-[#7A52D1] hover:text-[#6A42C1]">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Blockchain</span>
                    <span className="text-white">Ultra Protocol</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Standard</span>
                    <span className="text-white">UNIQ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Créé le</span>
                    <span className="text-white">15 Jan 2024</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attributes' && (
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <h3 className="text-xl font-bold text-white mb-6">Attributs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockUniqData.attributes.map((attr, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/30">
                    <div className="text-sm text-gray-400 mb-1">{attr.trait}</div>
                    <div className="text-white font-bold mb-2">{attr.value}</div>
                    <div className="text-xs text-[#7A52D1]">{attr.rarity} ont cet attribut</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <h3 className="text-xl font-bold text-white mb-6">Historique des Transactions</h3>
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${getTypeColor(tx.type)}`}>
                        {tx.type}
                      </div>
                      <div>
                        <div className="text-white font-medium">{tx.price}</div>
                        <div className="text-gray-400 text-sm">{tx.priceUSD}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">{tx.from} → {tx.to}</div>
                      <div className="text-gray-400 text-xs">{tx.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'related' && (
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <h3 className="text-xl font-bold text-white mb-6">UNIQs Similaires</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedUniqs.map((item, index) => (
                  <div key={index} className="group bg-gray-800/30 rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
                    <div className="relative h-48">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <div className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                          {item.rarity}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-bold mb-1">{item.name}</h4>
                      <p className="text-[#7A52D1] text-sm mb-3">{item.collection}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-bold">{item.price}</div>
                          <div className="text-gray-400 text-sm">{item.priceUSD}</div>
                        </div>
                        <button className="px-4 py-2 bg-[#7A52D1] hover:bg-[#6A42C1] text-white rounded-lg text-sm transition-colors">
                          Voir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniqDetailPage;