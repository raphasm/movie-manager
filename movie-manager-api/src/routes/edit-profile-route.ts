import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { editProfile } from '../functions/edit-profile'
import { verifyJwt } from '../middlewares/verify-jwt'
import { getImageUrl } from '../utils/get-image-url'

export const editProfileRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    '/profile',
    {
      onRequest: [verifyJwt],
      schema: {
        summary: 'Edit user profile (name, email, and/or profile picture)',
        tags: ['user'],
        security: [{ bearerAuth: [] }],
        consumes: ['multipart/form-data'],
        response: {
          200: z.object({
            message: z.string(),
            user: z.object({
              id: z.string(),
              name: z.string().optional(),
              email: z.string().email().optional(),
              imageUrl: z.coerce.string().nullable(),
            }),
          }),
          400: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const userId = request.user.sub

        const parts = request.parts()
        let name: string | undefined
        let email: string | undefined
        let imageUrl: any

        for await (const part of parts) {
          if (part.type === 'field') {
            if (part.fieldname === 'name') name = part.value as string
            if (part.fieldname === 'email') email = part.value as string
          } else if (part.type === 'file' && part.fieldname === 'imageUrl') {
            imageUrl = part
            break
          }
        }

        const { user } = await editProfile({
          userId,
          name,
          email,
          imageUrl,
        })

        return reply.status(200).send({
          message: 'Perfil atualizado com sucesso',
          user: {
            ...user,
            imageUrl: user.imageUrl ? getImageUrl(user.imageUrl) : null,
          },
        })
      } catch (error: any) {
        return reply.status(404).send({ error: error.message })
      }
    },
  )
}
