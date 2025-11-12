import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import { Input } from '../components/Input'
import { MovieCard } from '../components/MovieCard'
import { movies } from '../utils/movies'

const homeVariants = tv({
  slots: {
    main: 'mt-16 mb-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8',
    header:
      'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-12 lg:mb-[37px]',
    title:
      'text-base sm:text-xl lg:text-2xl xl:text-2xl leading-[1.689] m-0 font-display text-custom-text-light',
    searchWrapper: 'w-full sm:w-[200px] md:w-[240px] lg:w-[264px]',
    moviesGrid:
      'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-4 lg:gap-8 justify-items-center',
  },
})

export function Home() {
  const styles = homeVariants()

  return (
    <main className={styles.main()}>
      {/* Header */}
      <div className={styles.header()}>
        <h1 className={styles.title()}>Explorar</h1>

        {/* Search Input */}
        <div className={styles.searchWrapper()}>
          <Input
            icon={<MagnifyingGlassIcon size={20} weight="regular" />}
            placeholder="Pesquisar filme"
          />
        </div>
      </div>

      {/* Movies Grid */}
      <div className={styles.moviesGrid()}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            category={movie.category}
            year={movie.year}
            rating={movie.rating}
            cover={movie.cover}
            description={movie.description}
          />
        ))}
      </div>
    </main>
  )
}
