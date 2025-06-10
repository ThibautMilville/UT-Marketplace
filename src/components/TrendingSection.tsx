import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrendingSection = () => {
  const trendingItems = [
    {
      title: "Ultra Power #1",
      volume: "40 888",
      transactions: "8",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      title: "Ultra Power #1", 
      volume: "40 888",
      transactions: "8",
      image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      title: "Ultra Power #1",
      volume: "40 888", 
      transactions: "8",
      image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      title: "Ultra Power #1",
      volume: "40 888",
      transactions: "8", 
      image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      title: "Ultra Power #1",
      volume: "40 888",
      transactions: "8",
      image: "https://images.pexels.com/photos/159393/game-controller-joystick-joypad-gamepad-159393.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      title: "Ultra Power #1",
      volume: "40 888",
      transactions: "8",
      image: "https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      title: "Ultra Power #1",
      volume: "40 888", 
      transactions: "8",
      image: "https://images.pexels.com/photos/106144/pexels-photo-106144.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white">LES TENDANCES</h2>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full border border-purple-500/20 hover:border-purple-400/40 transition-all">
            TENDANCE SUR 7 JOURS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingItems.map((item, index) => (
            <div 
              key={index}
              className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:bg-slate-700/70"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">U</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="text-sm">
                      <span className="text-gray-400">Volume en UDS : </span>
                      <span className="text-blue-400 font-bold">{item.volume}</span>
                    </div>
                  </div>
                  <div className="text-sm mt-1">
                    <span className="text-gray-400">Nombre de transactions : </span>
                    <span className="text-green-400 font-bold">{item.transactions}</span>
                  </div>
                </div>

                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;