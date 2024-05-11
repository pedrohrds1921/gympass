import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { registerController } from './controllers/register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: 'Te amo meu amor <3' })
  })
  app.post('/users', registerController)
}
