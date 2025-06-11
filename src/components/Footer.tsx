import React, { useState, useEffect } from 'react'
import { Instagram, Twitter, Youtube, Twitch, MessageCircle, Mail, Heart, ExternalLink, ArrowUp } from 'lucide-react'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const updateYear = () => {
      setCurrentYear(new Date().getFullYear())
    }
    
    // Mettre à jour l'année chaque minute pour être sûr
    const interval = setInterval(updateYear, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: 'https://x.com/Ultra_TimesEN', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/ultratimes/', color: 'hover:text-pink-400' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@ultra-times', color: 'hover:text-red-400' },
    { name: 'Twitch', icon: Twitch, url: 'https://www.twitch.tv/ultratimes', color: 'hover:text-purple-400' },
    { name: 'Discord', icon: MessageCircle, url: 'https://discord.com/invite/Pgh85akHj8', color: 'hover:text-indigo-400' } // MessageCircle pour Discord
  ]

  const footerLinks = {
    marketplace: {
      title: 'Marketplace',
      links: [
        { name: 'Explorer', href: '/marketplace' },
        { name: 'Collections', href: '/collections' },
        { name: 'Statistiques', href: '/statistics' },
        { name: 'Transactions', href: '/transactions' }
      ]
    },
    resources: {
      title: 'Ressources',
      links: [
        { name: 'Documentation', href: 'https://docs.ultra.io', external: true },
        { name: 'API', href: 'https://api.ultra.io', external: true },
        { name: 'Support', href: 'https://support.ultra.io', external: true },
        { name: 'Blog', href: 'https://blog.ultra.io', external: true }
      ]
    },
    company: {
      title: 'Ultra',
      links: [
        { name: 'À propos', href: 'https://ultra.io/about', external: true },
        { name: 'Carrières', href: 'https://ultra.io/careers', external: true },
        { name: 'Partenaires', href: 'https://ultra.io/partners', external: true },
        { name: 'Presse', href: 'https://ultra.io/press', external: true }
      ]
    }
  }

  const legalLinks = [
    { name: 'Conditions d\'utilisation', href: '/terms' },
    { name: 'Politique de confidentialité', href: '/privacy' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Mentions légales', href: '/legal' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-black via-[#7A52D1]/5 to-black border-t border-[#7A52D1]/20">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-[#7A52D1]/10 via-transparent to-blue-600/10"></div>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo_UT_blanc_hor.png" 
                alt="Ultra Times" 
                className="h-8 object-contain"
              />
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              La première marketplace NFT de l'écosystème Ultra. Découvrez, achetez et vendez des NFTs uniques avec une expérience utilisateur révolutionnaire.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800/50 hover:bg-[#7A52D1]/20 rounded-xl transition-all duration-200 text-gray-400 ${social.color} group`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Liens */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-white font-bold text-lg mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-[#7A52D1] transition-colors duration-200 flex items-center group"
                    >
                      <span>{link.name}</span>
                      {link.external && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-[#7A52D1]/10 to-blue-600/10 rounded-2xl p-8 mb-12 border border-[#7A52D1]/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">Restez informé</h3>
              <p className="text-gray-400">Recevez les dernières actualités et mises à jour de la marketplace Ultra Times</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#7A52D1] focus:outline-none transition-colors min-w-[300px]"
              />
              <button className="px-6 py-3 bg-[#7A52D1] hover:bg-[#6A42C1] text-white rounded-xl transition-colors font-medium whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#7A52D1] mb-2">24.5K+</div>
            <div className="text-gray-400">NFTs Tradés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#7A52D1] mb-2">8.2K+</div>
            <div className="text-gray-400">Utilisateurs Actifs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#7A52D1] mb-2">2.4M</div>
            <div className="text-gray-400">Volume Total (UOS)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#7A52D1] mb-2">234</div>
            <div className="text-gray-400">Collections</div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright et liens légaux */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <span>© {currentYear} Ultra Times Marketplace.</span>
                <span>Fait avec</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>pour la communauté Ultra</span>
              </div>
              <div className="flex items-center space-x-4">
                {legalLinks.map((link, index) => (
                  <span key={link.name} className="flex items-center space-x-4">
                    <a
                      href={link.href}
                      className="hover:text-[#7A52D1] transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                    {index < legalLinks.length - 1 && <span className="text-gray-600">•</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Bouton retour en haut */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-[#7A52D1]/20 text-gray-400 hover:text-[#7A52D1] rounded-xl transition-all duration-200 group"
            >
              <span>Retour en haut</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Informations techniques */}
        <div className="mt-8 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span>Blockchain: Ultra Protocol</span>
              <span>•</span>
              <span>Version: 2.1.0</span>
              <span>•</span>
              <span>Statut: 🟢 Opérationnel</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer