import { prisma } from '../lib/prisma'

interface GetEvaluationsParams {
  movieId: string
}

export async function getEvaluations({ movieId }: GetEvaluationsParams) {
  const movie = await prisma.movie.findUnique({
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
