import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ratings } from '../functions/ratings'

export const ratingsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/ratings',
    {
      schema: {
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          limit: z.coerce.number().min(1).max(100).default(10),
        }),
        response: {
          201: z.object({
            movies: z.array(
              z.object({
                averageRating: z.coerce.number(),
                id: z.string(),
                title: z.string(),
                year: z.string(),
                category: z.string(),
                description: z.string(),
                filename: z.string(),
                user_id: z.string(),
              }),
            ),
            meta: z.object({
              page: z.number(),
              perPage: z.number(),
              totalCount: z.number(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, limit } = request.query

      const { movies, meta } = await ratings({ page, limit })

      const mappedMovies = movies.map((movie) => ({
        ...movie,
        averageRating: Number(movie.averageRating),
      }))

      return reply.status(201).send({ movies: mappedMovies, meta })
    },
  )
}
