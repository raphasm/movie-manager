import * as SelectPrimitive from '@radix-ui/react-select'
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import type { ReactNode } from 'react'

const selectStyles = tv({
  slots: {
    trigger:
      'flex items-center justify-between gap-2 w-full px-4 py-3 bg-transparent border border-custom-bg-tab rounded-md text-base leading-[1.5] font-body transition-colors hover:border-custom-purple focus:border-custom-purple focus:outline-none data-[placeholder]:text-custom-text-placeholder text-white',
    triggerIcon: 'text-custom-text-gray flex-shrink-0',
    content:
      'overflow-hidden bg-custom-bg-menu border border-custom-bg-tab rounded-lg shadow-xl z-50 min-w-[150px]',
    viewport:
      'p-1.5 max-h-[155px] overflow-y-auto scrollbar-thin flex flex-col gap-0.5',
    item: 'relative flex items-center justify-center gap-2 px-3 py-2 text-sm leading-[1.5] font-body text-custom-text-gray rounded-md cursor-pointer outline-none select-none transition-all duration-150 data-[highlighted]:text-custom-purple data-[highlighted]:bg-custom-purple/10 data-[state=checked]:text-white data-[state=checked]:font-medium',
    itemIndicator: 'absolute left-2.5 text-custom-purple',
    label:
      'px-4 py-2 text-sm leading-[1.5] font-body text-custom-text-gray font-medium',
    wrapper: 'flex flex-col gap-1.5 w-full',
    iconWrapper: 'flex items-center gap-2',
    errorText: 'text-sm leading-[1.6] font-body text-custom-error',
  },
  variants: {
    error: {
      true: {
        trigger: 'border-custom-error',
      },
    },
  },
})

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  options: SelectOption[]
  icon?: ReactNode
  error?: boolean
  errorMessage?: string
  ref?: React.Ref<HTMLButtonElement>
}

export function Select({
  placeholder,
  value,
  onValueChange,
  options,
  icon,
  error,
  errorMessage,
  ref,
}: SelectProps) {
  const styles = selectStyles({ error })

  return (
    <div className={styles.wrapper()}>
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger ref={ref} className={styles.trigger()}>
          <div className={styles.iconWrapper()}>
            {icon && <span className="text-custom-text-gray">{icon}</span>}
            <SelectPrimitive.Value placeholder={placeholder} />
          </div>
          <SelectPrimitive.Icon className={styles.triggerIcon()}>
            <CaretDownIcon size={16} weight="bold" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={styles.content()}
            position="popper"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className={styles.viewport()}>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={styles.item()}
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator
                    className={styles.itemIndicator()}
                  >
                    <CheckIcon size={16} weight="bold" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && errorMessage && (
        <span className={styles.errorText()}>{errorMessage}</span>
      )}
    </div>
  )
}
