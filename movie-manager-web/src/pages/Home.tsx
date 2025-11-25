import {
  FilmSlateIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import { Input } from '../components/Input'
import { MovieCard } from '../components/MovieCard'
import { getAllMovies } from '../api/get-all-movies'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { TextBelow } from '../components/TextBelow'
import { Link } from '../components/Link'

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
  const [searchQuery, setSearchQuery] = useState('')

  const { data: result, isLoading } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => getAllMovies({ query: searchQuery || null, page: 1 }),
  })

  const movies = result?.movies || []

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Movies Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-custom-text-brand">Carregando filmes...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full">
          <FilmSlateIcon size={44} fill="#45455F" />
          <TextBelow className="mt-5 text-custom-text-brand">
            {`Nenhum filme encontrado com "${searchQuery}"`}
          </TextBelow>
          <TextBelow className="text-custom-text-brand">
            Que tal tentar outra busca?
          </TextBelow>

          <div className="mt-4">
            <Link
              variant="muted"
              className="flex items-center justify-center gap-1"
              onClick={() => setSearchQuery('')}
            >
              <PlusIcon size={20} />
              Limpar filtro
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.moviesGrid()}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              category={movie.category}
              year={movie.year}
              rating={movie.averageRating || '0'}
              image={movie.imageUrl}
              description={movie.description}
            />
          ))}
        </div>
      )}
    </main>
  )
}
