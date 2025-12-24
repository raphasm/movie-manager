import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  slots: {
    wrapper: 'flex flex-col gap-1.5 w-full',
    container:
      'flex items-center gap-2 bg-transparent border rounded-md transition-colors focus-within:border-custom-purple',
    icon: 'w-5 h-5 flex-shrink-0 text-white',
    input:
      'flex-1 bg-transparent border-none outline-none leading-[1.5] text-white font-body placeholder:text-custom-text-placeholder disabled:cursor-not-allowed',
    rightElement: 'flex-shrink-0',
    error: 'text-sm leading-[1.6] font-body text-custom-error',
  },
  variants: {
    size: {
      sm: {
        container: 'px-3 py-2 text-sm',
      },
      md: {
        container: 'px-4 py-2.5 text-base',
      },
      lg: {
        container: 'px-5 py-4 text-lg',
      },
    },
    error: {
      true: {
        container: 'border-custom-error',
      },
      false: {
        container: 'border-custom-bg-tab',
      },
    },
    disabled: {
      true: {
        container: 'opacity-50 cursor-not-allowed',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
})

interface InputProps
  extends VariantProps<typeof inputVariants>,
    Omit<React.ComponentProps<'input'>, 'error' | 'disabled' | 'size'> {
  icon?: React.ReactNode
  error?: boolean
  errorMessage?: string
  rightElement?: React.ReactNode
}

export function Input({
  icon,
  placeholder,
  type = 'text',
  value,
  error,
  errorMessage,
  disabled,
  size,
  rightElement,
  className,
  ...props
}: InputProps) {
  const styles = inputVariants({ size, error, disabled })

  return (
    <div className={styles.wrapper()}>
      <div className={styles.container()}>
        {icon && <div className={styles.icon()}>{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          className={styles.input({ className })}
          {...props}
        />
        {rightElement && (
          <div className={styles.rightElement()}>{rightElement}</div>
        )}
      </div>
      {error && errorMessage && (
        <span className={styles.error()}>{errorMessage}</span>
      )}
    </div>
  )
}
