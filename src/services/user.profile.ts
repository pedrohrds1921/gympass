import { userRepository } from '@/repositories/user.repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './error/resource.not.found'
interface UserProfileServiceRequest {
  userId:string
}
interface UserProfileServiceReplay {
  user: User
}

export class UserProfileService {
  constructor(private userRepository: userRepository) {}
  async handle({
   userId
  }: UserProfileServiceRequest): Promise<UserProfileServiceReplay> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFound()
    }
    return {
      user,
    }
  }
}
