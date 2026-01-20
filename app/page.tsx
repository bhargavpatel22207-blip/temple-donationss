"use client"

import { useState, useCallback } from "react"
import { Heart, Users, Building2, Target, Trophy, Phone, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionDivider } from "@/components/section-divider"
import { ParallaxImage } from "@/components/parallax-image"
import { GlowingButton } from "@/components/glowing-button"
import { StickyDonateBar } from "@/components/sticky-donate-bar"
import { DonationModal } from "@/components/donation-modal"
import { InfoModal } from "@/components/info-modal"
import { ThankYouToast } from "@/components/thank-you-toast"
import { StoryGallery } from "@/components/story-gallery"
import { TopDonors } from "@/components/top-donors"
import { RecentDonations } from "@/components/recent-donations"
import { DonationStats } from "@/components/donation-stats"
import { ThankYouNote } from "@/components/thank-you-note"
import { GalleryModal } from "@/components/gallery-modal"

const HERO_IMAGE = "/images/download.jpeg"

interface Donation {
  id: string
  donor_name: string
  amount: number
  message: string | null
  is_anonymous: boolean
  created_at: string
}

export default function HomePage() {
  // Modal states
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isPurposeModalOpen, setIsPurposeModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)

  // Thank you toast state
  const [thankYouData, setThankYouData] = useState<{ name: string; amount: number } | null>(null)

  const [latestDonor, setLatestDonor] = useState<{ name: string; amount: number } | null>(null)

  const handleDonationSuccess = useCallback((name: string, amount: number) => {
    setThankYouData({ name, amount })
    setLatestDonor({ name, amount })
  }, [])

  const closeThankYou = useCallback(() => {
    setThankYouData(null)
  }, [])

  const handleNewDonation = useCallback((donation: Donation) => {
    if (!donation.is_anonymous) {
      setLatestDonor({ name: donation.donor_name, amount: donation.amount })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header
        onDonateClick={() => setIsDonationModalOpen(true)}
        onAboutClick={() => setIsAboutModalOpen(true)}
        onPurposeClick={() => setIsPurposeModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onRefundClick={() => setIsRefundModalOpen(true)}
        onPrivacyClick={() => setIsPrivacyModalOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
        onGalleryClick={() => setIsGalleryModalOpen(true)}
      />

      {/* Hero Section with Parallax - Using the original temple image as background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParallaxImage src={HERO_IMAGE} alt="Tatpally Hanuman Mandir" className="absolute inset-0" speed={0.2} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <span className="text-primary text-sm font-medium">Jai Shri Ram</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Tatpally Hanuman
              <span className="block text-primary mt-2">Mandir</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Join us in rebuilding this sacred shrine dedicated to Lord Hanuman. Your generous contribution will help
              preserve our spiritual heritage for future generations.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowingButton size="lg" className="text-lg px-8 py-6" onClick={() => setIsDonationModalOpen(true)}>
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </GlowingButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider icon="om" />

      {/* Stats Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Our Progress</h2>
              <p className="text-muted-foreground">Together, we are building something divine</p>
            </div>
          </ScrollReveal>
          <DonationStats />
        </div>
      </section>

      <SectionDivider icon="lotus" />

      {/* Story Gallery */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Sacred Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Scroll through the story of our temple - from its sacred origins to its glorious reconstruction
              </p>
            </div>
          </ScrollReveal>
        </div>
        <StoryGallery />
      </section>

      <SectionDivider icon="bell" />

      {/* Top Donors Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Top Donors</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Honoring our most generous devotees who have made significant contributions
              </p>
            </div>
          </ScrollReveal>

          <TopDonors />
        </div>
      </section>

      <SectionDivider icon="mandala" />

      {/* Recent Donations & Thank You Note */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Recent Donations */}
            <ScrollReveal direction="left">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Recent Donations</h3>
                </div>
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <RecentDonations onNewDonation={handleNewDonation} />
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>

            {/* Thank You Note */}
            <ScrollReveal direction="right" delay={200}>
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Gratitude</h3>
                </div>
                <ThankYouNote donorName={latestDonor?.name || null} amount={latestDonor?.amount || null} />

                {/* Fund Utilization */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-bold text-foreground">Fund Utilization</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Building2, title: "Construction", percent: 60 },
                      { icon: Target, title: "Sanctum", percent: 20 },
                      { icon: Users, title: "Facilities", percent: 15 },
                      { icon: Heart, title: "Events", percent: 5 },
                    ].map((item, index) => (
                      <ScrollReveal key={item.title} delay={300 + index * 100}>
                        <Card className="bg-secondary/50 border-border text-center">
                          <CardContent className="p-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-1">
                              <item.icon className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-lg font-bold text-primary">{item.percent}%</p>
                            <p className="text-xs text-muted-foreground">{item.title}</p>
                          </CardContent>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider icon="lotus" />

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Be Part of This Sacred Journey
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Your contribution will not only help rebuild the temple but also earn eternal blessings from Lord Hanuman.
              Join us in this divine mission.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <GlowingButton size="lg" className="text-lg px-10 py-6" onClick={() => setIsDonationModalOpen(true)}>
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </GlowingButton>
          </ScrollReveal>
        </div>
      </section>

      <Footer
        onAboutClick={() => setIsAboutModalOpen(true)}
        onPurposeClick={() => setIsPurposeModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onRefundClick={() => setIsRefundModalOpen(true)}
        onPrivacyClick={() => setIsPrivacyModalOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
        onGalleryClick={() => setIsGalleryModalOpen(true)}
      />

      {/* Sticky Donate Bar */}
      <StickyDonateBar onDonateClick={() => setIsDonationModalOpen(true)} />

      {/* Modals */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onSuccess={handleDonationSuccess}
      />

      {/* Gallery Modal */}
      <GalleryModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} />

      <InfoModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} title="About the Temple">
        <p>
          Sri Hanuman Mandir in Thatpally village has been a beacon of spirituality for over five decades. This sacred
          shrine, dedicated to Lord Hanuman - the embodiment of strength, devotion, and selfless service - has served
          countless devotees seeking blessings and spiritual solace.
        </p>
        <p>
          The temple now requires reconstruction to better serve our growing community. With your generous support, we
          aim to build a magnificent new structure that honors Lord Hanuman while preserving the sanctity and traditions
          that have been passed down through generations.
        </p>
        <h3>Our Vision</h3>
        <p>
          To create a grand temple that serves as a spiritual hub for the community, offering a peaceful sanctuary for
          worship, meditation, and cultural activities for generations to come.
        </p>
      </InfoModal>

      <InfoModal isOpen={isPurposeModalOpen} onClose={() => setIsPurposeModalOpen(false)} title="Purpose of Donation">
        <p>
          Your generous donations will be utilized for the sacred reconstruction of Sri Hanuman Mandir. Every rupee
          contributed goes directly towards:
        </p>
        <ul>
          <li>
            <strong>Temple Construction (60%):</strong> Foundation, structure, walls, roof, and finishing work
          </li>
          <li>
            <strong>Sanctum Sanctorum (20%):</strong> Deity installation, inner sanctum construction, and sacred
            elements
          </li>
          <li>
            <strong>Community Facilities (15%):</strong> Prayer hall, community space, water facilities, and amenities
          </li>
          <li>
            <strong>Events & Maintenance (5%):</strong> Inauguration ceremonies, daily puja arrangements, and ongoing
            maintenance
          </li>
        </ul>
        <p>
          We maintain complete transparency in all financial matters. Regular updates on fund utilization will be shared
          with all donors through our Instagram page and on this website.
        </p>
      </InfoModal>

      <InfoModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Contact Us">
        <p>
          <strong>Temple Location:</strong>
        </p>
        <p>
          Sri Hanuman Mandir
          <br />
          Thatpally Village
          <br />
          Telangana, India
        </p>
        <p>
          <strong>For Donations & Queries:</strong>
        </p>
        <div className="flex items-center gap-2 mb-2">
          <Phone className="h-4 w-4 text-primary" />
          <a href="tel:9441424659" className="text-primary hover:underline">
            9441424659
          </a>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-4 w-4 text-primary" />
          <a href="mailto:basava.naveen2298@gmail.com" className="text-primary hover:underline">
            basava.naveen2298@gmail.com
          </a>
        </div>
        <p>
          <strong>Follow us on Instagram:</strong>
        </p>
        <p>
          <a
            href="https://www.instagram.com/hanumantemplethatpally?igsh=bGFtb3VvdHlhdDB2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @hanumantemplethatpally
          </a>
        </p>
      </InfoModal>

      <InfoModal isOpen={isRefundModalOpen} onClose={() => setIsRefundModalOpen(false)} title="Refund Policy">
        <p>
          All donations made to Sri Hanuman Mandir Thatpally are considered as sacred offerings (seva) for temple
          reconstruction and are non-refundable.
        </p>
        <p>
          By making a donation, you acknowledge that your contribution is a voluntary religious offering and you do not
          expect any goods or services in return.
        </p>
        <p>
          In exceptional circumstances, if a refund request is made within 24 hours of donation due to technical issues
          or duplicate transactions, please contact us immediately through our Instagram page with your transaction
          details.
        </p>
      </InfoModal>

      <InfoModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} title="Privacy Policy">
        <p>
          Sri Hanuman Mandir Thatpally respects your privacy and is committed to protecting your personal information.
        </p>
        <h3>Information We Collect</h3>
        <ul>
          <li>Name and contact information (phone, email) when you make a donation</li>
          <li>Donation amount and transaction details</li>
          <li>Optional messages or prayers you wish to share</li>
        </ul>
        <h3>How We Use Your Information</h3>
        <ul>
          <li>To process and acknowledge your donations</li>
          <li>To send updates about temple construction progress</li>
          <li>To display donor names (unless you choose to remain anonymous)</li>
        </ul>
        <p>
          We do not sell, trade, or share your personal information with third parties except as required for payment
          processing.
        </p>
      </InfoModal>

      <InfoModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} title="Terms & Conditions">
        <p>By using this website and making donations, you agree to the following terms:</p>
        <ul>
          <li>All donations are voluntary and made of your own free will</li>
          <li>Donations are used solely for temple reconstruction and related activities</li>
          <li>You confirm that the payment method used belongs to you</li>
          <li>You understand that donations are non-refundable as per our refund policy</li>
          <li>You consent to your name being displayed as a donor (unless anonymous)</li>
        </ul>
        <p>
          The temple management reserves the right to refuse any donation that appears suspicious or fraudulent. We are
          committed to maintaining the highest standards of integrity in all transactions.
        </p>
        <p>For any disputes or concerns, please contact us through our official Instagram page.</p>
      </InfoModal>

      {/* Thank You Toast */}
      {thankYouData && (
        <ThankYouToast
          donorName={thankYouData.name}
          amount={thankYouData.amount}
          isVisible={!!thankYouData}
          onClose={closeThankYou}
        />
      )}
    </div>
  )
}
