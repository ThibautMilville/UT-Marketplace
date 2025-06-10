import React from 'react';

const TransactionsSection = () => {
  const transactions = [
    {
      name: "GLHF",
      description: "Welcome to the Ultraverse",
      date: "16/01/2023 20:15",
      price: "9 800 U",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      user: "karksha9no4"
    },
    {
      name: "GLHF", 
      description: "Welcome to the Ultraverse",
      date: "16/01/2023 20:15",
      price: "9 800 U",
      image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      user: "karksha9no4"
    },
    {
      name: "GLHF",
      description: "Welcome to the Ultraverse", 
      date: "16/01/2023 20:15",
      price: "9 800 U",
      image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      user: "karksha9no4"
    },
    {
      name: "GLHF",
      description: "Welcome to the Ultraverse",
      date: "16/01/2023 20:15", 
      price: "9 800 U",
      image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      user: "karksha9no4"
    }
  ];

  const TransactionCard = ({ transaction, type }: { transaction: any, type: 'marketplace' | 'launchpad' }) => (
    <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <img 
          src={transaction.image} 
          alt={transaction.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <h3 className="text-purple-400 font-bold">{transaction.name}</h3>
          <p className="text-gray-400 text-sm">{transaction.description}</p>
          <p className="text-gray-500 text-xs mt-1">{transaction.date}</p>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-2">
            {type === 'marketplace' ? (
              <span className="text-purple-400 font-bold">💲</span>
            ) : (
              <span className="text-purple-400 font-bold">⭐</span>
            )}
            <span className="text-white font-bold">{transaction.price}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <span className="text-purple-400">👤</span>
            <span className="text-gray-400 text-xs">{transaction.user}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-12">TRANSACTIONS</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Marketplace Transactions */}
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-6">Achats dans le marketplace</h3>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <TransactionCard key={`marketplace-${index}`} transaction={transaction} type="marketplace" />
              ))}
            </div>
          </div>

          {/* Launchpad Transactions */}
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-6">Mintés dans le launchpad</h3>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <TransactionCard key={`launchpad-${index}`} transaction={transaction} type="launchpad" />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-100 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors">
            TOUS LES TRANSACTIONS
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;