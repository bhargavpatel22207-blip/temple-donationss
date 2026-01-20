"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "./scroll-reveal"

interface GalleryItem {
  src: string
  alt: string
  title: string
  description: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/whatsapp-20image-202026-01-12-20at-202.jpeg",
    alt: "Sri Hanuman Mandir - Current State",
    title: "The Sacred Beginning",
    description:
      "The original temple structure that has served devotees for over 50 years. Built with devotion by our ancestors, this sacred shrine now awaits its transformation into a grand temple.",
  },
  {
    src: "/images/7.jpeg",
    alt: "Construction Progress",
    title: "Rising with Blessings",
    description:
      "The new temple takes shape as pillars rise from the earth. Every brick laid is a prayer, every pillar a testament to the devotion of our community. Watch our progress unfold.",
  },
  {
    src: "/images/kl.jpeg",
    alt: "Temple Committee Meeting",
    title: "United in Purpose",
    description:
      "The revered temple committee gathers under the sacred saffron canopy to deliberate on the reconstruction plans. Village elders, respected community leaders, and devoted trustees sit together on traditional striped carpets, their faces reflecting years of wisdom and unwavering faith. With the guidance of our spiritual priest in his sacred orange robes, every decision is made with prayers and blessings. This gathering represents the collective will of our community - a union of tradition, wisdom, and determination to build a magnificent abode for Lord Hanuman.",
  },
]

export function StoryGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveIndex(index)
          }
        },
        { threshold: 0.5 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {GALLERY_ITEMS.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          className="min-h-screen flex items-center py-20"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image */}
              <ScrollReveal
                direction={index % 2 === 0 ? "left" : "right"}
                className={cn(index % 2 === 1 && "md:order-2")}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-all duration-700",
                      activeIndex === index ? "scale-100 opacity-100" : "scale-105 opacity-80",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                </div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal
                direction={index % 2 === 0 ? "right" : "left"}
                delay={200}
                className={cn(index % 2 === 1 && "md:order-1")}
              >
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Indicator - dots only, no numbering */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-2">
        {GALLERY_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              itemRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
            }}
            className={cn(
              "w-2 h-8 rounded-full transition-all duration-300",
              activeIndex === index ? "bg-primary h-12" : "bg-border hover:bg-muted-foreground",
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
