import { prisma } from '../lib/prisma'

interface GetMovieParams {
  movieId: string
}

export async function getMovie({ movieId }: GetMovieParams) {
  const movie = await prisma.movie.findMany({
    where: {
      id: movieId,
    },
    include: {
      evaluations: {
        select: {
          comment: true,
          rating: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!movie) {
    throw new Error('Movie not found.')
  }

  const ratings = await prisma.evaluation.groupBy({
    by: ['movie_id'],
    _avg: { rating: true },
    where: {
      rating: { not: null },
    },
  })

  const moviesWithAverage = movie.map((movies) => {
    const ratingGroup = ratings.find((rating) => rating.movie_id === movies.id)

    const average = ratingGroup?._avg.rating
      ? Math.floor(Number(ratingGroup._avg.rating) * 10) / 10
      : 0

    // const average = ratingGroup?._avg.rating

    // if (average) {
    //   Math.floor(average * 10) / 10
    // } else {
    //   return average
    // }

    return {
      ...movies,
      averageRating: average,
    }
  })

  return {
    movie: moviesWithAverage,
  }
}
