import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createMovie } from '../functions/create-movies'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyUserRole } from '../middlewares/verify-user-role'
import { parseMultipartMovie } from '../utils/parse-multipart-movie'

export const createMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/movies',
    {
      preHandler: [verifyJwt, verifyUserRole('ADMIN')],
      schema: {
        summary: 'Create movies with image upload',
        tags: ['movie'],
        consumes: ['multipart/form-data'],
        response: {
          201: z.object({
            movieId: z.string(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },

    async (request, reply) => {
      if (!request.user.sub) {
        return reply.status(401).send({ error: 'Unauthorized' })
      }

      try {
        const movieData = await parseMultipartMovie(request)

        const { movieId } = await createMovie({
          title: movieData.title,
          year: movieData.year,
          category: movieData.category,
          description: movieData.description,
          fileData: movieData.fileData!,
          userId: request.user.sub,
        })

        return reply.status(201).send({ movieId })
      } catch (error: any) {
        console.error(error)
        return reply
          .status(400)
          .send({ error: error.message || 'Erro ao criar filme' })
      }
    },
  )
}
