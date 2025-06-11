import { prisma } from '../lib/prisma'

interface GetMovieParams {
  movieId: string
}

export async function getMovie({ movieId }: GetMovieParams) {
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  })

  if (!movie) {
    throw new Error('Movie not found.')
  }

  return {
    movie,
  }
}
