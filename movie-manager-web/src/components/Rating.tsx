import { Star } from '@phosphor-icons/react'
import { tv, type VariantProps } from 'tailwind-variants'

const ratingVariants = tv({
  slots: {
    container: 'flex items-center gap-2',
    starsContainer: 'flex items-center gap-1',
    starButton: 'transition-all',
    value: 'leading-[1.5] font-body text-custom-text-brand',
  },
  variants: {
    size: {
      sm: {
        value: 'text-sm',
      },
      md: {
        value: 'text-base',
      },
      lg: {
        value: 'text-lg',
      },
    },
    interactive: {
      true: {
        starButton: 'cursor-pointer hover:scale-110',
      },
      false: {
        starButton: 'cursor-default',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    interactive: false,
  },
})

interface RatingProps extends VariantProps<typeof ratingVariants> {
  rating: number
  maxRating?: number
  showValue?: boolean
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
  const styles = ratingVariants({ size, interactive })

  const starSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  }

  const starSize = starSizes[size || 'md']

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= Math.floor(rating)
      const isPartial = i === Math.ceil(rating) && rating % 1 !== 0

      stars.push(
        <button
          key={i}
          className={styles.starButton()}
          onClick={() => interactive && onChange?.(i)}
          disabled={!interactive}
        >
          <Star
            size={starSize}
            weight={isFilled || isPartial ? 'fill' : 'regular'}
            className={
              isFilled || isPartial
                ? 'text-custom-purple-tab'
                : 'text-gray-medium'
            }
          />
        </button>,
      )
    }
    return stars
  }

  return (
    <div className={styles.container()}>
      <div className={styles.starsContainer()}>{renderStars()}</div>
      {showValue && <span className={styles.value()}>{rating.toFixed(1)}</span>}
    </div>
  )
}
