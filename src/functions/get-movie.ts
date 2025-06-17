import { prisma } from '../lib/prisma'

interface GetMovieParams {
  movieId: string
}

export async function getMovie({ movieId }: GetMovieParams) {
  const movie = await prisma.movie.findUnique({
    select: {
      id: true,
      title: true,
      year: true,
      category: true,
      description: true,
      filename: true,
      _count: {
        select: {
          evaluations: true,
        },
      },
    },
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
