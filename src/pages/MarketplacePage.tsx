import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface MarketplacePageProps {
  onNavigate: (page: string, data?: any) => void;
}

const MarketplacePage = ({ onNavigate }: MarketplacePageProps) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [uniqId, setUniqId] = useState('');
  const [wallet, setWallet] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [collection, setCollection] = useState('');
  const [utility, setUtility] = useState('');
  const [sortBy, setSortBy] = useState('Trier le résultat');
  const [showAll, setShowAll] = useState('Toutes les uniqs');

  const items = [
    {
      id: "LOKI",
      title: "INFINITY PETS",
      price: "336 €",
      priceAlt: "1650 U",
      image: "https://images.pexels.com/photos/159393/game-controller-joystick-joypad-gamepad-159393.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "46/63"
    },
    {
      id: "WOOD SOULS",
      title: "ELEMENTAL SOULS",
      price: "1993 €",
      priceAlt: "9 800 U",
      image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "28/100"
    },
    {
      id: "LOKI",
      title: "INFINITY PETS",
      price: "336 €",
      priceAlt: "1650 U",
      image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "46/63"
    },
    {
      id: "WOOD SOULS",
      title: "ELEMENTAL SOULS",
      price: "1993 €",
      priceAlt: "9 800 U",
      image: "https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "28/100"
    },
    {
      id: "LOKI",
      title: "INFINITY PETS",
      price: "336 €",
      priceAlt: "1650 U",
      image: "https://images.pexels.com/photos/159393/game-controller-joystick-joypad-gamepad-159393.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "46/63"
    },
    {
      id: "WOOD SOULS",
      title: "ELEMENTAL SOULS",
      price: "1993 €",
      priceAlt: "9 800 U",
      image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "28/100"
    },
    {
      id: "LOKI",
      title: "INFINITY PETS",
      price: "336 €",
      priceAlt: "1650 U",
      image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "46/63"
    },
    {
      id: "WOOD SOULS",
      title: "ELEMENTAL SOULS",
      price: "1993 €",
      priceAlt: "9 800 U",
      image: "https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "28/100"
    }
  ];

  const handleItemClick = (item: any) => {
    onNavigate('uniq-detail', item);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Background */}
      <div className="relative h-64 bg-gradient-to-r from-purple-900/50 to-blue-900/50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1920&h=400&fit=crop"
            alt="Marketplace Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-purple-900/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">MARKETPLACE</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Search by title */}
            <div className="relative">
              <input
                type="text"
                placeholder="Mots clés dans le titre"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/40"
              />
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>

            {/* Search by description */}
            <div className="relative">
              <input
                type="text"
                placeholder="Mots clés dans la description"
                value={searchDescription}
                onChange={(e) => setSearchDescription(e.target.value)}
                className="w-full bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/40"
              />
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Uniq ID */}
            <input
              type="text"
              placeholder="Uniq ID"
              value={uniqId}
              onChange={(e) => setUniqId(e.target.value)}
              className="bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/40"
            />

            {/* Wallet */}
            <input
              type="text"
              placeholder="Wallet"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/40"
            />

            {/* Serial Number */}
            <input
              type="text"
              placeholder="Seriale number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/40"
            />

            {/* Min Price */}
            <div className="relative">
              <input
                type="text"
                placeholder="Prix Min."
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/40"
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <ChevronDown className="w-5 h-5" />
              </div>
              <span className="absolute right-10 top-3 text-gray-400 text-sm">100 €</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Collection */}
            <div className="relative">
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="w-full bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400/40 appearance-none"
              >
                <option value="">Collection</option>
                <option value="ultra-power">Ultra Power</option>
                <option value="infinity-pets">Infinity Pets</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Utility */}
            <div className="relative">
              <select
                value={utility}
                onChange={(e) => setUtility(e.target.value)}
                className="w-full bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400/40 appearance-none"
              >
                <option value="">Utilité</option>
                <option value="milestone">Milestone Holder</option>
                <option value="vip">VIP Access</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Search Button */}
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              RECHERCHER
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-bold">52 RÉSULTATS</h2>
          
          <div className="flex space-x-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400/40 appearance-none pr-10"
              >
                <option value="Trier le résultat">Trier le résultat</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="newest">Plus récent</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={showAll}
                onChange={(e) => setShowAll(e.target.value)}
                className="bg-slate-700/50 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400/40 appearance-none pr-10"
              >
                <option value="Toutes les uniqs">Toutes les uniqs</option>
                <option value="En vente">En vente</option>
                <option value="Vendues">Vendues</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleItemClick(item)}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="absolute top-3 left-3 z-10 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                {item.rarity}
              </div>
              
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold text-sm mb-1">{item.id}</h3>
                <p className="text-gray-400 text-xs mb-3">{item.title}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">{item.price}</span>
                  <span className="text-purple-400 font-bold">{item.priceAlt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;