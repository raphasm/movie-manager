import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteMovie } from '../functions/delete-movie'
import { verifyJwt } from '../middlewares/verify-jwt'

export const deleteMyMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/my-movies/:movieId',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Delete a movie',
        tags: ['movie'],
        params: z.object({
          movieId: z.string(),
        }),
        response: {
          200: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { movieId } = request.params
      const userId = request.user.sub

      await deleteMovie({ movieId, userId })

      return reply.status(200).send({ message: 'Filme deletado com sucesso!' })
    },
  )
}
