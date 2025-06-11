import React from 'react';
import { X, Twitter, Instagram, Facebook, Link, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

const ShareModal = ({ isOpen, onClose, title, description, imageUrl, url }: ShareModalProps) => {
  if (!isOpen) return null;

  const currentUrl = url || window.location.href;
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description || `Découvrez ${title} sur Ultra Marketplace`);
  const shareImage = encodeURIComponent(imageUrl || '');

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${shareTitle}`,
      color: 'hover:bg-blue-600/20 hover:text-blue-500 hover:border-blue-600/30'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: '#', // Instagram ne permet pas le partage direct via URL
      color: 'hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30',
      onClick: () => {
        navigator.clipboard.writeText(`${title} - ${currentUrl}`);
        alert('Lien copié ! Vous pouvez maintenant le partager sur Instagram.');
      }
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: '#',
      color: 'hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30',
      onClick: () => {
        navigator.clipboard.writeText(`**${title}**\n${description}\n${currentUrl}`);
        alert('Message copié ! Vous pouvez maintenant le partager sur Discord.');
      }
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Lien copié dans le presse-papier !');
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      // Fallback pour les navigateurs qui ne supportent pas clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Lien copié dans le presse-papier !');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl border border-[#7A52D1]/30 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white">Partager</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
            <div className="flex items-start space-x-3">
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm mb-1 truncate">{title}</h3>
                {description && (
                  <p className="text-gray-400 text-xs line-clamp-2">{description}</p>
                )}
                <p className="text-[#7A52D1] text-xs mt-2 truncate">{currentUrl}</p>
              </div>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Partager sur les réseaux sociaux</h3>
            <div className="grid grid-cols-2 gap-3">
              {shareLinks.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <button
                    key={platform.name}
                    onClick={platform.onClick || (() => window.open(platform.url, '_blank', 'width=600,height=400'))}
                    className={`flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 text-gray-300 transition-all duration-200 ${platform.color}`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-300">Copier le lien</h3>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3">
                <p className="text-white text-sm truncate">{currentUrl}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-3 bg-[#7A52D1] hover:bg-[#6A42C1] text-white rounded-xl transition-colors font-medium"
              >
                <Link className="w-4 h-4" />
                <span>Copier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 