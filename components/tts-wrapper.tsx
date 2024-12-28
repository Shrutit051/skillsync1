"use client"

import { useTTS } from '../contexts/tts-context'

export function TTSWrapper({ children }: { children: React.ReactNode }) {
  const { speak } = useTTS()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.textContent) {
      speak(target.textContent.trim())
    }
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  )
} 