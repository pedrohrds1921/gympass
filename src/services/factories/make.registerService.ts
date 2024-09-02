import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { RegisterService } from '../register'

export function makeRegisterService() {
  const primaUserRepo = new PrismaUsersRepository()
  const registerService = new RegisterService(primaUserRepo)
  return registerService
}
