import { CheckIn } from '@prisma/client'
import { checkInRepository } from '@/repositories/checkIn.repository'
import { ResourceNotFound } from './error/resource.not.found'
import dayjs from 'dayjs'
import { LimitTimeValidateError } from './error/limit.validate.time.error'

interface ValidateCheckInsServiceRequest {
  checkInId: string
}

interface ValidateCheckInsServiceReplay {
  checkIn: CheckIn
}
export class ValidateCheckInsService {
  constructor(private checkInRepository: checkInRepository) {}

  async handle({
    checkInId,
  }: ValidateCheckInsServiceRequest): Promise<ValidateCheckInsServiceReplay> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }
    const differenceInMinutesBetweenCheckInAndCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )
    if (differenceInMinutesBetweenCheckInAndCreation > 20) {
      throw new LimitTimeValidateError()
    }

    checkIn.validated_at = new Date()
    await this.checkInRepository.save(checkIn)
    return {
      checkIn,
    }
  }
}
