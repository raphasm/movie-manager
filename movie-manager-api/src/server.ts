import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import uploadConfig from './configs/upload'
import { env } from './env'
import { authenticateRoute } from './routes/authenticate-route'
import { createEvaluationsRoute } from './routes/create-evaluations-route'
import { createMoviesRoute } from './routes/create-movies-route'
import { createUserRoute } from './routes/create-user-route'
import { getEvaluationsRoute } from './routes/get-evaluations-route'
import { getMovieByTitleRoute } from './routes/get-movie-by-title-route'
import { getMovieRoute } from './routes/get-movie-route'
import { getMoviesByCategoriesRoute } from './routes/get-movies-by-categories-route'
import { getMyMoviesRoute } from './routes/get-my-movies-route'
import { ratingsRoute } from './routes/ratings-route'
import { uploadsFileRoute } from './routes/upload-file-route'

import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import { getAllMoviesRoute } from './routes/get-all-movies-route'
import { getProfileRoute } from './routes/get-profile-route'
import { logoutRoute } from './routes/logout-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
})

app.register(fastifyStatic, {
  root: uploadConfig.UPLOADS_FOLDER,
  prefix: '/uploads/',
})
app.register(fastifyMultipart, {
  limits: { fileSize: uploadConfig.MAX_FILE_SIZE },
})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
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
app.register(getAllMoviesRoute)
app.register(getProfileRoute)
app.register(logoutRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
