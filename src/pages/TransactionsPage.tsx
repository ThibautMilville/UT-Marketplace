import React, { useState } from 'react';

interface TransactionsPageProps {
  onNavigate: (page: string) => void;
}

const TransactionsPage = ({ onNavigate }: TransactionsPageProps) => {
  const [activeTab, setActiveTab] = useState('description');

  const transactions = [
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/159393/game-controller-joystick-joypad-gamepad-159393.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/106144/pexels-photo-106144.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      type: "ACHAT",
      name: "Ultra Power #1",
      collection: "Ultra's Power Collection",
      price: "8 888 U",
      priceEur: "2076 €",
      date: "28/01/2023 11:32",
      uniqId: "3919",
      serialNumber: "28 / 52",
      from: "karksha9no4",
      to: "karksha9no4",
      image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-8">ULTRA POWER #UNIQ 38</h1>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-purple-500/20">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'description'
                ? 'text-gray-400'
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
                ? 'text-gray-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Marketplace
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <img
                  src={transaction.image}
                  alt={transaction.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold">
                      {transaction.type}
                    </span>
                    <span className="text-white font-bold">{transaction.name}</span>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-1">
                    {transaction.collection}
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    <span>Uniq ID : {transaction.uniqId}</span>
                    <span className="mx-2">•</span>
                    <span>Serial Number : {transaction.serialNumber}</span>
                  </div>
                  
                  <div className="text-sm text-gray-400 mt-1">
                    {transaction.date}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-bold text-lg mb-1">{transaction.price}</div>
                  <div className="text-gray-400 text-sm">{transaction.priceEur}</div>
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
      </div>
    </div>
  );
};

export default TransactionsPage;