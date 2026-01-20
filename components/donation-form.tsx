"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"
import { Heart, Loader2, CheckCircle } from "lucide-react"

const PRESET_AMOUNTS = [501, 1001, 2101, 5001, 11001, 21001]

interface DonationFormProps {
  onSuccess?: () => void
}

export function DonationForm({ onSuccess }: DonationFormProps) {
  const [amount, setAmount] = useState<number>(1001)
  const [customAmount, setCustomAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleAmountSelect = (value: number) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!donorName.trim()) {
      setError("Please enter your name")
      setIsLoading(false)
      return
    }

    if (amount < 1) {
      setError("Please enter a valid amount")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase.from("donations").insert({
        donor_name: isAnonymous ? "Anonymous" : donorName.trim(),
        phone: phone.trim() || null,
        amount: amount,
        donation_type: "general",
        message: message.trim() || null,
        is_anonymous: isAnonymous,
      })

      if (insertError) throw insertError

      setIsSuccess(true)
      onSuccess?.()

      // Reset form after success
      setTimeout(() => {
        setDonorName("")
        setPhone("")
        setMessage("")
        setIsAnonymous(false)
        setAmount(1001)
        setCustomAmount("")
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      console.error("[v0] Donation error:", err)
      setError("Failed to process donation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-primary/20 p-4">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-foreground">Thank You!</h3>
        <p className="text-muted-foreground">Your generous donation of ₹{amount.toLocaleString()} has been recorded.</p>
        <p className="mt-2 text-sm text-muted-foreground">May Lord Hanuman bless you abundantly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Preset Amount Selection */}
      <div className="space-y-3">
        <Label className="text-foreground">Select Amount (₹)</Label>
        <div className="grid grid-cols-3 gap-2">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleAmountSelect(preset)}
              className={`rounded-lg border-2 px-4 py-3 text-center font-semibold transition-all ${
                amount === preset && !customAmount
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-foreground hover:border-primary/50"
              }`}
            >
              ₹{preset.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div className="space-y-2">
        <Label htmlFor="customAmount" className="text-foreground">
          Or Enter Custom Amount
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
          <Input
            id="customAmount"
            type="number"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="pl-8 bg-input border-border text-foreground placeholder:text-muted-foreground"
            min="1"
          />
        </div>
      </div>

      {/* Donor Name */}
      <div className="space-y-2">
        <Label htmlFor="donorName" className="text-foreground">
          Your Name *
        </Label>
        <Input
          id="donorName"
          placeholder="Enter your full name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          required
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground">
          Phone Number (Optional)
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          Message (Optional)
        </Label>
        <Textarea
          id="message"
          placeholder="Leave a prayer or message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
          rows={3}
        />
      </div>

      {/* Anonymous Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
        />
        <Label htmlFor="anonymous" className="text-sm text-muted-foreground cursor-pointer">
          Make my donation anonymous
        </Label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Heart className="mr-2 h-5 w-5" />
            Donate ₹{amount.toLocaleString()}
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Your donation supports the sacred reconstruction of Sri Hanuman Mandir
      </p>
    </form>
  )
}
