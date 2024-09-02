import { Prisma, CheckIn } from '@prisma/client'
import { checkInRepository } from '../checkIn.repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrimaCheckInsRepository implements checkInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async findManyCheckIn(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_Id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return checkIns
  }

  async findMetricsUser(userId: string) {
    const countUser = await prisma.checkIn.count({
      where: {
        user_Id: userId,
      },
    })
    return countUser
  }

  async findUserInSameDay(userId: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_Id: userId,
        created_at: {
          gte: startOfDate.toDate(),
          lte: endOfDate.toDate(),
        },
      },
    })
    return checkIn
  }
}
