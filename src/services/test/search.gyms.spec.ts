import { InMemoryGymRepository } from '@/repositories/inMemory/gyms.repository.inMemory'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsService } from '../search.gym'

let gymRepository: InMemoryGymRepository
let sut: SearchGymsService
describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository()
    sut = new SearchGymsService(gymRepository)
  })
  it('should be able to search gyms', async () => {
    await gymRepository.create({
      title: 'test-Gym',
      description: '',
      latitude: -19.946186,
      longitude: -44.1668877,
      phone: '4002-8922',
    })

    await gymRepository.create({
      title: 'fake-Gym',
      description: '',
      latitude: -19.946186,
      longitude: -44.1668877,
      phone: '4002-8922',
    })
    const { gym } = await sut.handle({
      query: 'fake-Gym',
      page: 1,
    })
    expect(gym).toHaveLength(1)
  })

  it('should be able to search gyms paginated with history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `test-Gym-${i}`,
        description: '',
        latitude: -19.946186,
        longitude: -44.1668877,
        phone: '4002-8922',
      })
    }
    const { gym } = await sut.handle({
      query: 'test-Gym',
      page: 2,
    })
    expect(gym).toHaveLength(2)
    expect(gym).toEqual([
      expect.objectContaining({ title: `test-Gym-21` }),
      expect.objectContaining({ title: `test-Gym-22` }),
    ])
  })
})
