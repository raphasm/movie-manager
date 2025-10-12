import React from 'react'

interface InputProps {
  icon?: React.ReactNode
  placeholder: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  rightElement?: React.ReactNode
}

export function Input({
  icon,
  placeholder,
  type = 'text',
  value,
  onChange,
  error = false,
  errorMessage,
  disabled = false,
  size = 'md',
  rightElement,
}: InputProps) {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div
        className={`flex items-center gap-2 ${
          sizes[size]
        } bg-transparent border rounded-md transition-colors focus-within:border-[#892ccd] ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        style={{
          borderColor: error ? '#dd3444' : '#1a1b2d',
        }}
      >
        {icon && <div className="w-5 h-5 flex-shrink-0 text-white">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none leading-[1.5] text-white disabled:cursor-not-allowed"
          style={{
            fontFamily: 'var(--font-body)',
          }}
        />
        {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
        <style>{`
          input::placeholder {
            color: #7a7b9f;
          }
        `}</style>
      </div>
      {error && errorMessage && (
        <span
          className="text-sm leading-[1.6]"
          style={{
            fontFamily: 'var(--font-body)',
            color: '#dd3444',
          }}
        >
          {errorMessage}
        </span>
      )}
    </div>
  )
}
