import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const textBelowVariants = tv({
  base: 'leading-[1.6] font-body m-0',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
    },
    variant: {
      muted: 'text-custom-text-gray',
      secondary: 'text-custom-text-brand',
      light: 'text-custom-text-tagline',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'muted',
    align: 'left',
  },
})

interface TextBelowProps extends VariantProps<typeof textBelowVariants> {
  children: React.ReactNode
  className?: string
}

export function TextBelow({
  children,
  size = 'sm',
  variant = 'muted',
  align = 'left',
  className,
}: TextBelowProps) {
  return (
    <p className={textBelowVariants({ size, variant, align, className })}>
      {children}
    </p>
  )
}
