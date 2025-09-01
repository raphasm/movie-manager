import { Categories } from '@prisma/client'
import { prisma } from '../lib/prisma'

interface CreateMovieParams {
  title: string
  year: string
  category: Categories
  description: string
  filename: string
  user_id: string
}

export async function createMovies({
  title,
  year,
  category,
  description,
  filename,
  user_id,
}: CreateMovieParams) {
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    throw new Error('user not found')
  }

  const movies = await prisma.movie.create({
    data: {
      title,
      year,
      category,
      description,
      filename,
      user_id,
    },
  })

  return {
    movies,
  }
}
