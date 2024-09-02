import { CheckIn, Prisma } from '@prisma/client'

export interface checkInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findManyCheckIn(userId: string, page: number): Promise<CheckIn[]>
  findMetricsUser(userId: string): Promise<number>
  findUserInSameDay(userId: string, date: Date): Promise<CheckIn | null>
}
