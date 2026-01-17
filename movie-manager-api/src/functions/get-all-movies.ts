import { Categories } from '@prisma/client'
import { prisma } from '../lib/prisma'

interface GetAllMoviesParams {
  page: number
  query?: string
  categories: Categories[]
}

export async function getAllMovies({
  page,
  query,
  categories,
}: GetAllMoviesParams) {
  const where = {
    ...(query && {
      title: {
        contains: query,
        mode: 'insensitive' as const,
      },
    }),
    ...(categories.length && {
      category: {
        in: categories,
      },
    }),
  }

  const [movies, totalCount] = await Promise.all([
    prisma.movie.findMany({
      where,
      take: 10,
      skip: (page - 1) * 10,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.movie.count({ where }),
  ])

  return {
    movies,
    meta: {
      page,
      perPage: 10,
      totalCount,
    },
  }
}
