import React from 'react'

interface TextBelowProps {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md'
  variant?: 'muted' | 'secondary' | 'light'
  align?: 'left' | 'center' | 'right'
}

export function TextBelow({
  children,
  size = 'sm',
  variant = 'muted',
  align = 'left',
}: TextBelowProps) {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  }

  const variants = {
    muted: '#7a7b9f',
    secondary: '#b5b6c9',
    light: '#e4e5ec',
  }

  const aligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <p
      className={`${sizes[size]} ${aligns[align]} leading-[1.6] m-0`}
      style={{
        fontFamily: 'var(--font-body)',
        color: variants[variant],
      }}
    >
      {children}
    </p>
  )
}
