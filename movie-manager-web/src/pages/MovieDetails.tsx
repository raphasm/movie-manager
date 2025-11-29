import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, StarIcon } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import { Evaluations } from '../components/Evaluations'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMovieDetails } from '../api/get-movie-details'
import { createEvaluation } from '../api/create-evaluation'
import { getUserId } from '../utils/get-user-id'

interface EvaluationData {
  rating: number
  comment: string
}

const movieDetailsVariants = tv({
  slots: {
    main: 'relative',
    backdrop: 'absolute inset-0 w-full h-[618px] opacity-5',
    backdropGradient:
      'absolute inset-0 w-full h-[618px] bg-gradient-to-b from-transparent to-custom-bg',
    content: 'relative max-w-[1070px] mx-auto pt-16 pb-20',
    movieSection: 'flex flex-col lg:flex-row items-center gap-12',
    imageWrapper: 'w-full lg:w-[381px] lg:h-[490px] flex-shrink-0',
    movieImage: 'w-full h-full rounded-xl object-cover',
    infoWrapper: 'flex-1 flex flex-col gap-5 py-3 self-stretch',
    backLink:
      'flex items-center gap-2 text-custom-text-brand hover:text-custom-text-light transition-colors cursor-pointer',
    textContent: 'flex flex-col gap-10',
    aboutSection: 'flex flex-col gap-4',
    title:
      'text-2xl lg:text-[32px] leading-[1.276] font-title font-bold text-custom-text-tagline',
    details: 'flex flex-col gap-0.5',
    detailText: 'text-base leading-[1.6] font-body text-custom-text-brand',
    scoreSection: 'flex items-center gap-3',
    starsWrapper: 'flex items-center gap-1',
    scoreText: 'flex items-baseline gap-2',
    scoreNumber:
      'text-2xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    scoreCount: 'text-base leading-[1.6] font-body text-custom-text-brand',
    description: 'text-base leading-[1.6] font-body text-custom-text-brand',
  },
})

export function MovieDetails() {
  const { id: movieId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const styles = movieDetailsVariants()

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => getMovieDetails(movieId!),
    enabled: !!movieId,
  })

  function handleMutationSuccess(
    _: unknown,
    { rating, comment }: EvaluationData,
  ) {
    const currentUserId = getUserId()

    queryClient.setQueryData(
      ['movie-details', movieId],
      (oldData: typeof movie) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          evaluations: [
            {
              userId: currentUserId || undefined,
              name: 'Você',
              rating,
              comment,
            },
            ...(oldData.evaluations || []),
          ],
        }
      },
    )
    queryClient.invalidateQueries({ queryKey: ['movie-details', movieId] })
  }

  const { mutateAsync: submitEvaluation } = useMutation({
    mutationFn: ({ rating, comment }: EvaluationData) =>
      createEvaluation({
        rating: String(rating),
        comment,
        movieId: movieId!,
      }),
    onSuccess: handleMutationSuccess,
  })

  console.log('MovieDetails Debug:', {
    movieId,
    movie,
    imageUrl: movie?.imageUrl,
  })

  const handleBack = () => {
    navigate('/home')
  }

  function handleRateSubmit(rating: number, comment: string) {
    submitEvaluation({ rating, comment })
  }

  if (isLoading) {
    return (
      <div className={styles.content()}>
        <p className={styles.detailText()}>Carregando filme...</p>
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className={styles.content()}>
        <p className={styles.detailText()}>Filme não encontrado</p>
        <button onClick={handleBack} className={styles.backLink()}>
          <ArrowLeft size={20} weight="regular" />
          <span className="text-base leading-[1.6] font-body">Voltar</span>
        </button>
      </div>
    )
  }

  const rating = movie.averageRating || 0
  const fullStars = Math.floor(rating)

  return (
    <main className={styles.main()}>
      {/* Backdrop */}
      <div
        className={styles.backdrop()}
        style={{
          backgroundImage: `url(${movie.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className={styles.backdropGradient()} />

      {/* Movie Info Section */}

      <div className={styles.content()}>
        <div className={styles.movieSection()}>
          {/* Movie Image */}
          <div className={styles.imageWrapper()}>
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className={styles.movieImage()}
              onError={(e) => {
                console.error('Erro ao carregar imagem:', movie.imageUrl)
                e.currentTarget.src =
                  'https://placehold.co/381x490/1a1a2e/ffffff?text=Sem+Imagem'
              }}
            />
          </div>

          {/* Movie Info */}
          <div className={styles.infoWrapper()}>
            {/* Back Link */}
            <button onClick={handleBack} className={styles.backLink()}>
              <ArrowLeft size={20} weight="regular" />
              <span className="text-base leading-[1.6] font-body">Voltar</span>
            </button>

            {/* Text Content */}
            <div className={styles.textContent()}>
              {/* About Section */}
              <div className={styles.aboutSection()}>
                <h1 className={styles.title()}>{movie.title}</h1>

                <div className={styles.details()}>
                  <p className={styles.detailText()}>
                    Categoria: {movie.category}
                  </p>
                  <p className={styles.detailText()}>Ano: {movie.year}</p>
                </div>

                {/* Score */}
                <div className={styles.scoreSection()}>
                  <div className={styles.starsWrapper()}>
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        size={24}
                        weight={index < fullStars ? 'fill' : 'regular'}
                        className={
                          index < fullStars
                            ? 'text-custom-purple'
                            : 'text-custom-text-brand'
                        }
                      />
                    ))}
                  </div>
                  <div className={styles.scoreText()}>
                    <span className={styles.scoreNumber()}>
                      {movie.averageRating || '0'}
                    </span>
                    <span className={styles.scoreCount()}>
                      ({movie.ratingsCount}{' '}
                      {movie.ratingsCount === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className={styles.description()}>{movie.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <Evaluations
        movie={{ ...movie }}
        evaluations={movie.evaluations}
        currentUserId={getUserId()}
        onRateSubmit={handleRateSubmit}
      />
      <div className="mb-20"></div>
    </main>
  )
}
