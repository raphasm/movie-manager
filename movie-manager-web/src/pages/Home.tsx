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
import { TextBelow } from '../components/TextBelow'
import { Link } from '../components/Link'
import z from 'zod'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from '../components/Pagination'

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
  /**
   * useSearchParams - Hook do React Router para manipular query strings da URL
   *
   * searchParams: objeto para LER os parâmetros (ex: ?page=2&query=matrix)
   * setSearchParams: função para ALTERAR os parâmetros da URL
   *
   * Exemplo de URL: /home?page=2&query=matrix
   */
  const [searchParams, setSearchParams] = useSearchParams()

  /**
   * Obtém o parâmetro "query" da URL para filtrar filmes
   * Se não existir, retorna null
   *
   * Exemplo: /home?query=matrix → searchQuery = "matrix"
   */
  const searchQuery = searchParams.get('query')

  /**
   * Converte o parâmetro "page" da URL para um índice (0-based)
   *
   * z.coerce.number() → Converte string para número automaticamente
   * .transform((page) => page - 1) → Subtrai 1 para converter para 0-based
   * .parse() → Executa a validação e transformação
   *
   * Exemplo:
   *   URL: ?page=1 → pageIndex = 0
   *   URL: ?page=2 → pageIndex = 1
   *   URL: (sem page) → usa '1' como default → pageIndex = 0
   *
   * Por que 0-based? Arrays e APIs geralmente começam em 0
   */
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  /**
   * useQuery - Hook do React Query para buscar dados do servidor
   *
   * queryKey: ['movies', pageIndex, searchQuery]
   *   - Identificador único para o cache
   *   - Quando pageIndex ou searchQuery mudam, refaz a requisição automaticamente
   *
   * queryFn: Função que faz a requisição para a API
   *   - page: pageIndex + 1 → Converte de volta para 1-based (API espera 1, 2, 3...)
   *
   * Retorna:
   *   - data: Os dados retornados (aqui chamamos de "result")
   *   - isLoading: true enquanto está carregando
   */
  const { data: result, isLoading } = useQuery({
    queryKey: ['movies', pageIndex, searchQuery],
    queryFn: () =>
      getAllMovies({
        query: searchQuery,
        page: pageIndex + 1, // API espera página 1-based
      }),
  })

  // Extrai o array de filmes do resultado (ou array vazio se não existir)
  const movies = result?.movies || []

  /**
   * handlePaginate - Atualiza a página na URL quando usuário clica na paginação
   *
   * @param pageIndex - Índice da página (0-based)
   *
   * Fluxo:
   * 1. Recebe pageIndex (ex: 0, 1, 2)
   * 2. Converte para 1-based (ex: 1, 2, 3)
   * 3. Atualiza a URL (ex: ?page=2)
   * 4. React Query detecta mudança na queryKey e refaz a requisição
   */
  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())
      return state
    })
  }

  /**
   * handleSearch - Atualiza a busca na URL quando usuário digita
   *
   * @param value - Texto digitado no campo de busca
   *
   * Fluxo:
   * 1. Se tem texto → adiciona ?query=texto
   * 2. Se está vazio → remove o parâmetro query
   * 3. Sempre reseta para página 1 (nova busca = começa do início)
   *
   * Exemplo:
   *   Digitar "matrix" → URL vira /home?query=matrix&page=1
   *   Apagar tudo → URL vira /home?page=1
   */
  function handleSearch(value: string) {
    setSearchParams((prev) => {
      if (value) {
        prev.set('query', value)
      } else {
        prev.delete('query')
      }
      prev.set('page', '1') // Reseta para página 1 ao buscar
      return prev
    })
  }

  /**
   * handleClearFilters - Limpa todos os filtros da URL
   *
   * Remove todos os parâmetros (page, query, etc.)
   * URL volta para /home (sem query string)
   */
  function handleClearFilters() {
    setSearchParams({})
  }

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
            value={searchQuery || ''}
            onChange={(e) => handleSearch(e.target.value)}
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
              onClick={handleClearFilters}
            >
              <PlusIcon size={20} />
              Limpar filtro
            </Link>
          </div>
        </div>
      ) : (
        <>
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

          {/* Paginação */}
          {result && (
            <Pagination
              pageIndex={pageIndex}
              perPage={result.meta.perPage}
              totalCount={result.meta.totalCount}
              onPageChange={handlePaginate}
            />
          )}
        </>
      )}
    </main>
  )
}
