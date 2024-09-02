import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/inMemory/gyms.repository.inMemory'
import { GymService } from '../gym'
let gymRepository: InMemoryGymRepository
let sut: GymService
describe('Register Service', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new GymService(gymRepository)
  })
  it('should be able to register', async () => {
    const { gym } = await sut.handle({
      title: 'test-Gym',
      description: '',
      latitude: -19.946186,
      longitude: -44.1668877,
      phone: '4002-8922',
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
