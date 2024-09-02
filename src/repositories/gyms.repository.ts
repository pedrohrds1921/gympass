import { Gym, Prisma } from '@prisma/client'

export interface FindManyGymsParams {
  latitude: number
  longitude: number
}

export interface GymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findManyNearbyGyms(params: FindManyGymsParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  findById(gymId: string): Promise<Gym | null>
}
