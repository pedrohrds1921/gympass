import { Prisma, Gym } from '@prisma/client'
import { FindManyGymsParams, GymRepository } from '../gyms.repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymRepository implements GymRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data })
    return gym
  }

  async findManyNearbyGyms({ latitude, longitude }: FindManyGymsParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
   SELECT * from gyms
   WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }

  async searchMany(query: string, page: number) {
    const gym = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return gym
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })
    return gym
  }
}
