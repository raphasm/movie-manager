import { tv, type VariantProps } from 'tailwind-variants'

const dividerVariants = tv({
  base: 'bg-custom-bg-tab flex-shrink-0',
  variants: {
    orientation: {
      horizontal: 'w-full h-px',
      vertical: 'w-px h-12',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

interface DividerProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof dividerVariants> {
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({
  className,
  orientation = 'vertical',
  ...props
}: DividerProps) {
  return (
    <div className={dividerVariants({ className, orientation })} {...props} />
  )
}
