import React, { useState, useEffect } from 'react'
import { Search, Filter, Grid, List, Star, TrendingUp, Heart, Eye, ShoppingCart, Zap, Award, Timer, Users, DollarSign, SlidersHorizontal, ArrowUpDown, Sparkles, Flame, Clock } from 'lucide-react'

interface MarketplacePageProps {
  onNavigate: (page: string, data?: any) => void
}

interface NFTItem {
  id: string
  name: string
  collection: string
  price: number
  priceUSD: number
  image: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic'
  rarityRank: string
  seller: string
  timeLeft?: string
  isAuction: boolean
  isFeatured: boolean
  isHot: boolean
  isNew: boolean
  likes: number
  views: number
  attributes: Array<{ trait_type: string; value: string }>
  lastSalePrice?: number
  priceHistory: Array<{ date: string; price: number }>
}

const MarketplacePage = ({ onNavigate }: MarketplacePageProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterRarity, setFilterRarity] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [category, setCategory] = useState('all')
  const [collection, setCollection] = useState('all')
  const [status, setStatus] = useState('all') // all, auction, buy-now, new
  const [favorites, setFavorites] = useState<string[]>([])

  // Mock data avec plus de détails
  const mockItems: NFTItem[] = [
    {
      id: '1',
      name: 'Ultra Power Genesis #3847',
      collection: "Ultra's Power Collection",
      price: 245.50,
      priceUSD: 2455,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      rarity: 'Legendary',
      rarityRank: '28/10000',
      seller: 'ultrawhale92',
      timeLeft: '2d 14h 32m',
      isAuction: true,
      isFeatured: true,
      isHot: true,
      isNew: false,
      likes: 156,
      views: 2840,
      attributes: [
        { trait_type: 'Power Level', value: '9500' },
        { trait_type: 'Element', value: 'Lightning' },
        { trait_type: 'Background', value: 'Cosmic Storm' }
      ],
      lastSalePrice: 198.30,
      priceHistory: [
        { date: '2024-01-01', price: 150 },
        { date: '2024-01-15', price: 198.30 },
        { date: '2024-01-30', price: 245.50 }
      ]
    },
    {
      id: '2',
      name: 'Cosmic Warrior Elite #1205',
      collection: 'Cosmic Warriors',
      price: 89.75,
      priceUSD: 897,
      image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=400&fit=crop',
      rarity: 'Epic',
      rarityRank: '156/5000',
      seller: 'spacehunter',
      isAuction: false,
      isFeatured: false,
      isHot: false,
      isNew: true,
      likes: 89,
      views: 1240,
      attributes: [
        { trait_type: 'Armor Type', value: 'Plasma Shield' },
        { trait_type: 'Weapon', value: 'Laser Sword' },
        { trait_type: 'Origin', value: 'Andromeda' }
      ],
      lastSalePrice: 76.20,
      priceHistory: [
        { date: '2024-01-10', price: 65 },
        { date: '2024-01-20', price: 76.20 },
        { date: '2024-01-30', price: 89.75 }
      ]
    },
    {
      id: '3',
      name: 'Digital Legend Rare #892',
      collection: 'Digital Legends',
      price: 156.80,
      priceUSD: 1568,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      rarity: 'Rare',
      rarityRank: '892/7500',
      seller: 'cryptomaster',
      timeLeft: '6h 45m',
      isAuction: true,
      isFeatured: true,
      isHot: false,
      isNew: false,
      likes: 234,
      views: 3560,
      attributes: [
        { trait_type: 'Class', value: 'Mage' },
        { trait_type: 'Skill Level', value: '85' },
        { trait_type: 'Realm', value: 'Digital Void' }
      ],
      lastSalePrice: 145.00,
      priceHistory: []
    },
    {
      id: '4',
      name: 'Mystic Creature #2398',
      collection: 'Mystic Creatures',
      price: 43.90,
      priceUSD: 439,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
      rarity: 'Common',
      rarityRank: '2398/15000',
      seller: 'mysticholder',
      isAuction: false,
      isFeatured: false,
      isHot: true,
      isNew: true,
      likes: 67,
      views: 890,
      attributes: [
        { trait_type: 'Species', value: 'Dragon' },
        { trait_type: 'Magic Power', value: '720' },
        { trait_type: 'Habitat', value: 'Crystal Caves' }
      ],
      priceHistory: []
    }
  ]

  const rarityColors = {
    Common: 'text-gray-400 border-gray-400/30 bg-gray-400/10',
    Rare: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    Epic: 'text-[#7A52D1] border-[#7A52D1]/30 bg-[#7A52D1]/10',
    Legendary: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
    Mythic: 'text-pink-400 border-pink-400/30 bg-pink-400/10'
  }

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.collection.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = filterRarity === 'all' || item.rarity === filterRarity
    const matchesCollection = collection === 'all' || item.collection === collection
    const matchesStatus = status === 'all' || 
                         (status === 'auction' && item.isAuction) ||
                         (status === 'buy-now' && !item.isAuction) ||
                         (status === 'new' && item.isNew)
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    
    return matchesSearch && matchesRarity && matchesCollection && matchesStatus && matchesPrice
  })

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleItemClick = (item: NFTItem) => {
    onNavigate('uniq-detail', item)
  }

  const formatPrice = (price: number) => `${price.toFixed(2)} UOS`
  const formatUSD = (price: number) => `$${price.toLocaleString()}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#7A52D1]/10 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7A52D1]/30 via-blue-600/20 to-[#7A52D1]/30"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-[#7A52D1]/10 via-transparent to-blue-600/10 animate-pulse"></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Ultra Marketplace
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Découvrez, achetez et vendez les NFTs les plus exclusifs de l'écosystème Ultra
            </p>
            
            {/* Stats rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#7A52D1]/20">
                <div className="text-2xl font-bold text-[#7A52D1]">24.5K</div>
                <div className="text-sm text-gray-400">Items Total</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#7A52D1]/20">
                <div className="text-2xl font-bold text-[#7A52D1]">8.2K</div>
                <div className="text-sm text-gray-400">Propriétaires</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#7A52D1]/20">
                <div className="text-2xl font-bold text-[#7A52D1]">156</div>
                <div className="text-sm text-gray-400">UOS Floor</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#7A52D1]/20">
                <div className="text-2xl font-bold text-[#7A52D1]">2.4M</div>
                <div className="text-sm text-gray-400">Volume Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        {/* Barre de recherche et filtres principaux */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#7A52D1]/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Recherche principale */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#7A52D1] focus:outline-none transition-colors"
              />
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 border ${
                  showFilters 
                    ? 'bg-[#7A52D1] border-[#7A52D1] text-white' 
                    : 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-[#7A52D1]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filtres</span>
              </button>

              <div className="flex bg-gray-800/50 rounded-xl border border-gray-600/50 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-[#7A52D1] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-[#7A52D1] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtres rapides */}
          <div className="flex flex-wrap gap-3">
            {['all', 'auction', 'buy-now', 'new'].map(statusFilter => (
              <button
                key={statusFilter}
                onClick={() => setStatus(statusFilter)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 border text-sm font-medium ${
                  status === statusFilter
                    ? 'bg-[#7A52D1] border-[#7A52D1] text-white'
                    : 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-[#7A52D1]'
                }`}
              >
                {statusFilter === 'all' ? 'Tout' :
                 statusFilter === 'auction' ? 'Enchères' :
                 statusFilter === 'buy-now' ? 'Achat Direct' : 'Nouveautés'}
              </button>
            ))}
              </div>
            </div>

        {/* Filtres avancés */}
        {showFilters && (
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#7A52D1]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Rareté */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rareté</label>
                <select
                  value={filterRarity}
                  onChange={(e) => setFilterRarity(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-[#7A52D1] focus:outline-none"
                >
                  <option value="all">Toutes</option>
                  <option value="Common">Commune</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Épique</option>
                  <option value="Legendary">Légendaire</option>
                  <option value="Mythic">Mythique</option>
                </select>
          </div>

            {/* Collection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Collection</label>
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-[#7A52D1] focus:outline-none"
                >
                  <option value="all">Toutes</option>
                  <option value="Ultra's Power Collection">Ultra's Power</option>
                  <option value="Cosmic Warriors">Cosmic Warriors</option>
                  <option value="Digital Legends">Digital Legends</option>
                  <option value="Mystic Creatures">Mystic Creatures</option>
              </select>
              </div>

              {/* Prix min */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prix Min (UOS)</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-[#7A52D1] focus:outline-none"
                  placeholder="0"
                />
            </div>

              {/* Prix max */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prix Max (UOS)</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-[#7A52D1] focus:outline-none"
                  placeholder="10000"
                />
              </div>
            </div>
          </div>
        )}

        {/* Barre de tri et résultats */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-gray-400 mb-4 md:mb-0">
            {filteredItems.length} item{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
        </div>
          
          <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-[#7A52D1] focus:outline-none"
              >
                <option value="newest">Plus récent</option>
              <option value="oldest">Plus ancien</option>
              <option value="price_low">Prix croissant</option>
              <option value="price_high">Prix décroissant</option>
              <option value="rarity">Rareté</option>
              <option value="popularity">Popularité</option>
              </select>
          </div>
        </div>

        {/* Grille/Liste des items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              onClick={() => handleItemClick(item)}
              >
                {/* Image et badges */}
                <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                    alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {item.isFeatured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        FEATURED
                      </span>
                    )}
                    {item.isHot && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                        <Flame className="w-3 h-3 mr-1" />
                        HOT
                      </span>
                    )}
                    {item.isNew && (
                      <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" />
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(item.id)
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        favorites.includes(item.id) 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-black/50 text-gray-300 hover:text-red-400'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Timer pour enchères */}
                  {item.isAuction && item.timeLeft && (
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-orange-400" />
                      <span className="text-white text-sm font-medium">{item.timeLeft}</span>
                    </div>
                  )}

                  {/* Rareté */}
                  <div className="absolute bottom-3 right-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${rarityColors[item.rarity]}`}>
                      {item.rarity}
                    </span>
                  </div>
                </div>

                {/* Infos */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-white truncate">{item.name}</h3>
                    <span className="text-xs text-gray-400">{item.rarityRank}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3 truncate">{item.collection}</p>
                  
                  {/* Prix */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[#7A52D1] font-bold text-lg">{formatPrice(item.price)}</div>
                      <div className="text-gray-400 text-sm">{formatUSD(item.priceUSD)}</div>
                    </div>
                    
                    {item.lastSalePrice && (
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Dernière vente</div>
                        <div className="text-sm text-gray-400">{formatPrice(item.lastSalePrice)}</div>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {item.likes}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {item.views}
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div>par {item.seller}</div>
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <button 
                    className={`w-full mt-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      item.isAuction 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                        : 'bg-gradient-to-r from-[#7A52D1] to-blue-600 hover:from-[#6A42C1] hover:to-blue-700 text-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleItemClick(item)
                    }}
                  >
                    {item.isAuction ? 'Enchérir' : 'Acheter'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Vue liste */
          <div className="space-y-4">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center space-x-6">
                  {/* Image */}
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="absolute -top-1 -right-1">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${rarityColors[item.rarity]}`}>
                        {item.rarity}
                      </span>
                    </div>
                  </div>

                  {/* Infos principales */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-xl text-white">{item.name}</h3>
                      {item.isFeatured && <Star className="w-5 h-5 text-yellow-400" />}
                      {item.isHot && <Flame className="w-5 h-5 text-red-400" />}
                      {item.isNew && <Sparkles className="w-5 h-5 text-green-400" />}
                    </div>
                    <p className="text-gray-400 mb-2">{item.collection}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>#{item.rarityRank}</span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {item.likes}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.views}
                      </span>
                      <span>par {item.seller}</span>
                    </div>
                  </div>

                  {/* Prix et actions */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#7A52D1] mb-1">{formatPrice(item.price)}</div>
                    <div className="text-gray-400 text-sm mb-3">{formatUSD(item.priceUSD)}</div>
                    
                    {item.isAuction && item.timeLeft && (
                      <div className="text-orange-400 text-sm mb-3 flex items-center justify-end">
                        <Timer className="w-4 h-4 mr-1" />
                        {item.timeLeft}
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(item.id)
                        }}
                        className={`p-2 rounded-xl transition-colors ${
                          favorites.includes(item.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-800 text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      
                      <button 
                        className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                          item.isAuction 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                            : 'bg-gradient-to-r from-[#7A52D1] to-blue-600 hover:from-[#6A42C1] hover:to-blue-700 text-white'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleItemClick(item)
                        }}
                      >
                        {item.isAuction ? 'Enchérir' : 'Acheter'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors">
              Précédent
            </button>
            <button className="px-4 py-2 bg-[#7A52D1] border border-[#7A52D1] rounded-xl text-white">1</button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors">2</button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors">3</button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors">
              Suivant
            </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage