import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, StarIcon } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import { Evaluations } from '../components/Evaluations'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMovieDetails } from '../api/get-movie-details'
import { createEvaluation } from '../api/create-evaluation'
import { useAuth } from '../contexts/AuthContext'

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
    content: 'relative max-w-[1090px] mx-auto pt-11 pb-15',
    movieSection: 'flex flex-col lg:flex-row lg:items-center gap-12',
    imageWrapper: 'w-full lg:w-[370px] lg:h-[470px] flex-shrink-0',
    movieImage: 'w-full h-full rounded-xl object-cover',
    infoWrapper: 'flex-1 flex flex-col gap-3',
    backLink:
      'flex items-center gap-2 text-custom-text-brand hover:text-custom-text-light transition-colors cursor-pointer',
    textContent: 'flex flex-col gap-5',
    aboutSection: 'flex flex-col gap-4',
    title:
      'text-2xl lg:text-[30px] leading-[1.276] font-title font-bold text-custom-text-tagline',
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
  // Cliente do React Query para manipular o cache de dados
  const queryClient = useQueryClient()
  const styles = movieDetailsVariants()

  const { userId } = useAuth()
  // const { isAuthenticated } = useAuth()
  /**
   * useQuery - Hook para buscar dados do servidor
   *
   * - queryKey: Identificador único para esta query no cache
   * - queryFn: Função que faz a requisição para a API
   * - enabled: Só executa a query se movieId existir
   * - data: Dados retornados da API
   * - isLoading: true enquanto está carregando
   * - isError: true se houve erro na requisição
   */
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => getMovieDetails(movieId!),
    enabled: !!movieId,
  })

  /**
   * handleMutationSuccess - Callback executado após criar avaliação com sucesso
   *
   * @param _ - Resposta da API (não utilizada)
   * @param rating - Nota dada pelo usuário
   * @param comment - Comentário do usuário
   *
   * Esta função faz uma "atualização otimista":
   * 1. Atualiza o cache local IMEDIATAMENTE (sem esperar o servidor)
   * 2. A avaliação aparece na tela instantaneamente
   * 3. Depois invalida a query para sincronizar com o servidor
   */
  function handleMutationSuccess(
    _: unknown,
    { rating, comment }: EvaluationData,
  ) {
    /**
     * setQueryData - Atualiza o cache local do React Query
     *
     * Recebe a queryKey e uma função que retorna os novos dados.
     * A função recebe os dados antigos (oldData) e retorna os novos.
     */
    queryClient.setQueryData(
      ['movie-details', movieId],
      (oldData: typeof movie) => {
        if (!oldData) return oldData

        // Retorna os dados antigos + nova avaliação no início da lista
        return {
          ...oldData, // Mantém todos os dados do filme
          evaluations: [
            // Nova avaliação adicionada no INÍCIO da lista
            {
              userId: userId || undefined, // ID do usuário (para mostrar tag "Você")
              name: 'Você', // Nome exibido temporariamente
              rating, // Nota da avaliação
              comment, // Comentário da avaliação
            },
            // Espalha as avaliações antigas depois da nova
            ...(oldData.evaluations || []),
          ],
        }
      },
    )

    /**
     * invalidateQueries - Marca a query como "stale" (desatualizada)
     *
     * Isso faz o React Query buscar dados novos do servidor em background,
     * garantindo que o cache fique sincronizado com o banco de dados.
     * (ex: o nome real do usuário pode ser diferente de "Você")
     */
    queryClient.invalidateQueries({ queryKey: ['movie-details', movieId] })
  }

  /**
   * useMutation - Hook para operações que modificam dados (POST, PUT, DELETE)
   *
   * Diferente do useQuery (que é para GET), o useMutation é para criar/atualizar/deletar.
   *
   * - mutationFn: Função que faz a requisição para a API
   * - onSuccess: Callback executado quando a requisição é bem-sucedida
   * - mutateAsync: Função para disparar a mutation (retorna Promise)
   */
  const { mutateAsync: submitEvaluation } = useMutation({
    mutationFn: ({ rating, comment }: EvaluationData) =>
      createEvaluation({
        rating,
        comment,
        movieId: movieId!,
      }),
    onSuccess: handleMutationSuccess,
  })

  console.log('MovieDetails Debug:', {
    movieId,
    movie,
    imageUrl: movie?.imageUrl,
    currentUserId: userId,
    evaluationsUserIds: movie?.evaluations?.map((e) => e.userId),
  })

  // Função para voltar à página inicial
  const handleBack = () => {
    navigate('/home')
  }

  /**
   * handleRateSubmit - Função chamada quando o usuário envia a avaliação
   *
   * Recebe rating e comment do modal de avaliação e dispara a mutation.
   */
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
              <p className={styles.description()}>
                {movie.description.length > 882
                  ? `${movie.description.slice(0, 882)}...`
                  : movie.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <Evaluations
        movie={{ ...movie }}
        evaluations={movie.evaluations}
        currentUserId={userId}
        onRateSubmit={handleRateSubmit}
      />
      <div className="mb-20"></div>
    </main>
  )
}
