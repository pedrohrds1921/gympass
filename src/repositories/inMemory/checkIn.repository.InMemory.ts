import { CheckIn, Prisma } from '@prisma/client'
import { checkInRepository } from '../checkIn.repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements checkInRepository {
  public items: CheckIn[] = []
  async findUserInSameDay(userId: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')
    const checkInSameDay = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isSameDate =
        checkInDate.isAfter(startOfDate) && checkInDate.isBefore(endOfDate)
      return checkIn.user_Id === userId && isSameDate
    })
    if (!checkInSameDay) {
      return null
    }
    return checkInSameDay
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)
    if (!checkIn) {
      return null
    }
    return checkIn
  }

  async findManyCheckIn(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_Id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findMetricsUser(userId: string) {
    return this.items.filter((item) => item.user_Id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_Id: data.user_Id,
      gym_Id: data.gym_Id,
    }
    this.items.push(checkIn)
    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }
    return checkIn
  }
}
