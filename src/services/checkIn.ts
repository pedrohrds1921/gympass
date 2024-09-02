import { CheckIn } from '@prisma/client'
import { checkInRepository } from '@/repositories/checkIn.repository'
import { GymRepository } from '@/repositories/gyms.repository'
import { ResourceNotFound } from './error/resource.not.found'
import { getDistanceBetweenCoordinates } from '@/utils/get.distance.betweenCoordinates'
import { MaxDistanceError } from './error/max.distance.error'
import { MaxCheckInsError } from './error/max.checkIns.error'

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceReplay {
  checkIn: CheckIn
}
export class CheckInService {
  constructor(
    private checkInRepository: checkInRepository,
    private gymRepository: GymRepository,
  ) {}

  async handle({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceReplay> {
    const gym = await this.gymRepository.findById(gymId)
    if (!gym) {
      throw new ResourceNotFound()
    }
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )
    const maxDistanceInKM = 0.1
    if (distance > maxDistanceInKM) {
      throw new MaxDistanceError()
    }
    const checkInSameDay = await this.checkInRepository.findUserInSameDay(
      userId,
      new Date(),
    )
    if (checkInSameDay) {
      throw new MaxCheckInsError()
    }

    const checkIn = await this.checkInRepository.create({
      gym_Id: gymId,
      user_Id: userId,
    })
    return {
      checkIn,
    }
  }
}
