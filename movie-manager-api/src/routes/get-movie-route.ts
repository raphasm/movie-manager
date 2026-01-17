import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getMovie } from '../functions/get-movie'
import { getImageUrl } from '../utils/get-image-url'

export const getMovieRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/movies/:movieId',
    {
      schema: {
        summary: 'Get movie',
        tags: ['movie'],
        params: z.object({
          movieId: z.string(),
        }),
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            id: z.string(),
            title: z.string(),
            year: z.string(),
            category: z.string(),
            description: z.string(),
            filename: z.string(),
            imageUrl: z.string(),
            averageRating: z.number(),
            evaluations: z.array(
              z.object({
                userId: z.string(),
                name: z.string(),
                imageUrl: z.string().nullable(),
                evaluationsCount: z.number(),
                rating: z.coerce.number().nullable(),
                comment: z.string().nullable(),
              }),
            ),
            evaluationsMeta: z.object({
              page: z.number(),
              perPage: z.number(),
              totalCount: z.number(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { movieId } = request.params
      const { page } = request.query

      const movie = await getMovie({ movieId, page })

      const mapped = {
        ...movie,
        imageUrl: getImageUrl(movie.filename),
        averageRating: Number(movie.averageRating),
        evaluations: movie.evaluations.map((evaluation) => ({
          userId: evaluation.user_id,
          name: evaluation.user.name,
          evaluationsCount: evaluation.user._count.evaluations,
          rating: evaluation.rating ? Number(evaluation.rating) : null,
          imageUrl: evaluation.user.imageUrl
            ? getImageUrl(evaluation.user.imageUrl)
            : null,
          comment: evaluation.comment === '' ? null : evaluation.comment,
        })),
      }

      return reply.status(200).send(mapped)
    },
  )
}
