import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import { getEvaluations } from '../functions/get-evaluations'

export const getEvaluationsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/evaluations/:movieId',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Get evaluations',
        tags: ['evaluations'],
        params: z.object({
          movieId: z.string(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              year: z.string(),
              category: z.string(),
              description: z.string(),
              filename: z.string(),
              averageRating: z.coerce.number(),
              evaluations: z.array(
                z.object({
                  name: z.string(),
                  rating: z.number().nullable(),
                  comment: z.string().nullable(),
                }),
              ),
            }),
          ),
        },
      },
    },
    async (request, reply) => {
      const { movieId } = request.params

      const { evaluations } = await getEvaluations({ movieId })

      const mappedEvaluations = evaluations.map((movie) => ({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        category: movie.category,
        description: movie.description,
        filename: movie.filename,
        averageRating: Number(movie.averageRating),
        evaluations: movie.evaluations.map((evaluation) => ({
          name: evaluation.user.name,
          rating: Number(evaluation.rating),
          comment: evaluation.comment,
        })),
      }))

      return reply.status(200).send(mappedEvaluations)
    },
  )
}
