import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  disabled = false,
}: ButtonProps) {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  }

  const variants = {
    primary: {
      background: 'var(--color-custom-purple)',
      hoverBackground: 'var(--color-custom-purple-hover)',
      activeBackground: 'var(--color-custom-purple-active)',
      color: 'white',
    },
    secondary: {
      background: '#1a1b2d',
      hoverBackground: '#25263a',
      activeBackground: '#131320',
      color: 'white',
    },
    ghost: {
      background: 'transparent',
      hoverBackground: 'rgba(26, 27, 45, 0.5)',
      activeBackground: 'rgba(19, 19, 32, 0.8)',
      color: '#a85fdd',
    },
  }

  const currentVariant = variants[variant]

  return (
    <button
      className={`flex justify-center items-center gap-2 ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } rounded-md leading-[1.5] transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        fontFamily: 'var(--font-body)',
        backgroundColor: currentVariant.background,
        color: currentVariant.color,
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
      {children}
    </button>
  )
}
