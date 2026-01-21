"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  Heart,
  Loader2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Gift,
  Copy,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { GlowingButton } from "./glowing-button"

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id?: string
  handler: (response: RazorpayResponse) => void
  prefill: {
    name: string
    email?: string
    contact?: string
  }
  theme: {
    color: string
  }
  modal?: {
    ondismiss?: () => void
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

interface RazorpayInstance {
  open: () => void
  close: () => void
}

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (donorName: string, amount: number) => void
}

const PRESET_AMOUNTS = [500, 1000, 5000, 10000]
const UPI_ID = "9441424659-3@ybl" // replace with your real UPI ID
const PAYEE_NAME = encodeURIComponent("tatpally hanuman madir")

function generateToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let token = "THP-" // Tatpally Hanuman Prasadam
  for (let i = 0; i < 8; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}
function openUPI(amount: number) {
  const TRANSACTION_NOTE = encodeURIComponent("Tatpally")
  const link =
    `upi://pay?pa=${UPI_ID}` +
    `&pn=${PAYEE_NAME}` +
    `&am=${amount}` +
    `&cu=INR` +
    `&tn=${TRANSACTION_NOTE}`

  window.location.href = link
}


export function DonationModal({ isOpen, onClose, onSuccess }: DonationModalProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [razorpayKey, setRazorpayKey] = useState<string>("")
  const [donationToken, setDonationToken] = useState<string>("")
  const [isCopied, setIsCopied] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  // Load Razorpay script and fetch key
  useEffect(() => {
  // Razorpay disabled
}, [])


  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setAmount(1000)
        setCustomAmount("")
        setDonorName("")
        setPhone("")
        setEmail("")
        setIsSuccess(false)
        setErrors({})
        setDonationToken("")
        setIsCopied(false)
      }, 300)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!donorName.trim()) {
      newErrors.name = "Name is required"
    }

    if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(donationToken)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = donationToken
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const RECEIVER_NAME = "PNK BUILDERS AND DEVELOPERS" // must match PhonePe exactly

const handleSubmit = async () => {
  if (!validateStep2()) return

  const proceed = window.confirm(s
    "Receiver Name (as shown in PhonePe): " + RECEIVER_NAME + "\n\n" +
    "If your payment is successful, we will update it in the website in a short span of time.\n\n" +
    "IMPORTANT:\n" +
    "Before entering your UPI PIN, please confirm that the receiver name shown in PhonePe matches the name above.\n" +
    "Proceed with payment only if the name matches."
  )

  if (!proceed) return

  openUPI(amount)
}




  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={isSuccess ? undefined : onClose} />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto",
          "transition-all duration-500 ease-out",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        {/* Close Button - Hidden on success to encourage screenshot */}
        {!isSuccess && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}

        {isSuccess ? (
          <div ref={successRef} className="p-8 text-center" id="donation-success">
            <div
              className={cn(
                "mb-6 mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center",
                "animate-in zoom-in duration-500",
              )}
            >
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">Thank You, {donorName}!</h3>
            <p className="text-muted-foreground mb-6">
              Your generous donation of Rs.{amount.toLocaleString()} has been received.
            </p>

            {/* Token Display */}
            <div className="bg-secondary/50 border border-primary/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Your Donation Token</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-primary tracking-wider">{donationToken}</span>
                <button
                  onClick={copyToken}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label="Copy token"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Inauguration Gift Message */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
              <Gift className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-bold text-foreground mb-2">Special Gift Awaits!</h4>
              <p className="text-sm text-muted-foreground">
                You will be gifted with sacred prasadam and blessings at the time of inauguration of the temple. Please
                save this token and present it during the inauguration ceremony.
              </p>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Please take a screenshot of this page for your records.
            </p>

            <p className="text-sm text-primary font-medium mb-6">May Lord Hanuman bless you abundantly</p>

            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 border-b border-border text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Support the Temple</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {step === 1 ? "Select donation amount" : "Enter your details"}
              </p>

              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className={cn("w-8 h-1 rounded-full transition-colors", step >= 1 ? "bg-primary" : "bg-border")} />
                <div className={cn("w-8 h-1 rounded-full transition-colors", step >= 2 ? "bg-primary" : "bg-border")} />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step 1: Amount Selection */}
              <div
                className={cn(
                  "transition-all duration-500",
                  step === 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute",
                )}
              >
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {PRESET_AMOUNTS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setAmount(preset)
                            setCustomAmount("")
                          }}
                          className={cn(
                            "rounded-xl border-2 px-4 py-4 text-center font-semibold transition-all",
                            amount === preset && !customAmount
                              ? "border-primary bg-primary/10 text-primary scale-105"
                              : "border-border bg-secondary text-foreground hover:border-primary/50",
                          )}
                        >
                          Rs.{preset.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Or enter custom amount</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                          Rs.
                        </span>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            const num = Number.parseInt(e.target.value)
                            if (!isNaN(num) && num > 0) setAmount(num)
                          }}
                          className="pl-10 h-12 text-lg bg-input border-border"
                          min="1"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      className="w-full mt-6 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Step 2: Details */}
              <div
                className={cn(
                  "transition-all duration-500",
                  step === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute",
                )}
              >
                {step === 2 && (
                  <>
                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                          <User className="h-4 w-4" />
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className={cn("h-12 bg-input border-border", errors.name && "border-destructive")}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={cn("h-12 bg-input border-border", errors.phone && "border-destructive")}
                        />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={cn("h-12 bg-input border-border", errors.email && "border-destructive")}
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                    </div>

                    {errors.submit && <p className="mt-4 text-sm text-destructive text-center">{errors.submit}</p>}
                    <p className="mt-3 text-center text-sm text-destructive">
  Receiver Name (as shown in PhonePe):{" "}
  <span className="font-semibold">PNK BUILDERS AND DEVELOPERS</span>
</p>
<p className="mt-1 text-center text-xs text-destructive">
  Please confirm this name in PhonePe before entering your UPI PIN.
  Proceed only if the name matches.
</p>


                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 border-border">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <GlowingButton onClick={handleSubmit} disabled={isLoading} className="flex-1 h-12">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>Pay Rs.{amount.toLocaleString()}</>
                        )}
                      </GlowingButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}


