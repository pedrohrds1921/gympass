import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInService } from '@/services/factories/make.validate.checkIn'
export async function validate(request: FastifyRequest, replay: FastifyReply) {
  const checkIValidateParams = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = checkIValidateParams.parse(request.params)
  const createGymService = makeValidateCheckInService()
  await createGymService.handle({
    checkInId,
  })

  return replay.status(204).send()
}
