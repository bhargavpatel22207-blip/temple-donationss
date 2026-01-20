"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import type { JSX } from "react"

type DividerIcon = "lotus" | "om" | "bell" | "mandala"

interface SectionDividerProps {
  icon?: DividerIcon
  className?: string
}

const icons: Record<DividerIcon, JSX.Element> = {
  lotus: (
    <svg viewBox="0 0 100 60" className="w-16 h-10 fill-primary">
      <path d="M50 5c-5 15-20 25-20 40 0 8 9 10 20 10s20-2 20-10c0-15-15-25-20-40z" opacity="0.3" />
      <path d="M50 0c-3 12-15 22-15 35 0 6 7 8 15 8s15-2 15-8c0-13-12-23-15-35z" opacity="0.5" />
      <path d="M50 5c-2 10-10 18-10 28 0 4 5 6 10 6s10-2 10-6c0-10-8-18-10-28z" />
      <ellipse cx="50" cy="52" rx="25" ry="3" opacity="0.2" />
    </svg>
  ),
  om: (
    <svg viewBox="0 0 100 100" className="w-12 h-12 fill-primary">
      <text x="50" y="70" fontSize="60" textAnchor="middle" fontFamily="serif">
        ॐ
      </text>
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-primary">
      <path d="M12 2C8.13 2 5 5.13 5 9v6l-2 2v1h18v-1l-2-2V9c0-3.87-3.13-7-7-7zm0 20a2 2 0 002-2h-4a2 2 0 002 2z" />
    </svg>
  ),
  mandala: (
    <svg viewBox="0 0 100 100" className="w-14 h-14 fill-primary">
      <circle cx="50" cy="50" r="8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="50" cy="25" rx="4" ry="10" transform={`rotate(${angle} 50 50)`} opacity="0.7" />
      ))}
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="stroke-primary"
        opacity="0.3"
      />
    </svg>
  ),
}

export function SectionDivider({ icon = "lotus", className }: SectionDividerProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4 py-8 transition-all duration-700",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75",
        className,
      )}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="transition-transform duration-700" style={{ transitionDelay: "200ms" }}>
        {icons[icon]}
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
    </div>
  )
}
