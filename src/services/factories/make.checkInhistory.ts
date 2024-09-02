import { PrimaCheckInsRepository } from '@/repositories/prisma/prisma.checkIn.repository'
import { FetchCheckInService } from '../fetch.checkIn.history'

export function makeCheckInHistoryService() {
  const checkInRepository = new PrimaCheckInsRepository()
  const service = new FetchCheckInService(checkInRepository)
  return service
}
