"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"

interface ThankYouToastProps {
  donorName: string
  amount: number
  isVisible: boolean
  onClose: () => void
}

export function ThankYouToast({ donorName, amount, isVisible, onClose }: ThankYouToastProps) {
  const [displayText, setDisplayText] = useState("")
  const fullText = `Thank you, ${donorName}!`

  useEffect(() => {
    if (isVisible) {
      setDisplayText("")
      let index = 0
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayText(fullText.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          // Auto close after 5 seconds
          setTimeout(onClose, 5000)
        }
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isVisible, fullText, onClose])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed top-24 right-4 z-50 max-w-sm",
        "transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full",
      )}
    >
      <div className="relative bg-card border border-primary/30 rounded-2xl p-6 shadow-2xl shadow-primary/20">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl -z-10" />

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 animate-pulse">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-bold text-lg text-foreground min-h-[28px]">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">Donated ₹{amount.toLocaleString()}</p>
            <p className="text-xs text-primary mt-2">May Lord Hanuman bless you</p>
          </div>
        </div>
      </div>
    </div>
  )
}
