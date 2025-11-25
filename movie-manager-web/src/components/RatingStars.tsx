import { Star } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'

const ratingStarsVariants = tv({
  slots: {
    container: 'flex items-center gap-2',
    star: 'cursor-pointer transition-colors',
  },
})

interface RatingStarsProps {
  rating: number
  onRatingChange: (rating: number) => void
}

export function RatingStars({ rating, onRatingChange }: RatingStarsProps) {
  const styles = ratingStarsVariants()

  return (
    <div className={styles.container()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={styles.star()}
        >
          <Star
            size={28}
            weight={star <= rating ? 'fill' : 'regular'}
            className={star <= rating ? 'text-[#A85FDD]' : 'text-[#7A7B9F]'}
          />
        </button>
      ))}
    </div>
  )
}
