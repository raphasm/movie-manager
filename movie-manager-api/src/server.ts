import fastify from 'fastify'
import { env } from './env'
import { createUserRoute } from './routes/create-user-route'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
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
import uploadConfig from './configs/upload'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { getMoviesByCategoriesRoute } from './routes/get-movies-by-categories-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.register(fastifyMultipart, {
  limits: { fileSize: uploadConfig.MAX_FILE_SIZE },
  attachFieldsToBody: true,
})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.3',
    info: {
      title: 'movie.manager',
      description: 'Especificação da API e das rotas feitas.',
      version: '1.0.0',
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',

  uiConfig: {
    persistAuthorization: true,
  },
})

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
app.register(getMoviesByCategoriesRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
