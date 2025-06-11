import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Users, 
  Gamepad2, 
  Coins, 
  Shield, 
  Zap, 
  ArrowRight, 
  Play,
  Star,
  Globe,
  TrendingUp,
  Award,
  CheckCircle,
  ExternalLink,
  Heart
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface AboutSectionProps {
  onNavigate?: (page: string) => void;
}

const AboutSection = ({ onNavigate }: AboutSectionProps) => {
  const { t } = useTranslation();
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleStats(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const stats = document.querySelectorAll('.stat-card');
    stats.forEach(stat => observer.observe(stat));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      value: "2.5M+",
      label: t('home.about.stats.activeUsers'),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Gamepad2,
      value: "15K+",
      label: t('home.about.stats.gamesAvailable'),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: Coins,
      value: "$125M+",
      label: t('home.about.stats.volumeTraded'),
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: TrendingUp,
      value: "98.5%",
      label: t('home.about.stats.satisfaction'),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: t('home.about.features.security.title'),
      description: t('home.about.features.security.description'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: t('home.about.features.speed.title'),
      description: t('home.about.features.speed.description'),
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Globe,
      title: t('home.about.features.ecosystem.title'),
      description: t('home.about.features.ecosystem.description'),
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: t('home.about.features.nfts.title'),
      description: t('home.about.features.nfts.description'),
      color: "from-purple-500 to-pink-500"
    }
  ];

  const socialUpdates = [
    {
      author: "Ultra Times",
      handle: "@UltraTimes",
      time: "2h",
      content: "🚀 Nouveau record ! Plus de 50K transactions NFT en 24h sur notre marketplace. L'écosystème Ultra continue de croître exponentiellement !",
      likes: 1247,
      retweets: 389,
      verified: true
    },
    {
      author: "Ultra",
      handle: "@Ultra_io",
      time: "4h",
      content: "⚡ Mise à jour majeure : L'Ultra Wallet Extension supporte maintenant les smart contracts avancés. Développeurs, c'est le moment de construire l'avenir du gaming !",
      likes: 2156,
      retweets: 678,
      verified: true
    },
    {
      author: "Ultra Gaming",
      handle: "@UltraGaming",
      time: "6h",
      content: "🎮 Tournoi Ultra Championship : 500K UOS en prix ! Inscription ouverte pour les 1000 premiers joueurs. Qui sera le champion ?",
      likes: 3421,
      retweets: 1205,
      verified: true
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-slate-900/80 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7A52D1]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#7A52D1]/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-[#7A52D1]/20 backdrop-blur-sm border border-[#7A52D1]/30 rounded-full px-4 py-2 mb-6">
            <Rocket className="w-4 h-4 text-[#7A52D1]" />
            <span className="text-sm text-white font-medium">{t('home.about.badge')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {t('home.about.title')}
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#7A52D1] via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Ultra
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('home.about.subtitle')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                data-index={index}
                className={`stat-card group bg-black/40 backdrop-blur-sm rounded-2xl p-6 border ${stat.borderColor} hover:border-opacity-60 transition-all duration-500 transform hover:scale-105 ${
                  visibleStats.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Description */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#7A52D1]/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('home.about.ecosystem.title')}
              </h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  {t('home.about.ecosystem.description1')}
                </p>
                
                <p>
                  {t('home.about.ecosystem.description2')}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {[t('home.about.tags.gaming'), t('home.about.tags.nfts'), t('home.about.tags.blockchain'), t('home.about.tags.community')].map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#7A52D1]/20 border border-[#7A52D1]/30 rounded-full text-sm text-[#7A52D1] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features Carousel */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#7A52D1]/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{t('home.about.keyFeatures')}</h3>
                <div className="flex space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentFeature === index ? 'bg-[#7A52D1] w-6' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden h-32">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ${
                        currentFeature === index 
                          ? 'opacity-100 translate-x-0' 
                          : index < currentFeature 
                            ? 'opacity-0 -translate-x-full' 
                            : 'opacity-0 translate-x-full'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#7A52D1]/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-[#7A52D1]/30">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">{t('home.about.cta.title')}</h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('home.about.cta.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate?.('marketplace')}
                  className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-[#7A52D1] to-violet-600 hover:from-[#6A42C1] hover:to-violet-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#7A52D1]/30"
                >
                  <Rocket className="w-5 h-5" />
                  <span>{t('home.about.cta.start')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => onNavigate?.('collections')}
                  className="group flex items-center justify-center space-x-2 bg-black/40 border border-gray-600 hover:border-[#7A52D1] text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  <span>{t('home.about.cta.viewCollections')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Social Updates */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{t('home.about.news.title')}</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">{t('home.about.news.live')}</span>
              </div>
            </div>

            {socialUpdates.map((update, index) => (
              <div 
                key={index}
                className="group bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#7A52D1]/20 hover:border-[#7A52D1]/40 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#7A52D1] to-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">U</span>
                    </div>
                    {update.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-white font-bold truncate">{update.author}</span>
                      <span className="text-gray-400 text-sm">{update.handle}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">{update.time}</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {update.content}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-gray-400 text-sm">
                      <div className="flex items-center space-x-1 hover:text-red-400 transition-colors cursor-pointer">
                        <Heart className="w-4 h-4" />
                        <span>{update.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 hover:text-green-400 transition-colors cursor-pointer">
                        <ArrowRight className="w-4 h-4" />
                        <span>{update.retweets.toLocaleString()}</span>
                      </div>
                      <button className="flex items-center space-x-1 hover:text-[#7A52D1] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>{t('home.about.news.seeMore')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Follow Button */}
            <div className="text-center">
              <button 
                onClick={() => onNavigate?.('statistics')}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                <span className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{t('home.about.news.viewStats')}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;