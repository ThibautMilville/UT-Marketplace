import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Shield,
  Users,
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Calendar,
  Award,
  Star,
  ExternalLink,
  Copy,
  CheckCircle,
  Globe,
  Twitter,
  Instagram,
} from "lucide-react";

interface CreatorPageProps {
  creator: any;
  onNavigate: (page: string, data?: any) => void;
}

const CreatorPage = ({ creator, onNavigate }: CreatorPageProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  // Mock data or use passed creator data
  const creatorData = creator || {
    id: "quantumartist",
    name: "QuantumArtist",
    displayName: "Quantum Artist",
    bio: "Artiste digital visionnaire spécialisé dans l'art cosmique et les mondes futuristes. Créateur de la célèbre collection Ultra Genesis avec plus de 10,000 UNIQs vendus.",
    longBio: "QuantumArtist est un pionnier de l'art numérique dans l'écosystème Ultra. Avec plus de 15 ans d'expérience dans la création digitale, il a révolutionné l'art spatial avec ses créations uniques qui fusionnent technologie quantique et esthétisme cosmique. Ses œuvres sont reconnues pour leur complexité technique et leur beauté transcendante.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
    joinDate: "Janvier 2023",
    location: "France",
    website: "https://quantumartist.space",
    twitter: "@quantumartist",
    instagram: "@quantum_artist",
    walletAddress: "quantumartist.ultra",
    stats: {
      totalCollections: 8,
      totalUniqs: 2847,
      totalSales: 12450,
      volumeTraded: "1,247,892 UOS",
      volumeTradedUSD: "$24,957,840",
      followers: 15420,
      following: 324,
      averagePrice: "437.2 UOS",
      floorPrice: "89.5 UOS",
    },
    achievements: [
      { name: "Premier Créateur Vérifié", date: "Janvier 2023", icon: "shield" },
      { name: "Collection Top 10", date: "Mars 2023", icon: "star" },
      { name: "100K+ Volume", date: "Juin 2023", icon: "trending" },
      { name: "Créateur Featuté", date: "Septembre 2023", icon: "award" },
    ],
    socialLinks: [
      { platform: "Website", url: "https://quantumartist.space", icon: Globe },
      { platform: "Twitter", url: "https://twitter.com/quantumartist", icon: Twitter },
      { platform: "Instagram", url: "https://instagram.com/quantum_artist", icon: Instagram },
    ]
  };

  const collections = [
    {
      id: "ultra-genesis",
      name: "Ultra Genesis Collection",
      description: "La collection emblématique qui a lancé l'ère des guerriers cosmiques.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&q=80",
      itemCount: 1000,
      floorPrice: "89.5 UOS",
      volumeTraded: "547,892 UOS",
      verified: true,
      featured: true,
    },
    {
      id: "cosmic-warriors",
      name: "Cosmic Warriors Elite",
      description: "Une série limitée de guerriers d'élite aux pouvoirs extraordinaires.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop&q=80",
      itemCount: 500,
      floorPrice: "156.7 UOS",
      volumeTraded: "234,567 UOS",
      verified: true,
      featured: false,
    },
    {
      id: "stellar-guardians",
      name: "Stellar Guardians",
      description: "Protecteurs des systèmes stellaires, gardiens de l'équilibre cosmique.",
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=400&fit=crop&q=80",
      itemCount: 750,
      floorPrice: "203.4 UOS",
      volumeTraded: "465,433 UOS",
      verified: true,
      featured: false,
    },
  ];

  const featuredUniqs = [
    {
      id: "3847",
      name: "Cosmic Warrior Elite #3847",
      collection: "Ultra Genesis Collection",
      price: "125.5 UOS",
      priceUSD: "$2,510",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop&q=80",
      rarity: "Legendary",
      likes: 892,
      views: 15420,
    },
    {
      id: "4521",
      name: "Stellar Guardian #4521",
      collection: "Stellar Guardians",
      price: "98.7 UOS",
      priceUSD: "$1,974",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop&q=80",
      rarity: "Epic",
      likes: 654,
      views: 8932,
    },
    {
      id: "2156",
      name: "Void Walker #2156",
      collection: "Cosmic Warriors Elite",
      price: "156.3 UOS",
      priceUSD: "$3,126",
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=300&h=300&fit=crop&q=80",
      rarity: "Legendary",
      likes: 1243,
      views: 19875,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Mythic": return "from-red-500 to-pink-500";
      case "Legendary": return "from-yellow-500 to-orange-500";
      case "Epic": return "from-purple-500 to-violet-500";
      case "Rare": return "from-blue-500 to-cyan-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getAchievementIcon = (iconType: string) => {
    switch (iconType) {
      case "shield": return Shield;
      case "star": return Star;
      case "trending": return TrendingUp;
      case "award": return Award;
      default: return Award;
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(creatorData.walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCollectionClick = (collection: any) => {
    const adaptedCollection = {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      image: collection.image,
      creator: creatorData.name,
      totalItems: collection.itemCount,
      floorPrice: parseFloat(collection.floorPrice.replace(/[^\d.]/g, "")),
      volumeTraded: parseFloat(collection.volumeTraded.replace(/[^\d.]/g, "")),
      verified: collection.verified,
      category: "Art",
    };
    onNavigate("collection-detail", adaptedCollection);
  };

  const handleUniqClick = (uniq: any) => {
    const adaptedUniq = {
      id: uniq.id,
      name: uniq.name,
      collection: uniq.collection,
      price: parseFloat(uniq.price.replace(/[^\d.]/g, "")),
      priceUSD: parseFloat(uniq.priceUSD.replace(/[^\d.]/g, "")),
      image: uniq.image,
      rarity: uniq.rarity,
      seller: creatorData.name,
      likes: uniq.likes,
      views: uniq.views,
    };
    onNavigate("uniq-detail", adaptedUniq);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#7A52D1]/10 to-black text-white">
      {/* Header avec navigation */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#7A52D1]/20">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => onNavigate("marketplace")}
            className="flex items-center space-x-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-xl text-white hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src={creatorData.banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-6 -mt-20 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={creatorData.avatar}
                alt={creatorData.displayName}
                className="w-32 h-32 rounded-2xl border-4 border-black shadow-2xl"
              />
              {creatorData.verified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-black">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold text-white">{creatorData.displayName}</h1>
                {creatorData.featured && (
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Featuté
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-gray-400">@{creatorData.name}</span>
                <button onClick={copyAddress} className="flex items-center space-x-1 text-[#7A52D1] hover:text-[#6A42C1] transition-colors">
                  {copiedAddress ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{creatorData.walletAddress}</span>
                </button>
              </div>

              <p className="text-gray-300 max-w-2xl mb-4">{creatorData.bio}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Membre depuis {creatorData.joinDate}</span>
                </div>
                {creatorData.location && (
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>{creatorData.location}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {creatorData.socialLinks.map((link: any, index: number) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{link.platform}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
              <div className="text-2xl font-bold text-white mb-1">{creatorData.stats.totalCollections}</div>
              <div className="text-xs text-gray-400">Collections</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
              <div className="text-2xl font-bold text-white mb-1">{creatorData.stats.totalUniqs.toLocaleString()}</div>
              <div className="text-xs text-gray-400">UNIQs Créés</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
              <div className="text-2xl font-bold text-white mb-1">{creatorData.stats.totalSales.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Ventes</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
              <div className="text-2xl font-bold text-white mb-1">{creatorData.stats.volumeTraded}</div>
              <div className="text-xs text-gray-400">Volume Total</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
              <div className="text-2xl font-bold text-white mb-1">{creatorData.stats.followers.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Followers</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
              <div className="text-2xl font-bold text-white mb-1">{creatorData.stats.averagePrice}</div>
              <div className="text-xs text-gray-400">Prix Moyen</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex space-x-8 border-b border-[#7A52D1]/20">
              {[
                { id: "overview", label: "Aperçu" },
                { id: "collections", label: "Collections" },
                { id: "uniqs", label: "UNIQs" },
                { id: "achievements", label: "Succès" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium transition-all ${
                    activeTab === tab.id
                      ? "text-[#7A52D1] border-b-2 border-[#7A52D1]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-16">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
                  <h3 className="text-xl font-bold text-white mb-4">À Propos</h3>
                  <p className="text-gray-300 leading-relaxed">{creatorData.longBio}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Collections Populaires</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collections.slice(0, 3).map((collection) => (
                      <div
                        key={collection.id}
                        onClick={() => handleCollectionClick(collection)}
                        className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 cursor-pointer"
                      >
                        <div className="relative h-48">
                          <img
                            src={collection.image}
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {collection.verified && (
                            <div className="absolute top-3 right-3 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full p-2">
                              <Shield className="w-4 h-4 text-green-400" />
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h4 className="text-white font-bold mb-2">{collection.name}</h4>
                          <p className="text-gray-400 text-sm mb-4">{collection.description}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-white font-bold">{collection.floorPrice}</div>
                              <div className="text-gray-400 text-sm">Floor Price</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold">{collection.itemCount}</div>
                              <div className="text-gray-400 text-sm">Items</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "collections" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <div
                    key={collection.id}
                    onClick={() => handleCollectionClick(collection)}
                    className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex space-x-2">
                        {collection.verified && (
                          <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-3 py-1">
                            <Shield className="w-3 h-3 text-green-400" />
                          </div>
                        )}
                        {collection.featured && (
                          <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-3 py-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-white font-bold mb-2">{collection.name}</h4>
                      <p className="text-gray-400 text-sm mb-4">{collection.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-white font-bold">{collection.floorPrice}</div>
                          <div className="text-gray-400">Floor Price</div>
                        </div>
                        <div>
                          <div className="text-white font-bold">{collection.volumeTraded}</div>
                          <div className="text-gray-400">Volume</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "uniqs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredUniqs.map((uniq) => (
                  <div
                    key={uniq.id}
                    onClick={() => handleUniqClick(uniq)}
                    className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48">
                      <img
                        src={uniq.image}
                        alt={uniq.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <div className={`bg-gradient-to-r ${getRarityColor(uniq.rarity)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                          {uniq.rarity}
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                            <Eye className="w-3 h-3 text-gray-400" />
                            <span className="text-white">{uniq.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                            <Heart className="w-3 h-3 text-gray-400" />
                            <span className="text-white">{uniq.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-bold mb-1">{uniq.name}</h4>
                      <p className="text-[#7A52D1] text-sm mb-3">{uniq.collection}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-bold">{uniq.price}</div>
                          <div className="text-gray-400 text-sm">{uniq.priceUSD}</div>
                        </div>
                        <button className="px-3 py-1 bg-[#7A52D1] hover:bg-[#6A42C1] text-white rounded-lg text-sm transition-colors">
                          Voir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creatorData.achievements.map((achievement: any, index: number) => {
                  const IconComponent = getAchievementIcon(achievement.icon);
                  return (
                    <div key={index} className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-[#7A52D1]/20 rounded-xl">
                          <IconComponent className="w-6 h-6 text-[#7A52D1]" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{achievement.name}</h4>
                          <p className="text-gray-400 text-sm">{achievement.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage; 