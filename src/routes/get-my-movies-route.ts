import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import { getMyMovies } from '../functions/get-my-movies'

export const getMyMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/my-movies',
    {
      preHandler: [verifyJwt],
      schema: {
        response: {
          200: z.object({
            movies: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
                year: z.string(),
                category: z.string(),
                description: z.string(),
                filename: z.string(),
                user_id: z.string().uuid(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub

      const { movies } = await getMyMovies({ userId })

      return reply.status(200).send({ movies })
    },
  )
}
