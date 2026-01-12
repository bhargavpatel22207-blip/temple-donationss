"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Trophy, Medal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface Donation {
  id: string
  donor_name: string
  amount: number
  is_anonymous: boolean
}

export function TopDonors() {
  const [topDonors, setTopDonors] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  useEffect(() => {
    const fetchTopDonors = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("amount", { ascending: false })
        .limit(3)

      if (!error && data) {
        setTopDonors(data)
      }
      setIsLoading(false)
    }

    fetchTopDonors()

    // Real-time subscription
    const supabase = createClient()
    const channel = supabase
      .channel("top-donors")
      .on("postgres_changes", { event: "*", schema: "public", table: "donations" }, () => {
        fetchTopDonors()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const rankColors = [
    "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
    "from-gray-400/20 to-gray-500/10 border-gray-400/30",
    "from-amber-600/20 to-amber-700/10 border-amber-600/30",
  ]

  const rankIcons = [
    <Trophy key="1" className="h-6 w-6 text-yellow-500" />,
    <Medal key="2" className="h-6 w-6 text-gray-400" />,
    <Medal key="3" className="h-6 w-6 text-amber-600" />,
  ]

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-xl bg-secondary p-6 h-32" />
        ))}
      </div>
    )
  }

  if (topDonors.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Be the first top donor!</p>
      </div>
    )
  }

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-4">
      {topDonors.map((donor, index) => (
        <div
          key={donor.id}
          className={cn(
            "relative rounded-xl border bg-gradient-to-br p-6 transition-all hover:scale-105",
            rankColors[index] || "from-secondary to-secondary border-border",
            isVisible ? "animate-pop-in" : "opacity-0",
          )}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="absolute top-4 right-4">{rankIcons[index]}</div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">#{index + 1} Top Donor</p>
            <p className="text-xl font-bold text-foreground">{donor.is_anonymous ? "Anonymous" : donor.donor_name}</p>
            <p className="text-2xl font-bold text-primary">₹{donor.amount.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
