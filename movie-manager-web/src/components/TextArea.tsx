import React from 'react'

interface TextAreaProps {
  placeholder: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: boolean
  rows?: number
  maxLength?: number
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
}: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div
        className="flex flex-col px-4 py-3 bg-transparent border rounded-md transition-colors focus-within:border-[#892ccd]"
        style={{
          borderColor: error ? '#dd3444' : '#1a1b2d',
        }}
      >
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          maxLength={maxLength}
          className="w-full bg-transparent border-none outline-none text-base leading-[1.5] text-white resize-none"
          style={{
            fontFamily: 'var(--font-body)',
          }}
        />
        <style>{`
          textarea::placeholder {
            color: #7a7b9f;
          }
        `}</style>
      </div>
      {showCounter && maxLength && (
        <div className="flex justify-end">
          <span
            className="text-sm leading-[1.6]"
            style={{
              fontFamily: 'var(--font-body)',
              color: value.length >= maxLength ? '#dd3444' : '#7a7b9f',
            }}
          >
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  )
}
