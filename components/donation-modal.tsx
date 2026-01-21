"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  Heart,
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
import { cn } from "@/lib/utils"
import { GlowingButton } from "./glowing-button"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
}

const PRESET_AMOUNTS = [500, 1000, 5000, 10000]

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setAmount(1000)
        setCustomAmount("")
        setDonorName("")
        setPhone("")
        setEmail("")
        setShowQR(false)
      }, 300)
    }
  }, [isOpen])

  const validateStep2 = () => {
    if (!donorName.trim()) return false
    return true
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-border text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Support the Temple</h2>
          <p className="text-sm text-muted-foreground">
            {step === 1 ? "Select donation amount" : "Enter your details"}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setAmount(preset)
                      setCustomAmount("")
                    }}
                    className={cn(
                      "rounded-xl border-2 px-4 py-4 font-semibold",
                      amount === preset
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary"
                    )}
                  >
                    Rs.{preset.toLocaleString()}
                  </button>
                ))}
              </div>

              <Label>Or enter custom amount</Label>
              <Input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  const num = Number(e.target.value)
                  if (!isNaN(num)) setAmount(num)
                }}
              />

              <Button className="w-full mt-6" onClick={() => setStep(2)}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="space-y-4">
                <Label>Your Name *</Label>
                <Input value={donorName} onChange={(e) => setDonorName(e.target.value)} />

                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />

                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <p className="mt-4 text-sm text-destructive text-center">
                Receiver Name (as shown in PhonePe):{" "}
                <span className="font-semibold">PATIL NAVEEN KUMAR</span>
              </p>
              <p className="mt-4 text-sm text-destructive text-center">
                If your payment is successful, your bank account name will appear in the Recent Donations section. Your donor name will be verified and updated on the website within a short span of time.
              </p>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <GlowingButton
                  onClick={() => {
                    if (!validateStep2()) return
                    setShowQR(true)
                  }}
                  className="flex-1"
                >
                  Pay Rs.{amount.toLocaleString()}
                </GlowingButton>
              </div>

              {showQR && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Open your UPI app and make the payment by scanning this QR
                  </p>

                  <img
                    src="/1.jpeg"
                    alt="UPI QR Code"
                    className="mx-auto rounded-lg"
                  />

                  <p className="mt-3 text-xs text-muted-foreground">
                    After successful payment, we will update the website shortly.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}



