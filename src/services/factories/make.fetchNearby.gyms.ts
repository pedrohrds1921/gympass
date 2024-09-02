import { FetchNearbyGymsService } from '../fetch.nearby.gyms'
import { PrismaGymRepository } from '@/repositories/prisma/prisma.gyms.repository'

export function makeFetchNearbyGymsService() {
  const gymRepository = new PrismaGymRepository()
  const service = new FetchNearbyGymsService(gymRepository)
  return service
}
