import fastify from 'fastify'
import { env } from './env'
import { createUserRoute } from './routes/create-user-route'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(createUserRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
