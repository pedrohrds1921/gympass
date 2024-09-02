import { PrimaCheckInsRepository } from '@/repositories/prisma/prisma.checkIn.repository'
import { ValidateCheckInsService } from '../validate.checkIn'

export function makeValidateCheckInService() {
  const checkInRepository = new PrimaCheckInsRepository()
  const service = new ValidateCheckInsService(checkInRepository)
  return service
}
