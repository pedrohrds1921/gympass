import { CheckIn } from '@prisma/client'
import { checkInRepository } from '@/repositories/checkIn.repository'

interface FetchCheckInUserServiceRequest {
  userId: string
  page: number
}

interface FetchCheckInUserServiceReplay {
  checkIn: CheckIn[]
}
export class FetchCheckInService {
  constructor(private checkInRepository: checkInRepository) {}

  async handle({
    userId,
    page,
  }: FetchCheckInUserServiceRequest): Promise<FetchCheckInUserServiceReplay> {
    const checkIn = await this.checkInRepository.findManyCheckIn(userId, page)

    return {
      checkIn,
    }
  }
}
