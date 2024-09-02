import { userRepository } from '@/repositories/user.repository'
import { InvalidCredentialsError } from './error/invalid.credentials.error'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceReplay {
  user: User
}

export class AuthenticateService {
  constructor(private userRepository: userRepository) {}

  async handle({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceReplay> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const isPasswordValid = await compare(password, user.password_hash)
    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }
    return {
      user,
    }
  }
}
