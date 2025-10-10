import { prisma } from '../lib/prisma'

interface GetEvaluationsParams {
  movieId: string
}

export async function getEvaluations({ movieId }: GetEvaluationsParams) {
  const evaluations = await prisma.movie.findMany({
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

  return {
    evaluations,
  }
}
