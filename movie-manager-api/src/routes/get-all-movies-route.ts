import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getAllMovies } from '../functions/get-all-movies'
import { categoriesEnum } from '../interface/categories'
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
          categories: categoriesEnum.optional(),
        }),
        response: {
          200: z.object({
            movies: z.array(
              z.object({
                averageRating: z.number().nullable(),
                id: z.string(),
                title: z.string(),
                year: z.string(),
                category: categoriesEnum,
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
      const { page, query, categories } = request.query

      const { movies, meta } = await getAllMovies({
        page,
        query,
        categories: categories ? [categories] : [],
      })

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
