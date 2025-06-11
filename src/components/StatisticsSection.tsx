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
  const [hoveredPoint, setHoveredPoint] = useState<{index: number, value: number, x: number, y: number} | null>(null);

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

  // Suppression de la rotation automatique - sera contrôlée par les clics utilisateur
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentChart(prev => (prev + 1) % 3);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

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
      name: "Volume (UOS)",
      data: [120000, 135000, 145000, 160000, 175000, 190000, 185000, 200000, 220000, 240000, 245000, 250000],
      color: "#7A52D1",
      gradient: "from-[#7A52D1]/30 to-transparent",
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"]
    },
    {
      name: "Utilisateurs Actifs",
      data: [8000, 8500, 9000, 9500, 10000, 11000, 12000, 13000, 12500, 13000, 13500, 14000],
      color: "#3B82F6",
      gradient: "from-blue-500/30 to-transparent",
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"]
    },
    {
      name: "Transactions",
      data: [5000, 6500, 8000, 9500, 11000, 12500, 14000, 15500, 17000, 18500, 20000, 21500],
      color: "#10B981",
      gradient: "from-green-500/30 to-transparent",
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"]
    }
  ];

  const currentData = chartData[currentChart];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatValue = (value: number, chartIndex: number) => {
    if (chartIndex === 0) return `${formatNumber(value)} UOS`;
    return formatNumber(value);
  };

  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convertir les coordonnées écran en coordonnées SVG
    const svgX = (x / rect.width) * 800;
    const svgY = (y / rect.height) * 350;
    
    // Trouver le point le plus proche
    const pointWidth = 54;
    const startX = 100;
    const pointIndex = Math.round((svgX - startX) / pointWidth);
    
    if (pointIndex >= 0 && pointIndex < currentData.data.length) {
      const value = currentData.data[pointIndex];
      const pointX = startX + pointIndex * pointWidth;
      const pointY = 285 - (value / Math.max(...currentData.data)) * 225;
      
      // Vérifier si on survole vraiment près du point
      const distance = Math.sqrt(Math.pow(svgX - pointX, 2) + Math.pow(svgY - pointY, 2));
      
      if (distance < 25) {
        setHoveredPoint({
          index: pointIndex,
          value: value,
          x: pointX,
          y: pointY
        });
      } else {
        setHoveredPoint(null);
      }
    }
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
                      <IconComponent className="w-6 h-6 text-white" />
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

        <div className="mb-16">
          {/* Graphique principal agrandi */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#7A52D1]/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Évolution {currentData.name}
                </h3>
                <p className="text-gray-400">Données des 12 derniers mois - Cliquez sur les indicateurs pour changer de graphique</p>
              </div>
              
              {/* Indicateurs de graphiques cliquables */}
              <div className="flex space-x-3">
                {chartData.map((chart, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentChart(index)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 border ${
                      currentChart === index 
                        ? 'bg-[#7A52D1] border-[#7A52D1] text-white scale-105' 
                        : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-[#7A52D1] hover:text-white'
                    }`}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        currentChart === index ? 'bg-white' : ''
                      }`}
                      style={{ backgroundColor: currentChart === index ? 'white' : chart.color }}
                    ></div>
                    <span className="text-sm font-medium">{chart.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Graphique SVG Interactif */}
            <div className="relative h-96">
              <svg 
                className="w-full h-full cursor-crosshair" 
                viewBox="0 0 800 350"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <defs>
                  <linearGradient id={`gradient-${currentChart}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={currentData.color} stopOpacity="0.3"/>
                    <stop offset="100%" stopColor={currentData.color} stopOpacity="0.05"/>
                  </linearGradient>
                </defs>

                {/* Grille horizontale */}
                {[...Array(6)].map((_, i) => (
                  <g key={i}>
                    <line
                      x1="100"
                      y1={60 + i * 45}
                      x2="750"
                      y2={60 + i * 45}
                      stroke="#374151"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    {/* Labels axe Y */}
                    <text
                      x="90"
                      y={65 + i * 45}
                      fill="#9CA3AF"
                      fontSize="14"
                      textAnchor="end"
                    >
                      {formatNumber(Math.max(...currentData.data) * (1 - i * 0.2))}
                    </text>
                  </g>
                ))}

                {/* Grille verticale et labels axe X */}
                {currentData.labels.map((label, index) => (
                  <g key={index}>
                    <line
                      x1={100 + index * 54}
                      y1="60"
                      x2={100 + index * 54}
                      y2="285"
                      stroke="#374151"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                    <text
                      x={100 + index * 54}
                      y="310"
                      fill="#9CA3AF"
                      fontSize="13"
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  </g>
                ))}

                {/* Zone sous la courbe */}
                <path
                  d={`M ${currentData.data.map((value, index) => 
                    `${100 + (index * 54)} ${285 - (value / Math.max(...currentData.data)) * 225}`
                  ).join(' L ')} L 694 285 L 100 285 Z`}
                  fill={`url(#gradient-${currentChart})`}
                />

                {/* Ligne de données */}
                <path
                  d={`M ${currentData.data.map((value, index) => 
                    `${100 + (index * 54)} ${285 - (value / Math.max(...currentData.data)) * 225}`
                  ).join(' L ')}`}
                  stroke={currentData.color}
                  strokeWidth="4"
                  fill="none"
                  className="drop-shadow-lg"
                />

                {/* Points de données */}
                {currentData.data.map((value, index) => {
                  const cx = 100 + index * 54;
                  const cy = 285 - (value / Math.max(...currentData.data)) * 225;
                  const isHovered = hoveredPoint?.index === index;
                  
                  return (
                    <circle
                      key={index}
                      cx={cx}
                      cy={cy}
                      r={isHovered ? "8" : "5"}
                      fill={currentData.color}
                      stroke="white"
                      strokeWidth={isHovered ? "3" : "2"}
                      className="drop-shadow-md transition-all duration-200 cursor-pointer"
                      style={{ filter: isHovered ? 'drop-shadow(0 0 12px rgba(122, 82, 209, 0.8))' : undefined }}
                    />
                  );
                })}

                {/* Tooltip */}
                {hoveredPoint && (
                  <g>
                    {/* Ligne verticale de référence */}
                    <line
                      x1={hoveredPoint.x}
                      y1="60"
                      x2={hoveredPoint.x}
                      y2="285"
                      stroke={currentData.color}
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.6"
                    />
                    
                    {/* Box du tooltip */}
                    <rect
                      x={hoveredPoint.x - 60}
                      y={hoveredPoint.y - 55}
                      width="120"
                      height="45"
                      fill="rgba(0, 0, 0, 0.95)"
                      stroke={currentData.color}
                      strokeWidth="2"
                      rx="8"
                      className="drop-shadow-xl"
                    />
                    
                    {/* Texte du tooltip */}
                    <text
                      x={hoveredPoint.x}
                      y={hoveredPoint.y - 35}
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {formatValue(hoveredPoint.value, currentChart)}
                    </text>
                    
                    <text
                      x={hoveredPoint.x}
                      y={hoveredPoint.y - 18}
                      fill="#9CA3AF"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {currentData.labels[hoveredPoint.index]}
                    </text>
                  </g>
                )}
              </svg>
              
              {/* Valeur actuelle */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-[#7A52D1]/20">
                <div className="text-2xl font-bold text-white">
                  {formatValue(currentData.data[currentData.data.length - 1], currentChart)}
                </div>
                <div className="text-sm text-gray-400">Actuel</div>
              </div>

              {/* Légende interactive */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-[#7A52D1]/20">
                <div className="text-sm text-gray-400 mb-1">Survolez les points pour plus de détails</div>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: currentData.color }}
                  ></div>
                  <span className="text-white text-sm font-medium">{currentData.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques réseau et collections côte à côte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Statistiques réseau */}
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
                { name: "Ashes Genesis", volume: "567K", change: "+28.9%", image: "/collections/ashes.png" },
                { name: "Phygital Artifacts", volume: "456K", change: "+32.6%", image: "/collections/phygital.png" },
                { name: "Cypherpunk Revolution", volume: "345K", change: "+25.3%", image: "/collections/cypherpunk.jpg" },
                { name: "Ultra Apes Collection", volume: "283K", change: "+23.4%", image: "/collections/ultra-apes.jpeg" },
                { name: "Ultra Power", volume: "254K", change: "+15.2%", image: "/collections/ultra-power.png" },
              ].map((collection, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#7A52D1] to-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
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