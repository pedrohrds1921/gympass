import { InMemoryGymRepository } from '@/repositories/inMemory/gyms.repository.inMemory'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsService } from '../fetch.nearby.gyms'

let gymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsService
describe('Fetch nearby Gyms Service', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsService(gymRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near-Gym',
      description: '',
      latitude: -19.9498051,
      longitude: -44.1569465,
      phone: '4002-8922',
    })
    await gymRepository.create({
      title: 'Far-Gym',
      description: '',
      latitude: -19.9172732,
      longitude: -44.0529553,
      phone: '4002-8922',
    })
    const { gym } = await sut.handle({
      userLatitude: -19.9468343,
      userLongitude: -44.166921,
    })
    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'Near-Gym' })])
  })
})
