import React from 'react'
import { X, ExternalLink, Copy, Check, User, Calendar, Hash, DollarSign, Activity, ArrowRight } from 'lucide-react'

interface Transaction {
  id: string
  type: 'ACHAT' | 'VENTE' | 'TRANSFERT' | 'LISTING' | 'MINT'
  status: 'Terminé' | 'En cours' | 'Échoué'
  item: string
  collection: string
  price: number
  priceUSD: number
  from: string
  to?: string
  date: string
  hash: string
  blockNumber: number
  gasUsed: number
  gasPrice: number
  image: string
  attributes?: Array<{ trait_type: string; value: string }>
}

interface TransactionModalProps {
  transaction: Transaction | null
  onClose: () => void
}

const TransactionModal = ({ transaction, onClose }: TransactionModalProps) => {
  const [copied, setCopied] = React.useState('')

  if (!transaction) return null

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'En cours': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Échoué': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ACHAT': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'VENTE': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'TRANSFERT': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'LISTING': return 'bg-[#7A52D1]/20 text-[#7A52D1] border-[#7A52D1]/30'
      case 'MINT': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const formatPrice = (price: number) => `${price.toFixed(2)} UOS`
  const formatUSD = (price: number) => `$${price.toLocaleString()}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-black/90 backdrop-blur-sm rounded-2xl border border-[#7A52D1]/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-white">Détails de la Transaction</h2>
            <div className={`px-3 py-1 rounded-lg text-sm font-bold border ${getStatusColor(transaction.status)}`}>
              {transaction.status}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* NFT Info */}
          <div className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-xl">
            <img 
              src={transaction.image} 
              alt={transaction.item}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{transaction.item}</h3>
              <p className="text-gray-400 mb-2">{transaction.collection}</p>
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-lg text-xs font-bold border ${getTypeColor(transaction.type)}`}>
                  {transaction.type}
                </div>
                <div className="text-[#7A52D1] font-bold text-lg">{formatPrice(transaction.price)}</div>
                <div className="text-gray-400">{formatUSD(transaction.priceUSD)}</div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Participants */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center">
                <User className="w-5 h-5 mr-2 text-[#7A52D1]" />
                Participants
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                  <div>
                    <div className="text-sm text-gray-400">De</div>
                    <div className="text-white font-medium">{transaction.from}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(transaction.from, 'from')}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    {copied === 'from' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>

                {transaction.to && (
                  <>
                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-[#7A52D1]" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                      <div>
                        <div className="text-sm text-gray-400">À</div>
                        <div className="text-white font-medium">{transaction.to}</div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(transaction.to!, 'to')}
                        className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        {copied === 'to' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Transaction Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-[#7A52D1]" />
                Informations
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Date</span>
                  </div>
                  <span className="text-white font-medium">{transaction.date}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Prix</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{formatPrice(transaction.price)}</div>
                    <div className="text-gray-400 text-sm">{formatUSD(transaction.priceUSD)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Block</span>
                  </div>
                  <span className="text-white font-medium">#{transaction.blockNumber.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center">
              <Hash className="w-5 h-5 mr-2 text-[#7A52D1]" />
              Détails Blockchain
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                <span className="text-gray-400">Hash de Transaction</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-mono text-sm">{transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}</span>
                  <button
                    onClick={() => copyToClipboard(transaction.hash, 'hash')}
                    className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                  >
                    {copied === 'hash' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                  <a
                    href={`https://explorer.ultra.io/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#7A52D1]" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                  <span className="text-gray-400">Gas Utilisé</span>
                  <span className="text-white font-medium">{transaction.gasUsed.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                  <span className="text-gray-400">Prix du Gas</span>
                  <span className="text-white font-medium">{transaction.gasPrice} UOS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attributes (if available) */}
          {transaction.attributes && transaction.attributes.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Attributs du NFT</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {transaction.attributes.map((attr, index) => (
                  <div key={index} className="p-3 bg-gray-800/30 rounded-xl">
                    <div className="text-xs text-gray-400 uppercase tracking-wide">{attr.trait_type}</div>
                    <div className="text-white font-medium">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700/50">
          <div className="text-sm text-gray-400">
            Transaction ID: {transaction.id}
          </div>
          <div className="flex space-x-3">
            <a
              href={`https://explorer.ultra.io/tx/${transaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-[#7A52D1] hover:bg-[#6A42C1] text-white rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Voir sur Explorer</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal 