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
      id: "ashes-genesis",
      name: "Ashes Genesis",
      description: "La collection emblématique des cendres génésiques, première série de l'univers Ashes.",
      image: "/collections/ashes.png",
      itemCount: 15,
      floorPrice: "456.8 UOS",
      volumeTraded: "6,852 UOS",
      verified: true,
      featured: true,
    },
    {
      id: "phygital-artifacts",
      name: "Phygital Artifacts",
      description: "Artefacts uniques mêlant réalité physique et univers digital.",
      image: "/collections/phygital.png",
      itemCount: 15,
      floorPrice: "298.9 UOS",
      volumeTraded: "4,484 UOS",
      verified: true,
      featured: true,
    },
    {
      id: "cypherpunk-revolution",
      name: "Cypherpunk Revolution",
      description: "Collection révolutionnaire inspirée du mouvement cypherpunk et de la résistance digitale.",
      image: "/collections/cypherpunk.jpg",
      itemCount: 15,
      floorPrice: "234.8 UOS",
      volumeTraded: "3,522 UOS",
      verified: true,
      featured: false,
    },
    {
      id: "ultra-apes-collection",
      name: "Ultra Apes Collection",
      description: "Collection exclusive de singes ultra-stylisés dans l'écosystème Ultra.",
      image: "/collections/ultra-apes.jpeg",
      itemCount: 15,
      floorPrice: "125.5 UOS",
      volumeTraded: "1,883 UOS",
      verified: true,
      featured: false,
    },
    {
      id: "ultra-power-core",
      name: "Ultra Power Core",
      description: "Noyaux énergétiques ultra-puissants, source d'énergie de l'univers Ultra.",
      image: "/collections/ultra-power.png",
      itemCount: 15,
      floorPrice: "189.3 UOS",
      volumeTraded: "2,840 UOS",
      verified: true,
      featured: false,
    },
  ];

  const featuredUniqs = [
    {
      id: "0001",
      name: "Ashes Genesis #0001",
      collection: "Ashes Genesis",
      price: "456.8 UOS",
      priceUSD: "$5,481",
      image: "/collections/ashes.png",
      rarity: "Legendary",
      likes: 1247,
      views: 18542,
    },
    {
      id: "0007",
      name: "Phygital Artifact #0007",
      collection: "Phygital Artifacts",
      price: "298.9 UOS",
      priceUSD: "$3,587",
      image: "/collections/phygital.png",
      rarity: "Epic",
      likes: 864,
      views: 12356,
    },
    {
      id: "0012",
      name: "Cypherpunk Revolutionary #0012",
      collection: "Cypherpunk Revolution",
      price: "234.8 UOS",
      priceUSD: "$2,817",
      image: "/collections/cypherpunk.jpg",
      rarity: "Rare",
      likes: 542,
      views: 8745,
    },
    {
      id: "0008",
      name: "Ultra Ape Elite #0008",
      collection: "Ultra Apes Collection",
      price: "125.5 UOS",
      priceUSD: "$1,506",
      image: "/collections/ultra-apes.jpeg",
      rarity: "Mythic",
      likes: 692,
      views: 9876,
    },
    {
      id: "0003",
      name: "Ultra Power Core #0003",
      collection: "Ultra Power Core",
      price: "189.3 UOS",
      priceUSD: "$2,272",
      image: "/collections/ultra-power.png",
      rarity: "Genesis",
      likes: 1089,
      views: 15234,
    },
    {
      id: "0009",
      name: "Freedom Gamer #0009",
      collection: "Freedom Gamers",
      price: "87.5 UOS",
      priceUSD: "$1,050",
      image: "/collections/freedom-gamers.png",
      rarity: "Legendary",
      likes: 456,
      views: 6789,
    },
    {
      id: "0001-counsellor",
      name: "The Counsellor #0001",
      collection: "The Counsellor",
      price: "234.9 UOS",
      priceUSD: "$2,819",
      image: "/collections/counsellor.png",
      rarity: "Epic",
      likes: 734,
      views: 11245,
    },
    {
      id: "0001-boat",
      name: "Ultra Boat Elite #0001",
      collection: "Ultra Boat Collection",
      price: "345.6 UOS",
      priceUSD: "$4,147",
      image: "/collections/ultra-boat.jpeg",
      rarity: "Mythic",
      likes: 923,
      views: 13567,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Genesis": return "from-yellow-500 to-orange-500";
      case "Mythic": return "from-red-500 to-pink-500";
      case "Legendary": return "from-yellow-400 to-orange-400";
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
      banner: collection.image, // Utiliser la même image pour la bannière
      creator: creatorData.displayName,
      creatorAddress: creatorData.walletAddress,
      totalItems: collection.itemCount,
      items: collection.itemCount, // Alias pour compatibilité
      owners: Math.floor(collection.itemCount * 0.6), // Estimation du nombre de propriétaires
      floorPrice: parseFloat(collection.floorPrice.replace(/[^\d.]/g, "")),
      volume: parseFloat(collection.volumeTraded.replace(/[^\d.]/g, "")),
      volumeTraded: parseFloat(collection.volumeTraded.replace(/[^\d.]/g, "")),
      volumeChange: Math.random() * 30 - 5, // Changement aléatoire entre -5% et +25%
      verified: collection.verified,
      featured: collection.featured,
      category: "Art",
      tags: ["Ultra", "NFT", "Collection"],
      royalties: 5,
      blockchain: "Ultra",
      launchDate: "2024-01-15T00:00:00Z",
      socialLinks: [],
      stats: {
        totalSales: Math.floor(Math.random() * 1000) + 100,
        holders: Math.floor(collection.itemCount * 0.6),
        listed: Math.floor(collection.itemCount * 0.3)
      }
    };
    onNavigate("collection-detail", adaptedCollection);
  };

  const handleUniqClick = (uniq: any) => {
    const adaptedUniq = {
      id: uniq.id,
      name: uniq.name,
      collection: uniq.collection,
      description: `${uniq.name} is a unique NFT from the ${uniq.collection} collection created by ${creatorData.displayName}.`,
      price: parseFloat(uniq.price.replace(/[^\d.]/g, "")),
      priceUSD: parseFloat(uniq.priceUSD.replace(/[^\d.]/g, "")),
      image: uniq.image,
      rarity: uniq.rarity,
      rarityRank: `#${uniq.id}`,
      seller: creatorData.displayName,
      sellerAddress: creatorData.walletAddress,
      owner: "current_owner",
      creator: creatorData.displayName,
      creatorAddress: creatorData.walletAddress,
      likes: uniq.likes,
      views: uniq.views,
      isLiked: false,
      isAuction: false,
      auction: null,
      serialNumber: `${uniq.id}/15`,
      mintDate: "2024-01-15T00:00:00Z",
      blockchain: "Ultra",
      contractAddress: "ultra.nft",
      tokenId: uniq.id,
      royalties: 5,
      attributes: [
        { trait_type: "Collection", value: uniq.collection },
        { trait_type: "Rarity", value: uniq.rarity },
        { trait_type: "Creator", value: creatorData.displayName },
        { trait_type: "Serial Number", value: `${uniq.id}/15` }
      ],
      history: [
        {
          type: "Mint",
          from: "Ultra Network",
          to: creatorData.displayName,
          price: 0,
          date: "2024-01-15T00:00:00Z",
          hash: `0x${Math.random().toString(16).substr(2, 8)}`
        }
      ],
      properties: {
        category: "Art",
        subcategory: "Digital Art",
        format: "PNG",
        size: "1024x1024"
      }
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