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
import { getMyMovies } from './functions/get-my-movies'
import { getMyMoviesRoute } from './routes/get-my-movies-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

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

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
