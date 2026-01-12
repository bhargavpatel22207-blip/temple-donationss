"use client"

import { Instagram, Heart, Phone, Mail, Images } from "lucide-react"

interface FooterProps {
  onAboutClick: () => void
  onPurposeClick: () => void
  onContactClick: () => void
  onRefundClick: () => void
  onPrivacyClick: () => void
  onTermsClick: () => void
  onGalleryClick: () => void // Added gallery click handler
}

export function Footer({
  onAboutClick,
  onPurposeClick,
  onContactClick,
  onRefundClick,
  onPrivacyClick,
  onTermsClick,
  onGalleryClick,
}: FooterProps) {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Temple Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-xl">🙏</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Tatpally Hanuman Mandir</h3>
                <p className="text-xs text-muted-foreground">Thatpally Village</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A sacred shrine dedicated to Lord Hanuman, serving the spiritual needs of devotees for generations.
            </p>
          </div>

          {/* Quick Links - Added Gallery */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onGalleryClick}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Images className="h-4 w-4" />
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={onAboutClick} className="text-muted-foreground hover:text-primary transition-colors">
                  About the Temple
                </button>
              </li>
              <li>
                <button onClick={onPurposeClick} className="text-muted-foreground hover:text-primary transition-colors">
                  Purpose of Donation
                </button>
              </li>
              <li>
                <button onClick={onContactClick} className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:9441424659" className="hover:text-primary transition-colors">
                  9441424659
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:basava.naveen2298@gmail.com"
                  className="hover:text-primary transition-colors text-xs md:text-sm"
                >
                  basava.naveen2298@gmail.com
                </a>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <button onClick={onRefundClick} className="text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={onPrivacyClick} className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onTermsClick} className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>

            <a
              href="https://www.instagram.com/hanumantemplethatpally?igsh=bGFtb3VvdHlhdDB2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
              @hanumantemplethatpally
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary" /> for Tatpally Hanuman Mandir
          </p>
          <p className="text-xs text-primary mt-2">Jai Shri Ram - Jai Hanuman</p>
        </div>
      </div>
    </footer>
  )
}
