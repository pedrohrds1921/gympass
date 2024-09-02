import { PrimaCheckInsRepository } from '@/repositories/prisma/prisma.checkIn.repository'
import { GetCheckInMetricsUserService } from '../get.checkIns.metrics'

export function makeCheckMetricsInService() {
  const checkInRepository = new PrimaCheckInsRepository()
  const service = new GetCheckInMetricsUserService(checkInRepository)
  return service
}
