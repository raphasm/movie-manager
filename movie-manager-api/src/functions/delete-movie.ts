import { AppError } from '../error/app-error'
import { prisma } from '../lib/prisma'

interface DeleteMovieParams {
  movieId: string
  userId: string
}

export async function deleteMovie({ movieId, userId }: DeleteMovieParams) {
  // Validação dos parâmetros
  if (!movieId || !userId) {
    throw new AppError('movieId e userId são obrigatórios', 400)
  }

  // Verificar se o filme está nos favoritos do usuário
  const myMovie = await prisma.myMovie.findUnique({
    where: {
      user_id_movie_id: {
        user_id: userId,
        movie_id: movieId,
      },
    },
  })

  // Se não encontrar, retornar erro 404
  if (!myMovie) {
    throw new AppError('Filme não encontrado nos seus favoritos', 404)
  }

  // Deletar o filme da tabela MyMovies (não deleta o filme original)
  await prisma.myMovie.delete({
    where: {
      user_id_movie_id: {
        user_id: userId,
        movie_id: movieId,
      },
    },
  })

  return {
    message: 'Filme removido dos favoritos com sucesso',
  }
}
