import { Star } from '@phosphor-icons/react'

export interface MovieCardProps {
  title: string
  category: string
  year: string
  rating: string | number
  cover: string
  description?: string
  onClick?: () => void
  showRating?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function MovieCard({
  title,
  category,
  year,
  rating,
  cover,
  description,
  onClick,
  showRating = true,
  size = 'md',
}: MovieCardProps) {
  const sizes = {
    sm: {
      width: 'w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px]',
      height: 'h-[220px] sm:h-[250px] md:h-[280px]',
    },
    md: {
      width:
        'w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[280px]',
      height: 'h-[250px] sm:h-[300px] md:h-[340px] lg:h-[360px]',
    },
    lg: {
      width:
        'w-full max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[320px]',
      height: 'h-[280px] sm:h-[360px] md:h-[400px] lg:h-[420px]',
    },
  }

  const currentSize = sizes[size]

  return (
    <div
      className={`group relative ${currentSize.width} ${currentSize.height} rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:border-2 hover:border-[#1A1B2D]`}
      style={{
        borderColor: '#131320',
      }}
      onClick={onClick}
    >
      {/* Cover Image */}
      <img
        src={cover}
        alt={title}
        className="absolute inset-0 w-full h-full object-center transition-transform duration-300 ease-out group-hover:scale-110"
      />

      {/* Gradient Shade */}
      <div
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          background:
            'linear-gradient(180deg, rgba(9, 9, 16, 0) 0%, rgba(9, 9, 16, 0.9) 73%)',
        }}
      ></div>

      {/* Hover Gradient Shade */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(180deg, rgba(9, 9, 16, 0.6) 0%, rgba(9, 9, 16, 0.9) 50%, rgba(9, 9, 16, 1) 100%)',
        }}
      ></div>

      {/* Rating Tag */}
      {showRating && (
        <div
          className="absolute top-2 right-2 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full"
          style={{ backgroundColor: 'rgba(15, 15, 26, 0.8)' }}
        >
          <div className="flex items-baseline gap-0.5">
            <span
              className="text-lg sm:text-xl leading-[1.276]"
              style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                color: '#e4e5ec',
              }}
            >
              {rating}
            </span>
            <span
              className="text-xs leading-[1.276]"
              style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 500,
                color: '#e4e5ec',
              }}
            >
              /
            </span>
            <span
              className="text-xs leading-[1.276]"
              style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 500,
                color: '#e4e5ec',
              }}
            >
              5
            </span>
          </div>
          <Star size={14} weight="fill" className="text-white sm:w-4 sm:h-4" />
        </div>
      )}

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 transition-all duration-300 ease-out group-hover:bottom-4">
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-1">
          <div className="flex flex-col gap-1">
            <h3
              className="text-base sm:text-lg lg:text-xl leading-[1.276] m-0 line-clamp-2"
              style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                color: '#e4e5ec',
              }}
            >
              {title}
            </h3>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span
                className="text-xs sm:text-sm leading-[1.6] truncate"
                style={{ fontFamily: 'var(--font-body)', color: '#b5b6c9' }}
              >
                {category}
              </span>
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#b5b6c9' }}
              ></div>
              <span
                className="text-xs sm:text-sm leading-[1.6]"
                style={{ fontFamily: 'var(--font-body)', color: '#b5b6c9' }}
              >
                {year}
              </span>
            </div>
          </div>

          {/* Description - only shows on hover */}
          {description && (
            <div className="opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:opacity-100 group-hover:max-h-20">
              <p
                className="text-xs sm:text-sm leading-[1.5] "
                style={{ fontFamily: 'var(--font-body)', color: '#b5b6c9' }}
              >
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
