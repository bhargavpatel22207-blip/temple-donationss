"use client"

import type React from "react"

import { useEffect } from "react"
import { X, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "./scroll-reveal"

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function InfoModal({ isOpen, onClose, title, children }: InfoModalProps) {
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        "transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={onClose} />

      {/* Content */}
      <div
        className={cn(
          "absolute inset-0 overflow-y-auto",
          "transition-all duration-500 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="min-h-screen flex items-start justify-center py-20 px-4">
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-muted-foreground" />
            </button>

            {/* Header */}
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground pr-8">{title}</h2>
            </div>

            {/* Body */}
            <div className="p-6">
              <ScrollReveal>
                <div className="prose prose-invert max-w-none">{children}</div>
              </ScrollReveal>

              {title === "Contact Us" && (
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-foreground">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href="tel:9441424659" className="font-semibold hover:text-primary transition-colors">
                        9441424659
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href="mailto:basava.naveen2298@gmail.com"
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        basava.naveen2298@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
