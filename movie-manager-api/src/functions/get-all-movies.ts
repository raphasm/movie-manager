import { prisma } from '../lib/prisma'

interface GetAllMoviesParams {
  page: number
  query?: string
}

export async function getAllMovies({ page, query }: GetAllMoviesParams) {
  const where = query
    ? {
        title: {
          contains: query,
          mode: 'insensitive' as const,
        },
      }
    : {}

  const [movies, totalCount] = await Promise.all([
    prisma.movie.findMany({
      where,
      take: 10,
      skip: (page - 1) * 10,
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
