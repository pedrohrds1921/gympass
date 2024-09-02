import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNearbyGymsService } from '@/services/factories/make.fetchNearby.gyms'

export async function nearby(request: FastifyRequest, replay: FastifyReply) {
  const nearbyGymsSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { latitude, longitude } = nearbyGymsSchema.parse(request.query)

  const nearbyGymsService = makeFetchNearbyGymsService()
  const { gym } = await nearbyGymsService.handle({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return replay.status(200).send({
    gym,
  })
}
