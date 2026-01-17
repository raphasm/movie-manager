import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getProfile } from '../functions/get-profile'
import { verifyJwt } from '../middlewares/verify-jwt'
import { getImageUrl } from '../utils/get-image-url'

export const getProfileRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/me',
    {
      preHandler: [verifyJwt],
      schema: {
        summary: 'Get user profile',
        tags: ['user'],
        response: {
          200: z.object({
            userId: z.string(),
            name: z.string(),
            imageUrl: z.string().nullable(),
            email: z.string(),
            role: z.enum(['ADMIN', 'USER']),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub

      const { user } = await getProfile({ userId })

      return reply.status(200).send({
        userId: user.id,
        name: user.name,
        imageUrl: user.imageUrl ? getImageUrl(user.imageUrl) : null,
        email: user.email,
        role: user.role,
      })
    },
  )
}
