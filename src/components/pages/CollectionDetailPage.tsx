import React, { useState, useEffect } from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, Users, Eye, Heart, Share2, Filter, Grid, List, Search } from 'lucide-react'
import ShareModal from '../ShareModal'

interface CollectionDetailPageProps {
  onNavigate: (page: string, data?: any) => void
  collectionData?: any
}

const CollectionDetailPage = ({ onNavigate, collectionData }: CollectionDetailPageProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('price_low')
  const [filterRarity, setFilterRarity] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  // Données mockées pour la collection
  const collection = collectionData || {
    name: "Ultra's Power Collection",
    description: "Une collection exclusive d'avatars Ultra avec des pouvoirs uniques et des designs époustouflants. Chaque NFT représente un héros unique dans l'univers Ultra.",
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=300&fit=crop',
    creator: 'UltraTeam',
    totalItems: 10000,
    owners: 3456,
    floorPrice: 245.80,
    volume: 456789.50,
    volumeChange: 15.3,
    verified: true
  }

  // Générer 15 UNIQs basés sur l'image de la collection
  const generateNfts = () => {
    const rarities = ['Mythic', 'Legendary', 'Epic', 'Rare', 'Common'];
    const owners = ['ultrawhale92', 'spacehunter', 'bidmaster', 'mysticholder', 'cyberpunk', 'collector99', 'nftmaster', 'cryptolord', 'digitalking', 'blockchainer', 'metaverse', 'ultratrader', 'nftgod', 'collector', 'investor'];
    
    return Array.from({ length: 15 }, (_, index) => {
      const rarity = rarities[Math.floor(Math.random() * rarities.length)];
      const rarityMultiplier = {
        'Mythic': 3.0,
        'Legendary': 2.0,
        'Epic': 1.5,
        'Rare': 1.2,
        'Common': 1.0
      }[rarity] || 1.0;
      
      const basePrice = collection.floorPrice || 100;
      const price = basePrice * rarityMultiplier * (0.8 + Math.random() * 0.4);
      
      return {
        id: index + 1,
        name: `${collection.name} #${(index + 1).toString().padStart(4, '0')}`,
        image: collection.image, // Utilise la même image que la collection
        price: Math.round(price * 100) / 100,
        rarity,
        rank: index + 1,
        owner: owners[Math.floor(Math.random() * owners.length)],
        liked: Math.random() > 0.7,
        views: Math.floor(Math.random() * 2000) + 100
      };
    });
  };

  const nfts = generateNfts();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 bg-gray-400/20'
      case 'Rare': return 'text-blue-400 bg-blue-400/20'
      case 'Epic': return 'text-purple-400 bg-purple-400/20'
      case 'Legendary': return 'text-orange-400 bg-orange-400/20'
      case 'Mythic': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const formatPrice = (price: number) => `${price.toLocaleString()} UOS`
  const formatChange = (change: number) => `${change > 0 ? '+' : ''}${change.toFixed(1)}%`

  const handleUniqClick = (nft: any) => {
    if (onNavigate) {
      const adaptedUniq = {
        id: nft.id,
        name: nft.name,
        collection: collection.name,
        price: nft.price,
        priceUSD: nft.price * 2, // Estimation USD
        image: nft.image,
        rarity: nft.rarity,
        creator: collection.creator,
        verified: collection.verified || true,
        trending: Math.random() > 0.5,
        timeLeft: "2h 15m",
        likes: nft.liked ? Math.floor(Math.random() * 500) + 100 : Math.floor(Math.random() * 200) + 50,
        views: nft.views,
        edition: `${nft.id}/15`,
        seller: nft.owner,
        rank: nft.rank
      };
      onNavigate('uniq-detail', adaptedUniq);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#7A52D1]/10 to-black text-white">
      {/* Header avec bannière */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={collection.banner} 
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <button
          onClick={() => onNavigate('statistics')}
          className="absolute top-6 left-6 flex items-center space-x-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-xl text-white hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </button>
      </div>

      {/* Informations de la collection */}
      <div className="container mx-auto px-6 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-12">
          <div className="relative">
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-32 h-32 rounded-2xl border-4 border-white/20 shadow-2xl"
            />
            {collection.verified && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#7A52D1] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{collection.name}</h1>
            <p className="text-gray-300 mb-4 max-w-2xl">{collection.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">Par <button 
                onClick={() => {
                  const creatorData = {
                    id: collection.creator.toLowerCase().replace(/\s+/g, ''),
                    name: collection.creator,
                    displayName: collection.creator,
                    bio: `Créateur de ${collection.name} et d'autres collections exceptionnelles.`,
                    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&q=80",
                    banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&q=80",
                    verified: true,
                    featured: false,
                    joinDate: "2023",
                    location: "Ultra Ecosystem",
                    walletAddress: `${collection.creator.toLowerCase().replace(/\s+/g, '')}.ultra`,
                  };
                  onNavigate("creator", creatorData);
                }}
                className="text-[#7A52D1] font-medium hover:text-[#6A42C1] transition-colors cursor-pointer"
              >
                {collection.creator}
              </button></span>
              <span className="text-gray-400">{collection.totalItems?.toLocaleString() || collection.items?.toLocaleString() || '0'} items</span>
              <span className="text-gray-400">{collection.owners?.toLocaleString() || '0'} propriétaires</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="text-2xl font-bold text-white mb-1">{formatPrice(collection.floorPrice)}</div>
            <div className="text-sm text-gray-400">Floor Price</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">{formatPrice(collection.volume)}</div>
              <div className={`flex items-center text-sm ${collection.volumeChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {collection.volumeChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {formatChange(collection.volumeChange)}
              </div>
            </div>
            <div className="text-sm text-gray-400">Volume Total</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="text-2xl font-bold text-white mb-1">{collection.totalItems?.toLocaleString() || collection.items?.toLocaleString() || '0'}</div>
            <div className="text-sm text-gray-400">Items</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
            <div className="text-2xl font-bold text-white mb-1">{collection.owners?.toLocaleString() || '0'}</div>
            <div className="text-sm text-gray-400">Propriétaires</div>
          </div>
        </div>

        {/* Filtres et contrôles */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un NFT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#7A52D1] transition-colors"
                />
              </div>

              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-[#7A52D1] transition-colors"
              >
                <option value="all">Toutes les raretés</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
                <option value="Mythic">Mythic</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-[#7A52D1] transition-colors"
              >
                <option value="price_low">Prix croissant</option>
                <option value="price_high">Prix décroissant</option>
                <option value="rarity">Rareté</option>
                <option value="rank">Rang</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#7A52D1] text-white' : 'bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#7A52D1] text-white' : 'bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grille des NFTs */}
        <div className={`grid gap-6 mb-16 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {nfts.map((nft) => {
            const handleNftClick = () => {
              handleUniqClick(nft);
            };

            return (
            <div 
              key={nft.id} 
              onClick={handleNftClick}
              className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors">
                    <Heart className={`w-4 h-4 ${nft.liked ? 'text-red-400 fill-current' : 'text-white'}`} />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                  <Eye className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{nft.views}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{nft.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">Rang #{nft.rank}</span>
                  <span className="text-gray-400 text-sm">@{nft.owner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[#7A52D1] font-bold text-lg">{formatPrice(nft.price)}</div>
                  <button className="px-4 py-2 bg-[#7A52D1] hover:bg-[#6A42C1] text-white rounded-xl transition-colors text-sm font-medium">
                    Acheter
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={collection.name}
        description={collection.description}
        imageUrl={collection.image}
      />
    </div>
  )
}

export default CollectionDetailPage 