"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const GALLERY_IMAGES = [
  {
    src: "/images/whatsapp-20image-202026-01-12-20at-202.jpeg",
    alt: "Sri Hanuman Mandir - Current State",
    caption: "The sacred temple in its current condition",
  },
  {
    src: "/images/whatsapp-20image-202026-01-09-20at-202.jpeg",
    alt: "Community Gathering",
    caption: "Village elders and devotees planning the reconstruction",
  },
  {
    src: "/images/whatsapp-20image-202026-01-09-20at-202.jpeg",
    alt: "Construction Progress",
    caption: "New temple construction in progress",
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? GALLERY_IMAGES.length - 1 : selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === GALLERY_IMAGES.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {GALLERY_IMAGES.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-secondary"
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="absolute bottom-4 left-4 right-4 text-sm text-foreground font-medium">{image.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 p-2 rounded-full bg-secondary text-foreground hover:bg-muted transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 p-2 rounded-full bg-secondary text-foreground hover:bg-muted transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="relative max-w-4xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={GALLERY_IMAGES[selectedImage].src || "/placeholder.svg"}
              alt={GALLERY_IMAGES[selectedImage].alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain rounded-lg"
            />
            <p className="text-center mt-4 text-foreground">{GALLERY_IMAGES[selectedImage].caption}</p>
          </div>
        </div>
      )}
    </>
  )
}
