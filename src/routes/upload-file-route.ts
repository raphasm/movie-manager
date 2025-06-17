import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { uploadFile } from '../functions/upload-file'
import { z } from 'zod'
import uploadConfig from '../configs/upload'
import { DiskStorage } from '../providers/disk-storage'

export const uploadsFileRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/upload',
    {
      schema: {
        response: {
          201: z.array(
            z.object({
              filename: z.string(),
            }),
          ),
        },
      },
    },
    async (request, reply) => {
      const diskStorage = new DiskStorage()

      const data = await request.file()

      if (!data) {
        throw new Error('No file uploaded')
      }

      const fileInfo = await uploadFile(data)

      return reply.status(201).send([{ filename: fileInfo.filename }])
    },
  )
}
