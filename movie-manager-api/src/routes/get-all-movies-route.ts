import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getAllMovies } from '../functions/get-all-movies'
import { getImageUrl } from '../utils/get-image-url'

export const getAllMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/movies',
    {
      schema: {
        summary: 'Get all movies',
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
      const { page, query } = request.query

      const { movies, meta } = await getAllMovies({ page, query })

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
