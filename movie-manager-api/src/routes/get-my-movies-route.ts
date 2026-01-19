import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getMyMovies } from '../functions/get-my-movies'
import { verifyJwt } from '../middlewares/verify-jwt'
import { getImageUrl } from '../utils/get-image-url'

export const getMyMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/my-movies',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Get my movies',
        tags: ['movie'],
        querystring: z.object({
          query: z.string().optional(),
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            movies: z.array(
              z.object({
                averageRating: z.number().nullable(),
                id: z.string(),
                title: z.string(),
                year: z.string(),
                category: z.string(),
                description: z.string(),
                filename: z.string(),
                imageUrl: z.string(),
              }),
            ),
            meta: z.object({
              pageIndex: z.number(),
              perPage: z.number(),
              totalCount: z.number(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page } = request.query
      const userId = request.user.sub

      const { movies, meta } = await getMyMovies({ userId, page })

      const formattedMovies = movies.map((movie) => ({
        ...movie,
        averageRating: movie.averageRating ? Number(movie.averageRating) : null,
        imageUrl: getImageUrl(movie.filename),
      }))

      const formattedMeta = {
        pageIndex: page,
        perPage: meta.perPage,
        totalCount: meta.totalCount,
      }

      return reply
        .status(200)
        .send({ movies: formattedMovies, meta: formattedMeta })
    },
  )
}
