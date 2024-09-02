import { UserRepository } from '@/repositories/user.repository'
import { User } from '@prisma/client'
import { UserEmailExistsError } from './error/user.email.exists.erro'
import { hash } from 'bcryptjs'
interface IregisterServices {
  name: string
  email: string
  password: string
}
interface RegisterServiceReplay {
  user: User
}
export class RegisterService {
  constructor(private userRepository: UserRepository) {}
  async handle({
    name,
    email,
    password,
  }: IregisterServices): Promise<RegisterServiceReplay> {
    const password_hash = await hash(password, 8)
    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserEmailExistsError()
    }
    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })
    return {
      user,
    }
  }
}
