"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { GlowingButton } from "./glowing-button"
import { cn } from "@/lib/utils"

interface StickyDonateBarProps {
  onDonateClick: () => void
}

export function StickyDonateBar({ onDonateClick }: StickyDonateBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ease-out",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="bg-background/95 backdrop-blur-md border-t border-border py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground hidden sm:block">
            Support the sacred reconstruction of Sri Hanuman Mandir
          </p>
          <GlowingButton onClick={onDonateClick} size="sm" className="w-full sm:w-auto">
            <Heart className="mr-2 h-4 w-4" />
            Donate Now
          </GlowingButton>
        </div>
      </div>
    </div>
  )
}
