import { prisma } from '../lib/prisma'

// interface RatingsParams {
//   movieId: string
// }

export async function ratings() {
  const ratings = await prisma.evaluation.groupBy({
    by: ['movie_id'],
    _avg: { rating: true },
    where: {
      rating: { not: null },
    },
  })

  const movies = await prisma.movie.findMany()

  const moviesWithAverage = movies.map((movie) => {
    const ratingGroup = ratings.find((rating) => rating.movie_id === movie.id)

    // if (ratingGroup && ratingGroup._avg.rating) {
    //   Math.floor(ratingGroup._avg.rating * 10) / 10
    // }
    const average =
      ratingGroup && ratingGroup._avg.rating
        ? Math.floor(ratingGroup._avg.rating * 10) / 10
        : 0

    return {
      ...movie,
      averageRating: average,
    }
  })

  console.log(moviesWithAverage)

  // Busca todos os filmes com suas avaliações
  // const movies = await prisma.movie.findMany({
  //   include: {
  //     evaluations: {
  //       select: { rating: true },
  //     },
  //   },
  // })

  // Mapeia cada filme e calcula a média dos ratings
  // const moviesWithAverage = movies.map((movie) => {
  //   const validRatings = movie.evaluations.filter((e) => e.rating !== null)
  //   const average =
  //     validRatings.length > 0
  //       ? Math.round(
  //           validRatings.reduce((acc, e) => acc + (e.rating as number), 0) /
  //             validRatings.length,
  //         )
  //       : 0

  //   return {
  //     ...movie,
  //     averageRating: average,
  //   }
  // })

  // Agora moviesWithAverage contém todos os filmes com o averageRating calculado
  // console.log(moviesWithAverage)

  return {
    movies: moviesWithAverage,
  }
}
