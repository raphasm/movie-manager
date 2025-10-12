import React from 'react'

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  title?: string
}

export function IconButton({
  icon,
  onClick,
  size = 'md',
  variant = 'secondary',
  disabled = false,
  title,
}: IconButtonProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const variants = {
    primary: {
      background: '#892ccd',
      hoverBackground: '#9d3ee0',
      activeBackground: '#7624b8',
    },
    secondary: {
      background: '#1a1b2d',
      hoverBackground: '#25263a',
      activeBackground: '#131320',
    },
    ghost: {
      background: 'transparent',
      hoverBackground: 'rgba(26, 27, 45, 0.5)',
      activeBackground: 'rgba(19, 19, 32, 0.8)',
    },
  }

  const currentVariant = variants[variant]

  return (
    <button
      className={`${sizes[size]} flex items-center justify-center rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        backgroundColor: currentVariant.background,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = currentVariant.hoverBackground
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = currentVariant.background
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor =
            currentVariant.activeBackground
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = currentVariant.hoverBackground
        }
      }}
    >
      <div className="text-white">{icon}</div>
    </button>
  )
}
