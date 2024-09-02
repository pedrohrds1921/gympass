import { checkInRepository } from '@/repositories/checkIn.repository'

interface GetCheckInMetricsUserServiceRequest {
  userId: string
}
interface GetCheckInMetricsUserServiceReplay {
  checkInCount: number
}
export class GetCheckInMetricsUserService {
  constructor(private checkInRepository: checkInRepository) {}
  async handle({
    userId,
  }: GetCheckInMetricsUserServiceRequest): Promise<GetCheckInMetricsUserServiceReplay> {
    const checkInCount = await this.checkInRepository.findMetricsUser(userId)
    return { checkInCount }
  }
}
