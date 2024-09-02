import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsService } from '@/services/factories/make.searchGyms'

export async function search(request: FastifyRequest, replay: FastifyReply) {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { query, page } = searchQuerySchema.parse(request.query)

  const searchGymsService = makeSearchGymsService()
  const { gym } = await searchGymsService.handle({
    query,
    page,
  })

  return replay.status(200).send({
    gym,
  })
}
