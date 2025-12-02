import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const logoutRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/logout',
    {
      schema: {
        summary: 'Logout user',
        tags: ['user'],
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply
        .clearCookie('token', {
          path: '/',
        })
        .status(200)
        .send({ message: 'Logged out successfully' })
    },
  )
}
