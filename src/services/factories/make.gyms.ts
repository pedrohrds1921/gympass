import { PrismaGymRepository } from '@/repositories/prisma/prisma.gyms.repository'
import { GymService } from '../gym'

export function makeGymsService() {
  const gymRepository = new PrismaGymRepository()
  const service = new GymService(gymRepository)
  return service
}
