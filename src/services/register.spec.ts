/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest'
import { RegisterService } from './register-services'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

describe('Register Service', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(inMemoryUsersRepository)
    const { user } = await registerService.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(inMemoryUsersRepository)
    const { user } = await registerService.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    })

    const isPasswordCorrenctlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrenctlyHashed).toBe(true)
  })
  it('should not be able to  register with same email twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(inMemoryUsersRepository)
    const email = 'email@email.com'
    await registerService.create({
      name: 'Fulano',
      email,
      password: '123456',
    })
    await expect(() =>
      registerService.create({
        name: 'Fulano',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
