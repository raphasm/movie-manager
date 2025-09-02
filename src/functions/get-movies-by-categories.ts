import { Categories } from '@prisma/client'
import { prisma } from '../lib/prisma'

interface GetMovieByTileParams {
  page: number
  category: Categories
}

export async function getMoviesByCategories({
  page,
  category,
}: GetMovieByTileParams) {
  const movies = await prisma.movie.findMany({
    where: {
      category,
    },
    orderBy: {
      averageRating: 'desc',
    },
    take: 10,
    skip: (page - 1) * 10,
  })

  return {
    movies,
  }
}
