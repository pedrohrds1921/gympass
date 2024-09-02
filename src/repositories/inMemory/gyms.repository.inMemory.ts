import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindManyGymsParams, GymRepository } from '../gyms.repository'
import { getDistanceBetweenCoordinates } from '@/utils/get.distance.betweenCoordinates'
export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []
  async findById(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)
    if (!gym) {
      return null
    }
    return gym
  }

  async findManyNearbyGyms(params: FindManyGymsParams): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      return distance < 10
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }
    this.items.push(gym)
    return gym
  }
}
