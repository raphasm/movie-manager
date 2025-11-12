import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const linkVariants = tv({
  base: 'leading-[1.5] font-body transition-colors hover:opacity-80',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    variant: {
      primary: 'text-custom-purple-tab',
      secondary: 'text-custom-text-brand',
      muted: 'text-custom-text-gray',
    },
    underline: {
      true: 'underline',
    },
    isButton: {
      true: 'text-left',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
    underline: false,
  },
})

interface LinkProps
  extends Omit<VariantProps<typeof linkVariants>, 'isButton'> {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

export function Link({
  children,
  href,
  onClick,
  size = 'md',
  variant = 'primary',
  underline = false,
}: LinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const Component = href ? 'a' : 'button'
  const isButton = !href

  return (
    <Component
      href={href}
      onClick={handleClick}
      className={linkVariants({ size, variant, underline, isButton })}
    >
      {children}
    </Component>
  )
}
