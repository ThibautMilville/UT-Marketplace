import React, { useState, useEffect } from 'react'
import { Search, Grid, List, Star, Heart, Eye, Zap, Timer, Users, SlidersHorizontal, ArrowUpDown, Sparkles, Flame, Layers, GitCompare, Camera, Bot, Shuffle, Maximize2, RotateCcw } from 'lucide-react'
import { useTranslation } from '../contexts/TranslationContext'

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
  const { t } = useTranslation()
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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Nouvelles fonctionnalités Web3 modernes
  const [view3D, setView3D] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [compareItems, setCompareItems] = useState<string[]>([])
  const [aiSearchMode, setAiSearchMode] = useState(false)
  const [arPreview, setArPreview] = useState<string | null>(null)
  const [socialFeed, setSocialFeed] = useState(true)
  const [liveUpdates, setLiveUpdates] = useState(true)
  const [rotationAngle, setRotationAngle] = useState<{[key: string]: number}>({})
  const [smartFilters, setSmartFilters] = useState({
    trendingUp: false,
    undervalued: false,
    whaleActivity: false,
    newListings: false
  })

  // Nouvelles fonctionnalités avancées
  const [hoverEffects, setHoverEffects] = useState(true)
  const [immersiveMode, setImmersiveMode] = useState(false)
  const [priceAlerts, setPriceAlerts] = useState<{[key: string]: number}>({})
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [voiceSearch, setVoiceSearch] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [gridDensity, setGridDensity] = useState<'compact' | 'normal' | 'spacious'>('normal')
  const [showPriceHistory, setShowPriceHistory] = useState(false)
  const [aiRecommendations, setAiRecommendations] = useState(true)

  // Système de notifications amélioré
  const [notifications, setNotifications] = useState<Array<{
    id: string
    type: 'success' | 'warning' | 'info' | 'error'
    message: string
    timestamp: number
    duration?: number
  }>>([])

  // Animations et particules
  const [particles, setParticles] = useState<Array<{
    id: string
    x: number
    y: number
    type: 'star' | 'heart' | 'coin'
    timestamp: number
  }>>([])

  // Statistiques en temps réel
  const [liveStats, setLiveStats] = useState({
    totalViews: 12847,
    activeUsers: 234,
    recentSales: 18,
    priceMovement: '+2.4%'
  })

  // Mock data avec plus de détails
  const mockItems: NFTItem[] = [
    // Ashes Genesis Collection (15 UNIQs)
    {
      id: 'ashes-genesis-0001',
      name: 'Ashes Genesis #0001',
      collection: "Ashes Genesis",
      price: 634.80,
      priceUSD: 7618,
      image: '/collections/ashes.png',
      rarity: 'Legendary',
      rarityRank: '1/15',
      seller: 'ashescollector',
      timeLeft: '2d 14h 32m',
      isAuction: true,
      isFeatured: true,
      isHot: true,
      isNew: false,
      likes: 256,
      views: 4840,
      attributes: [
        { trait_type: 'Power Level', value: '9800' },
        { trait_type: 'Element', value: 'Fire' },
        { trait_type: 'Background', value: 'Apocalyptic Storm' }
      ],
      lastSalePrice: 456.80,
      priceHistory: [
        { date: '2024-01-01', price: 350 },
        { date: '2024-01-15', price: 456.80 },
        { date: '2024-01-30', price: 634.80 }
      ]
    },
    {
      id: 'ashes-genesis-0002',
      name: 'Ashes Genesis #0002',
      collection: "Ashes Genesis",
      price: 589.50,
      priceUSD: 7074,
      image: '/collections/ashes.png',
      rarity: 'Epic',
      rarityRank: '2/15',
      seller: 'genesis_hunter',
      isAuction: false,
      isFeatured: true,
      isHot: false,
      isNew: false,
      likes: 189,
      views: 3240,
      attributes: [
        { trait_type: 'Power Level', value: '8900' },
        { trait_type: 'Element', value: 'Fire' },
        { trait_type: 'Background', value: 'Crimson Void' }
      ],
      lastSalePrice: 456.80,
      priceHistory: []
    },
    {
      id: 'ashes-genesis-0003',
      name: 'Ashes Genesis #0003',
      collection: "Ashes Genesis",
      price: 512.30,
      priceUSD: 6148,
      image: '/collections/ashes.png',
      rarity: 'Epic',
      rarityRank: '3/15',
      seller: 'fire_master',
      isAuction: false,
      isFeatured: false,
      isHot: true,
      isNew: false,
      likes: 167,
      views: 2890,
      attributes: [
        { trait_type: 'Power Level', value: '8200' },
        { trait_type: 'Element', value: 'Fire' },
        { trait_type: 'Background', value: 'Ember Fields' }
      ],
      priceHistory: []
    },
    // Ashes Apex Collection (8 UNIQs)
    {
      id: 'ashes-apex-0001',
      name: 'Ashes Apex #0001',
      collection: "Ashes Apex",
      price: 789.90,
      priceUSD: 9479,
      image: '/collections/ahes-4.png',
      rarity: 'Mythic',
      rarityRank: '1/15',
      seller: 'apex_legend',
      timeLeft: '1d 8h 15m',
      isAuction: true,
      isFeatured: true,
      isHot: true,
      isNew: true,
      likes: 423,
      views: 7834,
      attributes: [
        { trait_type: 'Power Level', value: '9999' },
        { trait_type: 'Element', value: 'Void' },
        { trait_type: 'Background', value: 'Ultimate Destruction' }
      ],
      lastSalePrice: 634.80,
      priceHistory: []
    },
    {
      id: 'ashes-apex-0002',
      name: 'Ashes Apex #0002',
      collection: "Ashes Apex",
      price: 698.40,
      priceUSD: 8381,
      image: '/collections/ahes-4.png',
      rarity: 'Legendary',
      rarityRank: '2/15',
      seller: 'apex_collector',
      isAuction: false,
      isFeatured: true,
      isHot: false,
      isNew: true,
      likes: 345,
      views: 6234,
      attributes: [
        { trait_type: 'Power Level', value: '9200' },
        { trait_type: 'Element', value: 'Dark' },
        { trait_type: 'Background', value: 'Shadow Realm' }
      ],
      priceHistory: []
    },
    // Phygital Artifacts (11 UNIQs)
    {
      id: 'phygital-0001',
      name: 'Phygital Artifact #0001',
      collection: "Phygital Artifacts",
      price: 456.70,
      priceUSD: 5480,
      image: '/collections/phygital.png',
      rarity: 'Legendary',
      rarityRank: '1/15',
      seller: 'phygital_lab',
      timeLeft: '3h 45m',
      isAuction: true,
      isFeatured: true,
      isHot: false,
      isNew: false,
      likes: 298,
      views: 4567,
      attributes: [
        { trait_type: 'Technology', value: 'Quantum Fusion' },
        { trait_type: 'Material', value: 'Digital Matter' },
        { trait_type: 'Rarity', value: 'Ultra Rare' }
      ],
      lastSalePrice: 298.90,
      priceHistory: []
    },
    {
      id: 'phygital-0002',
      name: 'Phygital Artifact #0002',
      collection: "Phygital Artifacts",
      price: 389.20,
      priceUSD: 4670,
      image: '/collections/phygital.png',
      rarity: 'Epic',
      rarityRank: '2/15',
      seller: 'reality_bender',
      isAuction: false,
      isFeatured: false,
      isHot: true,
      isNew: false,
      likes: 234,
      views: 3456,
      attributes: [
        { trait_type: 'Technology', value: 'AR Matrix' },
        { trait_type: 'Material', value: 'Hybrid Carbon' },
        { trait_type: 'Rarity', value: 'Rare' }
      ],
      priceHistory: []
    },
    // Cypherpunk Revolution (9 UNIQs)
    {
      id: 'cypherpunk-0001',
      name: 'Cypherpunk Revolutionary #0001',
      collection: "Cypherpunk Revolution",
      price: 345.80,
      priceUSD: 4150,
      image: '/collections/cypherpunk.jpg',
      rarity: 'Legendary',
      rarityRank: '1/15',
      seller: 'crypto_rebel',
      timeLeft: '5d 12h 30m',
      isAuction: true,
      isFeatured: true,
      isHot: true,
      isNew: false,
      likes: 567,
      views: 8934,
      attributes: [
        { trait_type: 'Hack Level', value: '9500' },
        { trait_type: 'Encryption', value: 'Quantum Safe' },
        { trait_type: 'Network', value: 'DarkWeb Master' }
      ],
      lastSalePrice: 234.75,
      priceHistory: []
    },
    {
      id: 'cypherpunk-0002',
      name: 'Cypherpunk Revolutionary #0002',
      collection: "Cypherpunk Revolution",
      price: 287.60,
      priceUSD: 3451,
      image: '/collections/cypherpunk.jpg',
      rarity: 'Epic',
      rarityRank: '2/15',
      seller: 'digital_anarchy',
      isAuction: false,
      isFeatured: false,
      isHot: false,
      isNew: true,
      likes: 198,
      views: 2845,
      attributes: [
        { trait_type: 'Hack Level', value: '7800' },
        { trait_type: 'Encryption', value: 'Military Grade' },
        { trait_type: 'Network', value: 'Underground' }
      ],
      priceHistory: []
    },
    // Ultra Apes Collection (12 UNIQs)
    {
      id: 'ultra-apes-0001',
      name: 'Ultra Ape Elite #0001',
      collection: "Ultra Apes Collection",
      price: 234.90,
      priceUSD: 2819,
      image: '/collections/ultra-apes.jpeg',
      rarity: 'Legendary',
      rarityRank: '1/15',
      seller: 'ape_kingdom',
      timeLeft: '12h 22m',
      isAuction: true,
      isFeatured: true,
      isHot: false,
      isNew: false,
      likes: 445,
      views: 6789,
      attributes: [
        { trait_type: 'Intelligence', value: '9000' },
        { trait_type: 'Strength', value: '8500' },
        { trait_type: 'Special Ability', value: 'Cyber Enhanced' }
      ],
      lastSalePrice: 125.50,
      priceHistory: []
    },
    {
      id: 'ultra-apes-0002',
      name: 'Ultra Ape Elite #0002',
      collection: "Ultra Apes Collection",
      price: 198.70,
      priceUSD: 2384,
      image: '/collections/ultra-apes.jpeg',
      rarity: 'Epic',
      rarityRank: '2/15',
      seller: 'primate_collector',
      isAuction: false,
      isFeatured: false,
      isHot: true,
      isNew: false,
      likes: 334,
      views: 4567,
      attributes: [
        { trait_type: 'Intelligence', value: '7500' },
        { trait_type: 'Strength', value: '8000' },
        { trait_type: 'Special Ability', value: 'Tech Savvy' }
      ],
      priceHistory: []
    },
    // Ultra Power Core (7 UNIQs)
    {
      id: 'ultra-power-0001',
      name: 'Ultra Power Core #0001',
      collection: "Ultra Power Core",
      price: 298.50,
      priceUSD: 3582,
      image: '/collections/ultra-power.png',
      rarity: 'Legendary',
      rarityRank: '1/15',
      seller: 'power_labs',
      timeLeft: '4d 6h 18m',
      isAuction: true,
      isFeatured: true,
      isHot: true,
      isNew: false,
      likes: 278,
      views: 4123,
      attributes: [
        { trait_type: 'Energy Output', value: '9800 MW' },
        { trait_type: 'Core Type', value: 'Fusion Reactor' },
        { trait_type: 'Efficiency', value: '99.8%' }
      ],
      lastSalePrice: 189.30,
      priceHistory: []
    },
    {
      id: 'ultra-power-0002',
      name: 'Ultra Power Core #0002',
      collection: "Ultra Power Core",
      price: 245.80,
      priceUSD: 2950,
      image: '/collections/ultra-power.png',
      rarity: 'Epic',
      rarityRank: '2/15',
      seller: 'energy_master',
      isAuction: false,
      isFeatured: false,
      isHot: false,
      isNew: true,
      likes: 189,
      views: 2756,
      attributes: [
        { trait_type: 'Energy Output', value: '7200 MW' },
        { trait_type: 'Core Type', value: 'Plasma Generator' },
        { trait_type: 'Efficiency', value: '95.2%' }
      ],
      priceHistory: []
    },
    // Freedom Gamers (12 UNIQs)
    {
      id: 'freedom-gamers-0001',
      name: 'Freedom Gamer #0001',
      collection: "Freedom Gamers",
      price: 156.40,
      priceUSD: 1877,
      image: '/collections/freedom-gamers.png',
      rarity: 'Epic',
      rarityRank: '1/15',
      seller: 'gamer_freedom',
      timeLeft: '8h 45m',
      isAuction: true,
      isFeatured: false,
      isHot: true,
      isNew: false,
      likes: 567,
      views: 8934,
      attributes: [
        { trait_type: 'Gaming Skill', value: 'Pro Level' },
        { trait_type: 'Platform', value: 'Multi Console' },
        { trait_type: 'Achievement', value: 'Tournament Winner' }
      ],
      lastSalePrice: 87.50,
      priceHistory: []
    },
    {
      id: 'freedom-gamers-0002',
      name: 'Freedom Gamer #0002',
      collection: "Freedom Gamers",
      price: 134.60,
      priceUSD: 1615,
      image: '/collections/freedom-gamers.png',
      rarity: 'Rare',
      rarityRank: '2/15',
      seller: 'pixel_warrior',
      isAuction: false,
      isFeatured: false,
      isHot: false,
      isNew: true,
      likes: 234,
      views: 3456,
      attributes: [
        { trait_type: 'Gaming Skill', value: 'Expert' },
        { trait_type: 'Platform', value: 'PC Master Race' },
        { trait_type: 'Achievement', value: 'Speedrun Record' }
      ],
      priceHistory: []
    },
    // The Counsellor (13 UNIQs)
    {
      id: 'counsellor-0001',
      name: 'The Counsellor #0001',
      collection: "The Counsellor",
      price: 289.70,
      priceUSD: 3476,
      image: '/collections/counsellor.png',
      rarity: 'Legendary',
      rarityRank: '1/15',
      seller: 'wisdom_keeper',
      timeLeft: '1d 18h 42m',
      isAuction: true,
      isFeatured: true,
      isHot: false,
      isNew: false,
      likes: 345,
      views: 5234,
      attributes: [
        { trait_type: 'Wisdom Level', value: '9500' },
        { trait_type: 'Knowledge Domain', value: 'Universal Truth' },
        { trait_type: 'Advisory Rank', value: 'Supreme Council' }
      ],
      lastSalePrice: 234.90,
      priceHistory: []
    },
    {
      id: 'counsellor-0002',
      name: 'The Counsellor #0002',
      collection: "The Counsellor",
      price: 234.50,
      priceUSD: 2814,
      image: '/collections/counsellor.png',
      rarity: 'Epic',
      rarityRank: '2/15',
      seller: 'sage_master',
      isAuction: false,
      isFeatured: false,
      isHot: true,
      isNew: false,
      likes: 267,
      views: 3789,
      attributes: [
        { trait_type: 'Wisdom Level', value: '8200' },
        { trait_type: 'Knowledge Domain', value: 'Ancient Lore' },
        { trait_type: 'Advisory Rank', value: 'Elder Council' }
      ],
      priceHistory: []
    },
    // Ultra Boat (11 UNIQs)
    {
      id: 'ultra-boat-0001',
      name: 'Ultra Boat #0001',
      collection: "Ultra Boat Collection",
      price: 345.90,
      priceUSD: 4151,
      image: '/collections/ultra-boat.jpeg',
      rarity: 'Legendary',
      rarityRank: '1/15',
      seller: 'sea_captain',
      timeLeft: '2d 9h 15m',
      isAuction: true,
      isFeatured: true,
      isHot: true,
      isNew: false,
      likes: 198,
      views: 2956,
      attributes: [
        { trait_type: 'Speed', value: '350 knots' },
        { trait_type: 'Hull Type', value: 'Quantum Carbon' },
        { trait_type: 'Navigation', value: 'AI Autopilot' }
      ],
      lastSalePrice: 289.40,
      priceHistory: []
    },
    {
      id: 'ultra-boat-0002',
      name: 'Ultra Boat #0002',
      collection: "Ultra Boat Collection",
      price: 298.70,
      priceUSD: 3584,
      image: '/collections/ultra-boat.jpeg',
      rarity: 'Epic',
      rarityRank: '2/15',
      seller: 'ocean_explorer',
      isAuction: false,
      isFeatured: false,
      isHot: false,
      isNew: true,
      likes: 156,
      views: 2345,
      attributes: [
        { trait_type: 'Speed', value: '280 knots' },
        { trait_type: 'Hull Type', value: 'Titanium Alloy' },
        { trait_type: 'Navigation', value: 'Advanced GPS' }
      ],
      priceHistory: []
    },
    // Ultra Clothes Collection (11 UNIQs)
    {
      id: 'ultra-clothes-0001',
      name: 'Ultra Fashion #0001',
      collection: "Ultra Clothes Collection",
      price: 198.30,
      priceUSD: 2380,
      image: '/collections/ultra-clothes-1.png',
      rarity: 'Epic',
      rarityRank: '1/15',
      seller: 'fashion_guru',
      timeLeft: '6h 30m',
      isAuction: true,
      isFeatured: false,
      isHot: true,
      isNew: false,
      likes: 445,
      views: 6789,
      attributes: [
        { trait_type: 'Style', value: 'Futuristic Chic' },
        { trait_type: 'Material', value: 'Smart Fabric' },
        { trait_type: 'Technology', value: 'Color Changing' }
      ],
      lastSalePrice: 156.80,
      priceHistory: []
    },
    {
      id: 'ultra-clothes-0002',
      name: 'Ultra Fashion #0002',
      collection: "Ultra Clothes Collection",
      price: 167.90,
      priceUSD: 2015,
      image: '/collections/clothes-1.png',
      rarity: 'Rare',
      rarityRank: '2/15',
      seller: 'style_master',
      isAuction: false,
      isFeatured: false,
      isHot: false,
      isNew: true,
      likes: 234,
      views: 3456,
      attributes: [
        { trait_type: 'Style', value: 'Cyberpunk Edge' },
        { trait_type: 'Material', value: 'Neo Leather' },
        { trait_type: 'Technology', value: 'LED Integration' }
      ],
      priceHistory: []
    }
  ]

  // Réinitialiser la page quand les filtres changent
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterRarity, collection, status, priceRange])

  // Fonction pour ajouter des notifications avec alertes visuelles
  const addNotification = (type: 'success' | 'warning' | 'info' | 'error', message: string, duration = 5000) => {
    const id = Date.now().toString()
    const notification = {
      id,
      type,
      message,
      timestamp: Date.now(),
      duration
    }

    setNotifications(prev => [...prev, notification])

    // Auto-suppression
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, duration)
  }

  // Fonction pour créer des particules animées
  const createParticles = (x: number, y: number, type: 'star' | 'heart' | 'coin') => {
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      type,
      timestamp: Date.now()
    }))

    setParticles(prev => [...prev, ...newParticles])

    // Auto-suppression des particules
    setTimeout(() => {
      setParticles(prev =>
        prev.filter(p => !newParticles.some(np => np.id === p.id))
      )
    }, 2000)
  }

  // Mode sombre/clair
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    addNotification('info', `Mode ${!darkMode ? 'sombre' : 'clair'} activé`)
  }

  // Rotation 3D améliorée
  const rotateNFT = (itemId: string) => {
    setRotationAngle(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 90
    }))
    addNotification('success', 'Vue 3D mise à jour')
  }

  // Auto-rotation pour la vue 3D
  useEffect(() => {
    if (view3D) {
      const interval = setInterval(() => {
        setRotationAngle(prev => {
          const newAngles = { ...prev }
          filteredItems.forEach(item => {
            newAngles[item.id] = (newAngles[item.id] || 0) + 2
          })
          return newAngles
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [view3D])

  // Watchlist avec feedback
  const toggleWatchlist = (itemId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()

      // Créer des particules à la position du clic
      const rect = (event.target as Element).getBoundingClientRect()
      createParticles(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        'star'
      )
    }

    const isInWatchlist = watchlist.includes(itemId)
    if (isInWatchlist) {
      setWatchlist(prev => prev.filter(id => id !== itemId))
      addNotification('info', 'Retiré de la watchlist')
    } else {
      setWatchlist(prev => [...prev, itemId])
      addNotification('success', 'Ajouté à la watchlist')
    }
  }

  // Favoris avec feedback
  const toggleFavorite = (itemId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()

      const rect = (event.target as Element).getBoundingClientRect()
      createParticles(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        'heart'
      )
    }

    const isFavorite = favorites.includes(itemId)
    if (isFavorite) {
      setFavorites(prev => prev.filter(id => id !== itemId))
      addNotification('info', 'Retiré des favoris')
    } else {
      setFavorites(prev => [...prev, itemId])
      addNotification('success', 'Ajouté aux favoris')
    }
  }

  // Mode immersif amélioré
  const toggleImmersiveMode = () => {
    setImmersiveMode(!immersiveMode)
    addNotification('info', `Mode immersif ${!immersiveMode ? 'activé' : 'désactivé'}`)
  }

  // Vue 3D avec feedback
  const toggle3DView = () => {
    setView3D(!view3D)
    addNotification('success', `Vue 3D ${!view3D ? 'activée' : 'désactivée'}`)
  }

  // Filtres intelligents avec feedback
  const toggleSmartFilter = (filterName: keyof typeof smartFilters) => {
    setSmartFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }))
    addNotification('info', `Filtre ${filterName} ${!smartFilters[filterName] ? 'activé' : 'désactivé'}`)
  }

  // Fonction de recherche vocale
  const startVoiceSearch = () => {
    setVoiceSearch(true)
    addNotification('info', 'Recherche vocale activée...')

    // Simulation de recherche vocale
    setTimeout(() => {
      setVoiceSearch(false)
      setSearchTerm('Ultra collection')
      addNotification('success', 'Recherche vocale terminée')
    }, 3000)
  }

  // Fonctions manquantes
  const getGridClass = () => {
    switch (gridDensity) {
      case 'compact': return 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3'
      case 'spacious': return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    }
  }

  const toggleCompareItem = (itemId: string) => {
    if (compareItems.includes(itemId)) {
      setCompareItems(prev => prev.filter(id => id !== itemId))
    } else if (compareItems.length < 3) {
      setCompareItems(prev => [...prev, itemId])
    }
    addNotification('info', `Item ${compareItems.includes(itemId) ? 'retiré de' : 'ajouté à'} la comparaison`)
  }

  const launchARPreview = (itemId: string) => {
    setArPreview(itemId)
    addNotification('success', 'Aperçu AR lancé')
    setTimeout(() => setArPreview(null), 3000)
  }

  const setPriceAlert = (itemId: string, targetPrice: number) => {
    setPriceAlerts(prev => ({ ...prev, [itemId]: targetPrice }))
    addNotification('success', `Alerte prix définie à ${targetPrice.toFixed(2)} UOS`)
  }

  const handleItemClick = (item: NFTItem) => {
    onNavigate('uniq-detail', item)
  }

  const formatPrice = (price: number) => `${price.toFixed(2)} UOS`
  const formatUSD = (price: number) => `$${price.toLocaleString()}`

  // Couleurs de rareté
  const rarityColors = {
    'Common': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'Rare': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Epic': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Legendary': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Mythic': 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  // Filtrage des items
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.collection.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = filterRarity === 'all' || item.rarity === filterRarity
    const matchesCollection = collection === 'all' || item.collection === collection
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    const matchesStatus = status === 'all' ||
                         (status === 'auction' && item.isAuction) ||
                         (status === 'buy-now' && !item.isAuction) ||
                         (status === 'new' && item.isNew)

    return matchesSearch && matchesRarity && matchesCollection && matchesPrice && matchesStatus
  })

  // Tri des items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return a.price - b.price
      case 'price_high': return b.price - a.price
      case 'newest': return b.id.localeCompare(a.id)
      case 'oldest': return a.id.localeCompare(b.id)
      case 'rarity':
        const rarityOrder = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4, 'Mythic': 5 }
        return rarityOrder[b.rarity] - rarityOrder[a.rarity]
      case 'popularity': return b.likes - a.likes
      default: return 0
    }
  })

  // Pagination
  const totalItems = sortedItems.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = sortedItems.slice(startIndex, endIndex)

  return (
    <>
      <div className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-black via-[#7A52D1]/10 to-black text-white'
          : 'bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-100 text-gray-900'
      } ${
        immersiveMode
          ? 'fixed inset-0 z-50 overflow-auto'
          : ''
      }`}>
        {immersiveMode && (
          <>
            {/* Contrôles immersifs */}
            <div className="fixed top-4 right-4 z-60 flex flex-col space-y-2">
              <button
                onClick={toggleImmersiveMode}
                className="p-3 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-all duration-300 border border-white/20"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView3D(!view3D)}
                className={`p-3 backdrop-blur-sm rounded-full transition-all duration-300 border ${
                  view3D
                    ? 'bg-[#7A52D1]/70 text-white border-[#7A52D1]/50'
                    : 'bg-black/70 text-white hover:bg-black/90 border-white/20'
                }`}
              >
                <Layers className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`p-3 backdrop-blur-sm rounded-full transition-all duration-300 border ${
                  compareMode
                    ? 'bg-blue-500/70 text-white border-blue-500/50'
                    : 'bg-black/70 text-white hover:bg-black/90 border-white/20'
                }`}
              >
                <GitCompare className="w-5 h-5" />
                {compareItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* Barre d'outils flottante en bas */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-60">
              <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-center space-x-4">
                <div className="text-white text-sm">
                  <span className="text-gray-400">Affichage:</span> {currentItems.length} items
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="flex space-x-2">
                  {gridDensity !== 'compact' && (
                    <button
                      onClick={() => setGridDensity('compact')}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                    >
                      <Grid className="w-4 h-4 text-white" />
                    </button>
                  )}
                  {gridDensity !== 'normal' && (
                    <button
                      onClick={() => setGridDensity('normal')}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                    >
                      <List className="w-4 h-4 text-white" />
                    </button>
                  )}
                  {gridDensity !== 'spacious' && (
                    <button
                      onClick={() => setGridDensity('spacious')}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                    >
                      <Layers className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <button
                  onClick={() => setShowPriceHistory(!showPriceHistory)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    showPriceHistory
                      ? 'bg-green-500/50 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  📊
                </button>
              </div>
            </div>
          </>
        )}

        {/* Système de notifications amélioré - En haut à droite */}
        <div className="fixed top-20 right-4 z-[60] space-y-3 max-w-sm">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-500 transform animate-in slide-in-from-right-full ${
                notification.type === 'success'
                  ? darkMode
                    ? 'bg-green-500/20 border-green-500/40 text-green-300 shadow-lg shadow-green-500/20'
                    : 'bg-green-100 border-green-300 text-green-800 shadow-lg shadow-green-200/50'
                  : notification.type === 'warning'
                  ? darkMode
                    ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300 shadow-lg shadow-yellow-500/20'
                    : 'bg-yellow-100 border-yellow-300 text-yellow-800 shadow-lg shadow-yellow-200/50'
                  : notification.type === 'info'
                  ? darkMode
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-300 shadow-lg shadow-blue-500/20'
                    : 'bg-blue-100 border-blue-300 text-blue-800 shadow-lg shadow-blue-200/50'
                  : darkMode
                  ? 'bg-red-500/20 border-red-500/40 text-red-300 shadow-lg shadow-red-500/20'
                  : 'bg-red-100 border-red-300 text-red-800 shadow-lg shadow-red-200/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  notification.type === 'success'
                    ? darkMode ? 'bg-green-400' : 'bg-green-600'
                    : notification.type === 'warning'
                    ? darkMode ? 'bg-yellow-400' : 'bg-yellow-600'
                    : notification.type === 'info'
                    ? darkMode ? 'bg-blue-400' : 'bg-blue-600'
                    : darkMode ? 'bg-red-400' : 'bg-red-600'
                }`}></div>
                <span className="text-sm font-medium flex-1">{notification.message}</span>
                <button
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                  className={`text-xs opacity-60 hover:opacity-100 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Système de particules */}
        <div className="fixed inset-0 pointer-events-none z-40">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute animate-bounce-fade"
              style={{
                left: particle.x,
                top: particle.y,
                animation: 'bounce-fade 2s ease-out forwards'
              }}
            >
              {particle.type === 'star' && '⭐'}
              {particle.type === 'heart' && '❤️'}
              {particle.type === 'coin' && '🪙'}
            </div>
          ))}
        </div>

        {/* Statistiques live en mode immersif */}
        {immersiveMode && liveUpdates && (
          <div className="fixed top-4 left-4 z-60">
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-white text-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live: {liveStats.activeUsers} utilisateurs</span>
                </div>
                <div className="text-xs text-gray-400">
                  {liveStats.recentSales} ventes récentes • {liveStats.priceMovement}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section - masqué en mode immersif */}
        {!immersiveMode && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/collections/ashes.png"
                alt="Background"
                className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#7A52D1]/60 to-black/80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>
            </div>

            <div className="relative container mx-auto px-6 py-20">
              <div className="text-center mb-12">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
                  {t('marketplace.title')}
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  {t('marketplace.subtitle')}
                </p>

                {/* Stats rapides */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#7A52D1]/20">
                    <div className="text-2xl font-bold text-[#7A52D1]">{mockItems.length}</div>
                    <div className="text-sm text-gray-400">{t('marketplace.stats.available')}</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#7A52D1]/20">
                    <div className="text-2xl font-bold text-[#7A52D1]">10</div>
                    <div className="text-sm text-gray-400">{t('marketplace.stats.collections')}</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#7A52D1]/20">
                    <div className="text-2xl font-bold text-[#7A52D1]">134</div>
                    <div className="text-sm text-gray-400">{t('marketplace.stats.floor')}</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#7A52D1]/20">
                    <div className="text-2xl font-bold text-[#7A52D1]">
                      {Math.round(mockItems.reduce((sum, item) => sum + item.price, 0))}
                    </div>
                    <div className="text-sm text-gray-400">{t('marketplace.stats.volume')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`container mx-auto px-6 ${immersiveMode ? 'py-8' : 'pb-16'}`}>
          {/* Barre de recherche ultra-moderne */}
          <div className="bg-gradient-to-r from-black/60 via-[#7A52D1]/10 to-black/60 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-[#7A52D1]/30 shadow-2xl shadow-[#7A52D1]/20">
            {/* Barre de recherche principale */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7A52D1]/20 to-blue-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl border border-[#7A52D1]/40 overflow-hidden">
                <div className="flex items-center">
                  <Search className="absolute left-6 text-[#7A52D1] w-6 h-6 z-10" />
                  <input
                    type="text"
                    placeholder={voiceSearch ? t('marketplace.voiceSearchActive') : t('marketplace.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-16 pr-32 py-6 bg-transparent text-white placeholder-gray-300 text-lg focus:outline-none transition-all duration-500 ${
                      voiceSearch ? 'placeholder-red-300' : ''
                    }`}
                  />

                  {/* Actions de recherche */}
                  <div className="absolute right-4 flex items-center space-x-2">
                    {/* Recherche IA */}
                    <button
                      onClick={() => setAiSearchMode(!aiSearchMode)}
                      className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        aiSearchMode
                          ? 'bg-purple-500/80 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-black/60 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                      }`}
                      title="Recherche IA avancée"
                    >
                      <Bot className="w-5 h-5" />
                    </button>

                    {/* Recherche vocale */}
                    <button
                      onClick={startVoiceSearch}
                      className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        voiceSearch
                          ? 'bg-red-500/80 text-white animate-pulse shadow-lg shadow-red-500/50'
                          : 'bg-black/60 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                      }`}
                      title="Recherche vocale"
                    >
                      🎤
                    </button>

                    {/* Filtres rapides */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        showFilters
                          ? 'bg-[#7A52D1]/80 text-white shadow-lg shadow-[#7A52D1]/50'
                          : 'bg-black/60 text-[#7A52D1] hover:bg-[#7A52D1]/20 border border-[#7A52D1]/30'
                      }`}
                      title="Filtres avancés"
                    >
                      <SlidersHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Barre de progression pour la recherche IA */}
                {aiSearchMode && (
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Suggestions et raccourcis intelligents */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              {[
                { key: 'marketplace.suggestions.trending', filter: 'trending' },
                { key: 'marketplace.suggestions.rare', filter: 'rare' },
                { key: 'marketplace.suggestions.new', filter: 'new' },
                { key: 'marketplace.suggestions.premium', filter: 'premium' },
                { key: 'marketplace.suggestions.popular', filter: 'popular' },
                { key: 'marketplace.suggestions.goodPrice', filter: 'good-price' }
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const filter = suggestion.filter
                    if (filter === 'trending') setSmartFilters(prev => ({ ...prev, trendingUp: true }))
                    else if (filter === 'new') setSmartFilters(prev => ({ ...prev, newListings: true }))
                    else if (filter === 'rare') setFilterRarity('Epic')
                    else if (filter === 'premium') setFilterRarity('Legendary')
                  }}
                  className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 hover:from-[#7A52D1]/40 hover:to-blue-500/40 backdrop-blur-sm rounded-xl py-3 px-4 text-white text-sm font-medium transition-all duration-300 transform hover:scale-105 border border-gray-600/30 hover:border-[#7A52D1]/50"
                >
                  {t(suggestion.key as any)}
                </button>
              ))}
            </div>

            {/* Section principale - COLLECTIONS & UNIQS */}
            <div className="bg-gradient-to-r from-[#7A52D1]/30 via-violet-500/30 to-blue-500/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-[#7A52D1]/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">🏆 Collections & UNIQs Premium</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setCategory('all');
                    setCollection('all');
                    setFilterRarity('legendary');
                  }}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 text-white p-4 rounded-xl hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 font-semibold"
                >
                  ⭐ Collections Légendaires
                </button>
                <button
                  onClick={() => {
                    setCategory('gaming');
                    setStatus('buy-now');
                  }}
                  className="bg-gradient-to-r from-[#7A52D1]/20 to-blue-500/20 border border-[#7A52D1]/40 text-white p-4 rounded-xl hover:from-[#7A52D1]/30 hover:to-blue-500/30 transition-all duration-300 font-semibold"
                >
                  🎮 UNIQs Gaming
                </button>
                <button
                  onClick={() => {
                    setStatus('new');
                    setSortBy('newest');
                  }}
                  className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/40 text-white p-4 rounded-xl hover:from-green-500/30 hover:to-teal-500/30 transition-all duration-300 font-semibold"
                >
                  ✨ Nouveautés
                </button>
              </div>
            </div>

            {/* Contrôles intelligents */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Sélecteurs de tri et vue */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-black/60 border border-[#7A52D1]/30 rounded-xl px-4 py-3 pr-10 text-white focus:border-[#7A52D1] focus:outline-none transition-all duration-300 cursor-pointer"
                  >
                    <option value="newest">{t('marketplace.sort.newest')}</option>
                    <option value="price_low">{t('marketplace.sort.priceLow')}</option>
                    <option value="price_high">{t('marketplace.sort.priceHigh')}</option>
                    <option value="rarity">{t('marketplace.sort.rarity')}</option>
                    <option value="popularity">{t('marketplace.sort.popularity')}</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7A52D1] pointer-events-none" />
                </div>

                {/* Vue Mode Switcher */}
                <div className="flex bg-black/60 rounded-xl border border-[#7A52D1]/30 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-[#7A52D1] to-blue-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                    <span className="text-sm">{t('marketplace.view.grid')}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-[#7A52D1] to-blue-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span className="text-sm">{t('marketplace.view.list')}</span>
                  </button>
                </div>
              </div>

              {/* Filtres rapides */}
              <div className="flex items-center space-x-3">
                {['all', 'auction', 'buy-now', 'new'].map(statusOption => (
                  <button
                    key={statusOption}
                    onClick={() => setStatus(statusOption)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 border text-sm font-medium ${
                      status === statusOption
                        ? 'bg-gradient-to-r from-[#7A52D1] to-blue-500 border-[#7A52D1] text-white shadow-lg shadow-[#7A52D1]/30'
                        : 'bg-black/40 border-gray-600/50 text-gray-300 hover:border-[#7A52D1]/50 hover:text-white'
                    }`}
                  >
                    {statusOption === 'all' ? t('marketplace.filter.all') :
                      statusOption === 'auction' ? t('marketplace.filter.auction') :
                        statusOption === 'buy-now' ? t('marketplace.filter.buyNow') : t('marketplace.filter.new')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Barre d'outils Web3 moderne */}
        <div className="bg-gradient-to-r from-[#7A52D1]/20 via-violet-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-[#7A52D1]/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Section gauche - Fonctionnalités visuelles */}
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium text-white">Affichage :</div>

              <button
                onClick={toggleDarkMode}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 border ${
                  darkMode
                    ? 'bg-gradient-to-r from-gray-800 to-black border-gray-600 text-white shadow-lg shadow-black/30'
                    : 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 text-orange-800 shadow-lg shadow-yellow-200/50'
                }`}
              >
                <span className="text-lg">{darkMode ? '🌙' : '☀️'}</span>
                <span className="font-medium">{darkMode ? 'Mode Sombre' : 'Mode Clair'}</span>
              </button>

              <button
                onClick={toggle3DView}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 border ${
                  view3D
                    ? darkMode
                      ? 'bg-gradient-to-r from-[#7A52D1] to-violet-600 border-[#7A52D1] text-white shadow-lg shadow-[#7A52D1]/40'
                      : 'bg-gradient-to-r from-purple-200 to-violet-200 border-purple-400 text-purple-800 shadow-lg shadow-purple-200/50'
                    : darkMode
                    ? 'bg-black/40 border-gray-600/50 text-gray-300 hover:border-[#7A52D1] hover:bg-[#7A52D1]/10'
                    : 'bg-white/60 border-gray-300 text-gray-600 hover:border-purple-400 hover:bg-purple-50'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Vue 3D</span>
                {view3D && <span className="text-xs bg-white/20 px-2 py-1 rounded-full">ON</span>}
              </button>

              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 border ${
                  compareMode
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-500 text-white shadow-lg shadow-blue-500/40'
                    : 'bg-black/40 border-gray-600/50 text-gray-300 hover:border-blue-500 hover:bg-blue-500/10'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                <span>Comparer</span>
                {compareItems.length > 0 && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{compareItems.length}</span>
                )}
              </button>

              <button
                onClick={() => setAiSearchMode(!aiSearchMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 border ${
                  aiSearchMode
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white shadow-lg shadow-purple-500/40'
                    : 'bg-black/40 border-gray-600/50 text-gray-300 hover:border-purple-500 hover:bg-purple-500/10'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>IA Search</span>
              </button>
            </div>

            {/* Section centre - Smart Filters */}
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-gray-400">Smart Filters :</div>

              {Object.entries(smartFilters).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => toggleSmartFilter(key as keyof typeof smartFilters)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    value
                      ? 'bg-[#7A52D1] text-white'
                      : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                  }`}
                >
                  {key === 'trendingUp' ? '📈 Trending' :
                    key === 'undervalued' ? '💎 Sous-évalué' :
                      key === 'whaleActivity' ? '🐋 Whale Alert' : '🆕 New'}
                </button>
              ))}
            </div>

            {/* Section droite - Fonctionnalités avancées */}
            <div className="flex items-center space-x-2">
              {/* Mode Immersif */}
              <button
                onClick={toggleImmersiveMode}
                className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 border text-sm ${
                  immersiveMode
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                    : 'bg-black/40 border-gray-600/50 text-gray-400 hover:border-purple-500/50'
                }`}
              >
                <Maximize2 className="w-4 h-4" />
                <span>Immersif</span>
              </button>

              {/* Social Feed */}
              <button
                onClick={() => setSocialFeed(!socialFeed)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 border text-sm ${
                  socialFeed
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'bg-black/40 border-gray-600/50 text-gray-400 hover:border-green-500/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Social</span>
              </button>

              {/* Densité de grille */}
              <select
                value={gridDensity}
                onChange={(e) => setGridDensity(e.target.value as 'compact' | 'normal' | 'spacious')}
                className="bg-black/40 border border-gray-600/50 rounded-xl px-3 py-2 text-white text-sm focus:border-[#7A52D1] focus:outline-none"
              >
                <option value="compact">Compact</option>
                <option value="normal">Normal</option>
                <option value="spacious">Spacieux</option>
              </select>

              {/* Live Updates */}
              <div className={`flex items-center space-x-1 px-3 py-2 rounded-xl border ${
                liveUpdates
                  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-gray-700/50 border-gray-600/50 text-gray-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${liveUpdates ? 'bg-red-400 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-sm">Live</span>
              </div>
            </div>
          </div>

          {/* Panneau de comparaison */}
          {compareMode && compareItems.length > 0 && (
            <div className="mt-4 p-4 bg-black/40 rounded-xl border border-blue-500/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Comparaison ({compareItems.length}/3)</h3>
                <button
                  onClick={() => {
                    setCompareItems([]);
                    setCompareMode(false);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Effacer tout
                </button>
              </div>
              <div className="flex space-x-3">
                {compareItems.map(itemId => {
                  const item = mockItems.find(i => i.id === itemId)
                  return item ? (
                    <div key={itemId} className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-2">
                      <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                      <span className="text-white text-sm">{item.name}</span>
                      <span className="text-[#7A52D1] text-sm font-bold">{formatPrice(item.price)}</span>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>

        {/* Panneau de contrôle avancé */}
        <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-indigo-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Contrôles Avancés</span>
            </h3>
            <div className="text-sm text-gray-400">
              {watchlist.length} dans la watchlist • {Object.keys(priceAlerts).length} alertes actives
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Effets de survol */}
            <button
              onClick={() => setHoverEffects(!hoverEffects)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                hoverEffects
                  ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-400'
                  : 'bg-gray-800/50 border border-gray-600/50 text-gray-400'
              }`}
            >
              <Shuffle className="w-5 h-5 mb-1" />
              <span className="text-xs">Effets</span>
            </button>

            {/* Historique des prix */}
            <button
              onClick={() => setShowPriceHistory(!showPriceHistory)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                showPriceHistory
                  ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                  : 'bg-gray-800/50 border border-gray-600/50 text-gray-400'
              }`}
            >
              📊
              <span className="text-xs">Graphiques</span>
            </button>

            {/* Recommandations IA */}
            <button
              onClick={() => setAiRecommendations(!aiRecommendations)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                aiRecommendations
                  ? 'bg-purple-500/20 border border-purple-500/40 text-purple-400'
                  : 'bg-gray-800/50 border border-gray-600/50 text-gray-400'
              }`}
            >
              <Bot className="w-5 h-5 mb-1" />
              <span className="text-xs">IA</span>
            </button>

            {/* Auto-refresh */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                autoRefresh
                  ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                  : 'bg-gray-800/50 border border-gray-600/50 text-gray-400'
              }`}
            >
              🔄
              <span className="text-xs">Auto</span>
            </button>

            {/* Mode sombre */}
            <button
              onClick={() => toggleDarkMode()}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400'
                  : 'bg-gray-800/50 border border-gray-600/50 text-gray-400'
              }`}
            >
              {darkMode ? '🌙' : '☀️'}
              <span className="text-xs">Thème</span>
            </button>

            {/* Watchlist */}
            <button
              onClick={() => {/* Ouvrir la watchlist */}}
              className="flex flex-col items-center p-3 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 transition-all duration-300 hover:scale-105"
            >
              <Star className="w-5 h-5 mb-1" />
              <span className="text-xs">{watchlist.length}</span>
            </button>
          </div>

          {/* Recommandations IA */}
          {aiRecommendations && (
            <div className="mt-4 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-medium text-sm">Recommandations IA</span>
              </div>
              <div className="text-white text-sm">
                <span className="text-green-400">●</span> <strong>Ashes Genesis #0003</strong> - Tendance haussière détectée (+15% prévu)
                <br />
                <span className="text-yellow-400">●</span> <strong>Phygital Artifact #0008</strong> - Volume inhabituel, surveiller
                <br />
                <span className="text-blue-400">●</span> <strong>Ultra Power Core</strong> - Collection sous-évaluée selon nos modèles
              </div>
            </div>
          )}
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
                  <option value="Ashes Genesis">Ashes Genesis</option>
                  <option value="Ashes Apex">Ashes Apex</option>
                  <option value="Phygital Artifacts">Phygital Artifacts</option>
                  <option value="Cypherpunk Revolution">Cypherpunk Revolution</option>
                  <option value="Ultra Apes Collection">Ultra Apes Collection</option>
                  <option value="Ultra Power Core">Ultra Power Core</option>
                  <option value="Freedom Gamers">Freedom Gamers</option>
                  <option value="The Counsellor">The Counsellor</option>
                  <option value="Ultra Boat Collection">Ultra Boat Collection</option>
                  <option value="Ultra Clothes Collection">Ultra Clothes Collection</option>
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
          <div className={`grid ${getGridClass()}`}>
            {currentItems.map(item => (
              <div
                key={item.id}
                className={`group relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 transform-gpu ${
                  hoverEffects
                    ? 'hover:border-[#7A52D1]/70 hover:shadow-2xl hover:shadow-[#7A52D1]/30 hover:scale-105 hover:-translate-y-2 hover:z-10'
                    : 'hover:border-[#7A52D1]/40 hover:scale-105'
                } ${
                  compareItems.includes(item.id)
                    ? 'border-blue-500/70 ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/30'
                    : 'border-[#7A52D1]/20'
                } ${
                  watchlist.includes(item.id)
                    ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-900/10 to-black/40 shadow-lg shadow-yellow-500/20'
                    : ''
                } ${
                  priceAlerts[item.id]
                    ? 'border-orange-500/50 bg-gradient-to-br from-orange-900/10 to-black/40 shadow-lg shadow-orange-500/20'
                    : ''
                } ${
                  immersiveMode ? 'hover:shadow-3xl hover:shadow-[#7A52D1]/50' : ''
                }`}
                onClick={() => handleItemClick(item)}
              >
                {/* Image et badges */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-all duration-700 filter ${
                      hoverEffects
                        ? 'group-hover:scale-120 group-hover:brightness-110 group-hover:contrast-110'
                        : 'group-hover:scale-110'
                    } ${
                      view3D ? 'animate-spin-slow' : ''
                    } ${
                      immersiveMode ? 'group-hover:saturate-150' : ''
                    }`}
                    style={{
                      transform: view3D
                        ? `perspective(1000px) rotateY(${(rotationAngle[item.id] || 0) + (Date.now() / 50) % 360}deg)`
                        : rotationAngle[item.id]
                        ? `perspective(1000px) rotateY(${rotationAngle[item.id]}deg)`
                        : undefined,
                      animation: view3D ? 'rotate360 8s linear infinite' : undefined
                    }}
                  />

                  {/* AR Preview Overlay */}
                  {arPreview === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                        <div className="text-sm font-bold">Mode AR Activé</div>
                        <div className="text-xs">Prévisualisation en cours...</div>
                      </div>
                    </div>
                  )}

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
                    {compareItems.includes(item.id) && (
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                        <GitCompare className="w-3 h-3 mr-1" />
                        COMPARE
                      </span>
                    )}
                  </div>

                  {/* Actions modernes */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    {/* Favoris */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(item.id, e)
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:rotate-12 ${
                        favorites.includes(item.id)
                          ? 'bg-red-500/80 text-white scale-110 animate-pulse'
                          : 'bg-black/50 text-gray-300 hover:text-red-400 hover:scale-110'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    {/* Bouton Comparaison */}
                    {compareMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCompareItem(item.id)
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          compareItems.includes(item.id)
                            ? 'bg-blue-500/80 text-white scale-110'
                            : 'bg-black/50 text-gray-300 hover:text-blue-400 hover:scale-110'
                        }`}
                      >
                        <GitCompare className="w-4 h-4" />
                      </button>
                    )}

                    {/* Rotation 3D */}
                    {view3D && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          rotateNFT(item.id)
                        }}
                        className="p-2 rounded-full backdrop-blur-sm bg-black/50 text-gray-300 hover:text-purple-400 hover:scale-110 transition-all duration-300"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}

                    {/* AR Preview */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        launchARPreview(item.id)
                      }}
                      className="p-2 rounded-full backdrop-blur-sm bg-black/50 text-gray-300 hover:text-pink-400 hover:scale-110 transition-all duration-300"
                    >
                      <Camera className="w-4 h-4" />
                    </button>

                    {/* Watchlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatchlist(item.id, e)
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:rotate-12 ${
                        watchlist.includes(item.id)
                          ? 'bg-yellow-500/80 text-white scale-110 animate-bounce'
                          : 'bg-black/50 text-gray-300 hover:text-yellow-400 hover:scale-110'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>

                    {/* Alerte Prix */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPriceAlert(item.id, item.price * 0.9) // Alerte 10% en dessous
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        priceAlerts[item.id]
                          ? 'bg-orange-500/80 text-white scale-110'
                          : 'bg-black/50 text-gray-300 hover:text-orange-400 hover:scale-110'
                      }`}
                    >
                      🔔
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
                        <div className={`text-xs font-medium ${
                          item.price > item.lastSalePrice ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {item.price > item.lastSalePrice ? '📈' : '📉'}
                          {((item.price - item.lastSalePrice) / item.lastSalePrice * 100).toFixed(1)}%
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mini graphique de prix (si activé) */}
                  {showPriceHistory && item.priceHistory.length > 0 && (
                    <div className="mb-3 p-2 bg-gray-800/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Historique 30j</div>
                      <div className="flex items-end space-x-1 h-8">
                        {item.priceHistory.map((price, index) => (
                          <div
                            key={index}
                            className="bg-[#7A52D1] rounded-sm flex-1 transition-all duration-300"
                            style={{
                              height: `${(price.price / Math.max(...item.priceHistory.map(p => p.price))) * 100}%`,
                              minHeight: '2px'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

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
            {currentItems.map(item => (
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

        {/* Feed Social et Activité en Temps Réel */}
        {socialFeed && (
          <div className="mt-12 mb-8">
            <div className="bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-white">Activité Live</h3>
                  <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded-lg">En Direct</span>
                </div>
                <button
                  onClick={() => setSocialFeed(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="text-sm">Masquer</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Whale Activity */}
                <div className="bg-black/40 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">🐋</span>
                    <span className="text-blue-400 font-semibold">Whale Alert</span>
                  </div>
                  <div className="text-white text-sm">
                    <strong>CryptoWhale92</strong> vient d'acheter <strong>Ashes Genesis #0001</strong> pour <span className="text-[#7A52D1] font-bold">634.80 UOS</span>
                  </div>
                  <div className="text-gray-400 text-xs mt-2">Il y a 30 secondes</div>
                </div>

                {/* Trending Collection */}
                <div className="bg-black/40 rounded-xl p-4 border border-red-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">📈</span>
                    <span className="text-red-400 font-semibold">Trending</span>
                  </div>
                  <div className="text-white text-sm">
                    <strong>Phygital Artifacts</strong> explose ! +45% de volume en 1h
                  </div>
                  <div className="text-gray-400 text-xs mt-2">Tendance confirmée</div>
                </div>

                {/* New Listing */}
                <div className="bg-black/40 rounded-xl p-4 border border-green-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">🆕</span>
                    <span className="text-green-400 font-semibold">Nouveau Listing</span>
                  </div>
                  <div className="text-white text-sm">
                    <strong>UltraArtist</strong> a listé <strong>Cypherpunk Revolutionary #0015</strong> pour <span className="text-[#7A52D1] font-bold">234.8 UOS</span>
                  </div>
                  <div className="text-gray-400 text-xs mt-2">Il y a 1 minute</div>
                </div>
              </div>

              {/* Suggestions IA */}
              <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">IA Insights</span>
                </div>
                <div className="text-white text-sm">
                  Basé sur votre activité, nous recommandons : <strong>Ultra Power Core #0005</strong> - potentiel de +25% sous-évalué selon nos algorithmes.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-12 space-y-4 pb-8">
            {/* Info pagination */}
            <div className="text-gray-400 text-sm">
              Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} items
            </div>

            {/* Boutons pagination */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>

              {/* Pages numérotées */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;
                const shouldShow = pageNumber === 1 ||
                                  pageNumber === totalPages ||
                                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                if (!shouldShow) {
                  // Afficher des points de suspension
                  if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return (
                      <span key={`ellipsis-${pageNumber}`} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-4 py-2 rounded-xl transition-colors border ${
                      isCurrentPage
                        ? 'bg-[#7A52D1] border-[#7A52D1] text-white'
                        : 'bg-gray-800/50 border-gray-600/50 text-gray-400 hover:text-white hover:border-[#7A52D1]'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MarketplacePage