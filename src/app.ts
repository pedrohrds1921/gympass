import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInRoutes } from './http/controllers/checkIns/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.SECRET_JWT,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInRoutes)
app.register(fastifyCookie)
app.setErrorHandler((error, _requeste, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Deve enviar o error pra um tool como DataDog/NewRelic/Sentry
  }
  return replay.status(500).send({ message: 'Internal Server error' })
})
