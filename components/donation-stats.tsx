"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { IndianRupee, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface DonationStats {
  totalAmount: number
  totalDonors: number
}
function formatINR(amount: number) {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(2)}Cr`
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(2)}L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}


export function DonationStats() {
  const [stats, setStats] = useState<DonationStats>({ totalAmount: 0, totalDonors: 0 })
  const [displayAmount, setDisplayAmount] = useState(0)
  const [displayDonors, setDisplayDonors] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Fetch stats from Supabase
  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("donations").select("amount")

      if (!error && data) {
        const totalAmount = data.reduce((sum, d) => sum + d.amount, 0)
        const totalDonors = data.length
        setStats({ totalAmount, totalDonors })
      }
    }

    fetchStats()

    // Real-time subscription
    const supabase = createClient()
    const channel = supabase
      .channel("donation-stats")
      .on("postgres_changes", { event: "*", schema: "public", table: "donations" }, () => {
        fetchStats()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Intersection Observer for scroll-based animation
  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Animate counters based on visibility
  const animateCounters = useCallback(
    (targetAmount: number, targetDonors: number, countUp: boolean) => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      const duration = 1500
      const startTime = Date.now()
      const startAmount = displayAmount
      const startDonors = displayDonors

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)

        if (countUp) {
          setDisplayAmount(Math.floor(startAmount + (targetAmount - startAmount) * easeOut))
          setDisplayDonors(Math.floor(startDonors + (targetDonors - startDonors) * easeOut))
        } else {
          setDisplayAmount(Math.floor(startAmount * (1 - easeOut)))
          setDisplayDonors(Math.floor(startDonors * (1 - easeOut)))
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [displayAmount, displayDonors],
  )

  useEffect(() => {
    if (isVisible) {
      animateCounters(stats.totalAmount, stats.totalDonors, true)
    } else {
      animateCounters(0, 0, false)
    }
  }, [isVisible, stats.totalAmount, stats.totalDonors])

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-4 md:gap-8">
      {/* Total Amount Collected */}
      <div
        className={cn(
          "text-center p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20",
          "transition-all duration-500",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        )}
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
          <IndianRupee className="h-7 w-7 text-primary" />
        </div>
       <div className="font-bold text-primary mb-2 text-[clamp(1.5rem,3.5vw,3rem)] whitespace-nowrap text-center max-w-full">


          {formatINR(displayAmount)}
        </div>
        <p className="text-sm md:text-base text-muted-foreground">Total Collected</p>
      </div>

      {/* Total Donors */}
      <div
        className={cn(
          "text-center p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20",
          "transition-all duration-500 delay-100",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        )}
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
          <Users className="h-7 w-7 text-accent" />
        </div>
        <div className="font-bold text-primary mb-2 text-[clamp(1.5rem,3.5vw,3rem)] whitespace-nowrap text-center max-w-full">
{displayDonors.toLocaleString()}</div>
        <p className="text-sm md:text-base text-muted-foreground">Generous Donors</p>
      </div>
    </div>
  )
}
