import { useState, useEffect, useRef } from 'react'
import { useUltraWallet } from './useUltraWallet'

export const useHeaderActions = () => {
  const { blockchainId, isConnected, connect, disconnect, error } = useUltraWallet()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [lastErrorMessage, setLastErrorMessage] = useState<string | null>(null)
  const [userInitiated, setUserInitiated] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const mobileProfileDropdownRef = useRef<HTMLDivElement>(null)
  const langMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // State tracking for debugging if needed
  }, [blockchainId, isConnected, error, isProfileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      
      const target = event.target as HTMLElement
      const isLanguageButton = target.closest('[role="menuitem"]')

      if (isLanguageButton) {
        return
      }

      // Vérifier si le clic est sur le bouton de profil ou ses enfants
      const isProfileButton = target.closest('button')?.textContent?.includes('...') || 
                             target.closest('.bg-purple-600');
      
      if (isProfileButton) {
        return;
      }

      // Vérifier si le clic est dans le dropdown (desktop ou mobile)
      const isInsideDropdown = (profileDropdownRef.current && profileDropdownRef.current.contains(event.target as Node)) ||
                              (mobileProfileDropdownRef.current && mobileProfileDropdownRef.current.contains(event.target as Node));

      if (isInsideDropdown) {
        return;
      }

      // Fermer le dropdown seulement si le clic est vraiment à l'extérieur
      if (isProfileOpen) {
        setIsProfileOpen(false);
      }

      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileOpen])

  useEffect(() => {
    if (error && error !== lastErrorMessage && userInitiated) {
      console.error('Wallet error:', error)
      setLastErrorMessage(error)
    }
  }, [error, lastErrorMessage, userInitiated])

  const handleConnect = async () => {
    setUserInitiated(true)
    const isConnected = await connect()

    if (!isConnected) {
      // Connection failed
    } else {
      // Wallet connected successfully
    }
  }

  const handleDisconnect = async () => {
    setUserInitiated(true)
    setIsProfileOpen(false)
    
    try {
      const isDisconnected = await disconnect()

      if (isDisconnected) {
        // Wallet disconnected successfully
      } else {
        // Disconnect was cancelled or failed
      }
    } catch (err) {
      console.error('Error during disconnect:', err)
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return {
    blockchainId,
    isConnected,
    isMenuOpen,
    isProfileOpen,
    isLangMenuOpen,
    profileDropdownRef,
    mobileProfileDropdownRef,
    langMenuRef,
    handleConnect,
    handleDisconnect,
    toggleMenu,
    closeMenu,
    setIsProfileOpen,
    setIsLangMenuOpen,
  }
} 