import { AppError } from '../error/app-error'
import { prisma } from '../lib/prisma'

interface CreateEvaluationsParams {
  rating: number | null
  comment: string | null
  userId: string
  movieId: string
}

export async function createEvaluations({
  rating,
  comment,
  userId,
  movieId,
}: CreateEvaluationsParams) {
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  })

  if (!movie) {
    throw new AppError('Movie not found.', 404)
  }

  const evaluation = await prisma.evaluation.create({
    data: {
      rating,
      comment,
      user_id: userId,
      movie_id: movieId,
    },
  })

  const ratings = await prisma.evaluation.groupBy({
    by: ['movie_id'],
    _avg: { rating: true },
    where: {
      movie_id: movieId,
      rating: { not: null },
    },
  })

  const ratingGroup = ratings[0]

  const average =
    ratingGroup && ratingGroup._avg.rating
      ? Math.floor(Number(ratingGroup._avg.rating) * 10) / 10
      : 0

  await prisma.movie.update({
    where: { id: movieId },
    data: { averageRating: average },
  })

  return {
    evaluation,
  }
}
