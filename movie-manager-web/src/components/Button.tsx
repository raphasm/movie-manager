import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import cx from 'classnames'

const buttonVariants = tv({
  base: 'flex justify-center items-center gap-2 rounded-md leading-[1.5] font-body transition-all disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary:
        'bg-custom-purple text-white hover:bg-custom-purple-hover active:bg-custom-purple-active',
      secondary:
        'bg-custom-bg-tab text-white hover:bg-[#25263a] active:bg-custom-bg-menu',
      ghost:
        'bg-transparent text-custom-purple-tab hover:bg-custom-bg-tab/50 active:bg-custom-bg-menu/80',
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-5 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: true,
  },
})

interface ButtonProps
  extends Omit<React.ComponentProps<'button'>, 'size'>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  type,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className,
      )}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
