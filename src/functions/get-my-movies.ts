import { prisma } from '../lib/prisma'

interface GetMyMoviesParams {
  userId: string
  page: number
}

export async function getMyMovies({ userId, page }: GetMyMoviesParams) {
  const ratings = await prisma.evaluation.groupBy({
    by: ['movie_id'],
    _avg: { rating: true },
    where: {
      rating: { not: null },
    },
  })

  const movies = await prisma.movie.findMany({
    where: {
      user_id: userId,
    },
    take: 10,
    skip: (page - 1) * 10,
  })

  const moviesWithAverage = movies.map((movie) => {
    const ratingGroup = ratings.find((rating) => rating.movie_id === movie.id)

    // if (ratingGroup && ratingGroup._avg.rating) {
    //   Math.floor(ratingGroup._avg.rating * 10) / 10
    // }
    const average =
      ratingGroup && ratingGroup._avg.rating
        ? Math.floor(Number(ratingGroup._avg.rating) * 10) / 10
        : 0

    return {
      ...movie,
      averageRating: average,
    }
  })

  // console.log(moviesWithAverage)

  return {
    movies: moviesWithAverage,
  }
}
