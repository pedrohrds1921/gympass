import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/inMemory/user.repository.inMemory'
import { UserEmailExistsError } from '../error/user.email.exists.erro'
let userRepository: InMemoryUsersRepository
let sut: RegisterService
describe('Register Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterService(userRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: `1263456`,
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: `1263456`,
    })
    const isPasswordCorrectlyHashed = await compare(
      '1263456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('shold not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'
    await sut.handle({
      name: 'John Doe',
      email,
      password: `1263456`,
    })
    await expect(() =>
      sut.handle({
        name: 'John Doe',
        email,
        password: `1263456`,
      }),
    ).rejects.toBeInstanceOf(UserEmailExistsError)
  })
})
