import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const containerVariants = tv({
  base: 'mx-auto w-full',
  variants: {
    size: {
      md: 'mt-16 mb-20 max-w-[1380px] px-4 sm:px-6 lg:px-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface ContainerProps
  extends VariantProps<typeof containerVariants>,
    React.ComponentProps<'div'> {
  as?: keyof React.JSX.IntrinsicElements
}

export default function Container({
  as = 'main',
  children,
  className,
  ...props
}: ContainerProps) {
  return React.createElement(
    as,
    {
      className: containerVariants({ size: 'md', className }),
      ...props,
    },
    children,
  )
}
