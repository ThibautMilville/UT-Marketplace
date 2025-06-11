import React, { useState } from 'react'
import { Search, Filter, Grid, List, Star, TrendingUp, Eye, Heart, ExternalLink, Shield, Flame, Crown, Award } from 'lucide-react'

interface CollectionsProps {
  onNavigate?: (page: string, data?: any) => void
}

interface Collection {
  id: string
  name: string
  description: string
  image: string
  banner: string
  creator: string
  verified: boolean
  items: number
  owners: number
  floorPrice: number
  volume: number
  change24h: number
  category: string
  featured: boolean
  rarity: string
  trending: boolean
  likes: number
  views: number
}

const mockCollections: Collection[] = [
  // Gaming Collections
  {
    id: '1',
    name: "Ultra Genesis Collection",
    description: "La collection fondatrice d'Ultra avec des UNIQs légendaires aux pouvoirs cosmiques uniques. Chaque pièce raconte l'histoire de la création de l'univers Ultra.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=300&fit=crop",
    creator: "UltraStudio",
    verified: true,
    items: 10000,
    owners: 2500,
    floorPrice: 125.50,
    volume: 45780.25,
    change24h: 12.5,
    category: "Gaming",
    featured: true,
    rarity: "Legendary",
    trending: true,
    likes: 15420,
    views: 89340
  },
  {
    id: '2',
    name: "Cosmic Warriors Elite",
    description: "Guerriers d'élite venus des confins de la galaxie, équipés d'armures quantiques et d'armes plasma. Collection limitée de 5000 exemplaires.",
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=300&fit=crop",
    creator: "CosmicForge",
    verified: true,
    items: 5000,
    owners: 1200,
    floorPrice: 89.75,
    volume: 28950.80,
    change24h: -3.2,
    category: "Gaming",
    featured: true,
    rarity: "Epic",
    trending: true,
    likes: 8920,
    views: 45670
  },
  {
    id: '3',
    name: "Digital Legends",
    description: "Personnages légendaires du monde numérique avec des capacités uniques. Chaque légende possède son histoire et ses pouvoirs spéciaux.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=300&fit=crop",
    creator: "LegendForge",
    verified: false,
    items: 7500,
    owners: 890,
    floorPrice: 67.20,
    volume: 15420.60,
    change24h: 8.7,
    category: "Gaming",
    featured: false,
    rarity: "Rare",
    trending: false,
    likes: 5430,
    views: 23450
  },
  {
    id: '4',
    name: "Ultra Racers Championship",
    description: "Véhicules de course futuristes pour les compétitions Ultra. Chaque véhicule est unique avec des performances et designs exclusifs.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop",
    creator: "SpeedLab",
    verified: true,
    items: 2000,
    owners: 650,
    floorPrice: 234.75,
    volume: 67890.20,
    change24h: 25.3,
    category: "Gaming",
    featured: true,
    rarity: "Mythic",
    trending: true,
    likes: 12340,
    views: 56780
  },
  {
    id: '5',
    name: "Quantum Mages",
    description: "Mages maîtrisant les forces quantiques avec des sorts et artefacts magiques. Collection mystique aux pouvoirs extraordinaires.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop",
    creator: "MysticLab",
    verified: true,
    items: 3333,
    owners: 1111,
    floorPrice: 156.80,
    volume: 38200.45,
    change24h: 18.9,
    category: "Gaming",
    featured: false,
    rarity: "Legendary",
    trending: false,
    likes: 7890,
    views: 34560
  },

  // Art Collections
  {
    id: '6',
    name: "Neon Dreams",
    description: "Art numérique cyberpunk avec des néons vibrants et des paysages futuristes. Créé par les meilleurs artistes digitaux.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=300&fit=crop",
    creator: "NeonArtist",
    verified: true,
    items: 1000,
    owners: 450,
    floorPrice: 78.90,
    volume: 23450.80,
    change24h: 15.6,
    category: "Art",
    featured: true,
    rarity: "Epic",
    trending: true,
    likes: 9870,
    views: 43210
  },
  {
    id: '7',
    name: "Abstract Dimensions",
    description: "Œuvres d'art abstraites explorant les dimensions parallèles. Chaque pièce est une fenêtre vers un univers alternatif.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop",
    creator: "DimensionArt",
    verified: false,
    items: 888,
    owners: 234,
    floorPrice: 45.60,
    volume: 12340.50,
    change24h: -2.1,
    category: "Art",
    featured: false,
    rarity: "Rare",
    trending: false,
    likes: 3450,
    views: 15670
  },
  {
    id: '8',
    name: "Holographic Portraits",
    description: "Portraits holographiques de personnalités emblématiques de l'ère numérique. Technologie de pointe pour un art révolutionnaire.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=300&fit=crop",
    creator: "HoloArt",
    verified: true,
    items: 500,
    owners: 189,
    floorPrice: 189.30,
    volume: 45670.90,
    change24h: 32.4,
    category: "Art",
    featured: true,
    rarity: "Mythic",
    trending: true,
    likes: 6780,
    views: 28900
  },

  // Collectibles
  {
    id: '9',
    name: "Cyber Punk Elite",
    description: "Personnages cyberpunk d'élite avec améliorations technologiques et artefacts rares. L'essence du futur dystopique.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=300&fit=crop",
    creator: "CyberLab",
    verified: true,
    items: 3000,
    owners: 750,
    floorPrice: 156.80,
    volume: 38200.45,
    change24h: 18.9,
    category: "Collectibles",
    featured: true,
    rarity: "Legendary",
    trending: true,
    likes: 11230,
    views: 52340
  },
  {
    id: '10',
    name: "Ancient Artifacts",
    description: "Artefacts anciens aux pouvoirs mystérieux redécouverts dans l'ère numérique. Chaque pièce détient des secrets millénaires.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop",
    creator: "AncientForge",
    verified: false,
    items: 777,
    owners: 345,
    floorPrice: 234.50,
    volume: 56780.30,
    change24h: -5.7,
    category: "Collectibles",
    featured: false,
    rarity: "Mythic",
    trending: false,
    likes: 4560,
    views: 19870
  },
  {
    id: '11',
    name: "Crystal Gems",
    description: "Gemmes cristallines aux propriétés énergétiques uniques. Collection précieuse pour les collectionneurs avertis.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=300&fit=crop",
    creator: "CrystalMine",
    verified: true,
    items: 1200,
    owners: 456,
    floorPrice: 98.70,
    volume: 23450.60,
    change24h: 7.8,
    category: "Collectibles",
    featured: false,
    rarity: "Epic",
    trending: false,
    likes: 6780,
    views: 29340
  },

  // Vehicles
  {
    id: '12',
    name: "Starship Fleet",
    description: "Flotte de vaisseaux spatiaux pour l'exploration galactique. Chaque vaisseau est équipé de technologies avancées.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop",
    creator: "StarshipYard",
    verified: true,
    items: 1500,
    owners: 567,
    floorPrice: 345.80,
    volume: 78900.40,
    change24h: 28.7,
    category: "Vehicles",
    featured: true,
    rarity: "Legendary",
    trending: true,
    likes: 13450,
    views: 67890
  },
  {
    id: '13',
    name: "Hover Bikes",
    description: "Motos volantes pour les courses urbaines futuristes. Design élégant et performances exceptionnelles.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=300&fit=crop",
    creator: "HoverTech",
    verified: false,
    items: 2500,
    owners: 890,
    floorPrice: 67.40,
    volume: 34560.20,
    change24h: 12.3,
    category: "Vehicles",
    featured: false,
    rarity: "Rare",
    trending: false,
    likes: 7890,
    views: 34560
  },

  // Music Collections
  {
    id: '14',
    name: "Synthwave Beats",
    description: "Collection musicale synthwave avec des beats exclusifs et des visuels rétro-futuristes. L'essence des années 80 réinventée.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=300&fit=crop",
    creator: "SynthMaster",
    verified: true,
    items: 808,
    owners: 234,
    floorPrice: 56.90,
    volume: 19870.30,
    change24h: 9.4,
    category: "Music",
    featured: false,
    rarity: "Epic",
    trending: false,
    likes: 5670,
    views: 23450
  },

  // Sports Collections
  {
    id: '15',
    name: "Ultra Athletes",
    description: "Athlètes d'élite de l'ère Ultra avec performances surhumaines. Collection sportive exclusive pour les fans de compétition.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop",
    creator: "SportLab",
    verified: true,
    items: 1000,
    owners: 345,
    floorPrice: 123.40,
    volume: 45670.80,
    change24h: 16.7,
    category: "Sports",
    featured: false,
    rarity: "Legendary",
    trending: false,
    likes: 8900,
    views: 39870
  },

  // Fashion Collections
  {
    id: '16',
    name: "Digital Couture",
    description: "Haute couture numérique avec des designs avant-gardistes. Mode virtuelle pour les avatars de demain.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=300&fit=crop",
    creator: "FashionLab",
    verified: true,
    items: 666,
    owners: 234,
    floorPrice: 89.60,
    volume: 23450.70,
    change24h: 21.5,
    category: "Fashion",
    featured: false,
    rarity: "Epic",
    trending: true,
    likes: 6780,
    views: 28900
  },

  // Utility Collections
  {
    id: '17',
    name: "Power Tools",
    description: "Outils et équipements avec des utilités spéciales dans l'écosystème Ultra. Fonctionnalités exclusives pour les détenteurs.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=300&fit=crop",
    creator: "UtilityForge",
    verified: true,
    items: 5000,
    owners: 1234,
    floorPrice: 45.30,
    volume: 67890.50,
    change24h: 14.2,
    category: "Utility",
    featured: false,
    rarity: "Rare",
    trending: false,
    likes: 9870,
    views: 45670
  },

  // Exclusive Limited Editions
  {
    id: '18',
    name: "Founder's Edition",
    description: "Édition limitée exclusive pour les fondateurs d'Ultra. Seulement 100 exemplaires avec des privilèges uniques à vie.",
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=300&fit=crop",
    creator: "UltraFoundation",
    verified: true,
    items: 100,
    owners: 87,
    floorPrice: 1250.00,
    volume: 234500.00,
    change24h: 45.8,
    category: "Exclusive",
    featured: true,
    rarity: "Mythic",
    trending: true,
    likes: 25670,
    views: 123450
  },

  // Community Collections
  {
    id: '19',
    name: "Community Heroes",
    description: "Héros de la communauté Ultra reconnus pour leurs contributions exceptionnelles. Collection honorifique limitée.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop",
    creator: "CommunityDAO",
    verified: true,
    items: 500,
    owners: 234,
    floorPrice: 234.70,
    volume: 56780.90,
    change24h: 19.3,
    category: "Community",
    featured: false,
    rarity: "Legendary",
    trending: false,
    likes: 12340,
    views: 56780
  },

  // Experimental Collections
  {
    id: '20',
    name: "AI Generated Dreams",
    description: "Collection générée par IA explorant les rêves et l'inconscient numérique. Art expérimental aux frontières de la créativité.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=300&fit=crop",
    creator: "AILab",
    verified: false,
    items: 2048,
    owners: 567,
    floorPrice: 34.50,
    volume: 23450.40,
    change24h: 8.9,
    category: "Experimental",
    featured: false,
    rarity: "Rare",
    trending: false,
    likes: 4560,
    views: 19870
  }
]

