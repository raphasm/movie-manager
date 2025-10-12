import { Star } from '@phosphor-icons/react'

interface RatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  interactive?: boolean
  onChange?: (rating: number) => void
}

export function Rating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  interactive = false,
  onChange,
}: RatingProps) {
  const sizes = {
    sm: { star: 14, text: 'text-sm' },
    md: { star: 16, text: 'text-base' },
    lg: { star: 20, text: 'text-lg' },
  }

  const currentSize = sizes[size]

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= Math.floor(rating)
      const isPartial = i === Math.ceil(rating) && rating % 1 !== 0

      stars.push(
        <button
          key={i}
          className={`${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          } transition-all`}
          onClick={() => interactive && onChange?.(i)}
          disabled={!interactive}
        >
          <Star
            size={currentSize.star}
            weight={isFilled || isPartial ? 'fill' : 'regular'}
            style={{
              color: isFilled || isPartial ? '#a85fdd' : '#3e3e56',
            }}
          />
        </button>,
      )
    }
    return stars
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">{renderStars()}</div>
      {showValue && (
        <span
          className={`${currentSize.text} leading-[1.5]`}
          style={{
            fontFamily: 'var(--font-body)',
            color: '#b5b6c9',
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
