"use client"

import { useState, useEffect } from "react"
import { Menu, X, Instagram, Heart, Calendar, Images } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onDonateClick: () => void
  onAboutClick: () => void
  onPurposeClick: () => void
  onContactClick: () => void
  onRefundClick: () => void
  onPrivacyClick: () => void
  onTermsClick: () => void
  onGalleryClick: () => void // Added gallery click handler
}

export function Header({
  onDonateClick,
  onAboutClick,
  onPurposeClick,
  onContactClick,
  onRefundClick,
  onPrivacyClick,
  onTermsClick,
  onGalleryClick,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg shadow-background/50"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Donate Button */}
          <Button
            onClick={onDonateClick}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            <Heart className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Donate</span>
          </Button>

          {/* Center: Daily Updates */}
          <a
            href="https://www.instagram.com/hanumantemplethatpally?igsh=bGFtb3VvdHlhdDB2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Daily Updates</span>
          </a>

          {/* Right: Gallery + Instagram + Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGalleryClick}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Gallery"
            >
              <Images className="h-5 w-5" />
            </button>

            <a
              href="https://www.instagram.com/hanumantemplethatpally?igsh=bGFtb3VvdHlhdDB2"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="pb-4 border-t border-border">
            <nav className="flex flex-col gap-1 pt-4">
              <button
                onClick={() => {
                  onGalleryClick()
                  closeMobileMenu()
                }}
                className="text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-2"
              >
                <Images className="h-4 w-4" />
                Gallery
              </button>
              <button
                onClick={() => {
                  onAboutClick()
                  closeMobileMenu()
                }}
                className="text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                About Temple
              </button>
              <button
                onClick={() => {
                  onPurposeClick()
                  closeMobileMenu()
                }}
                className="text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                Purpose of Donation
              </button>
              <button
                onClick={() => {
                  onContactClick()
                  closeMobileMenu()
                }}
                className="text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                Contact
              </button>
              <div className="h-px bg-border my-2" />
              <button
                onClick={() => {
                  onRefundClick()
                  closeMobileMenu()
                }}
                className="text-left px-4 py-3 text-sm text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                Refund Policy
              </button>
              <button
                onClick={() => {
                  onPrivacyClick()
                  closeMobileMenu()
                }}
                className="text-left px-4 py-3 text-sm text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => {
                  onTermsClick()
                  closeMobileMenu()
                }}
                className="text-left px-4 py-3 text-sm text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                Terms & Conditions
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
