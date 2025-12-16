import { prisma } from '../lib/prisma'

interface GetMovieParams {
  page: number
  movieId: string
}

export async function getMovie({ movieId, page }: GetMovieParams) {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
    include: {
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
              _count: { select: { evaluations: true } },
            },
          },
        },
      },
    },
  })

  if (!movie) {
    throw new Error('Movie not found.')
  }

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
