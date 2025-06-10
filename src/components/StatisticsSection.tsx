import React from 'react';
import { ExternalLink } from 'lucide-react';

const StatisticsSection = () => {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-12">
          <h2 className="text-4xl font-bold text-white">STATISTIQUES</h2>
          <ExternalLink className="w-6 h-6 text-purple-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Wallets Chart */}
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                <defs>
                  <linearGradient id="walletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                
                {/* Y-axis labels */}
                <text x="30" y="30" fill="#9ca3af" fontSize="12">1 060</text>
                <text x="30" y="50" fill="#9ca3af" fontSize="12">1 040</text>
                <text x="30" y="70" fill="#9ca3af" fontSize="12">1 020</text>
                <text x="30" y="90" fill="#9ca3af" fontSize="12">1 000</text>
                <text x="30" y="110" fill="#9ca3af" fontSize="12">980</text>
                <text x="30" y="130" fill="#9ca3af" fontSize="12">960</text>
                <text x="30" y="150" fill="#9ca3af" fontSize="12">940</text>
                <text x="30" y="170" fill="#9ca3af" fontSize="12">920</text>
                <text x="30" y="190" fill="#9ca3af" fontSize="12">900</text>

                {/* Chart line */}
                <path
                  d="M 60 150 L 100 140 L 140 120 L 180 110 L 220 95 L 260 85 L 300 70 L 340 40"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                  fill="none"
                />
                
                {/* Area under curve */}
                <path
                  d="M 60 150 L 100 140 L 140 120 L 180 110 L 220 95 L 260 85 L 300 70 L 340 40 L 340 190 L 60 190 Z"
                  fill="url(#walletGradient)"
                />
              </svg>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-400">Wallets avec des Uniqs : <span className="text-purple-400 font-bold">1058</span></p>
            </div>
          </div>

          {/* Total Uniqs Chart */}
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <defs>
                  <linearGradient id="uniqsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                
                {/* Y-axis labels */}
                <text x="15" y="30" fill="#9ca3af" fontSize="12">10 000</text>
                <text x="25" y="50" fill="#9ca3af" fontSize="12">9 500</text>
                <text x="25" y="70" fill="#9ca3af" fontSize="12">9 000</text>
                <text x="25" y="90" fill="#9ca3af" fontSize="12">8 500</text>
                <text x="25" y="110" fill="#9ca3af" fontSize="12">8 000</text>
                <text x="25" y="130" fill="#9ca3af" fontSize="12">7 500</text>
                <text x="25" y="150" fill="#9ca3af" fontSize="12">7 000</text>
                <text x="25" y="170" fill="#9ca3af" fontSize="12">6 500</text>
                <text x="25" y="190" fill="#9ca3af" fontSize="12">6 000</text>

                {/* Chart line */}
                <path
                  d="M 60 180 L 100 170 L 140 160 L 180 150 L 220 140 L 260 120 L 300 90 L 340 50"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  fill="none"
                />
                
                {/* Area under curve */}
                <path
                  d="M 60 180 L 100 170 L 140 160 L 180 150 L 220 140 L 260 120 L 300 90 L 340 50 L 340 190 L 60 190 Z"
                  fill="url(#uniqsGradient)"
                />
              </svg>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-400">Nombre total de Uniqs : <span className="text-cyan-400 font-bold">9915</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;