import { prisma } from '../lib/prisma'

export async function calculateAvg(movieId: string) {
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
}
