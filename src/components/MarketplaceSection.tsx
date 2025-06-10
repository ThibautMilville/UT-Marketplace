import React from 'react';

interface MarketplaceSectionProps {
  onNavigate?: (page: string, data?: any) => void;
}

const MarketplaceSection = ({ onNavigate }: MarketplaceSectionProps) => {
  const items = [
    {
      id: "1111111100111",
      title: "ULTRA NEW YEAR",
      price: "41 €",
      priceAlt: "200 U",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      edition: "1157/1500",
      rarity: "rare"
    },
    {
      id: "LOKI",
      title: "INFINITY PETS",
      price: "336 €",
      priceAlt: "1650 U",
      image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "legendary"
    },
    {
      id: "WOOD SOULS",
      title: "ELEMENTAL SOULS",
      price: "1943 €",
      priceAlt: "9800 U",
      image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "epic"
    },
    {
      id: "LOKI",
      title: "INFINITY PETS",
      price: "336 €",
      priceAlt: "1650 U",
      image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "rare"
    },
    {
      id: "WOOD SOULS",
      title: "ELEMENTAL SOULS",
      price: "1943 €",
      priceAlt: "9800 U",
      image: "https://images.pexels.com/photos/159393/game-controller-joystick-joypad-gamepad-159393.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "legendary"
    },
    {
      id: "LOKI",
      title: "INFINITY PETS",
      price: "336 €",
      priceAlt: "1650 U",
      image: "https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "epic"
    },
    {
      id: "WOOD SOULS",
      title: "ELEMENTAL SOULS",
      price: "1943 €",
      priceAlt: "9800 U",
      image: "https://images.pexels.com/photos/106144/pexels-photo-106144.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rarity: "rare"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-500 to-orange-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleItemClick = (item: any) => {
    if (onNavigate) {
      onNavigate('uniq-detail', item);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-12">MARKETPLACE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleItemClick(item)}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
            >
              {/* Edition Badge */}
              {item.edition && (
                <div className="absolute top-3 left-3 z-10 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  {item.edition}
                </div>
              )}
              
              {/* Rarity Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white text-xs px-2 py-1 rounded uppercase font-bold`}>
                  {item.rarity}
                </div>
              </div>

              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Ultra Logo */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">U</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-white font-bold text-sm">{item.id}</h3>
                  <p className="text-gray-400 text-xs">{item.title}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-white font-bold">{item.price}</div>
                  <div className="text-purple-400 font-bold">{item.priceAlt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => onNavigate && onNavigate('marketplace')}
            className="bg-white hover:bg-gray-100 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
          >
            TOUS LES UNIQS EN VENTE
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;