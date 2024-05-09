import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '@/services/register-services'
import { UserAlreadyExistsError } from '@/services/erros/user-already-exists-error'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(request.body)
  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)
    await registerService.create({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
  return reply.status(201).send()
}
