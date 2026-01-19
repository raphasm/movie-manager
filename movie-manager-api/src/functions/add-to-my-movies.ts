import { AppError } from '../error/app-error'
import { prisma } from '../lib/prisma'

interface AddToMyMoviesParams {
  userId: string
  movieId: string
}

export async function addToMyMovies({ userId, movieId }: AddToMyMoviesParams) {
  // Validação dos parâmetros
  if (!userId || !movieId) {
    throw new AppError('userId e movieId são obrigatórios', 400)
  }

  // Verificar se o filme exist e
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  })

  if (!movie) {
    throw new AppError('Filme não encontrado', 404)
  }

  // Verificar se já está nos favoritos
  const existingMovie = await prisma.myMovie.findUnique({
    where: {
      user_id_movie_id: {
        user_id: userId,
        movie_id: movieId,
      },
    },
  })

  if (existingMovie) {
    throw new AppError('Este filme já está nos seus favoritos', 409)
  }

  // Adicionar aos favoritos
  const myMovie = await prisma.myMovie.create({
    data: {
      user_id: userId,
      movie_id: movieId,
    },
    include: {
      movie: true,
    },
  })

  return {
    myMovie,
  }
}
