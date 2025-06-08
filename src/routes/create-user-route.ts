import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createUser } from '../functions/create-user'

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.string(),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      await createUser({ name, email, password })

      return reply.status(201).send()
    },
  )
}
