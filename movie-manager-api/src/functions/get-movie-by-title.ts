import { prisma } from '../lib/prisma'

interface GetMovieByTileParams {
  query: string
  page: number
}

export async function getMovieByTitle({ query, page }: GetMovieByTileParams) {
  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 10,
    skip: (page - 1) * 10,
  })

  return {
    movies,
  }
}
