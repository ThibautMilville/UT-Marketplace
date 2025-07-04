import { useState, useEffect } from "react";
import {
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  TrendingUp,
  Users,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  Copy,
  Zap,
  Award,
  Activity,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Globe,
  Twitter,
  Instagram,
} from "lucide-react";
import ShareModal from "../components/ShareModal";
import MakeOfferModal from "../components/MakeOfferModal";
import { useUltraWallet } from "../hooks/useUltraWallet";

interface UniqDetailPageProps {
  uniq: any;
  onNavigate: (page: string, data?: any) => void;
}

const UniqDetailPage = ({ uniq, onNavigate }: UniqDetailPageProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  
  const { isConnected, blockchainId, signTransaction, connect, purchaseItem } = useUltraWallet();

  useEffect(() => {
    setIsVisible(true);
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Reset scroll position when uniq changes
  useEffect(() => {
    if (uniq) {
      window.scrollTo(0, 0);
    }
  }, [uniq]);

  // Function to adapt marketplace item to uniq detail format
  const adaptMarketplaceItem = (item: any) => {
    if (!item) return null;

    return {
      id: item.id,
      name: item.name,
      collection: item.collection,
      creator: item.seller,
      tokenFactoryId: item.id,
      serialNumber: item.rarityRank || "1/100",
      rarity: item.rarity,
      onSale: "1",
      maxCopies: "100",
      walletsWithUniq: "97",
      currentPrice: `${item.price.toFixed(2)} UOS`,
      currentPriceUSD: `$${item.priceUSD.toLocaleString()}`,
      floorPrice: "89.2 UOS",
      floorPriceUSD: "$1,784",
      averagePrice: "107.8 UOS",
      averagePriceUSD: "$2,156",
      lastSale: item.lastSalePrice
        ? `${item.lastSalePrice.toFixed(2)} UOS`
        : "134.7 UOS",
      lastSaleUSD: item.lastSalePrice
        ? `$${(item.lastSalePrice * 10).toLocaleString()}`
        : "$2,694",
      utilities: [
        "VIP Access",
        "Exclusive Events",
        "Governance Rights",
        "Staking Rewards",
      ],
      attributes: item.attributes || [
        { trait: "Background", value: "Cosmic Nebula", rarity: "5%" },
        { trait: "Armor", value: "Quantum Steel", rarity: "12%" },
        { trait: "Weapon", value: "Plasma Sword", rarity: "8%" },
        { trait: "Eyes", value: "Laser Blue", rarity: "15%" },
        { trait: "Aura", value: "Golden", rarity: "3%" },
      ],
      images: [
        item.image,
        "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=800&fit=crop&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop&q=80",
      ],
      description: `Un UNIQ ${item.rarity.toLowerCase()} exceptionnel de la collection ${
        item.collection
      }. Cette pièce unique combine rareté et beauté dans l'écosystème Ultra, offrant à son propriétaire un accès privilégié à des expériences exclusives.`,
      lore: `Cette UNIQ fait partie de la prestigieuse collection ${item.collection}, connue pour ses créations d'exception qui repoussent les limites de l'art numérique. Chaque pièce raconte une histoire unique dans l'univers Ultra, créant un lien indéfectible entre l'art, la technologie et la communauté.`,
      verified: true,
      trending: item.isHot || false,
      views: item.views || 15420,
      likes: item.likes || 892,
      owners: 97,
    };
  };

  // Use passed uniq data or fallback to mock data
  const mockData = {
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
    utilities: [
      "VIP Access",
      "Exclusive Events",
      "Governance Rights",
      "Staking Rewards",
    ],
    attributes: [
      { trait: "Background", value: "Cosmic Nebula", rarity: "5%" },
      { trait: "Armor", value: "Quantum Steel", rarity: "12%" },
      { trait: "Weapon", value: "Plasma Sword", rarity: "8%" },
      { trait: "Eyes", value: "Laser Blue", rarity: "15%" },
      { trait: "Aura", value: "Golden", rarity: "3%" },
    ],
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop&q=80",
    ],
    description:
      "Un guerrier cosmique d'élite forgé dans les profondeurs de l'espace. Cette UNIQ légendaire représente la fusion parfaite entre technologie avancée et pouvoir mystique. Équipé d'une armure en acier quantique et d'une épée plasma, ce guerrier possède des capacités extraordinaires qui transcendent les lois de la physique traditionnelle.",
    lore: "Dans les confins les plus reculés de la galaxie Ultra, où les étoiles naissent et meurent dans un ballet cosmique éternel, émergent les Guerriers Cosmiques. Ces êtres d'exception sont choisis par l'univers lui-même pour maintenir l'équilibre entre les forces du chaos et de l'ordre. Chaque guerrier porte en lui une fraction de l'énergie primordiale qui a donné naissance aux galaxies.",
    verified: true,
    trending: true,
    views: 15420,
    likes: 892,
    owners: 97,
  };

  const uniqData = adaptMarketplaceItem(uniq) || mockData;

  const relatedUniqs = [
    {
      id: "0002",
      name: "Ashes Genesis #0002",
      collection: "Ashes Genesis",
      price: "456.8 UOS",
      priceUSD: "$5,481",
      image: "/collections/ashes.png",
      rarity: "Legendary",
    },
    {
      id: "0008",
      name: "Phygital Artifact #0008",
      collection: "Phygital Artifacts", 
      price: "298.9 UOS",
      priceUSD: "$3,587",
      image: "/collections/phygital.png",
      rarity: "Epic",
    },
    {
      id: "0013",
      name: "Cypherpunk Revolutionary #0013",
      collection: "Cypherpunk Revolution",
      price: "234.8 UOS",
      priceUSD: "$2,817",
      image: "/collections/cypherpunk.jpg",
      rarity: "Rare",
    },
    {
      id: "0009",
      name: "Ultra Ape Elite #0009",
      collection: "Ultra Apes Collection",
      price: "125.5 UOS",
      priceUSD: "$1,506", 
      image: "/collections/ultra-apes.jpeg",
      rarity: "Mythic",
    },
    {
      id: "0004",
      name: "Ultra Power Core #0004",
      collection: "Ultra Power Core",
      price: "189.3 UOS",
      priceUSD: "$2,272",
      image: "/collections/ultra-power.png",
      rarity: "Genesis",
    },
    {
      id: "0010",
      name: "Freedom Gamer #0010",
      collection: "Freedom Gamers",
      price: "87.5 UOS",
      priceUSD: "$1,050",
      image: "/collections/freedom-gamers.png",
      rarity: "Legendary",
    },
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
      verified: true,
    },
    {
      type: "LISTING",
      price: "125.5 UOS",
      priceUSD: "$2,510",
      date: "Il y a 1 jour",
      from: "EliteCollector",
      to: "Marketplace",
      hash: "0x5e6f7g8h...",
      verified: true,
    },
    {
      type: "ACHAT",
      price: "89.2 UOS",
      priceUSD: "$1,784",
      date: "Il y a 3 jours",
      from: "QuantumVault",
      to: "CosmicTrader",
      hash: "0x9i0j1k2l...",
      verified: true,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Genesis":
        return "from-yellow-500 to-orange-500";
      case "Mythic":
        return "from-red-500 to-pink-500";
      case "Legendary":
        return "from-yellow-400 to-orange-400";
      case "Epic":
        return "from-purple-500 to-violet-500";
      case "Rare":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VENTE":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "ACHAT":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "LISTING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % uniqData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + uniqData.images.length) % uniqData.images.length
    );
  };

  const handlePurchase = async () => {
    if (!isConnected) {
      const connected = await connect();
      if (!connected) {
        setPurchaseError("Connexion au wallet requise");
        return;
      }
    }

    setIsPurchasing(true);
    setPurchaseError("");

    try {
      // Créer la transaction d'achat
      const purchaseTransaction = {
        action: "buy",
        contract: "uniq.ultra",
        data: {
          buyer: blockchainId,
          token_id: uniqData.id,
          max_price: uniqData.currentPrice,
          memo: `Achat de ${uniqData.name}`
        }
      };

      const result = await signTransaction(purchaseTransaction);
      
      if (result) {
        setPurchaseSuccess(true);
        setTimeout(() => {
          setPurchaseSuccess(false);
        }, 3000);
      } else {
        setPurchaseError("Échec de l'achat");
      }
    } catch (err) {
      setPurchaseError("Erreur lors de l'achat");
      console.error("Purchase error:", err);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleCreatorClick = () => {
    const creatorData = {
      id: uniqData.creator.toLowerCase().replace(/\s+/g, ''),
      name: uniqData.creator,
      displayName: uniqData.creator,
      bio: `Créateur de ${uniqData.collection} et d'autres collections exceptionnelles dans l'écosystème Ultra.`,
      longBio: `${uniqData.creator} est un artiste visionnaire de l'écosystème Ultra, spécialisé dans la création d'UNIQs exceptionnels. Avec une expertise unique dans l'art numérique, ${uniqData.creator} a développé un style distinctif qui fusionne innovation technologique et créativité artistique. Ses œuvres sont reconnues pour leur qualité exceptionnelle et leur originalité dans l'univers des NFTs Ultra.`,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&q=80",
      verified: true,
      featured: false,
      joinDate: "Janvier 2023",
      location: "Ultra Ecosystem",
      website: "https://ultra.io",
      twitter: `@${uniqData.creator.toLowerCase().replace(/\s+/g, '')}`,
      instagram: `@${uniqData.creator.toLowerCase().replace(/\s+/g, '')}`,
      walletAddress: `${uniqData.creator.toLowerCase().replace(/\s+/g, '')}.ultra`,
      stats: {
        totalCollections: 5,
        totalUniqs: 1247,
        totalSales: 3456,
        volumeTraded: "234,567 UOS",
        volumeTradedUSD: "$4,691,340",
        followers: 2340,
        following: 156,
        averagePrice: "187.3 UOS",
        floorPrice: "45.6 UOS",
      },
      achievements: [
        { name: "Créateur Vérifié", date: "Janvier 2023", icon: "shield" },
        { name: "Collection Populaire", date: "Mars 2023", icon: "star" },
        { name: "10K+ Volume", date: "Juin 2023", icon: "trending" },
        { name: "Artiste Reconnu", date: "Septembre 2023", icon: "award" },
      ],
             socialLinks: [
         { platform: "Website", url: "https://ultra.io", icon: Globe },
         { platform: "Twitter", url: `https://twitter.com/${uniqData.creator.toLowerCase().replace(/\s+/g, '')}`, icon: Twitter },
         { platform: "Instagram", url: `https://instagram.com/${uniqData.creator.toLowerCase().replace(/\s+/g, '')}`, icon: Instagram },
       ]
    };
    onNavigate("creator", creatorData);
  };

  const handleCollectionClick = () => {
    const collectionData = {
      id: uniqData.collection.toLowerCase().replace(/\s+/g, '-'),
      name: uniqData.collection,
      description: `La collection ${uniqData.collection} présente des UNIQs d'exception avec des designs uniques et des utilités innovantes. Cette collection emblématique combine art, technologie et innovation pour offrir une expérience unique dans l'écosystème Ultra.`,
      image: uniqData.images[0],
      banner: uniqData.images[0],
      creator: uniqData.creator,
      totalItems: 1000,
      items: 1000,
      owners: 456,
      floorPrice: parseFloat(uniqData.floorPrice?.replace(/[^\d.]/g, "") || "89.5"),
      volume: 125000,
      volumeChange: 12.5,
      verified: true,
      category: "Art",
      featured: true,
      rarity: uniqData.rarity || "Epic",
      trending: true,
      likes: 8920,
      views: 34560,
      change24h: 12.5,
      createdDate: "2023",
      royalties: 5,
      blockchain: "Ultra",
    };
    onNavigate("collection-detail", collectionData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#7A52D1]/10 to-black text-white">
      {/* Header avec navigation */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#7A52D1]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate("marketplace")}
              className="flex items-center space-x-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-xl text-white hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à la Marketplace</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-xl transition-all ${
                  isLiked
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-red-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-3 bg-gray-800/50 rounded-xl text-gray-400 hover:text-white transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Section Image */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Image principale */}
            <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 group">
              <div className="relative h-96 lg:h-[500px]">
                <img
                  src={uniqData.images[currentImageIndex]}
                  alt={uniqData.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

                {/* Navigation des images */}
                {uniqData.images.length > 1 && (
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
                  {uniqData.verified && (
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-3 py-1 flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">
                        Vérifié
                      </span>
                    </div>
                  )}
                  {uniqData.trending && (
                    <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-3 py-1 flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-red-400 font-medium">
                        Tendance
                      </span>
                    </div>
                  )}
                </div>

                {/* Rarity Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`bg-gradient-to-r ${getRarityColor(
                      uniqData.rarity
                    )} text-white px-3 py-1 rounded-full text-sm font-bold`}
                  >
                    {uniqData.rarity}
                  </div>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Eye className="w-3 h-3 text-gray-400" />
                      <span className="text-white">
                        {uniqData.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Heart className="w-3 h-3 text-gray-400" />
                      <span className="text-white">{uniqData.likes}</span>
                    </div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white text-sm">
                      {uniqData.serialNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Miniatures */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {uniqData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-[#7A52D1] scale-105"
                      : "border-gray-600 hover:border-gray-400"
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
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <h1 className="text-4xl font-bold text-white">
                  {uniqData.name}
                </h1>
                <div
                  className={`bg-gradient-to-r ${getRarityColor(
                    uniqData.rarity
                  )} text-white px-3 py-1 rounded-full text-sm font-bold`}
                >
                  {uniqData.rarity}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-lg">
                <span className="text-gray-400">Collection:</span>
                <button 
                  onClick={handleCollectionClick}
                  className="text-[#7A52D1] font-medium hover:text-[#6A42C1] transition-colors cursor-pointer"
                >
                  {uniqData.collection}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Créé par:</span>
                <button 
                  onClick={handleCreatorClick}
                  className="text-white font-medium hover:text-[#7A52D1] transition-colors cursor-pointer"
                >
                  {uniqData.creator}
                </button>
                <Shield className="w-4 h-4 text-green-400" />
              </div>
            </div>

            {/* Prix */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Prix Actuel</div>
                  <div className="text-2xl font-bold text-white">
                    {uniqData.currentPrice}
                  </div>
                  <div className="text-sm text-gray-400">
                    {uniqData.currentPriceUSD}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">
                    Dernière Vente
                  </div>
                  <div className="text-xl font-bold text-green-400">
                    {uniqData.lastSale}
                  </div>
                  <div className="text-sm text-gray-400">
                    {uniqData.lastSaleUSD}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Floor Price:</span>
                    <span className="text-white">{uniqData.floorPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prix Moyen:</span>
                    <span className="text-white">{uniqData.averagePrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {uniqData.onSale}
                </div>
                <div className="text-xs text-gray-400">En Vente</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {uniqData.maxCopies}
                </div>
                <div className="text-xs text-gray-400">Total Supply</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#7A52D1]/20 text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {uniqData.owners}
                </div>
                <div className="text-xs text-gray-400">Propriétaires</div>
              </div>
            </div>

            {/* Messages de statut */}
            {purchaseError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">{purchaseError}</span>
                </div>
              </div>
            )}

            {purchaseSuccess && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm">Achat réussi ! L'UNIQ sera bientôt dans votre wallet.</span>
                </div>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex space-x-4">
              <button 
                onClick={handlePurchase}
                disabled={isPurchasing || purchaseSuccess}
                className="flex-1 bg-gradient-to-r from-[#7A52D1] to-violet-600 hover:from-[#6A42C1] hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-[#7A52D1]/30"
              >
                {isPurchasing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Achat en cours...</span>
                  </div>
                ) : purchaseSuccess ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Acheté</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Acheter Maintenant</span>
                  </div>
                )}
              </button>
              <button 
                onClick={() => setIsOfferModalOpen(true)}
                disabled={purchaseSuccess}
                className="px-6 py-4 bg-black/40 border border-[#7A52D1]/30 hover:border-[#7A52D1]/50 disabled:border-gray-600/30 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300"
              >
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
                {uniqData.utilities.map((utility, index) => (
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
              { id: "overview", label: "Aperçu", icon: Eye },
              { id: "attributes", label: "Attributs", icon: Award },
              { id: "transactions", label: "Historique", icon: Activity },
              { id: "related", label: "Similaires", icon: Users },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 px-2 font-medium transition-all ${
                    activeTab === tab.id
                      ? "text-[#7A52D1] border-b-2 border-[#7A52D1]"
                      : "text-gray-400 hover:text-white"
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
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
                <h3 className="text-xl font-bold text-white mb-4">
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {uniqData.description}
                </p>

                <h4 className="text-lg font-bold text-white mb-3">Histoire</h4>
                <p className="text-gray-300 leading-relaxed">{uniqData.lore}</p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
                <h3 className="text-xl font-bold text-white mb-4">
                  Détails Techniques
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Token ID</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-mono">
                        {uniqData.tokenFactoryId}
                      </span>
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

          {activeTab === "attributes" && (
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <h3 className="text-xl font-bold text-white mb-6">Attributs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uniqData.attributes.map((attr: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/30"
                  >
                    <div className="text-sm text-gray-400 mb-1">
                      {attr.trait}
                    </div>
                    <div className="text-white font-bold mb-2">
                      {attr.value}
                    </div>
                    <div className="text-xs text-[#7A52D1]">
                      {attr.rarity} ont cet attribut
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <h3 className="text-xl font-bold text-white mb-6">
                Historique des Transactions
              </h3>
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${getTypeColor(
                          tx.type
                        )}`}
                      >
                        {tx.type}
                      </div>
                      <div>
                        <div className="text-white font-medium">{tx.price}</div>
                        <div className="text-gray-400 text-sm">
                          {tx.priceUSD}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">
                        {tx.from} → {tx.to}
                      </div>
                      <div className="text-gray-400 text-xs">{tx.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "related" && (
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <h3 className="text-xl font-bold text-white mb-6">
                UNIQs Similaires
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedUniqs.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      const adaptedUniq = {
                        id: item.id,
                        name: item.name,
                        collection: item.collection,
                        description: `${item.name} is a unique NFT from the ${item.collection} collection.`,
                        price: parseFloat(item.price.replace(/[^\d.]/g, "")),
                        priceUSD: parseFloat(item.priceUSD.replace(/[^\d.]/g, "")),
                        image: item.image,
                        rarity: item.rarity,
                        rarityRank: `#${item.id}`,
                        seller: "current_owner",
                        sellerAddress: "seller.ultra",
                        owner: "current_owner",
                        creator: "Creator",
                        creatorAddress: "creator.ultra",
                        likes: Math.floor(Math.random() * 1000) + 100,
                        views: Math.floor(Math.random() * 5000) + 500,
                        isLiked: false,
                        isAuction: false,
                        auction: null,
                        serialNumber: `${item.id}/15`,
                        mintDate: "2024-01-15T00:00:00Z",
                        blockchain: "Ultra",
                        contractAddress: "ultra.nft",
                        tokenId: item.id,
                        royalties: 5,
                        attributes: [
                          { trait_type: "Collection", value: item.collection },
                          { trait_type: "Rarity", value: item.rarity },
                          { trait_type: "Serial Number", value: `${item.id}/15` }
                        ],
                        history: [
                          {
                            type: "Mint",
                            from: "Ultra Network",
                            to: "Creator",
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
                    }}
                    className="group bg-gray-800/30 rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <div
                          className={`bg-gradient-to-r ${getRarityColor(
                            item.rarity
                          )} text-white px-2 py-1 rounded-full text-xs font-bold`}
                        >
                          {item.rarity}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-bold mb-1">{item.name}</h4>
                      <p className="text-[#7A52D1] text-sm mb-3">
                        {item.collection}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-bold">
                            {item.price}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {item.priceUSD}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const adaptedUniq = {
                              id: item.id,
                              name: item.name,
                              collection: item.collection,
                              description: `${item.name} is a unique NFT from the ${item.collection} collection.`,
                              price: parseFloat(item.price.replace(/[^\d.]/g, "")),
                              priceUSD: parseFloat(item.priceUSD.replace(/[^\d.]/g, "")),
                              image: item.image,
                              rarity: item.rarity,
                              rarityRank: `#${item.id}`,
                              seller: "current_owner",
                              sellerAddress: "seller.ultra",
                              owner: "current_owner",
                              creator: "Creator",
                              creatorAddress: "creator.ultra",
                              likes: Math.floor(Math.random() * 1000) + 100,
                              views: Math.floor(Math.random() * 5000) + 500,
                              isLiked: false,
                              isAuction: false,
                              auction: null,
                              serialNumber: `${item.id}/15`,
                              mintDate: "2024-01-15T00:00:00Z",
                              blockchain: "Ultra",
                              contractAddress: "ultra.nft",
                              tokenId: item.id,
                              royalties: 5,
                              attributes: [
                                { trait_type: "Collection", value: item.collection },
                                { trait_type: "Rarity", value: item.rarity },
                                { trait_type: "Serial Number", value: `${item.id}/15` }
                              ],
                              history: [
                                {
                                  type: "Mint",
                                  from: "Ultra Network",
                                  to: "Creator",
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
                          }}
                          className="px-4 py-2 bg-[#7A52D1] hover:bg-[#6A42C1] text-white rounded-lg text-sm transition-colors"
                        >
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

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={uniqData.name}
        description={uniqData.description}
        imageUrl={uniqData.images[0]}
      />

      {/* Make Offer Modal */}
      <MakeOfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        uniq={{
          id: uniqData.id,
          name: uniqData.name,
          image: uniqData.images[0],
          currentPrice: uniqData.currentPrice,
          collection: uniqData.collection,
        }}
      />
    </div>
  );
};

export default UniqDetailPage;
