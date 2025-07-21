import { prisma } from '../lib/prisma'

interface GetMyMoviesParams {
  userId: string
  page: number
}

export async function getMyMovies({ userId, page }: GetMyMoviesParams) {
  const movies = await prisma.movie.findMany({
    where: {
      user_id: userId,
    },
    take: 10,
    skip: (page - 1) * 10,
  })

  return {
    movies,
  }
}
