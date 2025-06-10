import React, { useState } from 'react'
import { Search, Filter, Calendar, ArrowUpDown, TrendingUp, TrendingDown, ExternalLink, Clock, Users, DollarSign, Activity } from 'lucide-react'
import TransactionModal from '../components/TransactionModal'

interface TransactionsPageProps {
  onNavigate: (page: string) => void
}

interface Transaction {
  id: string
  type: 'purchase' | 'sale' | 'transfer' | 'mint' | 'listing'
  item: {
    name: string
    collection: string
    image: string
    uniqId: string
    serialNumber: string
  }
  price: {
    amount: number
    currency: 'UOS'
    usd: number
  }
  participants: {
    from: string
    to: string
  }
  timestamp: string
  txHash: string
  status: 'completed' | 'pending' | 'failed'
}

const TransactionsPage = ({ onNavigate }: TransactionsPageProps) => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [filterType, setFilterType] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mock data avec plus de variété
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'purchase',
      item: {
        name: 'Ultra Power #3847',
      collection: "Ultra's Power Collection",
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        uniqId: '3847',
        serialNumber: '28/100'
      },
      price: { amount: 245.50, currency: 'UOS', usd: 2455 },
      participants: { from: 'ultramarket', to: 'cryptoking92' },
      timestamp: '2024-01-15T14:30:00Z',
      txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      status: 'completed'
    },
    {
      id: '2',
      type: 'sale',
      item: {
        name: 'Cosmic Warrior #1205',
        collection: 'Cosmic Warriors',
        image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop',
        uniqId: '1205',
        serialNumber: '67/500'
      },
      price: { amount: 189.20, currency: 'UOS', usd: 1892 },
      participants: { from: 'spaceexplorer', to: 'nftcollector' },
      timestamp: '2024-01-15T13:45:00Z',
      txHash: '0x2b3c4d5e6f7890abcdef1a',
      status: 'completed'
    },
    {
      id: '3',
      type: 'transfer',
      item: {
        name: 'Digital Legend #892',
        collection: 'Digital Legends',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
        uniqId: '892',
        serialNumber: '12/750'
      },
      price: { amount: 0, currency: 'UOS', usd: 0 },
      participants: { from: 'legendhunter', to: 'gamermaster' },
      timestamp: '2024-01-15T12:20:00Z',
      txHash: '0x3c4d5e6f7890abcdef1a2b',
      status: 'completed'
    },
    {
      id: '4',
      type: 'listing',
      item: {
        name: 'Cyber Punk #4561',
        collection: 'Cyber Punks Elite',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
        uniqId: '4561',
        serialNumber: '89/300'
      },
      price: { amount: 320.00, currency: 'UOS', usd: 3200 },
      participants: { from: 'cybercollector', to: 'marketplace' },
      timestamp: '2024-01-15T11:15:00Z',
      txHash: '0x4d5e6f7890abcdef1a2b3c',
      status: 'pending'
    },
    {
      id: '5',
      type: 'mint',
      item: {
        name: 'Mystic Creature #2398',
        collection: 'Mystic Creatures',
        image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop',
        uniqId: '2398',
        serialNumber: '1/1000'
      },
      price: { amount: 50.00, currency: 'UOS', usd: 500 },
      participants: { from: 'mysticarts', to: 'fantasyfan' },
      timestamp: '2024-01-15T10:00:00Z',
      txHash: '0x5e6f7890abcdef1a2b3c4d',
      status: 'completed'
    }
  ]

  const tabs = [
    { id: 'all', label: 'Toutes', count: mockTransactions.length },
    { id: 'purchases', label: 'Achats', count: mockTransactions.filter(t => t.type === 'purchase').length },
    { id: 'sales', label: 'Ventes', count: mockTransactions.filter(t => t.type === 'sale').length },
    { id: 'transfers', label: 'Transferts', count: mockTransactions.filter(t => t.type === 'transfer').length },
    { id: 'listings', label: 'Mises en vente', count: mockTransactions.filter(t => t.type === 'listing').length }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <TrendingUp className="w-4 h-4" />
      case 'sale': return <TrendingDown className="w-4 h-4" />
      case 'transfer': return <Users className="w-4 h-4" />
      case 'listing': return <DollarSign className="w-4 h-4" />
      case 'mint': return <Activity className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'bg-green-600/20 text-green-400 border-green-400/30'
      case 'sale': return 'bg-blue-600/20 text-blue-400 border-blue-400/30'
      case 'transfer': return 'bg-gray-600/20 text-gray-400 border-gray-400/30'
      case 'listing': return 'bg-[#7A52D1]/20 text-[#7A52D1] border-[#7A52D1]/30'
      case 'mint': return 'bg-orange-600/20 text-orange-400 border-orange-400/30'
      default: return 'bg-gray-600/20 text-gray-400 border-gray-400/30'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase': return 'ACHAT'
      case 'sale': return 'VENTE'
      case 'transfer': return 'TRANSFERT'
      case 'listing': return 'MISE EN VENTE'
      case 'mint': return 'MINT'
      default: return type.toUpperCase()
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (amount: number) => {
    if (amount === 0) return 'Gratuit'
    return `${amount.toFixed(2)} UOS`
  }

  const openTransactionModal = (transaction: Transaction) => {
    // Convertir les données pour la modale
    const modalTransaction = {
      id: transaction.id,
      type: getTypeLabel(transaction.type) as 'ACHAT' | 'VENTE' | 'TRANSFERT' | 'LISTING' | 'MINT',
      status: transaction.status === 'completed' ? 'Terminé' as const : 
              transaction.status === 'pending' ? 'En cours' as const : 'Échoué' as const,
      item: transaction.item.name,
      collection: transaction.item.collection,
      price: transaction.price.amount,
      priceUSD: transaction.price.usd,
      from: transaction.participants.from,
      to: transaction.participants.to,
      date: formatDate(transaction.timestamp),
      hash: transaction.txHash,
      blockNumber: Math.floor(Math.random() * 1000000) + 500000,
      gasUsed: Math.floor(Math.random() * 50000) + 21000,
      gasPrice: Math.random() * 0.1 + 0.01,
      image: transaction.item.image,
      attributes: [
        { trait_type: 'Uniq ID', value: transaction.item.uniqId },
        { trait_type: 'Serial Number', value: transaction.item.serialNumber },
        { trait_type: 'Collection', value: transaction.item.collection }
      ]
    }
    
    setSelectedTransaction(modalTransaction)
    setIsModalOpen(true)
  }

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.item.collection.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || transaction.type === filterType
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'purchases' && transaction.type === 'purchase') ||
                       (activeTab === 'sales' && transaction.type === 'sale') ||
                       (activeTab === 'transfers' && transaction.type === 'transfer') ||
                       (activeTab === 'listings' && transaction.type === 'listing')
    
    return matchesSearch && matchesType && matchesTab
  })

  // Stats summary
  const totalVolume = mockTransactions.reduce((sum, t) => sum + t.price.amount, 0)
  const totalTransactions = mockTransactions.length
  const avgPrice = totalVolume / totalTransactions

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#7A52D1]/10 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7A52D1]/20 via-blue-600/20 to-[#7A52D1]/20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Historique des Transactions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Suivez toutes les activités et transactions sur le marketplace Ultra
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#7A52D1]/20 rounded-xl p-3">
                  <Activity className="w-6 h-6 text-[#7A52D1]" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Transactions</h3>
              <p className="text-2xl font-bold text-white">{totalTransactions}</p>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-600/20 rounded-xl p-3">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Volume Total</h3>
              <p className="text-2xl font-bold text-white">{formatPrice(totalVolume)}</p>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-600/20 rounded-xl p-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Prix Moyen</h3>
              <p className="text-2xl font-bold text-white">{formatPrice(avgPrice)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        {/* Onglets */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-2 mb-8 border border-[#7A52D1]/20">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
          <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  activeTab === tab.id
                    ? 'bg-[#7A52D1] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-700'
                }`}>
                  {tab.count}
                </span>
          </button>
            ))}
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#7A52D1]/20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom ou collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#7A52D1] focus:outline-none transition-colors"
              />
            </div>

            {/* Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-[#7A52D1] focus:outline-none"
            >
              <option value="all">Tous les types</option>
              <option value="purchase">Achats</option>
              <option value="sale">Ventes</option>
              <option value="transfer">Transferts</option>
              <option value="listing">Mises en vente</option>
              <option value="mint">Mints</option>
            </select>

            {/* Période */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-[#7A52D1] focus:outline-none"
            >
              <option value="all">Toutes les périodes</option>
              <option value="24h">Dernières 24h</option>
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
            </select>

            {/* Tri */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-[#7A52D1] focus:outline-none"
            >
              <option value="recent">Plus récent</option>
              <option value="oldest">Plus ancien</option>
              <option value="price_high">Prix décroissant</option>
              <option value="price_low">Prix croissant</option>
            </select>
          </div>
        </div>

        {/* Liste des transactions */}
        <div className="space-y-4">
          {filteredTransactions.map(transaction => (
            <div 
              key={transaction.id} 
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 cursor-pointer"
              onClick={() => openTransactionModal(transaction)}
            >
              <div className="flex items-center space-x-6">
                {/* Image */}
                <img
                  src={transaction.item.image}
                  alt={transaction.item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                
                {/* Infos principales */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`flex items-center space-x-2 px-3 py-1 rounded-lg border text-sm font-medium ${getTypeColor(transaction.type)}`}>
                      {getTypeIcon(transaction.type)}
                      <span>{getTypeLabel(transaction.type)}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                      transaction.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {transaction.status === 'completed' ? 'Terminé' :
                       transaction.status === 'pending' ? 'En cours' : 'Échoué'}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-white mb-1">{transaction.item.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{transaction.item.collection}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>ID: {transaction.item.uniqId}</span>
                    <span>•</span>
                    <span>Serial: {transaction.item.serialNumber}</span>
                    <span>•</span>
                    <span>{formatDate(transaction.timestamp)}</span>
                  </div>
                </div>
                
                {/* Prix */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#7A52D1] mb-1">
                    {formatPrice(transaction.price.amount)}
                  </p>
                  {transaction.price.usd > 0 && (
                    <p className="text-gray-400 text-sm">${transaction.price.usd}</p>
                  )}
                </div>
                
                {/* Participants */}
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#7A52D1] to-blue-600 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white text-xs font-bold">
                        {transaction.participants.from.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate w-16">{transaction.participants.from}</p>
                  </div>
                  
                  <ArrowUpDown className="w-4 h-4 text-gray-400 rotate-90" />
                  
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white text-xs font-bold">
                        {transaction.participants.to.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate w-16">{transaction.participants.to}</p>
                  </div>
                </div>

                {/* Hash de transaction */}
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-[#7A52D1] transition-colors">
                    <span className="text-xs font-mono">{transaction.txHash.slice(0, 8)}...</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors">
              Précédent
            </button>
            <button className="px-4 py-2 bg-[#7A52D1] border border-[#7A52D1] rounded-xl text-white">
              1
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors">
              3
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-400 hover:text-white hover:border-[#7A52D1] transition-colors">
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default TransactionsPage