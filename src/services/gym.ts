import { GymRepository } from '@/repositories/gyms.repository'
import { Gym } from '@prisma/client'
interface GymServicesRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface GymServiceReplay {
  gym: Gym
}
export class GymService {
  constructor(private gymRepository: GymRepository) {}
  async handle({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymServicesRequest): Promise<GymServiceReplay> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}
