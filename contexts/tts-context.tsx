"use client"

import { createContext, useContext, useState, useCallback } from 'react'

interface TTSContextType {
  isEnabled: boolean
  toggleTTS: () => void
  speak: (text: string) => void
}

const TTSContext = createContext<TTSContextType | undefined>(undefined)

export function TTSProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleTTS = useCallback(() => {
    setIsEnabled(prev => !prev)
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!isEnabled) return
    
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    window.speechSynthesis.speak(utterance)
  }, [isEnabled])

  return (
    <TTSContext.Provider value={{ isEnabled, toggleTTS, speak }}>
      {children}
    </TTSContext.Provider>
  )
}

export function useTTS() {
  const context = useContext(TTSContext)
  if (context === undefined) {
    throw new Error('useTTS must be used within a TTSProvider')
  }
  return context
} 