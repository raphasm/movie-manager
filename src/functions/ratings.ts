import { prisma } from '../lib/prisma'

// interface RatingsParams {
//   movieId: string
// }

export async function ratings() {
  const movies = await prisma.movie.findMany()

  return {
    movies,
  }
}
