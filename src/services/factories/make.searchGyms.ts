import { PrismaGymRepository } from '@/repositories/prisma/prisma.gyms.repository'
import { SearchGymsService } from '../search.gym'

export function makeSearchGymsService() {
  const gymRepository = new PrismaGymRepository()
  const service = new SearchGymsService(gymRepository)
  return service
}
