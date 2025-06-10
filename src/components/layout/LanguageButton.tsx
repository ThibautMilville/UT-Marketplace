import React from 'react'
import { LanguageButtonProps } from '../../types/header.types'

const flagIcons = {
  en: '🇺🇸',
  fr: '🇫🇷', 
  de: '🇩🇪'
}

const LanguageButton = ({ lang, isActive, onClick }: LanguageButtonProps) => (
  <button
    onClick={() => onClick(lang)}
    className={`w-full px-3 py-2 text-left text-sm transition-colors rounded-lg flex items-center justify-center ${
      isActive 
        ? 'bg-purple-600/20 text-purple-400' 
        : 'text-gray-400 hover:text-purple-400 hover:bg-gray-800/50'
    }`}
    role="menuitem"
  >
    <span className="text-lg">{flagIcons[lang]}</span>
  </button>
)

export default LanguageButton 