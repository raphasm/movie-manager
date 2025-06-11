import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getMovie } from '../functions/get-movie'
import { verifyJwt } from '../middlewares/verify-jwt'

export const getMovieRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/movies/:movieId',
    {
      preHandler: [verifyJwt],
      schema: {
        params: z.object({
          movieId: z.string(),
        }),
        response: {
          200: z.object({
            movie: z.object({
              id: z.string().uuid(),
              title: z.string(),
              year: z.string(),
              category: z.string(),
              description: z.string(),
              filename: z.string(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { movieId } = request.params

      const { movie } = await getMovie({ movieId })

      return reply.status(200).send({ movie })
    },
  )
}
