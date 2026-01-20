"use client"

import { useState, useEffect, useCallback } from "react"
import { Heart, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

interface ThankYouNoteProps {
  donorName: string | null
  amount: number | null
}

export function ThankYouNote({ donorName: propDonorName, amount: propAmount }: ThankYouNoteProps) {
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentDonor, setCurrentDonor] = useState<{ name: string; amount: number } | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Fetch the most recent donation
    const fetchLatestDonation = async () => {
      const { data } = await supabase
        .from("donations")
        .select("donor_name, amount")
        .eq("is_anonymous", false)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      if (data) {
        setCurrentDonor({ name: data.donor_name, amount: data.amount })
      }
    }

    fetchLatestDonation()

    // Subscribe to new donations
    const channel = supabase
      .channel("thank-you-donations")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "donations",
        },
        (payload) => {
          if (!payload.new.is_anonymous) {
            setCurrentDonor({
              name: payload.new.donor_name,
              amount: payload.new.amount,
            })
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Use prop donor if provided, otherwise use the one from subscription
  const activeDonor = propDonorName ? { name: propDonorName, amount: propAmount || 0 } : currentDonor

  const fullText = activeDonor
    ? `Thank you, ${activeDonor.name}! Your generous donation of Rs.${activeDonor.amount?.toLocaleString()} will help us build a magnificent temple. May Lord Hanuman bless you with strength, wisdom, and prosperity. Jai Hanuman!`
    : "Every donation brings us closer to our dream of building a grand temple for Lord Hanuman. Your contribution, no matter how small, makes a big difference. Jai Hanuman!"

  const animateText = useCallback(() => {
    setIsAnimating(true)
    setDisplayText("")
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [fullText])

  useEffect(() => {
    if (activeDonor) {
      const cleanup = animateText()
      return cleanup
    } else {
      setDisplayText(fullText)
    }
  }, [activeDonor, animateText, fullText])

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl -z-10" />

      <div className="relative bg-gradient-to-br from-card to-card/50 border border-primary/20 rounded-2xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-foreground flex items-center gap-2">
              Gratitude
              {activeDonor && <Sparkles className="h-4 w-4 text-primary animate-pulse" />}
            </h4>
            <p className="text-xs text-muted-foreground">
              {activeDonor ? `For ${activeDonor.name}` : "Message from Temple"}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="relative">
          <p className={cn("text-muted-foreground leading-relaxed min-h-[100px]", activeDonor && "text-foreground")}>
            {displayText}
            {isAnimating && <span className="animate-pulse text-primary">|</span>}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs text-primary font-medium">Jai Shri Ram</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/50"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
