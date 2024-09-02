import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verifyJWT'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { checkRole } from '@/http/middlewares/checkRole'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/gyms', { onRequest: [checkRole('ADMIN')] }, create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
