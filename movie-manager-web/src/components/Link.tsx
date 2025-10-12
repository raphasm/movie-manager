import React from 'react'

interface LinkProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'muted'
  underline?: boolean
}

export function Link({
  children,
  href,
  onClick,
  size = 'md',
  variant = 'primary',
  underline = false,
}: LinkProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const variants = {
    primary: '#a85fdd',
    secondary: '#b5b6c9',
    muted: '#7a7b9f',
  }

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const Component = href ? 'a' : 'button'

  return (
    <Component
      href={href}
      onClick={handleClick}
      className={`${
        sizes[size]
      } leading-[1.5] transition-colors hover:opacity-80 ${
        underline ? 'underline' : ''
      } ${!href ? 'text-left' : ''}`}
      style={{
        fontFamily: 'var(--font-body)',
        color: variants[variant],
      }}
    >
      {children}
    </Component>
  )
}
