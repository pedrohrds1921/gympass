import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCheckMetricsInService } from '@/services/factories/make.GetCheckInMetrics'

export async function metrics(request: FastifyRequest, replay: FastifyReply) {
  const metricsGymsService = makeCheckMetricsInService()
  const { checkInCount } = await metricsGymsService.handle({
    userId: request.user.sub,
  })

  return replay.status(200).send({
    checkInCount,
  })
}
