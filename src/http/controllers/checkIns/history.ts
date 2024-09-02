import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCheckInHistoryService } from '@/services/factories/make.checkInhistory'

export async function history(request: FastifyRequest, replay: FastifyReply) {
  const historyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = historyQuerySchema.parse(request.query)

  const historyGymsService = makeCheckInHistoryService()
  const { checkIn } = await historyGymsService.handle({
    page,
    userId: request.user.sub,
  })

  return replay.status(200).send({
    checkIn,
  })
}
