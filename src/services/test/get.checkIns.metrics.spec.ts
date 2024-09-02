import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/checkIn.repository.InMemory'
import { GetCheckInMetricsUserService } from '../get.checkIns.metrics'
let checkInReposository: InMemoryCheckInRepository
let sut: GetCheckInMetricsUserService
describe('Get Count Check-in Service', () => {
  beforeEach(async () => {
    checkInReposository = new InMemoryCheckInRepository()
    sut = new GetCheckInMetricsUserService(checkInReposository)
  })
  it('should be able to get count check-in from user', async () => {
    await checkInReposository.create({
      gym_Id: 'gym-test-01',
      user_Id: 'user-test',
    })
    await checkInReposository.create({
      gym_Id: 'gym-test-02',
      user_Id: 'user-test',
    })
    const { checkInCount } = await sut.handle({
      userId: 'user-test',
    })
    expect(checkInCount).toEqual(2)
  })
})
