import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/checkIn.repository.InMemory'
import { CheckInService } from '../checkIn'
import { InMemoryGymRepository } from '@/repositories/inMemory/gyms.repository.inMemory'
import { MaxDistanceError } from '../error/max.distance.error'
import { MaxCheckInsError } from '../error/max.checkIns.error'
let checkInReposository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInService
describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInReposository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CheckInService(checkInReposository, gymRepository)
    await gymRepository.create({
      id: 'gym-test',
      title: 'test-Gym',
      description: '',
      latitude: -19.946186,
      longitude: -44.1668877,
      phone: '4002-8922',
    })
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 4, 20, 8, 0, 0))
    const { checkIn } = await sut.handle({
      gymId: 'gym-test',
      userId: 'user-test',
      userLatitude: -19.9468343,
      userLongitude: -44.166921,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 4, 20, 8, 0, 0))
    await sut.handle({
      gymId: 'gym-test',
      userId: 'user-test',
      userLatitude: -19.9468343,
      userLongitude: -44.166921,
    })
    await expect(() =>
      sut.handle({
        gymId: 'gym-test',
        userId: 'user-test',
        userLatitude: -19.9468343,
        userLongitude: -44.166921,
      }),
    ).rejects.toBeInstanceOf(MaxCheckInsError)
  })
  it('should be able to check in different day', async () => {
    vi.setSystemTime(new Date(2024, 4, 20, 8, 0, 0))
    await sut.handle({
      gymId: 'gym-test',
      userId: 'user-test',
      userLatitude: -19.9468343,
      userLongitude: -44.166921,
    })
    vi.setSystemTime(new Date(2024, 4, 23, 8, 0, 0))
    const { checkIn } = await sut.handle({
      gymId: 'gym-test',
      userId: 'user-test',
      userLatitude: -19.9468343,
      userLongitude: -44.166921,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in off distance', async () => {
    vi.setSystemTime(new Date(2024, 4, 20, 8, 0, 0))
    await expect(() =>
      sut.handle({
        gymId: 'gym-test',
        userId: 'user-test',
        userLatitude: -19.8658619,
        userLongitude: -43.9737064,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
