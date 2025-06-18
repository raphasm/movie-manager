import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createMovies } from '../functions/create-movies'
import { verifyJwt } from '../middlewares/verify-jwt'

export const createMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/movies',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Create movies',
        tags: ['movie'],
        body: z.object({
          title: z.string(),
          year: z.string(),
          category: z.string(),
          description: z.string(),
          filename: z.string().min(10),
        }),
        response: {
          201: z.string(),
        },
      },
    },

    async (request, reply) => {
      const { title, year, category, description, filename } = request.body

      // const user_id = request.user.sub

      if (!request.user.sub) {
        throw new Error('Unauthorized')
      }

      await createMovies({
        title,
        year,
        category,
        description,
        filename,
        user_id: request.user.sub,
      })

      return reply.status(201).send()
    },
  )
}
