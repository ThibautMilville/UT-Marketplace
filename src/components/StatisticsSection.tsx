import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  Zap, 
  Globe, 
  Shield, 
  Crown,
  Flame,
  Star,
  Award,
  Eye,
  Heart,
  ArrowRight
} from 'lucide-react';

interface StatisticsSectionProps {
  onNavigate?: (page: string) => void;
}

const StatisticsSection = ({ onNavigate }: StatisticsSectionProps) => {
  const [visibleMetrics, setVisibleMetrics] = useState<number[]>([]);
  const [currentChart, setCurrentChart] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Données en temps réel simulées
  const [liveData, setLiveData] = useState({
    totalVolume: 2456789.50,
    activeUsers: 12456,
    totalUniqs: 9915,
    walletsWithUniqs: 1058,
    transactions24h: 3456,
    averagePrice: 247.80,
    floorPrice: 89.50,
    marketCap: 156789012
  });

  // Animation des métriques
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleMetrics(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const metrics = document.querySelectorAll('.metric-card');
    metrics.forEach(metric => observer.observe(metric));

    return () => observer.disconnect();
  }, []);

  // Rotation des graphiques
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChart(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulation de données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        totalVolume: prev.totalVolume + Math.random() * 1000 - 500,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        transactions24h: prev.transactions24h + Math.floor(Math.random() * 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const mainMetrics = [
    {
      icon: DollarSign,
      title: "Volume Total",
      value: `${(liveData.totalVolume / 1000000).toFixed(1)}M UOS`,
      change: "+15.3%",
      trend: "up",
      color: "from-[#7A52D1] to-violet-600",
      bgColor: "bg-[#7A52D1]/20",
      borderColor: "border-[#7A52D1]/30",
      description: "Volume d'échanges des dernières 24h"
    },
    {
      icon: Users,
      title: "Utilisateurs Actifs",
      value: liveData.activeUsers.toLocaleString(),
      change: "+8.7%",
      trend: "up",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      description: "Utilisateurs connectés aujourd'hui"
    },
    {
      icon: Activity,
      title: "Transactions",
      value: liveData.transactions24h.toLocaleString(),
      change: "+12.4%",
      trend: "up",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      description: "Transactions des dernières 24h"
    },
    {
      icon: Crown,
      title: "Prix Moyen",
      value: `${liveData.averagePrice.toFixed(2)} UOS`,
      change: "-2.1%",
      trend: "down",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
      description: "Prix moyen des NFTs"
    }
  ];

  const networkStats = [
    {
      icon: Shield,
      title: "Sécurité",
      value: "99.9%",
      subtitle: "Uptime réseau",
      color: "text-green-400"
    },
    {
      icon: Zap,
      title: "Vitesse",
      value: "0.5s",
      subtitle: "Temps de transaction",
      color: "text-yellow-400"
    },
    {
      icon: Globe,
      title: "Global",
      value: "156",
      subtitle: "Pays actifs",
      color: "text-blue-400"
    },
    {
      icon: Flame,
      title: "Tendance",
      value: "HOT",
      subtitle: "Marché en hausse",
      color: "text-red-400"
    }
  ];

  const chartData = [
    {
      name: "Volume",
      data: [120, 135, 145, 160, 175, 190, 185, 200, 220, 240, 245, 250],
      color: "#7A52D1",
      gradient: "from-[#7A52D1]/30 to-transparent"
    },
    {
      name: "Utilisateurs",
      data: [800, 850, 900, 950, 1000, 1100, 1200, 1300, 1250, 1300, 1350, 1400],
      color: "#3B82F6",
      gradient: "from-blue-500/30 to-transparent"
    },
    {
      name: "Transactions",
      data: [50, 65, 80, 95, 110, 125, 140, 155, 170, 185, 200, 215],
      color: "#10B981",
      gradient: "from-green-500/30 to-transparent"
    }
  ];

  const currentData = chartData[currentChart];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-black via-[#7A52D1]/5 to-black overflow-hidden">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#7A52D1] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-6">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium uppercase tracking-wide">
              Données en Temps Réel
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
            Statistiques de la Marketplace
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez les métriques en temps réel de l'écosystème Ultra et suivez l'évolution du marché des NFTs
          </p>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const isVisible = visibleMetrics.includes(index);
            
            return (
              <div
                key={index}
                data-index={index}
                className={`metric-card group relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 border ${metric.borderColor} hover:border-opacity-80 transition-all duration-500 transform hover:scale-105 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Effet de brillance */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-6 h-6 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className={`flex items-center text-sm ${
                      metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-2">
                    {metric.title}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {metric.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Graphique principal */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Évolution {currentData.name}
                </h3>
                <p className="text-gray-400">Données des 12 derniers mois</p>
              </div>
              
              {/* Indicateurs de graphiques */}
              <div className="flex space-x-2">
                {chartData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentChart === index 
                        ? 'bg-[#7A52D1] scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Graphique SVG */}
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 600 200">
                <defs>
                  <linearGradient id={`gradient-${currentChart}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={currentData.color} stopOpacity="0.3"/>
                    <stop offset="100%" stopColor={currentData.color} stopOpacity="0.05"/>
                  </linearGradient>
                </defs>

                {/* Grille */}
                {[...Array(6)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1={30 + i * 28}
                    x2="550"
                    y2={30 + i * 28}
                    stroke="#374151"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                ))}

                {/* Ligne de données */}
                <path
                  d={`M ${currentData.data.map((value, index) => 
                    `${50 + (index * 45)} ${190 - (value / Math.max(...currentData.data)) * 140}`
                  ).join(' L ')}`}
                  stroke={currentData.color}
                  strokeWidth="3"
                  fill="none"
                  className="drop-shadow-lg"
                />

                {/* Zone sous la courbe */}
                <path
                  d={`M ${currentData.data.map((value, index) => 
                    `${50 + (index * 45)} ${190 - (value / Math.max(...currentData.data)) * 140}`
                  ).join(' L ')} L 545 190 L 50 190 Z`}
                  fill={`url(#gradient-${currentChart})`}
                />

                {/* Points de données */}
                {currentData.data.map((value, index) => (
                  <circle
                    key={index}
                    cx={50 + index * 45}
                    cy={190 - (value / Math.max(...currentData.data)) * 140}
                    r="4"
                    fill={currentData.color}
                    className="drop-shadow-md"
                  />
                ))}
              </svg>
              
              {/* Valeur actuelle */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-[#7A52D1]/20">
                <div className="text-2xl font-bold text-white">
                  {formatNumber(currentData.data[currentData.data.length - 1])}
                </div>
                <div className="text-sm text-gray-400">Actuel</div>
              </div>
            </div>
          </div>

          {/* Statistiques réseau */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <h3 className="text-xl font-bold text-white mb-6">État du Réseau</h3>
              
              <div className="space-y-4">
                {networkStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors">
                      <div className="w-10 h-10 bg-gray-700/50 rounded-xl flex items-center justify-center">
                        <IconComponent className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{stat.title}</span>
                          <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                        </div>
                        <div className="text-gray-400 text-sm">{stat.subtitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Collections populaires */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Top Collections</h3>
                <button 
                  onClick={() => onNavigate?.('statistics')}
                  className="text-[#7A52D1] hover:text-[#6A42C1] text-sm font-medium flex items-center space-x-1"
                >
                  <span>Voir tout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Ultra's Power", volume: "456K", change: "+15.3%" },
                  { name: "Cosmic Warriors", volume: "234K", change: "+8.7%" },
                  { name: "Digital Legends", volume: "189K", change: "+23.1%" }
                ].map((collection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#7A52D1] to-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{collection.name}</div>
                        <div className="text-gray-400 text-xs">{collection.volume} UOS</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm font-medium">
                      {collection.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#7A52D1]/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-[#7A52D1]/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Découvrez l'Écosystème Ultra
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Explorez les statistiques détaillées, analysez les tendances du marché et prenez des décisions éclairées dans l'univers des NFTs Ultra.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => onNavigate?.('statistics')}
                className="group bg-gradient-to-r from-[#7A52D1] to-violet-600 hover:from-[#6A42C1] hover:to-violet-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#7A52D1]/30"
              >
                <span className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Voir les Statistiques</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => onNavigate?.('marketplace')}
                className="bg-black/40 border border-gray-600 hover:border-[#7A52D1] text-white font-medium py-3 px-8 rounded-xl transition-all duration-300"
              >
                Explorer la Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default StatisticsSection;