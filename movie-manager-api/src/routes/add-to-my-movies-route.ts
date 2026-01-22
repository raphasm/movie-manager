import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { addToMyMovies } from '../functions/add-to-my-movies'
import { verifyJwt } from '../middlewares/verify-jwt'

export const addToMyMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/my-movies/:movieId',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Add movie to favorites',
        tags: ['movie'],
        params: z.object({
          movieId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { movieId } = request.params
      const userId = request.user.sub

      await addToMyMovies({ userId, movieId })

      return reply
        .status(201)
        .send({ message: 'Filme adicionado aos Meus Filmes com sucesso' })
    },
  )
}
