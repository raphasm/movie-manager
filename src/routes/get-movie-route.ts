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
        summary: 'Get movie',
        tags: ['movie'],
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
              ratingCount: z.number().int(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { movieId } = request.params

      const { movie } = await getMovie({ movieId })

      return reply.status(200).send({
        movie: {
          id: movie.id,
          title: movie.title,
          year: movie.year,
          category: movie.category,
          description: movie.description,
          filename: movie.filename,
          ratingCount: movie._count.evaluations,
        },
      })
    },
  )
}
