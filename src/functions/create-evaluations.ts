import { prisma } from '../lib/prisma'

interface CreateEvaluationsParams {
  rating: number | null
  comment: string | null
  user_id: string
  movieId: string
}

export async function createEvaluations({
  rating,
  comment,
  user_id,
  movieId,
}: CreateEvaluationsParams) {
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  })

  if (!movie) {
    throw new Error('Movie not found.')
  }

  const evaluation = await prisma.evaluation.create({
    data: {
      rating,
      comment,
      user_id: user_id,
      movie_id: movieId,
    },
  })

  const ratings = await prisma.evaluation.groupBy({
    by: ['movie_id'],
    _avg: { rating: true },
    where: {
      rating: { not: null },
    },
  })

  const ratingGroup = ratings.find((rating) => rating.movie_id === movieId)

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
