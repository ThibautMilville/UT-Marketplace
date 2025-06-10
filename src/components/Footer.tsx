import React from 'react';
import { ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-purple-500/20">
      {/* Back to top button */}
      <div className="flex justify-center py-8">
        <button 
          onClick={scrollToTop}
          className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center space-x-8 mb-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">ACCUEIL</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">MARKETPLACE</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">TRANSACTION</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">COLLECTION</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">STATISTIQUE</a>
        </nav>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Copyright Ultra Times © 2023. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;