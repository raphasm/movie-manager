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
          200: z.array(
            z.object({
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
                  name: z.string(),
                  rating: z.coerce.number().nullable(),
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

      const { movie } = await getMovie({ movieId })

      const movieMapped = movie.map((movies) => ({
        id: movies.id,
        title: movies.title,
        year: movies.year,
        category: movies.category,
        description: movies.description,
        filename: movies.filename,
        imageUrl: getImageUrl(movies.filename),
        averageRating: Number(movies.averageRating),
        evaluations: movies.evaluations.map((evaluation) => ({
          rating: Number(evaluation.rating),
          comment: evaluation.comment,
          name: evaluation.user.name,
        })),
      }))

      return reply.status(200).send(movieMapped)
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
