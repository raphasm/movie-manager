import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createMovieWithUpload } from '../functions/create-movie-with-upload'
import { verifyJwt } from '../middlewares/verify-jwt'
import { parseMultipartMovie } from '../utils/parse-multipart-movie'
import { validateMovieData } from '../validators/movie-validator'

export const createMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/movies',
    {
      preHandler: [verifyJwt],
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
        // Parse dos dados do multipart
        const movieData = await parseMultipartMovie(request)

        // Validação dos dados
        const validation = validateMovieData(movieData)
        if (!validation.success) {
          return reply.status(400).send({ error: validation.error! })
        }

        // Cria o filme com upload da imagem
        const { movieId } = await createMovieWithUpload({
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
