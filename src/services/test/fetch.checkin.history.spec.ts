import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/checkIn.repository.InMemory'
import { FetchCheckInService } from '../fetch.checkIn.history'
let checkInReposository: InMemoryCheckInRepository
let sut: FetchCheckInService
describe('Fetch Check-in Service', () => {
  beforeEach(async () => {
    checkInReposository = new InMemoryCheckInRepository()
    sut = new FetchCheckInService(checkInReposository)
  })
  it('should be able to fetch check in', async () => {
    await checkInReposository.create({
      gym_Id: 'gym-test-01',
      user_Id: 'user-test',
    })

    await checkInReposository.create({
      gym_Id: 'gym-test-02',
      user_Id: 'user-test',
    })
    const { checkIn } = await sut.handle({
      userId: 'user-test',
      page: 1,
    })
    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gym_Id: 'gym-test-01' }),
      expect.objectContaining({ gym_Id: 'gym-test-02' }),
    ])
  })

  it('should be able to fetch check in paginated with history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInReposository.create({
        gym_Id: `gym-${i}`,
        user_Id: 'user-test',
      })
    }

    const { checkIn } = await sut.handle({
      userId: 'user-test',
      page: 2,
    })
    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gym_Id: 'gym-21' }),
      expect.objectContaining({ gym_Id: 'gym-22' }),
    ])
  })
})
