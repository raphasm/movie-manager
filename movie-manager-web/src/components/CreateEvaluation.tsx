import { useState, useEffect } from 'react'
import { tv } from 'tailwind-variants'
import { X } from '@phosphor-icons/react'
import { IconButton } from './IconButton'
import { RatingStars } from './RatingStars'
import { TextArea } from './TextArea'
import { Button } from './Button'

const createEvaluationVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4',
    content:
      'bg-[#0F0F1A] border border-[#1A1B2D] rounded-[18px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto relative',
    closeButton: 'absolute top-5 right-5',
    container: 'p-10 flex flex-col gap-8',
    title:
      'text-xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    form: 'flex flex-col gap-6 items-end',
    movieContent: 'flex gap-[31px] w-full',
    cover: 'w-[137px] h-[176px] rounded-md object-cover flex-shrink-0',
    info: 'flex flex-col justify-between gap-4 flex-1',
    about: 'flex flex-col gap-3',
    movieTitle:
      'text-2xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    details: 'flex flex-col',
    detailText: 'text-sm leading-[1.6] font-body text-custom-text-brand',
    score: 'flex flex-col gap-1.5',
    scoreLabel: 'text-sm leading-[1.6] font-body text-custom-text-brand',
  },
})

interface CreateEvaluationProps {
  isOpen: boolean
  onClose: () => void
  movie: {
    title: string
    category: string
    year: string
    imageUrl: string
  }
  onSubmit: (rating: number, comment: string) => void
}

export function CreateEvaluation({
  isOpen,
  onClose,
  movie,
  onSubmit,
}: CreateEvaluationProps) {
  const styles = createEvaluationVariants()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment)
      setRating(0)
      setComment('')
      onClose()
    }
  }

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay()} onClick={handleOverlayClick}>
      <div className={styles.content()}>
        <div className={styles.closeButton()}>
          <IconButton
            variant="secondary"
            onClick={onClose}
            icon={<X size={20} weight="regular" />}
          />
        </div>

        <div className={styles.container()}>
          <h2 className={styles.title()}>Avaliar filme</h2>

          <form
            className={styles.form()}
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <div className={styles.movieContent()}>
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className={styles.cover()}
              />

              <div className={styles.info()}>
                <div className={styles.about()}>
                  <h3 className={styles.movieTitle()}>{movie.title}</h3>
                  <div className={styles.details()}>
                    <span className={styles.detailText()}>
                      Categoria: {movie.category}
                    </span>
                    <span className={styles.detailText()}>
                      Ano: {movie.year}
                    </span>
                  </div>
                </div>

                <div className={styles.score()}>
                  <span className={styles.scoreLabel()}>Sua avaliação:</span>
                  <RatingStars rating={rating} onRatingChange={setRating} />
                </div>
              </div>
            </div>

            <TextArea
              placeholder="Comentário"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-40"
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth={false}
              disabled={rating === 0}
            >
              Publicar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
