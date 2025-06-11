import React, { useState } from 'react'
import { Search, Filter, Grid, List, Star, Eye, Heart, Shield, Flame } from 'lucide-react'

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
  // Gaming Collections basées sur les vraies images
  {
    id: '1',
    name: "Ultra Apes Collection",
    description: "Collection exclusive d'apes Ultra avec des traits uniques et des pouvoirs spéciaux. Chaque ape possède sa personnalité et ses capacités distinctives.",
    image: "/collections/ultra-apes.jpeg",
    banner: "/collections/ultra-apes.jpeg",
    creator: "UltraStudio",
    verified: true,
    items: 15,
    owners: 12,
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
    name: "Ultra Boat Adventures",
    description: "Navires d'exploration pour les océans virtuels d'Ultra. Chaque bateau offre des capacités uniques pour découvrir de nouveaux territoires.",
    image: "/collections/ultra-boat.jpeg",
    banner: "/collections/ultra-boat.jpeg",
    creator: "AquaForge",
    verified: true,
    items: 15,
    owners: 10,
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
    name: "Freedom Gamers Elite",
    description: "Guerriers de la liberté numérique avec équipements tactiques avancés. Collection dédiée aux vrais gamers qui défendent leurs droits.",
    image: "/collections/freedom-gamers.png",
    banner: "/collections/freedom-gamers.png",
    creator: "FreedomLab",
    verified: true,
    items: 15,
    owners: 8,
    floorPrice: 167.20,
    volume: 35420.60,
    change24h: 18.7,
    category: "Gaming",
    featured: false,
    rarity: "Legendary",
    trending: false,
    likes: 12430,
    views: 56450
  },
  {
    id: '4',
    name: "Cypherpunk Revolution",
    description: "Hackers et rebelles du monde numérique. Collection cyberpunk authentique pour les défenseurs de la vie privée et de la liberté.",
    image: "/collections/cypherpunk.jpg",
    banner: "/collections/cypherpunk.jpg",
    creator: "CryptoRebels",
    verified: true,
    items: 15,
    owners: 9,
    floorPrice: 234.75,
    volume: 67890.20,
    change24h: 25.3,
    category: "Art",
    featured: true,
    rarity: "Mythic",
    trending: true,
    likes: 18340,
    views: 78780
  },
  {
    id: '5',
    name: "Digital Counsellor",
    description: "Conseillers numériques sages avec des connaissances infinies. Guides spirituels de l'ère digitale pour éclairer votre chemin.",
    image: "/collections/counsellor.png",
    banner: "/collections/counsellor.png",
    creator: "WisdomForge",
    verified: true,
    items: 15,
    owners: 7,
    floorPrice: 156.80,
    volume: 38200.45,
    change24h: 8.9,
    category: "Collectibles",
    featured: false,
    rarity: "Epic",
    trending: false,
    likes: 9890,
    views: 42560
  },
  {
    id: '6',
    name: "Phygital Artifacts",
    description: "Artefacts physiques et numériques fusionnés. L'avenir de la collection où le monde réel rencontre le virtuel.",
    image: "/collections/phygital.png",
    banner: "/collections/phygital.png",
    creator: "PhygitalLab",
    verified: true,
    items: 15,
    owners: 11,
    floorPrice: 298.90,
    volume: 89450.80,
    change24h: 32.6,
    category: "Collectibles",
    featured: true,
    rarity: "Mythic",
    trending: true,
    likes: 21870,
    views: 95210
  },
  {
    id: '7',
    name: "Ultra Fashion Elite",
    description: "Vêtements haute couture pour avatars Ultra. Mode exclusive et design avant-gardiste pour se démarquer dans le métavers.",
    image: "/collections/ultra-clothes-1.png",
    banner: "/collections/ultra-clothes-1.png",
    creator: "FashionForge",
    verified: false,
    items: 15,
    owners: 6,
    floorPrice: 78.60,
    volume: 23450.50,
    change24h: 15.1,
    category: "Fashion",
    featured: false,
    rarity: "Rare",
    trending: false,
    likes: 7450,
    views: 31670
  },
  {
    id: '8',
    name: "Street Clothes Collection",
    description: "Mode urbaine décontractée pour le quotidien virtuel. Style streetwear authentique adapté aux environnements numériques.",
    image: "/collections/clothes-1.png",
    banner: "/collections/clothes-1.png",
    creator: "StreetStyle",
    verified: false,
    items: 15,
    owners: 5,
    floorPrice: 45.30,
    volume: 12340.90,
    change24h: -2.1,
    category: "Fashion",
    featured: false,
    rarity: "Rare",
    trending: false,
    likes: 4560,
    views: 19870
  },
  {
    id: '9',
    name: "Ashes Genesis",
    description: "Première collection Ashes avec des designs légendaires. L'origine d'un univers post-apocalyptique rempli de mystères.",
    image: "/collections/ashes.png",
    banner: "/collections/ashes.png",
    creator: "AshesStudio",
    verified: true,
    items: 15,
    owners: 13,
    floorPrice: 456.80,
    volume: 123400.45,
    change24h: 28.9,
    category: "Gaming",
    featured: true,
    rarity: "Mythic",
    trending: true,
    likes: 28900,
    views: 134560
  },
  {
    id: '10',
    name: "Ashes Uprising",
    description: "Deuxième chapitre de l'univers Ashes. Nouvelles alliances et conflits dans un monde en reconstruction.",
    image: "/collections/ashes-2.png",
    banner: "/collections/ashes-2.png",
    creator: "AshesStudio",
    verified: true,
    items: 15,
    owners: 11,
    floorPrice: 389.50,
    volume: 98700.30,
    change24h: 22.4,
    category: "Gaming",
    featured: true,
    rarity: "Legendary",
    trending: true,
    likes: 23400,
    views: 98700
  },
  {
    id: '11',
    name: "Ashes Revolution",
    description: "Troisième opus révolutionnaire de la saga Ashes. L'évolution ultime dans un monde transformé par la technologie.",
    image: "/collections/ashes-3.png",
    banner: "/collections/ashes-3.png",
    creator: "AshesStudio",
    verified: true,
    items: 15,
    owners: 9,
    floorPrice: 567.20,
    volume: 156780.60,
    change24h: 35.7,
    category: "Gaming",
    featured: true,
    rarity: "Mythic",
    trending: true,
    likes: 34560,
    views: 167890
  },
  {
    id: '12',
    name: "Ashes Apex",
    description: "Quatrième collection Ashes atteignant de nouveaux sommets. L'apex de l'évolution dans cet univers dystopique.",
    image: "/collections/ahes-4.png",
    banner: "/collections/ahes-4.png",
    creator: "AshesStudio",
    verified: true,
    items: 15,
    owners: 8,
    floorPrice: 634.80,
    volume: 189200.45,
    change24h: 41.2,
    category: "Gaming",
    featured: true,
    rarity: "Mythic",
    trending: true,
    likes: 41230,
    views: 198760
  },
  {
    id: '13',
    name: "Ultra Power Core",
    description: "Sources d'énergie ultra-puissantes pour alimenter vos équipements. Technologie de pointe pour maximiser vos performances.",
    image: "/collections/ultra-power.png",
    banner: "/collections/ultra-power.png",
    creator: "PowerLab",
    verified: true,
    items: 15,
    owners: 7,
    floorPrice: 189.30,
    volume: 45670.90,
    change24h: 19.4,
    category: "Utility",
    featured: false,
    rarity: "Epic",
    trending: false,
    likes: 11780,
    views: 52340
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
        <div className="absolute inset-0">
          <img 
            src="/collections/phygital.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-15 scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-[#7A52D1]/50 to-black/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>
        </div>
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
                  // Créer un UNIQ représentatif de la collection
                  const representativeUniq = {
                    id: `${collection.id}-001`,
                    name: `${collection.name} #0001`,
                    collection: collection.name,
                    price: collection.floorPrice,
                    priceUSD: collection.floorPrice * 2,
                    image: collection.image,
                    rarity: collection.rarity,
                    creator: collection.creator,
                    verified: collection.verified,
                    trending: collection.trending,
                    timeLeft: "2h 15m",
                    likes: Math.floor(collection.likes / 10),
                    views: Math.floor(collection.views / 10),
                    edition: "1/15",
                    seller: collection.creator,
                    rank: 1
                  };
                  onNavigate?.('uniq-detail', representativeUniq);
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
                // Créer un UNIQ représentatif de la collection
                const representativeUniq = {
                  id: `${collection.id}-001`,
                  name: `${collection.name} #0001`,
                  collection: collection.name,
                  price: collection.floorPrice,
                  priceUSD: collection.floorPrice * 2,
                  image: collection.image,
                  rarity: collection.rarity,
                  creator: collection.creator,
                  verified: collection.verified,
                  trending: collection.trending,
                  timeLeft: "2h 15m",
                  likes: Math.floor(collection.likes / 10),
                  views: Math.floor(collection.views / 10),
                  edition: "1/15",
                  seller: collection.creator,
                  rank: 1
                };
                onNavigate?.('uniq-detail', representativeUniq);
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
                // Créer un UNIQ représentatif de la collection
                const representativeUniq = {
                  id: `${collection.id}-001`,
                  name: `${collection.name} #0001`,
                  collection: collection.name,
                  price: collection.floorPrice,
                  priceUSD: collection.floorPrice * 2,
                  image: collection.image,
                  rarity: collection.rarity,
                  creator: collection.creator,
                  verified: collection.verified,
                  trending: collection.trending,
                  timeLeft: "2h 15m",
                  likes: Math.floor(collection.likes / 10),
                  views: Math.floor(collection.views / 10),
                  edition: "1/15",
                  seller: collection.creator,
                  rank: 1
                };
                onNavigate?.('uniq-detail', representativeUniq);
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