const Collections = ({ onNavigate }: CollectionsProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('volume')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedRarity, setSelectedRarity] = useState('all')
  const [onlyVerified, setOnlyVerified] = useState(false)
  const [onlyTrending, setOnlyTrending] = useState(false)
  const [minItems, setMinItems] = useState(0)
  const [maxItems, setMaxItems] = useState(50000)
  const [volumeRange, setVolumeRange] = useState([0, 100000])
  const [changeFilter, setChangeFilter] = useState('all')

  const categories = ['all', 'Gaming', 'Art', 'Collectibles', 'Vehicles', 'Music', 'Sports', 'Fashion', 'Utility', 'Exclusive', 'Community', 'Experimental']

  const filteredCollections = mockCollections
    .filter(collection => {
      const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           collection.creator.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || collection.category === selectedCategory
      const matchesPrice = collection.floorPrice >= priceRange[0] && collection.floorPrice <= priceRange[1]
      const matchesRarity = selectedRarity === 'all' || collection.rarity === selectedRarity
      const matchesVerified = !onlyVerified || collection.verified
      const matchesTrending = !onlyTrending || collection.trending
      const matchesItems = collection.items >= minItems && collection.items <= maxItems
      const matchesVolume = collection.volume >= volumeRange[0] && collection.volume <= volumeRange[1]
      const matchesChange = changeFilter === 'all' || 
                           (changeFilter === 'positive' && collection.change24h > 0) ||
                           (changeFilter === 'negative' && collection.change24h < 0)
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRarity && 
             matchesVerified && matchesTrending && matchesItems && matchesVolume && matchesChange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return b.volume - a.volume
        case 'floor':
          return b.floorPrice - a.floorPrice
        case 'items':
          return b.items - a.items
        case 'change':
          return b.change24h - a.change24h
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
        case 'likes':
          return b.likes - a.likes
        case 'views':
          return b.views - a.views
        case 'owners':
          return b.owners - a.owners
        case 'newest':
          return parseInt(b.id) - parseInt(a.id)
        default:
          return 0
      }
    })

  const featuredCollections = mockCollections.filter(c => c.featured)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatPrice = (price: number) => `${price.toFixed(2)} UOS`

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'from-red-500 to-pink-500'
      case 'Legendary': return 'from-yellow-500 to-orange-500'
      case 'Epic': return 'from-purple-500 to-violet-500'
      case 'Rare': return 'from-blue-500 to-cyan-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#7A52D1]/10 to-black text-white">
      {/* Hero Section avec collections en vedette */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7A52D1]/20 via-blue-600/20 to-[#7A52D1]/20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Collections Ultra
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez les collections les plus exclusives et innovantes sur la blockchain Ultra
            </p>
          </div>

          {/* Collections en vedette */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-400 mr-2" />
              Collections en Vedette
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCollections.slice(0, 6).map(collection => {
                const handleCollectionClick = () => {
                  const adaptedCollection = {
                    id: collection.id,
                    name: collection.name,
                    description: collection.description,
                    image: collection.image,
                    banner: collection.banner,
                    creator: collection.creator,
                    totalItems: collection.items,
                    owners: collection.owners,
                    floorPrice: collection.floorPrice,
                    volume: collection.volume,
                    volumeChange: collection.change24h,
                    verified: collection.verified,
                    category: collection.category,
                    featured: collection.featured,
                    rarity: collection.rarity,
                    trending: collection.trending,
                    likes: collection.likes,
                    views: collection.views,
                  };
                  onNavigate?.('collection-detail', adaptedCollection);
                };

                return (
                <div 
                  key={collection.id} 
                  onClick={handleCollectionClick}
                  className="group relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={collection.banner} 
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      {collection.verified && (
                        <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-2 py-1 flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400 font-medium">Vérifié</span>
                        </div>
                      )}
                                             {collection.trending && (
                         <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-2 py-1 flex items-center space-x-1">
                           <Flame className="w-3 h-3 text-red-400" />
                           <span className="text-xs text-red-400 font-medium">Tendance</span>
                         </div>
                       )}
                    </div>

                    {/* Rarity Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`bg-gradient-to-r ${getRarityColor(collection.rarity)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {collection.rarity}
                      </div>
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                            <Eye className="w-3 h-3 text-gray-400" />
                            <span className="text-white">{formatNumber(collection.views)}</span>
                          </div>
                          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                            <Heart className="w-3 h-3 text-gray-400" />
                            <span className="text-white">{formatNumber(collection.likes)}</span>
                          </div>
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                          <span className="text-white text-sm">{formatNumber(collection.items)} items</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{collection.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Floor Price</div>
                        <div className="text-lg font-bold text-[#7A52D1]">{formatPrice(collection.floorPrice)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Volume 24h</div>
                        <div className="text-lg font-bold text-white">{formatNumber(collection.volume)} UOS</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        {formatNumber(collection.owners)} propriétaires
                      </div>
                      <div className={`text-sm font-medium ${
                        collection.change24h > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {collection.change24h > 0 ? '+' : ''}{collection.change24h.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

              {/* Filtres Avancés et Recherche */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20 mb-8">
          {/* Barre de recherche principale */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, description ou créateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#7A52D1]/50"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all ${
                  showFilters 
                    ? 'bg-[#7A52D1] border-[#7A52D1] text-white' 
                    : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-[#7A52D1]/50'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filtres Avancés</span>
              </button>

              <div className="flex items-center space-x-2 bg-gray-800/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#7A52D1] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#7A52D1] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtres rapides */}
          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toutes les catégories' : category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
            >
              <option value="volume">Volume</option>
              <option value="floor">Prix plancher</option>
              <option value="items">Nombre d'items</option>
              <option value="change">Variation 24h</option>
              <option value="trending">Tendance</option>
              <option value="likes">Popularité</option>
              <option value="views">Vues</option>
              <option value="owners">Propriétaires</option>
              <option value="newest">Plus récent</option>
            </select>

            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                onlyVerified 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                  : 'bg-gray-800/50 border border-gray-600/30 text-gray-300 hover:border-green-500/30'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Vérifiées</span>
            </button>

            <button
              onClick={() => setOnlyTrending(!onlyTrending)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                onlyTrending 
                  ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
                  : 'bg-gray-800/50 border border-gray-600/30 text-gray-300 hover:border-red-500/30'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Tendance</span>
            </button>
          </div>

          {/* Panneau de filtres avancés */}
          {showFilters && (
            <div className="border-t border-gray-600/30 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Prix plancher */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prix plancher (UOS)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
                    />
                  </div>
                </div>

                {/* Rareté */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rareté
                  </label>
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
                  >
                    <option value="all">Toutes les raretés</option>
                    <option value="Mythic">Mythique</option>
                    <option value="Legendary">Légendaire</option>
                    <option value="Epic">Épique</option>
                    <option value="Rare">Rare</option>
                  </select>
                </div>

                {/* Nombre d'items */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre d'items
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minItems}
                      onChange={(e) => setMinItems(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxItems}
                      onChange={(e) => setMaxItems(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
                    />
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Volume 24h (UOS)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={volumeRange[0]}
                      onChange={(e) => setVolumeRange([Number(e.target.value), volumeRange[1]])}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={volumeRange[1]}
                      onChange={(e) => setVolumeRange([volumeRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
                    />
                  </div>
                </div>

                {/* Variation 24h */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Variation 24h
                  </label>
                  <select
                    value={changeFilter}
                    onChange={(e) => setChangeFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#7A52D1]/50"
                  >
                    <option value="all">Toutes</option>
                    <option value="positive">En hausse</option>
                    <option value="negative">En baisse</option>
                  </select>
                </div>

                {/* Bouton reset */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                      setSortBy('volume')
                      setPriceRange([0, 1000])
                      setSelectedRarity('all')
                      setOnlyVerified(false)
                      setOnlyTrending(false)
                      setMinItems(0)
                      setMaxItems(50000)
                      setVolumeRange([0, 100000])
                      setChangeFilter('all')
                    }}
                    className="w-full px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30 rounded-lg text-gray-300 text-sm transition-colors"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            {filteredCollections.length} Collection{filteredCollections.length > 1 ? 's' : ''} trouvée{filteredCollections.length > 1 ? 's' : ''}
          </h2>
        </div>

        {/* Collections Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCollections.map(collection => {
              const handleCollectionClick = () => {
                const adaptedCollection = {
                  id: collection.id,
                  name: collection.name,
                  description: collection.description,
                  image: collection.image,
                  banner: collection.banner,
                  creator: collection.creator,
                  totalItems: collection.items,
                  owners: collection.owners,
                  floorPrice: collection.floorPrice,
                  volume: collection.volume,
                  volumeChange: collection.change24h,
                  verified: collection.verified,
                  category: collection.category,
                  featured: collection.featured,
                  rarity: collection.rarity,
                  trending: collection.trending,
                  likes: collection.likes,
                  views: collection.views,
                };
                onNavigate?.('collection-detail', adaptedCollection);
              };

              return (
              <div 
                key={collection.id}
                onClick={handleCollectionClick}
                className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    {collection.verified && (
                      <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-2 py-1">
                        <Shield className="w-3 h-3 text-green-400" />
                      </div>
                    )}
                                         {collection.trending && (
                       <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-2 py-1">
                         <Flame className="w-3 h-3 text-red-400" />
                       </div>
                     )}
                  </div>

                  {/* Rarity */}
                  <div className="absolute top-3 right-3">
                    <div className={`bg-gradient-to-r ${getRarityColor(collection.rarity)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                      {collection.rarity}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 text-white">
                        {formatNumber(collection.items)} items
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Eye className="w-3 h-3 text-gray-400" />
                      <span className="text-white">{formatNumber(collection.views)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1 truncate">{collection.name}</h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{collection.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-gray-400">Floor</div>
                      <div className="text-sm font-bold text-[#7A52D1]">{formatPrice(collection.floorPrice)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Volume</div>
                      <div className="text-sm font-bold text-white">{formatNumber(collection.volume)}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{formatNumber(collection.owners)} propriétaires</span>
                    <span className={`font-medium ${
                      collection.change24h > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {collection.change24h > 0 ? '+' : ''}{collection.change24h.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCollections.map(collection => {
              const handleCollectionClick = () => {
                const adaptedCollection = {
                  id: collection.id,
                  name: collection.name,
                  description: collection.description,
                  image: collection.image,
                  banner: collection.banner,
                  creator: collection.creator,
                  totalItems: collection.items,
                  owners: collection.owners,
                  floorPrice: collection.floorPrice,
                  volume: collection.volume,
                  volumeChange: collection.change24h,
                  verified: collection.verified,
                  category: collection.category,
                  featured: collection.featured,
                  rarity: collection.rarity,
                  trending: collection.trending,
                  likes: collection.likes,
                  views: collection.views,
                };
                onNavigate?.('collection-detail', adaptedCollection);
              };

              return (
              <div 
                key={collection.id}
                onClick={handleCollectionClick}
                className="group bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-6">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-1 right-1">
                      <div className={`bg-gradient-to-r ${getRarityColor(collection.rarity)} text-white px-1 py-0.5 rounded text-xs font-bold`}>
                        {collection.rarity.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-white truncate">{collection.name}</h3>
                      {collection.verified && <Shield className="w-4 h-4 text-green-400" />}
                                             {collection.trending && <Flame className="w-4 h-4 text-red-400" />}
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-1">{collection.description}</p>
                    <div className="text-sm text-gray-500">par {collection.creator}</div>
                  </div>
                  
                  <div className="flex items-center space-x-8 text-center">
                    <div>
                      <div className="text-sm text-gray-400">Items</div>
                      <div className="text-lg font-bold text-white">{formatNumber(collection.items)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Propriétaires</div>
                      <div className="text-lg font-bold text-white">{formatNumber(collection.owners)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Floor Price</div>
                      <div className="text-lg font-bold text-[#7A52D1]">{formatPrice(collection.floorPrice)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Volume 24h</div>
                      <div className="text-lg font-bold text-white">{formatNumber(collection.volume)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">24h</div>
                      <div className={`text-lg font-bold ${
                        collection.change24h > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {collection.change24h > 0 ? '+' : ''}{collection.change24h.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collections 