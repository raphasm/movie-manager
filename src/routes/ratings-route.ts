import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createUser } from '../functions/create-user'
import { ratings } from '../functions/ratings'

export const ratingsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/ratings',
    {
      schema: {
        response: {
          201: z.array(
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
        },
      },
    },
    async (request, reply) => {
      // const { movieId } = request.params

      const { movies } = await ratings()

      const mappedMovies = movies.map((movie) => ({
        ...movie,
        averageRating: Number(movie.averageRating),
      }))

      return reply.status(201).send(mappedMovies)
    },
  )
}
