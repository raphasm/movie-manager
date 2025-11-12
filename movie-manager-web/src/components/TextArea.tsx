import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const textAreaVariants = tv({
  slots: {
    wrapper: 'flex flex-col gap-1.5 w-full',
    container:
      'flex flex-col px-4 py-3 bg-transparent border rounded-md transition-colors focus-within:border-custom-purple',
    textarea:
      'w-full bg-transparent border-none outline-none text-base leading-[1.5] text-white font-body placeholder:text-custom-text-placeholder resize-none',
    counterWrapper: 'flex justify-end',
    counter: 'text-sm leading-[1.6] font-body',
  },
  variants: {
    error: {
      true: {
        container: 'border-custom-error',
      },
      false: {
        container: 'border-custom-bg-tab',
      },
    },
    counterLimit: {
      true: {
        counter: 'text-custom-error',
      },
      false: {
        counter: 'text-custom-text-gray',
      },
    },
  },
  defaultVariants: {
    error: false,
    counterLimit: false,
  },
})

interface TextAreaProps
  extends Omit<React.ComponentProps<'textarea'>, 'rows'>,
    Omit<VariantProps<typeof textAreaVariants>, 'counterLimit' | 'error'> {
  error?: boolean
  rows?: number
  showCounter?: boolean
}

export function TextArea({
  placeholder,
  value = '',
  onChange,
  error = false,
  rows = 4,
  maxLength,
  showCounter = false,
  className,
  ...props
}: TextAreaProps) {
  const currentLength = typeof value === 'string' ? value.length : 0
  const isAtLimit = maxLength ? currentLength >= maxLength : false

  const styles = textAreaVariants({ error, counterLimit: isAtLimit })

  return (
    <div className={styles.wrapper()}>
      <div className={styles.container()}>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          maxLength={maxLength}
          className={styles.textarea({ className })}
          {...props}
        />
      </div>
      {showCounter && maxLength && (
        <div className={styles.counterWrapper()}>
          <span className={styles.counter()}>
            {currentLength}/{maxLength}
          </span>
        </div>
      )}
    </div>
  )
}
