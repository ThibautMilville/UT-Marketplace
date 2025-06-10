import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Astronaut Background */}
      <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20">
        <img 
          src="https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
          alt="Space Astronaut"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">À PROPOS D'ULTRA</h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Ultra donne accès à d'innombrables services : découvrez, 
                achetez, jouez et vendez vos jeux et articles de jeu, regardez des 
                live, en direct, transformez avec vos influenceurs préférés, 
                participez à des concours et des tournois, et bien plus encore.
              </p>

              <div className="bg-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  Créez votre compte Ultra <span className="text-purple-400">aujourd'hui</span>
                </h3>
                <p className="text-gray-300 mb-4">
                  Vous n'avez qu'à télécharger l'application Ultra, vous inscrire, découvrir 
                  les meilleurs jeux AAA et indépendants, ainsi qu'échanger/
                  revendre vos jeux et articles via le marketplace !
                </p>
                <p className="text-gray-300 mb-4">
                  Êtes-vous prêt ? Suivez l'un des premiers à accéder à la 
                  plateforme.
                </p>
              </div>

              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                INSCRIPTION
              </button>
            </div>
          </div>

          {/* Social Media Updates */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">U</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-white font-bold">Ultra Times - Web 3 Ga...</span>
                    <span className="text-gray-400 text-sm">@Ultra • 13 janv.</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Les outils pour intégrer l'Ultra Wallet Extension sont 
                    disponibles sur Github ! Une seule action pour 
                    pouvoir débuter des tests locaux dès 1 heure sur 
                    notre réseau ⚡ To your position...
                  </p>
                  <p className="text-purple-400 text-sm mt-2">marketplace.ultratimes.xyz</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">U</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-white font-bold">Ultra</span>
                    <span className="text-gray-400 text-sm">@Ultra_io • 13 janv.</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    UPDATE: developers can now spin 
                    up a local blockchain network, 
                    download the Ultra Wallet Extension, 
                    and build something Ultra today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;