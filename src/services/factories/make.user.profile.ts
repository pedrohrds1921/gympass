import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { UserProfileService } from '../user.profile'

export function makeUserProfileService() {
  const primaUserRepo = new PrismaUsersRepository()
  const userProfileService = new UserProfileService(primaUserRepo)
  return userProfileService
}
