/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'
import { User } from '@prisma/client'
interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}
interface RegisterServiceReply {
  user: User
}
export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  async create({
    name,
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceReply> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
