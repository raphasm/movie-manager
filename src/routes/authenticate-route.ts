import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { authenticate } from '../functions/authenticate'

export const authenticateRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/sessions',
    {
      schema: {
        summary: 'Authenticate an user',
        tags: ['user'],
        body: z.object({
          password: z.string(),
          email: z.string().email(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const { user } = await authenticate({ email, password })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        },
      )

      return reply.status(200).send({
        token,
      })
    },
  )
}
