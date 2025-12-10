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
                rating: z.coerce.number().nullable(),
                comment: z.string().nullable(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { movieId } = request.params

      const { movie } = await getMovie({ movieId })

      const movieMapped = movie.map((movies) => ({
        ...movies,
        imageUrl: getImageUrl(movies.filename),
        averageRating: Number(movies.averageRating),
        evaluations: movies.evaluations.map((evaluation) => ({
          userId: evaluation.user_id,
          name: evaluation.user.name,
          rating: evaluation.rating ? Number(evaluation.rating) : null,
          comment: evaluation.comment === '' ? null : evaluation.comment,
        })),
      }))

      return reply.status(200).send(movieMapped[0])
    },
  )
}

// {
//   id: movie,
//   title: movie.title,
//   year: movie.year,
//   category: movie.category,
//   description: movie.description,
//   filename: movie.filename,
//   averageRating: movie.averageRating,
//   evaluations: movie.evaluations.map((evaluation) => ({
//     rating: evaluation.rating,
//     comment: evaluation.comment,
//     name: evaluation.user.name,
//   })),
// },

// 200: z.array(
//             z.object({
//               id: z.string(),
//               title: z.string(),
//               year: z.string(),
//               category: z.string(),
//               description: z.string(),
//               filename: z.string(),
//               averageRating: z.number().nullable(),
//               evaluations: z.array(
//                 z.object({
//                   name: z.string(),
//                   rating: z.number().nullable(),
//                   comment: z.string().nullable(),
//                 }),
//               ),
//             }),
//           ),
