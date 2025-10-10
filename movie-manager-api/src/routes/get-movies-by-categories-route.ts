import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getMoviesByCategories } from '../functions/get-movies-by-categories'
import { verifyJwt } from '../middlewares/verify-jwt'

export const getMoviesByCategoriesRoute: FastifyPluginAsyncZod = async (
  app,
) => {
  app.get(
    '/movies/search/categories',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Get Movie by title',
        tags: ['movie'],
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          category: z.enum([
            'ACAO',
            'AVENTURA',
            'COMEDIA',
            'DRAMA',
            'DOCUMENTARIO',
            'TERROR',
            'SUSPENSE',
            'FICCAO',
            'ANIME',
            'ROMANCE',
          ]),
        }),
        response: {
          200: z.object({
            movies: z.array(
              z.object({
                id: z.string().uuid(),
                averageRating: z.coerce.number().nullable(),
                title: z.string(),
                year: z.string(),
                category: z.enum([
                  'ACAO',
                  'AVENTURA',
                  'COMEDIA',
                  'DRAMA',
                  'DOCUMENTARIO',
                  'TERROR',
                  'SUSPENSE',
                  'FICCAO',
                  'ANIME',
                  'ROMANCE',
                ]),
                description: z.string(),
                filename: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, category } = request.query

      const { movies } = await getMoviesByCategories({ page, category })

      const formattedMovies = movies.map((movie) => ({
        id: movie.id,
        averageRating: Number(movie.averageRating),
        title: movie.title,
        year: movie.year,
        category: movie.category,
        description: movie.description,
        filename: movie.filename,
      }))

      return reply.status(200).send({ movies: formattedMovies })
    },
  )
}
