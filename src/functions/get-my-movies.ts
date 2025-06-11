import { prisma } from '../lib/prisma'

interface GetMyMoviesParams {
  userId: string
}

export async function getMyMovies({ userId }: GetMyMoviesParams) {
  const movies = await prisma.movie.findMany({
    where: {
      user_id: userId,
    },
  })

  return {
    movies,
  }
}
