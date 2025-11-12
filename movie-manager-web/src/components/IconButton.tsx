import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const iconButtonVariants = tv({
  base: 'flex items-center justify-center rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white',
  variants: {
    variant: {
      primary:
        'bg-custom-purple hover:bg-custom-purple-hover active:bg-custom-purple-active',
      secondary: 'bg-custom-bg-tab hover:bg-[#25263a] active:bg-custom-bg-menu',
      ghost:
        'bg-transparent hover:bg-custom-bg-tab/50 active:bg-custom-bg-menu/80',
    },
    size: {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    },
    disabled: {
      true: {
        container: 'opacity-50 cursor-not-allowed',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
})

interface IconButtonProps
  extends Omit<React.ComponentProps<'button'>, 'size' | 'disabled'>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
}

export function IconButton({
  icon,
  size,
  variant,
  disabled,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={iconButtonVariants({ variant, size, className, disabled })}
      {...props}
    >
      {icon}
    </button>
  )
}
