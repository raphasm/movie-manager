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
        summary: 'Get my movies',
        tags: ['movie'],
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            movies: z.array(
              z.object({
                averageRating: z.number().nullable(),
                id: z.string(),
                title: z.string(),
                year: z.string(),
                category: z.string(),
                description: z.string(),
                filename: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page } = request.query
      const userId = request.user.sub

      const { movies } = await getMyMovies({ userId, page })

      return reply.status(200).send({ movies })
    },
  )
}
