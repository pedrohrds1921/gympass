import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserEmailExistsError } from '@/services/error/user.email.exists.erro'
import { makeRegisterService } from '@/services/factories/make.registerService'

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()
    await registerService.handle({ name, email, password })
  } catch (err) {
    if (err instanceof UserEmailExistsError) {
      return replay.status(409).send({ message: err.message })
    }
    return replay.status(500).send('Server internal error')
  }
  return replay.status(201).send()
}
