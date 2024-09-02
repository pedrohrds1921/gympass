import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/user.repository.inMemory'
import { AuthenticateService } from '../authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../error/invalid.credentials.error'
let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService
describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 8),
    })
    const { user } = await sut.handle({
      email: 'johndoe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.handle({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong passoword', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 8),
    })
    await expect(() =>
      sut.handle({
        email: 'johndoe@example.com',
        password: '123466',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
