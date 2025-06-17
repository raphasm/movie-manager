import fastify from 'fastify'
import { env } from './env'
import { createUserRoute } from './routes/create-user-route'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createMoviesRoute } from './routes/create-movies-route'
import fastifyJwt from '@fastify/jwt'
import { authenticateRoute } from './routes/authenticate-route'
import { getMovieRoute } from './routes/get-movie-route'
import { getMyMoviesRoute } from './routes/get-my-movies-route'
import { getMovieByTitleRoute } from './routes/get-movie-by-title-route'
import { createEvaluationsRoute } from './routes/create-evaluations-route'
import { getEvaluationsRoute } from './routes/get-evaluations-route'
import { ratingsRoute } from './routes/ratings-route'
import fastifyMultipart from '@fastify/multipart'
import { uploadsFileRoute } from './routes/upload-file-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyMultipart, {
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  // attachFieldsToBody: true,
  // sharedSchemaId: '#mySharedSchema',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(createUserRoute)
app.register(authenticateRoute)
app.register(createMoviesRoute)
app.register(getMovieRoute)
app.register(getMyMoviesRoute)
app.register(getMovieByTitleRoute)
app.register(createEvaluationsRoute)
app.register(getEvaluationsRoute)
app.register(ratingsRoute)
app.register(uploadsFileRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
