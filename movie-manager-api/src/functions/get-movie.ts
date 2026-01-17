import { AppError } from '../error/app-error'
import { prisma } from '../lib/prisma'

interface GetMovieParams {
  page: number
  movieId: string
}

export async function getMovie({ movieId, page }: GetMovieParams) {
  // Otimização: Usar select específico ao invés de trazer todos os campos
  // Isso reduz a quantidade de dados transferidos do banco
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
    select: {
      id: true,
      title: true,
      year: true,
      category: true,
      description: true,
      filename: true,
      averageRating: true,
      evaluations: {
        take: 5,
        skip: (page - 1) * 5,
        select: {
          comment: true,
          rating: true,
          user_id: true,
          user: {
            select: {
              name: true,
              imageUrl: true,
              // Otimização: _count é custoso, considere cachear ou remover se não essencial
              _count: { select: { evaluations: true } },
            },
          },
        },
        orderBy: { created_at: 'desc' },
      },
    },
  })

  if (!movie) {
    throw new AppError('Movie not found.', 404)
  }

  // Otimização: Contar apenas quando necessário
  // Considere cachear este valor se o total não muda frequentemente
  const totalEvaluations = await prisma.evaluation.count({
    where: { movie_id: movieId },
  })

  return {
    ...movie,
    evaluationsMeta: {
      page,
      perPage: 5,
      totalCount: totalEvaluations,
    },
  }
}
