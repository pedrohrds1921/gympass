import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/user.repository.inMemory'
import { hash } from 'bcryptjs'
import { UserProfileService } from '../user.profile'
import { ResourceNotFound } from '../error/resource.not.found'
let usersRepository: InMemoryUsersRepository
let sut: UserProfileService // sut = System Under Test
describe('User Profine Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UserProfileService(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const userProfile = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 8),
    })
    const { user } = await sut.handle({
      userId: userProfile.id,
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to get user profile whith wrong id ', async () => {
    await expect(() =>
      sut.handle({
        userId: 'no-used-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
