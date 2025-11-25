import { Star, StarIcon } from '@phosphor-icons/react'
import { Button } from './Button'
import { mockComments } from '../utils/comments'
import { tv } from 'tailwind-variants'
import { useState } from 'react'
import { CreateEvaluation } from './CreateEvaluation'

const evaluationsVariants = tv({
  slots: {
    ratingsSection:
      'max-w-[1070px] mt-11 mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-custom-bg-menu',
    ratingsHeader: 'flex items-end justify-between mb-10',
    ratingsTitle:
      'text-2xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    ratingsList: 'flex flex-col gap-3  ',
    commentCard:
      'flex flex-col  lg:flex-row gap-12 p-7 bg-custom-bg-menu rounded-xl',
    userSection: 'flex gap-4 w-full lg:w-[216px] flex-shrink-0',
    userImage: 'w-12 h-12 rounded-md border border-custom-purple object-cover',
    userInfo: 'flex flex-col gap-1',
    userNameWrapper: 'flex items-center gap-2',
    userName:
      'text-base leading-[1.276] font-title font-bold text-custom-text-tagline',
    youTag:
      'px-1.5 py-0 bg-custom-purple rounded-full text-xs leading-[1.6] font-body text-custom-text-tagline',
    userStats: 'text-sm leading-[1.6] font-body text-custom-text-brand',
    commentContent: 'flex flex-1 gap-8',
    divider: 'hidden lg:block w-px bg-custom-bg-tab',
    commentText: 'text-base  leading-[1.6] font-body text-custom-text-brand',
    ratingTag:
      'flex items-center gap-1.5 px-2.5 h-8 bg-custom-bg-tab rounded-md',
    ratingNumber:
      'text-xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    ratingSeparator:
      'text-xs leading-[1.276] font-title font-normal text-custom-text-tagline',
  },
})

interface EvaluationsProps {
  movie: {
    title: string
    category: string
    year: string
    imageUrl: string
  }
  onRateSubmit: (rating: number, comment: string) => void
}

export function Evaluations({ movie, onRateSubmit }: EvaluationsProps) {
  const styles = evaluationsVariants()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className={styles.ratingsSection()}>
      <div className={styles.ratingsHeader()}>
        <h2 className={styles.ratingsTitle()}>Avaliações</h2>
        <Button
          variant="primary"
          size="md"
          fullWidth={false}
          onClick={() => setIsModalOpen(true)}
        >
          <Star size={20} weight="regular" />
          Avaliar filme
        </Button>
      </div>

      <div className={styles.ratingsList()}>
        {mockComments.map((comment) => (
          <div key={comment.id} className={styles.commentCard()}>
            {/* User Section */}
            <div className={styles.userSection()}>
              <img
                src={comment.userImage}
                alt={comment.userName}
                className={styles.userImage()}
              />
              <div className={styles.userInfo()}>
                <div className={styles.userNameWrapper()}>
                  <span className={styles.userName()}>{comment.userName}</span>
                  {comment.isCurrentUser && (
                    <span className={styles.youTag()}>você</span>
                  )}
                </div>
                <span className={styles.userStats()}>{comment.stats}</span>
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider()} />

            {/* Comment Content */}
            <div className={styles.commentContent()}>
              <p className={styles.commentText()}>{comment.comment}</p>
              <div className={styles.ratingTag()}>
                <div className="flex items-baseline gap-0.5">
                  <span className={styles.ratingNumber()}>
                    {comment.rating}
                  </span>
                  <span className={styles.ratingSeparator()}>/</span>
                  <span className={styles.ratingSeparator()}>5</span>
                </div>
                <StarIcon
                  size={16}
                  weight="fill"
                  className="text-custom-purple-tab flex-shrink-0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateEvaluation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={movie}
        onSubmit={onRateSubmit}
      />
    </section>
  )
}
