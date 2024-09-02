import { GymRepository } from '@/repositories/gyms.repository'
import { Gym } from '@prisma/client'
interface SearchGymsServiceRequest {
  query: string
  page: number
}
interface SearchGymsServiceReplay {
  gym: Gym[]
}
export class SearchGymsService {
  constructor(private gymRepository: GymRepository) {}
  async handle({
    query,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceReplay> {
    const gym = await this.gymRepository.searchMany(query, page)
    return {
      gym,
    }
  }
}
