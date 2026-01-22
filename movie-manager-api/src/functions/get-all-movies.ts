import { Categories } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { getImageUrl } from '../utils/get-image-url'

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

  // Formatar dados dos filmes
  const formattedMovies = movies.map((movie) => ({
    ...movie,
    averageRating: movie.averageRating ? Number(movie.averageRating) : null,
    imageUrl: getImageUrl(movie.filename),
  }))

  return {
    movies: formattedMovies,
    meta: {
      pageIndex: page,
      perPage: 10,
      totalCount,
    },
  }
}
