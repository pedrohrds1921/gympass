import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const primaUserRepo = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(primaUserRepo)
  return authenticateService
}
