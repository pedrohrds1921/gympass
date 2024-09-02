import { GymRepository } from '@/repositories/gyms.repository'
import { Gym } from '@prisma/client'
interface FetchNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}
interface FetchNearbyGymsServiceReplay {
  gym: Gym[]
}
export class FetchNearbyGymsService {
  constructor(private gymRepository: GymRepository) {}
  async handle({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceReplay> {
    const gym = await this.gymRepository.findManyNearbyGyms({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return {
      gym,
    }
  }
}
