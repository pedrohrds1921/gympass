import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCheckInService } from '@/services/factories/make.checkIn'

export async function create(request: FastifyRequest, replay: FastifyReply) {
  const checkInSchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const checkInGymsParams = z.object({
    gymId: z.string().uuid(),
  })
  const { latitude, longitude } = checkInSchema.parse(request.body)
  const { gymId } = checkInGymsParams.parse(request.params)
  const createGymService = makeCheckInService()
  await createGymService.handle({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return replay.status(201).send()
}
