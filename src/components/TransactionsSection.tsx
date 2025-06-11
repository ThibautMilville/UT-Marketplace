import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Rocket, 
  TrendingUp, 
  Clock, 
  User, 
  ArrowRight, 
  Filter,
  Eye,
  Heart,
  ExternalLink,
  Zap,
  Star,
  Award
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface TransactionsSectionProps {
  onNavigate?: (page: string) => void;
}

const TransactionsSection = ({ onNavigate }: TransactionsSectionProps) => {
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'launchpad'>('marketplace');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Initialisation et gestion de la visibilité des cartes
  useEffect(() => {
    // Afficher immédiatement les cartes initiales
    const initialTransactions = activeTab === 'marketplace' ? marketplaceTransactions : launchpadTransactions;
    setVisibleCards(initialTransactions.map((_, index) => index));
    
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-index') || '0');
              setVisibleCards(prev => {
                if (!prev.includes(index)) {
                  return [...prev, index];
                }
                return prev;
              });
            }
          });
        },
        { threshold: 0.1 }
      );

      const cards = document.querySelectorAll('.transaction-card');
      cards.forEach(card => observer.observe(card));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const marketplaceTransactions = [
    {
      id: 1,
      name: "Ashes Genesis #0001",
      collection: "Ashes Genesis",
      description: "Premier UNIQ de la collection légendaire Ashes Genesis",
      date: "Il y a 2 minutes",
      price: "456.8",
      priceUSD: "5,481",
      image: "/collections/ashes.png",
      user: "AshesCollector",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&q=80",
      type: "VENTE",
      rarity: "Legendary",
      verified: true,
      trending: true
    },
    {
      id: 2,
      name: "Phygital Artifact #0007",
      collection: "Phygital Artifacts",
      description: "Artefact phygital unique mêlant réel et virtuel",
      date: "Il y a 5 minutes",
      price: "298.9",
      priceUSD: "3,587",
      image: "/collections/phygital.png",
      user: "PhygitalHunter",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&q=80",
      type: "ACHAT",
      rarity: "Epic",
      verified: true,
      trending: false
    },
    {
      id: 3,
      name: "Cypherpunk Revolutionary #0012",
      collection: "Cypherpunk Revolution",
      description: "Révolutionnaire cyberpunk de la résistance digitale",
      date: "Il y a 8 minutes",
      price: "234.8",
      priceUSD: "2,817",
      image: "/collections/cypherpunk.jpg",
      user: "CryptoRebel",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&q=80",
      type: "LISTING",
      rarity: "Rare",
      verified: false,
      trending: true
    },
    {
      id: 4,
      name: "Ultra Ape Elite #0008",
      collection: "Ultra Apes Collection",
      description: "Singe ultra rare de l'élite de la collection",
      date: "Il y a 12 minutes",
      price: "125.5",
      priceUSD: "1,506",
      image: "/collections/ultra-apes.jpeg",
      user: "ApeMaster",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&q=80",
      type: "VENTE",
      rarity: "Mythic",
      verified: true,
      trending: false
    }
  ];

  const launchpadTransactions = [
    {
      id: 5,
      name: "Ultra Power Core #0003",
      collection: "Ultra Power Core",
      description: "Noyau énergétique ultra-puissant de nouvelle génération",
      date: "Il y a 1 minute",
      price: "189.3",
      priceUSD: "2,272",
      image: "/collections/ultra-power.png",
      user: "PowerLabs",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&q=80",
      type: "MINT",
      rarity: "Genesis",
      verified: true,
      trending: true
    },
    {
      id: 6,
      name: "Freedom Gamer #0009",
      collection: "Freedom Gamers",
      description: "Gamer libre défendant la liberté numérique",
      date: "Il y a 3 minutes",
      price: "87.5",
      priceUSD: "1,050",
      image: "/collections/freedom-gamers.png",
      user: "GamerFreedom",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&q=80",
      type: "MINT",
      rarity: "Legendary",
      verified: true,
      trending: true
    },
    {
      id: 7,
      name: "The Counsellor #0001",
      collection: "The Counsellor",
      description: "Premier conseiller de la sagesse digitale",
      date: "Il y a 6 minutes",
      price: "234.9",
      priceUSD: "2,819",
      image: "/collections/counsellor.png",
      user: "WisdomSeeker",
      userAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&q=80",
      type: "MINT",
      rarity: "Epic",
      verified: false,
      trending: false
    },
    {
      id: 8,
      name: "Ultra Boat Elite #0001",
      collection: "Ultra Boat Collection",
      description: "Bateau ultra-élite de la collection maritime",
      date: "Il y a 10 minutes",
      price: "345.6",
      priceUSD: "4,147",
      image: "/collections/ultra-boat.jpeg",
      user: "MarineElite",
      userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&q=80",
      type: "MINT",
      rarity: "Mythic",
      verified: true,
      trending: true
    }
  ];

  const getCurrentTransactions = () => {
    let transactions = activeTab === 'marketplace' ? marketplaceTransactions : launchpadTransactions;
    
    // Appliquer le filtre
    if (filter !== 'all') {
      transactions = transactions.filter(transaction => 
        transaction.type.toLowerCase() === filter.toLowerCase()
      );
    }
    
    return transactions;
  };

  const getPaginatedTransactions = () => {
    const filteredTransactions = getCurrentTransactions();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTransactions.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(getCurrentTransactions().length / itemsPerPage);
  };

  // Réinitialiser la page quand on change d'onglet ou de filtre
  useEffect(() => {
    setCurrentPage(1);
    setVisibleCards([]);
    
    // Rendre toutes les cartes visibles après un court délai
    setTimeout(() => {
      const currentTransactions = getCurrentTransactions();
      setVisibleCards(currentTransactions.map((_, index) => index));
    }, 200);
  }, [activeTab, filter]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VENTE': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ACHAT': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LISTING': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'MINT': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Genesis': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'Mythic': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'Legendary': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      case 'Epic': return 'bg-gradient-to-r from-purple-500 to-violet-500 text-white';
      case 'Rare': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const TransactionCard = ({ transaction, index }: { transaction: any, index: number }) => (
    <div 
      data-index={index}
      className={`transaction-card group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer ${
        visibleCards.includes(index) 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`px-2 py-1 rounded-lg text-xs font-bold border ${getTypeColor(transaction.type)}`}>
              {transaction.type}
            </div>
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${getRarityColor(transaction.rarity)}`}>
              {transaction.rarity}
            </div>
            {transaction.trending && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-2 py-1 flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-red-400" />
                <span className="text-xs text-red-400 font-medium">Hot</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
              <Heart className="w-4 h-4 text-gray-400 hover:text-red-400" />
            </button>
            <button className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
              <Eye className="w-4 h-4 text-gray-400 hover:text-[#7A52D1]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
        <img 
          src={transaction.image} 
          alt={transaction.name}
              className="w-16 h-16 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {transaction.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg mb-1 truncate">{transaction.name}</h3>
            <p className="text-[#7A52D1] text-sm font-medium mb-1">{transaction.collection}</p>
            <p className="text-gray-400 text-sm truncate">{transaction.description}</p>
          </div>
        </div>

        {/* Price and User */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl font-bold text-white">{transaction.price} UOS</span>
              <span className="text-sm text-gray-400">(${transaction.priceUSD})</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{transaction.date}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <img 
              src={transaction.userAvatar} 
              alt={transaction.user}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-right">
              <div className="text-sm text-white font-medium">{transaction.user}</div>
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">Trader</span>
              </div>
          </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-[#7A52D1]/20 to-blue-500/20 hover:from-[#7A52D1]/30 hover:to-blue-500/30 border border-[#7A52D1]/30 hover:border-[#7A52D1]/50 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 group">
          <span>{t('home.transactions.viewDetails')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7A52D1]/0 via-[#7A52D1]/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-black via-slate-900/50 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(122, 82, 209, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#7A52D1]/20 backdrop-blur-sm border border-[#7A52D1]/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-[#7A52D1]" />
            <span className="text-sm text-white font-medium">{t('home.transactions.realTime')}</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {t('home.transactions.title')}
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              {t('home.transactions.subtitle')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Suivez l'activité en temps réel sur notre marketplace et launchpad
          </p>
        </div>

        {/* Tabs et Filtres centrés verticalement */}
        <div className="flex flex-col items-center justify-center mb-12 space-y-6">
          {/* Tabs améliorés */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-2 border border-[#7A52D1]/20">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'marketplace'
                    ? 'bg-gradient-to-r from-[#7A52D1] to-violet-600 text-white shadow-lg shadow-[#7A52D1]/40 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:scale-102'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{t('home.transactions.marketplace')}</span>
              </button>
              <button
                onClick={() => setActiveTab('launchpad')}
                className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'launchpad'
                    ? 'bg-gradient-to-r from-[#7A52D1] to-violet-600 text-white shadow-lg shadow-[#7A52D1]/40 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:scale-102'
                }`}
              >
                <Rocket className="w-5 h-5" />
                <span>{t('home.transactions.launchpad')}</span>
              </button>
            </div>
          </div>
          
          {/* Filtres améliorés */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm border border-[#7A52D1]/20 rounded-xl px-6 py-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium">Filtrer par</span>
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-800/70 border border-gray-600/50 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#7A52D1] focus:ring-2 focus:ring-[#7A52D1]/20 transition-all duration-300 cursor-pointer hover:bg-gray-700/70"
              >
                <option value="all">{t('home.transactions.allTransactions')}</option>
                <option value="vente">{t('home.transactions.sales')}</option>
                <option value="achat">{t('home.transactions.purchases')}</option>
                <option value="listing">{t('home.transactions.listings')}</option>
                <option value="mint">{t('home.transactions.mints')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {getPaginatedTransactions().map((transaction, index) => (
            <TransactionCard 
              key={`${activeTab}-${transaction.id}`} 
              transaction={transaction} 
              index={index}
            />
          ))}
        </div>

        {/* Pagination */}
        {getTotalPages() > 1 && (
          <div className="flex items-center justify-center space-x-4 mb-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-[#7A52D1]/20 rounded-xl text-white font-medium hover:border-[#7A52D1]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7A52D1]/10"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Précédent</span>
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-[#7A52D1] to-violet-600 text-white shadow-lg shadow-[#7A52D1]/40'
                      : 'bg-black/40 backdrop-blur-sm border border-[#7A52D1]/20 text-gray-400 hover:text-white hover:border-[#7A52D1]/40 hover:bg-[#7A52D1]/10'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, getTotalPages()))}
              disabled={currentPage === getTotalPages()}
              className="flex items-center space-x-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-[#7A52D1]/20 rounded-xl text-white font-medium hover:border-[#7A52D1]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7A52D1]/10"
            >
              <span>Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Info pagination */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm">
            Affichage de {Math.min((currentPage - 1) * itemsPerPage + 1, getCurrentTransactions().length)} à {Math.min(currentPage * itemsPerPage, getCurrentTransactions().length)} sur {getCurrentTransactions().length} transactions
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => onNavigate && onNavigate('transactions')}
            className="group bg-gradient-to-r from-[#7A52D1] via-violet-600 to-blue-600 hover:from-[#6A42C1] hover:via-violet-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#7A52D1]/30 hover:shadow-[#7A52D1]/50 border border-[#7A52D1]/30"
          >
            <span className="flex items-center space-x-2">
              <span>{t('home.transactions.seeAll')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;