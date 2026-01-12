"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface GlowingButtonProps extends ButtonProps {
  glowColor?: string
}

export const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, children, glowColor = "primary", ...props }, ref) => {
    return (
      <div className="relative group">
        {/* Glow effect */}
        <div
          className={cn(
            "absolute -inset-1 rounded-lg bg-primary/50 opacity-50 blur-lg transition-all duration-1000",
            "group-hover:opacity-75 group-hover:blur-xl",
            "animate-pulse-slow",
          )}
        />
        <Button
          ref={ref}
          className={cn(
            "relative bg-primary text-primary-foreground hover:bg-primary/90",
            "shadow-lg shadow-primary/25",
            className,
          )}
          {...props}
        >
          {children}
        </Button>
      </div>
    )
  },
)
GlowingButton.displayName = "GlowingButton"
