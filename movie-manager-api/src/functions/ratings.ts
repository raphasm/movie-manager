import { prisma } from '../lib/prisma'

interface RatingsParams {
  page?: number
  limit?: number
}

export async function ratings({ page = 1, limit = 10 }: RatingsParams = {}) {
  const skip = (page - 1) * limit

  const where = {
    averageRating: {
      not: null,
    },
  }

  const [movies, totalCount] = await Promise.all([
    prisma.movie.findMany({
      where,
      take: limit,
      skip,
      orderBy: {
        averageRating: 'desc',
      },
    }),
    prisma.movie.count({ where }),
  ])

  return {
    movies,
    meta: {
      page,
      perPage: limit,
      totalCount,
    },
  }
}
