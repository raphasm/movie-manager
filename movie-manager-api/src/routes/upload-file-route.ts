import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { uploadFile } from '../functions/upload-file'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyUserRole } from '../middlewares/verify-user-role'

export const uploadsFileRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/upload',
    {
      preHandler: [verifyJwt, verifyUserRole('ADMIN')],
      schema: {
        response: {
          201: z.array(
            z.object({
              filename: z.string(),
            }),
          ),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      // const diskStorage = new DiskStorage()
      try {
        const data = await request.file()
        // console.log(data)

        const fileInfo = await uploadFile(data)
        // await diskStorage.saveFile(fileInfo.filename)

        return reply.status(201).send([{ filename: fileInfo.filename }])
      } catch (error: any) {
        console.log(error)
        // if (error instanceof ZodError) {
        //   const formatted = error.errors.map((err) => ({
        //     path: err.path.join('.'),
        //     message: err.message,
        //   }))
        return reply
          .status(400)
          .send({ error: error.message || 'Erro no upload' })
      }
    },
  )
}
