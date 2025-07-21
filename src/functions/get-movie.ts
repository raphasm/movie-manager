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

  return {
    movie,
  }
}
