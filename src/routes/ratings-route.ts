import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createUser } from '../functions/create-user'
import { ratings } from '../functions/ratings'

export const ratingsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/ratings',
    {
      schema: {
        // params: z.object({
        //   movieId: z.string(),
        // }),
        response: {
          201: z.array(
            z.object({
              averageRating: z.number(),
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

      return reply.status(201).send(movies)
    },
  )
}
