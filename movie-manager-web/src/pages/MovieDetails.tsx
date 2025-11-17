import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, StarIcon } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import { movies } from '../utils/movies'
import { Evaluations } from '../components/Evaluations'

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
  const { id } = useParams()
  const navigate = useNavigate()
  const styles = movieDetailsVariants()

  const movie = movies.find((m) => m.id === id)

  if (!movie) {
    return (
      <div className={styles.content()}>
        <p className={styles.detailText()}>Filme não encontrado</p>
      </div>
    )
  }

  const handleBack = () => {
    navigate('/home')
  }

  return (
    <main className={styles.main()}>
      {/* Backdrop */}
      <div
        className={styles.backdrop()}
        style={{
          backgroundImage: `url(${movie.image})`,
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
              src={movie.image}
              alt={movie.title}
              className={styles.movieImage()}
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
                    <StarIcon
                      size={24}
                      weight="fill"
                      className="text-custom-purple"
                    />
                    <StarIcon
                      size={24}
                      weight="fill"
                      className="text-custom-purple"
                    />
                    <StarIcon
                      size={24}
                      weight="fill"
                      className="text-custom-purple"
                    />
                    <StarIcon
                      size={24}
                      weight="fill"
                      className="text-custom-purple"
                    />
                    <StarIcon
                      size={24}
                      weight="regular"
                      className="text-custom-text-brand"
                    />
                  </div>
                  <div className={styles.scoreText()}>
                    <span className={styles.scoreNumber()}>{movie.rating}</span>
                    <span className={styles.scoreCount()}>(5 avaliações)</span>
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
      <Evaluations />
      <div className="mb-20"></div>
    </main>
  )
}
