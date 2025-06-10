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
    console.log('TranslationProvider init - savedLang:', savedLang)
    const initialLang = savedLang || getBrowserLanguage()
    console.log('TranslationProvider init - initialLang:', initialLang)
    return initialLang
  })

  useEffect(() => {
    console.log('TranslationProvider - saving language to localStorage:', currentLang)
    localStorage.setItem('language', currentLang)
  }, [currentLang])

  // Synchroniser avec l'URL au chargement initial seulement
  useEffect(() => {
    const urlLang = window.location.pathname.split('/')[1];
    console.log('TranslationProvider - initial URL check - urlLang:', urlLang, 'currentLang:', currentLang)
    if ((urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') && urlLang !== currentLang) {
      console.log('TranslationProvider - initial language sync from', currentLang, 'to', urlLang)
      setCurrentLang(urlLang as Language);
    }
  }, []) // Seulement au montage initial

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