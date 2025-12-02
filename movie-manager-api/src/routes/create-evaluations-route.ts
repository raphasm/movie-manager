import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createEvaluations } from '../functions/create-evaluations'
import { verifyJwt } from '../middlewares/verify-jwt'

export const createEvaluationsRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/evaluations/:movieId',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Create evaluations',
        tags: ['evaluations'],
        params: z.object({
          movieId: z.string(),
        }),
        body: z.object({
          rating: z.coerce.number().min(1).max(5).positive().nullable(),
          comment: z.string(),
        }),
        response: {
          201: z.string(),
        },
      },
    },

    async (request, reply) => {
      const { rating, comment } = request.body
      const { movieId } = request.params

      // const user_id = request.user.sub

      if (!request.user.sub) {
        throw new Error('Unauthorized')
      }

      await createEvaluations({
        rating,
        comment,
        userId: request.user.sub,
        movieId,
      })

      return reply.status(201).send()
    },
  )
}
