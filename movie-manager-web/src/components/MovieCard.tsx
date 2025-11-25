import { Star, Heart } from '@phosphor-icons/react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Link } from 'react-router-dom'
import { IconButton } from './IconButton'
import { FavoritesContext } from '../contexts/FavoritesContext'
import { useContext } from 'react'

const movieCardVariants = tv({
  slots: {
    link: '',
    container:
      'group relative rounded-xl border border-custom-bg-menu overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:border-2 hover:border-custom-bg-tab',
    image:
      'absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-110',
    gradientBase:
      'absolute inset-0 transition-all duration-300 ease-out bg-gradient-to-b from-transparent via-transparent to-gray-darkest/90',
    gradientHover:
      'absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 bg-gradient-to-b from-gray-darkest/60 via-gray-darkest/90 to-gray-darkest',
    actionButton:
      'absolute top-2 left-2 opacity-0 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100',
    ratingTag:
      'absolute top-2 right-2 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-gray-darkest/80',
    ratingNumber:
      'text-lg sm:text-xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    ratingSeparator:
      'text-xs leading-[1.276] font-title font-medium text-custom-text-tagline',
    ratingMax:
      'text-xs leading-[1.276] font-title font-medium text-custom-text-tagline',
    ratingIcon: 'text-purple-500 sm:w-4 sm:h-4',
    content:
      'absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 transition-all duration-300 ease-out group-hover:bottom-4',
    contentWrapper: 'flex flex-col gap-3 sm:gap-4 lg:gap-1',
    textWrapper: 'flex flex-col gap-1',
    title:
      'text-base sm:text-lg lg:text-xl leading-[1.276] font-title font-bold text-custom-text-tagline m-0 line-clamp-2',
    metaContainer: 'flex items-center gap-1 sm:gap-1.5',
    category:
      'text-xs sm:text-sm leading-[1.6] font-body text-custom-text-brand truncate',
    separator: 'w-1 h-1 rounded-full flex-shrink-0 bg-custom-text-brand',
    year: 'text-xs sm:text-sm leading-[1.6] font-body text-custom-text-brand',
    description:
      'opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:opacity-100 group-hover:max-h-20 text-xs sm:text-sm leading-[1.5] font-body text-custom-text-brand',
  },
  variants: {
    size: {
      sm: {
        link: 'block w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px]',
        container: 'w-full h-[220px] sm:h-[250px] md:h-[280px]',
      },
      md: {
        link: 'block w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[280px]',
        container: 'w-full h-[250px] sm:h-[300px] md:h-[340px] lg:h-[360px]',
      },
      lg: {
        link: 'block w-full max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[320px]',
        container: 'w-full h-[280px] sm:h-[360px] md:h-[400px] lg:h-[420px]',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface MovieCardProps extends VariantProps<typeof movieCardVariants> {
  id: string | number
  title: string
  category: string
  year: string
  rating: string | number
  image: string
  description?: string
  showRating?: boolean
}

export function MovieCard({
  id,
  title,
  category,
  year,
  rating,
  image,
  description,
  showRating = true,
  size = 'md',
}: MovieCardProps) {
  const styles = movieCardVariants({ size })
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext)

  const isMovieFavorite = isFavorite(id)

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (isMovieFavorite) {
      removeFavorite(id)
    } else {
      addFavorite({
        id,
        title,
        category,
        year,
        rating,
        image,
        description,
      })
    }
  }

  return (
    <Link to={`/movie-details/${id}`} className={styles.link()}>
      <article className={styles.container()}>
        {/* Cover Image */}
        <img src={image} alt={title} className={styles.image()} />

        {/* Gradient Shade */}
        <div className={styles.gradientBase()} />

        {/* Hover Gradient Shade */}
        <div className={styles.gradientHover()} />

        {/* Action Button - Shows on hover */}
        <div className={styles.actionButton()}>
          <IconButton
            icon={
              <Heart
                size={20}
                weight={isMovieFavorite ? 'fill' : 'regular'}
                className={
                  isMovieFavorite ? 'text-purple-500' : 'text-purple-500'
                }
              />
            }
            variant="secondary"
            size="md"
            onClick={handleToggleFavorite}
          />
        </div>

        {/* Rating Tag */}
        {showRating && (
          <div className={styles.ratingTag()}>
            <div className="flex items-baseline gap-0.5">
              <span className={styles.ratingNumber()}>{rating}</span>
              <span className={styles.ratingSeparator()}>/</span>
              <span className={styles.ratingMax()}>5</span>
            </div>
            <Star size={14} weight="fill" className={styles.ratingIcon()} />
          </div>
        )}

        {/* Text Content */}
        <div className={styles.content()}>
          <div className={styles.contentWrapper()}>
            <div className={styles.textWrapper()}>
              <h3 className={styles.title()}>{title}</h3>
              <div className={styles.metaContainer()}>
                <span className={styles.category()}>{category}</span>
                <div className={styles.separator()} />
                <span className={styles.year()}>{year}</span>
              </div>
            </div>

            {/* Description - only shows on hover */}
            {description && (
              <p className={styles.description()}>{description}</p>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
