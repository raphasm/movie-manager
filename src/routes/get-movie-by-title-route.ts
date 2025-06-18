import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import { getMovieByTitle } from '../functions/get-movie-by-title'

export const getMovieByTitleRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/movies/search',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Get Movie by title',
        tags: ['movie'],
        querystring: z.object({
          query: z.coerce.string(),
          page: z.coerce.number().min(1).default(1),
        }),
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
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { query, page } = request.query

      const { movies } = await getMovieByTitle({ query, page })

      return reply.status(200).send({ movies })
    },
  )
}
