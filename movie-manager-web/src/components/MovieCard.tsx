import { Star } from '@phosphor-icons/react'
import { tv, type VariantProps } from 'tailwind-variants'

const movieCardVariants = tv({
  slots: {
    container:
      'group relative rounded-xl border border-custom-bg-menu overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:border-2 hover:border-custom-bg-tab',
    image:
      'absolute inset-0 w-full h-full object-center transition-transform duration-300 ease-out group-hover:scale-110',
    gradientBase: 'absolute inset-0 transition-all duration-300 ease-out',
    gradientHover:
      'absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100',
    ratingTag:
      'absolute top-2 right-2 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-gray-darkest/80',
    ratingNumber:
      'text-lg sm:text-xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    ratingSeparator:
      'text-xs leading-[1.276] font-title font-medium text-custom-text-tagline',
    ratingMax:
      'text-xs leading-[1.276] font-title font-medium text-custom-text-tagline',
    ratingIcon: 'text-white sm:w-4 sm:h-4',
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
        container:
          'w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] h-[220px] sm:h-[250px] md:h-[280px]',
      },
      md: {
        container:
          'w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[280px] h-[250px] sm:h-[300px] md:h-[340px] lg:h-[360px]',
      },
      lg: {
        container:
          'w-full max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[320px] h-[280px] sm:h-[360px] md:h-[400px] lg:h-[420px]',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface MovieCardProps extends VariantProps<typeof movieCardVariants> {
  title: string
  category: string
  year: string
  rating: string | number
  cover: string
  description?: string
  showRating?: boolean
}

export function MovieCard({
  title,
  category,
  year,
  rating,
  cover,
  description,
  showRating = true,
  size = 'md',
}: MovieCardProps) {
  const styles = movieCardVariants({ size })

  return (
    <div className={styles.container()}>
      {/* Cover Image */}
      <img src={cover} alt={title} className={styles.image()} />

      {/* Gradient Shade */}
      <div
        className={styles.gradientBase()}
        style={{
          background:
            'linear-gradient(180deg, rgba(9, 9, 16, 0) 0%, rgba(9, 9, 16, 0.9) 73%)',
        }}
      />

      {/* Hover Gradient Shade */}
      <div
        className={styles.gradientHover()}
        style={{
          background:
            'linear-gradient(180deg, rgba(9, 9, 16, 0.6) 0%, rgba(9, 9, 16, 0.9) 50%, rgba(9, 9, 16, 1) 100%)',
        }}
      />

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
          {description && <p className={styles.description()}>{description}</p>}
        </div>
      </div>
    </div>
  )
}
