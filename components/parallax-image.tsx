"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function ParallaxImage({ src, alt, className, speed = 0.3 }: ParallaxImageProps) {
  const [offset, setOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrolled = window.innerHeight - rect.top
      setOffset(scrolled * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-100"
        style={{ transform: `translateY(${offset}px) scale(1.2)` }}
      />
    </div>
  )
}
