import { Star, StarIcon, User } from '@phosphor-icons/react'
import { Button } from './Button'
import { tv } from 'tailwind-variants'
import { useState } from 'react'
import { CreateEvaluation } from './CreateEvaluation'
import { LoginRequiredModal } from './LoginRequiredModal'
import { Avatar } from './Avatar'
import { YouBadge } from './Badge'

const evaluationsVariants = tv({
  slots: {
    ratingsSection:
      'max-w-[1070px] mt-11 mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-custom-bg-menu',
    ratingsHeader: 'flex items-end justify-between mb-10',
    ratingsTitle:
      'text-2xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    ratingsList: 'flex flex-col gap-3 items-center',
    commentCard:
      'relative flex flex-col items-stretch min-w-[1070px] lg:flex-row gap-12 p-7 bg-custom-bg-menu rounded-xl',
    userSection: 'flex gap-2 w-full lg:w-[216px] flex-shrink-0 items-center',
    userImage: 'w-12 h-12 rounded-md border border-custom-purple object-cover',
    userInfo: 'flex flex-col gap-1',
    userNameWrapper: 'flex items-center gap-2',
    userName: 'text-[16px] text-custom-text-tagline',
    youTag:
      'px-1.5 py-0 bg-custom-purple rounded-full text-xs leading-[1.6] font-body text-custom-text-tagline',
    userStats: 'text-sm leading-[1.6] font-body text-custom-text-brand',
    commentContent: 'flex flex-1 gap-8 items-stretch justify-between',
    divider: 'hidden lg:block w-px bg-custom-bg-tab',
    commentText: 'text-base   leading-[1.6] font-body text-custom-text-brand',
    ratingTag:
      'flex items-center gap-1.5 px-2.5 h-8 bg-custom-bg-tab rounded-md',
    ratingNumber:
      'text-xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    ratingSeparator:
      'text-xs leading-[1.276] font-title font-normal text-custom-text-tagline',
  },
})

interface Evaluation {
  userId?: string
  name: string
  rating?: number | null
  comment?: string | null
}

interface EvaluationsProps {
  movie: {
    id: string
    title: string
    category: string
    year: string
    imageUrl: string
  }
  evaluations: Evaluation[]
  currentUserId: string | null
  onRateSubmit: (rating: number, comment: string) => void
}

export function Evaluations({
  movie,
  evaluations = [],
  currentUserId,
  onRateSubmit,
}: EvaluationsProps) {
  const styles = evaluationsVariants()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const isAuthenticated = currentUserId !== null

  function handleOpenEvaluationModal() {
    if (isAuthenticated) {
      setIsModalOpen(true)
    } else {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <section className={styles.ratingsSection()}>
      <div className={styles.ratingsHeader()}>
        <h2 className={styles.ratingsTitle()}>Avaliações</h2>
        <Button
          variant="primary"
          size="md"
          fullWidth={false}
          onClick={handleOpenEvaluationModal}
        >
          <Star size={20} weight="regular" />
          Avaliar filme
        </Button>
      </div>

      <div className={styles.ratingsList()}>
        {evaluations.length === 0 ? (
          <p className="text-custom-text-brand text-center py-8">
            Nenhuma avaliação ainda.
          </p>
        ) : (
          /**
           * Usamos uma arrow function com {} (em vez de =>) para poder
           * executar lógica antes do return (verificar se tem comentário)
           */
          evaluations.map((evaluation, idx) => {
            /**
             * trim() - Remove espaços em branco do início e fim
             * Isso garante que:
             * - "  " (só espaços) vira "" (string vazia)
             */
            const trimmedComment = evaluation.comment?.trim()

            /**
             * Verificação de comentário vazio
             *
             * !trimmedComment é true quando:
             * - trimmedComment é "" (string vazia)
             * - trimmedComment é undefined
             * - trimmedComment é null
             *
             * Se não tem comentário, retorna null (não renderiza nada)
             * O React ignora null no JSX, então o card simplesmente não aparece
             */
            if (!trimmedComment) {
              return null
            }

            // Se tem comentário, renderiza o card da avaliação
            return (
              <div key={idx} className={styles.commentCard()}>
                {/* User Section */}
                <div className={styles.userSection()}>
                  <Avatar size="md" icon={<User size={28} weight="light" />} />

                  <div className={styles.userInfo()}>
                    <div className={styles.userNameWrapper()}>
                      <span className={styles.userName()}>
                        {evaluation.name}
                      </span>
                      {evaluation.userId === currentUserId && (
                        <YouBadge size="md" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className={styles.divider()} />

                {/* Comment Content */}
                <div className={styles.commentContent()}>
                  <p className={styles.commentText()}>{trimmedComment}</p>
                  <div className={styles.ratingTag()}>
                    <div className="flex items-baseline gap-0.5">
                      <span className={styles.ratingNumber()}>
                        {evaluation.rating ?? 0}
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
            )
          })
        )}
      </div>

      <CreateEvaluation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={movie}
        onSubmit={onRateSubmit}
      />

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </section>
  )
}
