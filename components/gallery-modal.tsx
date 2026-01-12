"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/whatsapp-20image-202026-01-12-20at-202.jpeg",
    alt: "Original Temple",
  },
  {
    src: "/images/7.jpeg",
    alt: "Construction Progress",
  },
  {
    src: "/images/1.jpeg",
    alt: "1",
  },
  {
    src: "/images/kl.jpeg",
    alt: "Committee Meeting",
  },
  {
    src: "/images/2.jpeg",
    alt: "Lord Hanuman",
  },
  {
    src: "/images/3.jpeg",
    alt: "Lord Hanuman",
  },
  {
    src: "/images/4.jpeg",
    alt: "Lord Hanuman",
  },
  {
    src: "/images/5.jpeg",
    alt: "Lord Hanuman",
  },
  {
    src: "/images/6.jpeg",
    alt: "Lord Hanuman",
  },
];

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
        aria-label="Close gallery"
      >
        <X className="h-6 w-6 text-foreground" />
      </button>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        {/* Image Container (FULLSCREEN, NO CROP) */}
        <div className="relative w-full h-full flex items-center justify-center">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out",
                index === activeIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="max-w-[95vw] max-h-[90vh] object-contain"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-secondary/80 hover:bg-primary/80 transition-all hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-secondary/80 hover:bg-primary/80 transition-all hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </button>

        {/* Dots Navigation */}
        <div className="flex items-center gap-3 mt-6">
          {GALLERY_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/50 hover:bg-muted-foreground"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="flex items-center gap-3 mt-6 overflow-x-auto pb-2">
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300",
                index === activeIndex
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
