import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verifyJWT'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { checkRole } from '@/http/middlewares/checkRole'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [checkRole(`ADMIN`)] },
    validate,
  )
}
