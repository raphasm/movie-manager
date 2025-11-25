import { prisma } from '../lib/prisma'

interface GetMyMoviesParams {
  userId: string
  page: number
  query?: string
}

export async function getMyMovies({ userId, page, query }: GetMyMoviesParams) {
  const where = {
    user_id: userId,
    ...(query && {
      title: {
        contains: query,
        mode: 'insensitive' as const,
      },
    }),
  }

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
      pageIndex: page,
      perPage: 10,
      totalCount,
    },
  }
}
