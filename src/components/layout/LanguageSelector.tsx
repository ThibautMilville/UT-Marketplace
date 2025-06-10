import React from 'react'
import { LanguageSelectorProps } from '../../types/header.types'

const flagIcons = {
  en: '🇺🇸',
  fr: '🇫🇷', 
  de: '🇩🇪'
}

const LanguageSelector = ({
  isOpen, 
  setIsOpen, 
  currentLang, 
  handleLanguageChange, 
  getCurrentFlag, 
  langMenuRef
}: LanguageSelectorProps) => (
  <div className='relative' ref={langMenuRef}>
    <button
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen(!isOpen)
      }}
      className='flex items-center space-x-2 text-white hover:text-gray-300 transition-colors focus:outline-none text-sm font-medium px-4 py-2.5'
      aria-label='Select language'
      aria-expanded={isOpen}
      aria-controls='language-menu'
      type='button'>
      {getCurrentFlag()}
      <span>{currentLang.toUpperCase()}</span>
    </button>
    {isOpen && (
      <div 
        id='language-menu' 
        className='absolute top-full right-0 mt-2 w-20 bg-black/90 backdrop-blur-sm rounded-xl shadow-lg py-2 border border-gray-700 z-50' 
        role='menu' 
        aria-orientation='vertical' 
        aria-labelledby='language-menu'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {['en', 'fr', 'de'].map(lang => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang as 'en' | 'fr' | 'de')}
            className={`w-full px-3 py-2 text-left text-sm transition-colors rounded-lg flex items-center space-x-2 ${
              currentLang === lang 
                ? 'bg-purple-600/20 text-purple-400' 
                : 'text-gray-400 hover:text-purple-400 hover:bg-gray-800/50'
            }`}
            role="menuitem"
          >
            <span className="text-base">{flagIcons[lang as keyof typeof flagIcons]}</span>
            <span className="text-xs font-medium">{lang.toUpperCase()}</span>
          </button>
        ))}
      </div>
    )}
  </div>
)

export default LanguageSelector 