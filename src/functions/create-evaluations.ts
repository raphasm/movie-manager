import { prisma } from '../lib/prisma'

interface CreateEvaluationsParams {
  rating: number | null
  comment: string | null
  user_id: string
  movieId: string
}

export async function createEvaluations({
  rating,
  comment,
  user_id,
  movieId,
}: CreateEvaluationsParams) {
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  })

  if (!movie) {
    throw new Error('Movie not found.')
  }

  // const { _avg } = await prisma.evaluation.aggregate({
  //   where: { movie_id: movieId },
  //   _avg: { rating: true },
  // })

  // const avg = _avg.rating

  // const average = Math.floor(avg * 10) / 10
  // averageRating: _avg.rating,

  const evaluation = await prisma.evaluation.create({
    data: {
      rating,
      comment,
      user_id: user_id,
      movie_id: movieId,
    },
  })

  // Calcula a média das avaliações do filme após adicionar a nova avaliação
  // const { _avg } = await prisma.evaluation.aggregate({
  //   where: { movie_id: movieId },
  //   _avg: { rating: true },
  // })

  // const media = _avg.rating
  // const arredondado = Math.floor(media * 10) / 10
  // averageRating: _avg.rating,
  return {
    evaluation,
  }
}
