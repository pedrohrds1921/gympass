import { PrimaCheckInsRepository } from '@/repositories/prisma/prisma.checkIn.repository'
import { CheckInService } from '../checkIn'
import { PrismaGymRepository } from '@/repositories/prisma/prisma.gyms.repository'

export function makeCheckInService() {
  const checkInRepository = new PrimaCheckInsRepository()
  const gymRepository = new PrismaGymRepository()
  const service = new CheckInService(checkInRepository, gymRepository)
  return service
}
