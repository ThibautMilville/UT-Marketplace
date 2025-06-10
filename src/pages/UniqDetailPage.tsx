import React, { useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';

interface UniqDetailPageProps {
  uniq: any;
  onNavigate: (page: string) => void;
}

const UniqDetailPage = ({ uniq, onNavigate }: UniqDetailPageProps) => {
  const [activeTab, setActiveTab] = useState('description');

  const mockUniqData = {
    id: "ULTRA POWER #UNIQ38",
    collection: "Collection officielle Ultra",
    tokenFactoryId: "38",
    onSale: "9",
    maxCopies: "52",
    walletsWithUniq: "39",
    lowestPrice: "8 888 U",
    lowestPriceEur: "1 897 €",
    averagePrice: "8 888 U",
    averagePriceEur: "1 897 €",
    utilities: "MILESTONE HOLDER PERK",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    thumbnails: [
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    ]
  };

  const relatedUniqs = [
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

  const transactions = [
    {
      type: "ACHAT",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      from: "karksha9no4",
      to: "karksha9no4",
      image: mockUniqData.image
    },
    {
      type: "ACHAT",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      from: "karksha9no4",
      to: "karksha9no4",
      image: mockUniqData.image
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-8">{mockUniqData.id}</h1>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-purple-500/20">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'description'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'marketplace'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Marketplace
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'description' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Image */}
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                <img
                  src={mockUniqData.image}
                  alt={mockUniqData.id}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex space-x-2">
                {mockUniqData.thumbnails.map((thumb, index) => (
                  <img
                    key={index}
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-purple-500/20 hover:border-purple-400/40 cursor-pointer transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Right side - Details */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Collection officielle Ultra</span>
                    <span className="text-purple-400 font-bold">OUI</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Token Factory ID</span>
                    <span className="text-purple-400 font-bold">{mockUniqData.tokenFactoryId}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">En vente</span>
                    <span className="text-purple-400 font-bold">{mockUniqData.onSale}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Exemplaires max</span>
                    <span className="text-purple-400 font-bold">{mockUniqData.maxCopies}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Wallets avec cet Uniq</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-400 font-bold">{mockUniqData.walletsWithUniq}</span>
                      <button className="text-purple-400 hover:text-purple-300">
                        <span className="text-sm">Voir la liste</span>
                        <ExternalLink className="w-3 h-3 inline ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Prix le plus bas</span>
                    <div className="text-right">
                      <div className="text-purple-400 font-bold">{mockUniqData.lowestPrice}</div>
                      <div className="text-gray-400 text-sm">{mockUniqData.lowestPriceEur}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Moyenne du prix de vente</span>
                    <div className="text-right">
                      <div className="text-purple-400 font-bold">{mockUniqData.averagePrice}</div>
                      <div className="text-gray-400 text-sm">{mockUniqData.averagePriceEur}</div>
                      <div className="text-gray-500 text-xs">
                        Air Drop de UOS<br />
                        Présentation de Arena<br />
                        Card Deck
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Utilities */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Utilités</span>
                  <span className="text-purple-400 font-bold">{mockUniqData.utilities}</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">• des cinq dernières transactions</p>
              </div>

              {/* Description */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <p className="text-gray-300 leading-relaxed">
                  There is a minting limit of 5 per account associated with this Ultra Ultra's Power Collection 
                  Volume 1 includes limited edition creative masterpieces, delivered by an assembly of 
                  hand-picked influential artists who have come together to present their take on the 
                  Curated to perfection, Ultra's Power Collection is a badge of honour for early adopters, a 
                  vital resource to dedicated community members and a valuable addition to the wallets of 
                  Ultra enthusiasts. Released in tandem with the historic launch of the Uniq Marketplace, 
                  the collection is dedicated to those futurists and innovators who see the coming impact 
                  of the Ultra ecosystem and aim to join us on the front line. Owning an Ultra Power Uniq 
                  entitles the holder to exclusive utility as well as VIP status within our ecosystem. Holders 
                  will find that the Ultra Power Uniq is a tool to disrupt, an invitation to engage and a call to 
                  unite.
                </p>
                
                <p className="text-gray-300 leading-relaxed mt-4">
                  Artist: Singblade Title: Indulgence Artist's Descriptions: The power Ultra will provide. My 
                  goal in creating this piece was to express the power and attraction Ultra will have and 
                  provide for gamers and creators. This power and attraction was made into the piece with 
                  color and flow to create the mood and emotion. This piece was originally inspired by an 
                  artwork by Rémi James from 2021.
                </p>

                <div className="mt-6">
                  <h4 className="text-purple-400 font-bold mb-4">Ressources sur cette collection :</h4>
                  <div className="space-y-2">
                    <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                      <span className="text-sm">eListe des drops d'Uniqs, UOS, et Merch</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                      <span className="text-sm">Résumé des Utilités des Uniqs - AMA du 07/09</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                      <span className="text-sm">Présentation de la Collection Ultra's Power V1</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {transactions.map((transaction, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center space-x-4">
                  <img
                    src={transaction.image}
                    alt="Transaction"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold">
                        {transaction.type}
                      </span>
                      <span className="text-white font-bold">{transaction.price}</span>
                      <span className="text-gray-400">{transaction.priceEur}</span>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      <span>Uniq ID : 3919</span>
                      <span className="mx-2">•</span>
                      <span>Serial Number : 28 / 52</span>
                    </div>
                    
                    <div className="text-sm text-gray-400 mt-1">
                      {transaction.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-400 text-sm">{transaction.from}</span>
                    </div>
                    <span className="text-gray-400">→</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-400 text-sm">{transaction.to}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">38 UNIQS EN VENTE - ULTRA POWER #1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                  <div className="absolute top-3 left-3 z-10 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(Math.random() * 100)}/63
                  </div>
                  
                  <div className="relative h-48">
                    <img
                      src={relatedUniqs[index % relatedUniqs.length].image}
                      alt="Uniq"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-white font-bold text-sm mb-1">
                      {relatedUniqs[index % relatedUniqs.length].id}
                    </h4>
                    <p className="text-gray-400 text-xs mb-3">
                      {relatedUniqs[index % relatedUniqs.length].title}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">
                        {relatedUniqs[index % relatedUniqs.length].price}
                      </span>
                      <span className="text-purple-400 font-bold">
                        {relatedUniqs[index % relatedUniqs.length].priceAlt}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniqDetailPage;