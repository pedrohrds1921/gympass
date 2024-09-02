import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

export function checkRole(roleTarget: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, replay: FastifyReply) => {
    const { role } = request.user
    if (role !== roleTarget)
      return replay.status(401).send({ message: 'Unauthozied' })
  }
}
