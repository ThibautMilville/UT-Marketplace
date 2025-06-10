import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKey } from '../translations'

interface TranslationContextType {
  currentLang: Language
  setCurrentLang: (lang: Language) => void
  t: (key: TranslationKey, params?: Record<string, any>) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const getBrowserLanguage = (): Language => {
  // Essayer d'abord de récupérer la langue depuis l'URL
  const urlLang = window.location.pathname.split('/')[1];
  if (urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') {
    return urlLang as Language;
  }
  
  // Sinon, utiliser la langue du navigateur
  const lang = navigator.language.toLowerCase().split('-')[0]
  if (lang === 'fr' || lang === 'en' || lang === 'de') {
    return lang as Language
  }
  return 'fr'
}

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language
    return savedLang || getBrowserLanguage()
  })

  useEffect(() => {
    localStorage.setItem('language', currentLang)
  }, [currentLang])

  // Écouter les changements d'URL pour mettre à jour la langue
  useEffect(() => {
    const handleLocationChange = () => {
      const urlLang = window.location.pathname.split('/')[1];
      if ((urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') && urlLang !== currentLang) {
        setCurrentLang(urlLang as Language);
      }
    };

    // Écouter les changements de navigation
    window.addEventListener('popstate', handleLocationChange);
    
    // Vérifier immédiatement
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [currentLang])

  const t = (key: TranslationKey, params?: Record<string, any>): string => {
    const translation = translations[currentLang][key]
    if (typeof translation === 'string' && params) {
      return translation.replace(/\{(\w+)\}/g, (_, key) => {
        return params[key]?.toString() || `{${key}}`
      })
    }
    return translation
  }

  return (
    <TranslationContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
} 