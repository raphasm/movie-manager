import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, StarIcon } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import { Evaluations } from '../components/Evaluations'
import { useQuery } from '@tanstack/react-query'
import { getMovieDetails } from '../api/get-movie-details'

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

  console.log('MovieDetails Debug:', {
    movieId,
    movie,
    imageUrl: movie?.imageUrl,
  })

  const handleBack = () => {
    navigate('/home')
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
        movie={{
          title: movie.title,
          category: movie.category,
          year: movie.year,
          imageUrl: movie.imageUrl,
        }}
        onRateSubmit={(rating, comment) => {
          console.log('Rating submitted:', { rating, comment, movieId })
          // Aqui você pode adicionar a lógica para enviar a avaliação para a API
        }}
      />
      <div className="mb-20"></div>
    </main>
  )
}
