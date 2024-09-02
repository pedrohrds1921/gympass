import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/checkIn.repository.InMemory'
import { ValidateCheckInsService } from '../validate.checkIn'
import { ResourceNotFound } from '../error/resource.not.found'
import { LimitTimeValidateError } from '../error/limit.validate.time.error'
let checkInReposository: InMemoryCheckInRepository
let sut: ValidateCheckInsService
describe('Validate Check-in Service', () => {
  beforeEach(async () => {
    checkInReposository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInsService(checkInReposository)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to  validate check-in', async () => {
    const createdCheckIn = await checkInReposository.create({
      gym_Id: 'gym-test',
      user_Id: 'user-test',
    })
    const { checkIn } = await sut.handle({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate with inesexitent check-in', async () => {
    await expect(() =>
      sut.handle({
        checkInId: 'inesxistent-checkIn',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it("Shouldn't proceed if check-in time expired.", async () => {
    vi.setSystemTime(new Date(2024, 4, 20, 8, 0, 0))
    const createdCheckIn = await checkInReposository.create({
      gym_Id: 'gym-test',
      user_Id: 'user-test',
    })
    const twentyOneMinutsInMileseconds = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutsInMileseconds)
    await expect(() =>
      sut.handle({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LimitTimeValidateError)
  })
})
