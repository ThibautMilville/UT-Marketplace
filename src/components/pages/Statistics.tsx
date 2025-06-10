import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, BarChart3, PieChart, Calendar, Filter, Download, RefreshCw, Eye, Heart, Zap, Award, Crown, Flame } from 'lucide-react'
import TransactionModal from '../TransactionModal'

interface StatisticsPageProps {
  onNavigate: (page: string, data?: any) => void
}

const StatisticsPage = ({ onNavigate }: StatisticsPageProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChart, setSelectedChart] = useState('volume')
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)

  // Données mockées complètes selon la période
  const getGlobalStats = () => {
    const statsData = {
      '24h': {
        totalVolume: 98750.25,
        totalVolumeChange: 15.3,
        totalTransactions: 369,
        transactionsChange: 12.7,
        activeUsers: 1247,
        usersChange: 8.9,
        averagePrice: 267.80,
        priceChange: 5.2,
        totalCollections: 45,
        collectionsChange: 2.1,
        floorPrice: 125.50,
        floorPriceChange: 3.8
      },
      '7d': {
        totalVolume: 1316200.75,
        totalVolumeChange: 12.5,
        totalTransactions: 4791,
        transactionsChange: 8.3,
        activeUsers: 8456,
        usersChange: 15.7,
        averagePrice: 274.60,
        priceChange: -2.1,
        totalCollections: 156,
        collectionsChange: 5.1,
        floorPrice: 89.50,
        floorPriceChange: 7.8
      },
      '30d': {
        totalVolume: 5705500.50,
        totalVolumeChange: 18.7,
        totalTransactions: 20567,
        transactionsChange: 22.4,
        activeUsers: 15678,
        usersChange: 28.3,
        averagePrice: 277.50,
        priceChange: 1.2,
        totalCollections: 234,
        collectionsChange: 12.8,
        floorPrice: 95.75,
        floorPriceChange: 15.2
      },
      '90d': {
        totalVolume: 25678901.25,
        totalVolumeChange: 35.8,
        totalTransactions: 92456,
        transactionsChange: 41.2,
        activeUsers: 34567,
        usersChange: 45.6,
        averagePrice: 277.80,
        priceChange: 0.1,
        totalCollections: 456,
        collectionsChange: 28.9,
        floorPrice: 78.25,
        floorPriceChange: -18.3
      },
      '1y': {
        totalVolume: 104567890.75,
        totalVolumeChange: 127.4,
        totalTransactions: 378901,
        transactionsChange: 156.8,
        activeUsers: 89012,
        usersChange: 234.5,
        averagePrice: 275.90,
        priceChange: -0.7,
        totalCollections: 789,
        collectionsChange: 89.2,
        floorPrice: 65.40,
        floorPriceChange: -27.1
      }
    }
    return statsData[selectedPeriod as keyof typeof statsData] || statsData['7d']
  }

  const globalStats = getGlobalStats()

  const volumeData = {
    '24h': [
      { time: '00:00', volume: 125000, transactions: 45 },
      { time: '04:00', volume: 89000, transactions: 32 },
      { time: '08:00', volume: 156000, transactions: 58 },
      { time: '12:00', volume: 234000, transactions: 87 },
      { time: '16:00', volume: 189000, transactions: 69 },
      { time: '20:00', volume: 212000, transactions: 78 }
    ],
    '7d': [
      { time: 'Lun', volume: 1456000, transactions: 523 },
      { time: 'Mar', volume: 1894000, transactions: 687 },
      { time: 'Mer', volume: 1678000, transactions: 612 },
      { time: 'Jeu', volume: 2035000, transactions: 745 },
      { time: 'Ven', volume: 2347000, transactions: 856 },
      { time: 'Sam', volume: 1983000, transactions: 723 },
      { time: 'Dim', volume: 1769000, transactions: 645 }
    ],
    '30d': [
      { time: 'S1', volume: 12456000, transactions: 4523 },
      { time: 'S2', volume: 13894000, transactions: 5087 },
      { time: 'S3', volume: 15678000, transactions: 5712 },
      { time: 'S4', volume: 17035000, transactions: 6245 }
    ],
    '90d': [
      { time: 'Jan', volume: 34567890, transactions: 12456 },
      { time: 'Fév', volume: 41234560, transactions: 15678 },
      { time: 'Mar', volume: 37891230, transactions: 13245 },
      { time: 'Avr', volume: 45678900, transactions: 17890 },
      { time: 'Mai', volume: 52345670, transactions: 19234 },
      { time: 'Juin', volume: 48901230, transactions: 16789 }
    ],
    '1y': [
      { time: 'T1 2023', volume: 123456780, transactions: 45678 },
      { time: 'T2 2023', volume: 156789010, transactions: 56789 },
      { time: 'T3 2023', volume: 189012340, transactions: 67890 },
      { time: 'T4 2023', volume: 223456780, transactions: 78901 },
      { time: 'T1 2024', volume: 256789010, transactions: 89012 }
    ]
  }

  const getTopCollections = () => {
    const collectionsData = {
      '24h': [
        { 
          name: "Ultra's Power Collection", 
          volume: 12456.50, 
          change: 25.3, 
          floorPrice: 245.80, 
          items: 10000, 
          owners: 3456, 
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
          description: "Une collection exclusive d'avatars Ultra avec des pouvoirs uniques et des designs époustouflants.",
          banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=300&fit=crop',
          creator: 'UltraTeam',
          verified: true
        },
        { 
          name: "Cosmic Warriors", 
          volume: 8934.20, 
          change: 18.7, 
          floorPrice: 89.50, 
          items: 5000, 
          owners: 2134, 
          image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop',
          description: "Des guerriers cosmiques venus des confins de l'univers pour défendre la galaxie.",
          banner: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1200&h=300&fit=crop',
          creator: 'CosmicStudio',
          verified: true
        },
        { 
          name: "Digital Legends", 
          volume: 6789.80, 
          change: -5.1, 
          floorPrice: 156.90, 
          items: 7500, 
          owners: 2876, 
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
          description: "Les légendes du monde digital prennent vie dans cette collection épique.",
          banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=300&fit=crop',
          creator: 'DigitalArt',
          verified: false
        }
      ],
      '7d': [
        { name: "Ultra's Power Collection", volume: 456789.50, change: 15.3, floorPrice: 245.80, items: 10000, owners: 3456, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop' },
        { name: "Cosmic Warriors", volume: 234567.20, change: -8.7, floorPrice: 89.50, items: 5000, owners: 2134, image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop' },
        { name: "Digital Legends", volume: 189432.80, change: 23.1, floorPrice: 156.90, items: 7500, owners: 2876, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop' },
        { name: "Mystic Creatures", volume: 145678.30, change: 5.4, floorPrice: 43.20, items: 15000, owners: 4567, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop' },
        { name: "Cyber Punks Elite", volume: 123456.70, change: 18.9, floorPrice: 198.40, items: 3000, owners: 1876, image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=100&h=100&fit=crop' }
      ],
      '30d': [
        { name: "Ultra's Power Collection", volume: 1456789.50, change: 35.8, floorPrice: 245.80, items: 10000, owners: 3456, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop' },
        { name: "Digital Legends", volume: 1189432.80, change: 42.1, floorPrice: 156.90, items: 7500, owners: 2876, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop' },
        { name: "Cosmic Warriors", volume: 934567.20, change: 12.3, floorPrice: 89.50, items: 5000, owners: 2134, image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop' },
        { name: "Cyber Punks Elite", volume: 723456.70, change: 28.9, floorPrice: 198.40, items: 3000, owners: 1876, image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=100&h=100&fit=crop' },
        { name: "Mystic Creatures", volume: 645678.30, change: -15.4, floorPrice: 43.20, items: 15000, owners: 4567, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop' }
      ],
      '90d': [
        { name: "Digital Legends", volume: 4189432.80, change: 67.1, floorPrice: 156.90, items: 7500, owners: 2876, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop' },
        { name: "Ultra's Power Collection", volume: 3456789.50, change: 45.8, floorPrice: 245.80, items: 10000, owners: 3456, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop' },
        { name: "Cyber Punks Elite", volume: 2723456.70, change: 89.2, floorPrice: 198.40, items: 3000, owners: 1876, image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=100&h=100&fit=crop' },
        { name: "Cosmic Warriors", volume: 1934567.20, change: -23.7, floorPrice: 89.50, items: 5000, owners: 2134, image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop' },
        { name: "Mystic Creatures", volume: 1245678.30, change: 34.6, floorPrice: 43.20, items: 15000, owners: 4567, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop' }
      ],
      '1y': [
        { name: "Digital Legends", volume: 18189432.80, change: 234.1, floorPrice: 156.90, items: 7500, owners: 2876, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop' },
        { name: "Cyber Punks Elite", volume: 15723456.70, change: 456.2, floorPrice: 198.40, items: 3000, owners: 1876, image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=100&h=100&fit=crop' },
        { name: "Ultra's Power Collection", volume: 12456789.50, change: 178.8, floorPrice: 245.80, items: 10000, owners: 3456, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop' },
        { name: "Mystic Creatures", volume: 8245678.30, change: 123.4, floorPrice: 43.20, items: 15000, owners: 4567, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop' },
        { name: "Cosmic Warriors", volume: 6934567.20, change: 67.3, floorPrice: 89.50, items: 5000, owners: 2134, image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop' }
      ]
    }
    return collectionsData[selectedPeriod as keyof typeof collectionsData] || collectionsData['7d']
  }

  const topCollections = getTopCollections()

  const categoryData = [
    { name: 'Gaming', volume: 1234567, percentage: 35, color: '#7A52D1' },
    { name: 'Art', volume: 987654, percentage: 28, color: '#3B82F6' },
    { name: 'Collectibles', volume: 654321, percentage: 18, color: '#10B981' },
    { name: 'Music', volume: 432109, percentage: 12, color: '#F59E0B' },
    { name: 'Sports', volume: 234567, percentage: 7, color: '#EF4444' }
  ]

  const recentActivity = [
    {
      id: '1',
      type: 'VENTE' as const,
      status: 'Terminé' as const,
      item: 'Ultra Power Genesis #3847',
      collection: "Ultra's Power Collection",
      price: 245.50,
      priceUSD: 245.50 * 1.2,
      from: 'ultrawhale92',
      to: 'cryptoking',
      date: new Date(Date.now() - 2 * 60 * 1000).toLocaleDateString('fr-FR'),
      time: '2 min',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=50&h=50&fit=crop',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      blockNumber: 18456789,
      gasUsed: 21000,
      gasPrice: 25.5,
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      type: 'LISTING' as const,
      status: 'Terminé' as const,
      item: 'Cosmic Warrior Elite #1205',
      collection: 'Cosmic Warriors',
      price: 89.75,
      priceUSD: 89.75 * 1.2,
      from: 'spacehunter',
      date: new Date(Date.now() - 5 * 60 * 1000).toLocaleDateString('fr-FR'),
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=50&h=50&fit=crop',
      hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      blockNumber: 18456788,
      gasUsed: 18500,
      gasPrice: 22.3,
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      type: 'ACHAT' as const,
      status: 'Terminé' as const,
      item: 'Digital Legend Rare #892',
      collection: 'Digital Legends',
      price: 156.80,
      priceUSD: 156.80 * 1.2,
      from: 'bidmaster',
      to: 'collector_pro',
      date: new Date(Date.now() - 8 * 60 * 1000).toLocaleDateString('fr-FR'),
      time: '8 min',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=50&h=50&fit=crop',
      hash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
      blockNumber: 18456787,
      gasUsed: 19200,
      gasPrice: 28.1,
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      type: 'VENTE' as const,
      status: 'Terminé' as const,
      item: 'Mystic Creature #2398',
      collection: 'Mystic Creatures',
      price: 43.90,
      priceUSD: 43.90 * 1.2,
      from: 'mysticholder',
      to: 'collector99',
      date: new Date(Date.now() - 12 * 60 * 1000).toLocaleDateString('fr-FR'),
      time: '12 min',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=50&h=50&fit=crop',
      hash: '0x4d5e6f7890abcdef1234567890abcdef12345678',
      blockNumber: 18456786,
      gasUsed: 21000,
      gasPrice: 24.7,
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      type: 'LISTING' as const,
      status: 'Terminé' as const,
      item: 'Cyber Punk Elite #567',
      collection: 'Cyber Punks Elite',
      price: 198.40,
      priceUSD: 198.40 * 1.2,
      from: 'cyberpunk',
      date: new Date(Date.now() - 15 * 60 * 1000).toLocaleDateString('fr-FR'),
      time: '15 min',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=50&h=50&fit=crop',
      hash: '0x5e6f7890abcdef1234567890abcdef1234567890',
      blockNumber: 18456785,
      gasUsed: 17800,
      gasPrice: 26.9,
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    }
  ]

  const formatPrice = (price: number) => `${price.toLocaleString()} UOS`
  const formatUSD = (price: number) => `$${price.toLocaleString()}`
  const formatChange = (change: number) => `${change > 0 ? '+' : ''}${change.toFixed(1)}%`

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleCollectionClick = (collection: any) => {
    onNavigate('collection-detail', collection)
  }

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionModalOpen(true)
  }

  const getCurrentData = () => volumeData[selectedPeriod as keyof typeof volumeData] || volumeData['7d']
  const maxVolume = Math.max(...getCurrentData().map(d => d.volume))
  const maxTransactions = Math.max(...getCurrentData().map(d => d.transactions))

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
        
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Statistiques du Marketplace
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Analysez les tendances, suivez les performances et découvrez les insights du marché Ultra
            </p>
          </div>


        </div>
      </div>

      <div className="container mx-auto px-6 pb-16 -mt-8">
        {/* Contrôles */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex bg-gray-800/50 rounded-xl border border-gray-600/50 overflow-hidden">
              {['24h', '7d', '30d', '90d', '1y'].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-[#7A52D1] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={refreshData}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-300 hover:text-white hover:border-[#7A52D1] transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 transition-transform ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Actualisation...' : 'Actualiser'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#7A52D1] hover:bg-[#6A42C1] text-white rounded-xl transition-colors">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Métriques globales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#7A52D1]/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-[#7A52D1]" />
              </div>
              <div className={`flex items-center text-sm ${globalStats.totalVolumeChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {globalStats.totalVolumeChange > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {formatChange(globalStats.totalVolumeChange)}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatPrice(globalStats.totalVolume)}</div>
            <div className="text-sm text-gray-400">Volume Total</div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div className={`flex items-center text-sm ${globalStats.transactionsChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {globalStats.transactionsChange > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {formatChange(globalStats.transactionsChange)}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{globalStats.totalTransactions.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Transactions</div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div className={`flex items-center text-sm ${globalStats.usersChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {globalStats.usersChange > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {formatChange(globalStats.usersChange)}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{globalStats.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Utilisateurs Actifs</div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
              <div className={`flex items-center text-sm ${globalStats.priceChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {globalStats.priceChange > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {formatChange(globalStats.priceChange)}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatPrice(globalStats.averagePrice)}</div>
            <div className="text-sm text-gray-400">Prix Moyen</div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-purple-400" />
              </div>
              <div className={`flex items-center text-sm ${globalStats.collectionsChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {globalStats.collectionsChange > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {formatChange(globalStats.collectionsChange)}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{globalStats.totalCollections}</div>
            <div className="text-sm text-gray-400">Collections</div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-500/20 rounded-xl">
                <Award className="w-6 h-6 text-pink-400" />
              </div>
              <div className={`flex items-center text-sm ${globalStats.floorPriceChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {globalStats.floorPriceChange > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {formatChange(globalStats.floorPriceChange)}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatPrice(globalStats.floorPrice)}</div>
            <div className="text-sm text-gray-400">Floor Price</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Graphique de volume */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Analyse des Données</h3>
              <div className="flex bg-gray-800/50 rounded-xl overflow-hidden border border-gray-600/30">
                <button
                  onClick={() => setSelectedChart('volume')}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                    selectedChart === 'volume' 
                      ? 'bg-gradient-to-r from-[#7A52D1] to-blue-500 text-white shadow-lg shadow-[#7A52D1]/25' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span>💰</span>
                  <span>Volume</span>
                </button>
                <button
                  onClick={() => setSelectedChart('transactions')}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                    selectedChart === 'transactions' 
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg shadow-green-500/25' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span>📊</span>
                  <span>Transactions</span>
                </button>
              </div>
            </div>
            
            <div className="h-64 flex items-end space-x-2">
              {getCurrentData().map((data, index) => {
                const value = selectedChart === 'volume' ? data.volume : data.transactions
                const maxValue = selectedChart === 'volume' ? maxVolume : maxTransactions
                const height = (value / maxValue) * 100
                
                return (
                  <div key={`${selectedChart}-${index}`} className="flex-1 flex flex-col items-center group">
                    <div className="w-full bg-gray-800/50 rounded-t-lg relative overflow-hidden hover:bg-gray-700/50 transition-colors duration-300" style={{ height: '200px' }}>
                      <div 
                        className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ease-out transform hover:scale-105 ${
                          selectedChart === 'volume' 
                            ? 'bg-gradient-to-t from-[#7A52D1] via-[#8B5FE6] to-blue-400' 
                            : 'bg-gradient-to-t from-green-500 via-emerald-400 to-teal-400'
                        }`}
                        style={{ 
                          height: `${height}%`,
                          transitionDelay: `${index * 100}ms`
                        }}
                      ></div>
                      {/* Effet de brillance au hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 transition-all duration-500 group-hover:text-white">{data.time}</div>
                    <div className="text-xs text-white font-medium transition-all duration-500 group-hover:text-[#7A52D1] group-hover:scale-110">
                      {selectedChart === 'volume' ? formatPrice(value) : `${value.toLocaleString()} tx`}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Répartition par catégories */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <h3 className="text-xl font-bold text-white mb-6">Répartition par Catégories</h3>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-white font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-800/50 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                          transitionDelay: `${index * 100}ms`
                        }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm w-12">{category.percentage}%</span>
                    <span className="text-white font-medium w-24 text-right">{formatPrice(category.volume)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Graphiques supplémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Évolution des prix moyens */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <h3 className="text-xl font-bold text-white mb-6">Prix Moyens</h3>
            <div className="h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 300 150">
                <defs>
                  <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7A52D1" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#7A52D1" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path
                  d="M 0 120 Q 50 80 100 90 T 200 70 T 300 85"
                  stroke="#7A52D1"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M 0 120 Q 50 80 100 90 T 200 70 T 300 85 L 300 150 L 0 150 Z"
                  fill="url(#priceGradient)"
                  className="opacity-60"
                />
              </svg>
              <div className="absolute bottom-2 left-2 text-sm text-gray-400">
                Tendance haussière +12.5%
              </div>
            </div>
          </div>

          {/* Utilisateurs actifs */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <h3 className="text-xl font-bold text-white mb-6">Utilisateurs Actifs</h3>
            <div className="space-y-3">
              {[
                { period: 'Aujourd\'hui', count: 2847, change: 15.3 },
                { period: 'Cette semaine', count: 12456, change: 8.7 },
                { period: 'Ce mois', count: 45678, change: 23.1 }
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                  <div>
                    <div className="text-white font-medium">{stat.count.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">{stat.period}</div>
                  </div>
                  <div className={`flex items-center text-sm ${stat.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {formatChange(stat.change)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance du réseau */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <h3 className="text-xl font-bold text-white mb-6">Performance Réseau</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">TPS Moyen</span>
                <span className="text-white font-bold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Temps de bloc</span>
                <span className="text-white font-bold">0.5s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Gas moyen</span>
                <span className="text-white font-bold">25.3 Gwei</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Congestion réseau</span>
                  <span className="text-green-400 text-sm">Faible</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-2">
                  <div className="w-1/4 h-2 bg-green-400 rounded-full transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Collections */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Top Collections</h3>
              <button className="text-[#7A52D1] hover:text-[#6A42C1] text-sm font-medium">
                Voir tout
              </button>
            </div>
            
            <div className="space-y-4">
              {topCollections.map((collection, index) => (
                <div 
                  key={index} 
                  onClick={() => handleCollectionClick(collection)}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-800/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="relative">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#7A52D1] rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-medium">{collection.name}</div>
                      <div className="text-gray-400 text-sm">{collection.items.toLocaleString()} items • {collection.owners.toLocaleString()} propriétaires</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold">{formatPrice(collection.volume)}</div>
                    <div className="text-gray-400 text-sm">Floor: {formatPrice(collection.floorPrice)}</div>
                  </div>
                  
                  <div className={`flex items-center text-sm ${collection.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {collection.change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {formatChange(collection.change)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Activité Récente</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">En direct</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  onClick={() => handleTransactionClick(activity)}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-800/30 transition-colors cursor-pointer"
                >
                  <img 
                    src={activity.image} 
                    alt={activity.item}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        activity.type === 'VENTE' ? 'bg-green-500/20 text-green-400' :
                        activity.type === 'LISTING' ? 'bg-blue-500/20 text-blue-400' :
                        activity.type === 'ACHAT' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {activity.type}
                      </span>
                      <span className="text-white font-medium">{activity.item}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {(activity.type === 'VENTE' || activity.type === 'ACHAT') && activity.to ? `${activity.from} → ${activity.to}` : `par ${activity.from}`}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[#7A52D1] font-bold">{formatPrice(activity.price)}</div>
                    <div className="text-gray-400 text-sm">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modale de transaction */}
      {isTransactionModalOpen && selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => {
            setIsTransactionModalOpen(false)
            setSelectedTransaction(null)
          }}
        />
      )}
    </div>
  )
}

export default StatisticsPage 