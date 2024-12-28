"use client"

import { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { VolumeX, Volume2 } from 'lucide-react'

export function TextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis)
      setSpeechUtterance(new SpeechSynthesisUtterance())
    }
  }, [])

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking()
    } else {
      startSpeaking()
    }
  }

  const startSpeaking = () => {
    if (speechSynthesis && speechUtterance) {
      speechSynthesis.cancel() // Stop any ongoing speech
      const textToRead = document.body.innerText
      speechUtterance.text = textToRead
      speechSynthesis.speak(speechUtterance)
      setIsSpeaking(true)

      speechUtterance.onend = () => {
        setIsSpeaking(false)
      }
    }
  }

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggleSpeech}
      aria-label={isSpeaking ? "Stop reading" : "Read page content"}
      title={isSpeaking ? "Stop reading" : "Read page content"}
    >
      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </Button>
  )
}

