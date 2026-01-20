"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface Donation {
  id: string
  donor_name: string
  amount: number
  message: string | null
  is_anonymous: boolean
  created_at: string
}

interface RecentDonationsProps {
  onNewDonation?: (donation: Donation) => void
}

export function RecentDonations({ onNewDonation }: RecentDonationsProps) {
  const [donations, setDonations] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { ref, isVisible, reset } = useScrollAnimation<HTMLDivElement>()
  console.log("DONATIONS:", donations)


  useEffect(() => {
    const fetchDonations = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false })
if (!error && data) {
  setDonations(data)
}

      setIsLoading(false)
    }

    fetchDonations()

    // Set up real-time subscription
    const supabase = createClient()
    const channel = supabase
      .channel("donations")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "donations" }, (payload) => {
        const newDonation = payload.new as Donation
        setDonations((prev) => [newDonation, ...prev])
        onNewDonation?.(newDonation)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [onNewDonation])

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
 return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }) + " · " + date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}
 if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg bg-secondary p-4">
            <div className="h-4 w-1/3 rounded bg-muted mb-2" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  if (donations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>Be the first to donate!</p>
      </div>
    )
  }

  return (
<div
  ref={ref}
  className="space-y-3 max-h-[420px] overflow-y-auto pr-2 no-scrollbar"
>

      {donations.map((donation, index) => (
        <div
          key={donation.id}
          className="rounded-lg bg-secondary/50 border border-border p-4 transition-all hover:bg-secondary"

          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-foreground">
              {donation.is_anonymous ? "Anonymous" : donation.donor_name}
            </span>
            <span className="text-primary font-bold">₹{donation.amount.toLocaleString()}</span>
          </div>
          {donation.message && (
            <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{`"${donation.message}"`}</p>
          )}
  <p className="text-xs text-muted-foreground">
  {formatDateTime(donation.created_at)}
</p>
        </div>
      ))}
    </div>
  )
}

