import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuth } from '@/utils/test/createAndAuth'

describe('Create ChecIn(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to create a check-in', async () => {
    const { token } = await createAndAuth(app, true)

    const gym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test-Gym-e2e',
        description: 'Gym-e2e',
        latitude: -19.946186,
        longitude: -44.1668877,
        phone: '4002-8922',
      })
    const response = await request(app.server)
      .post(`/gyms/${gym.body.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test-Gym-e2e',
        description: 'Gym-e2e',
        latitude: -19.946186,
        longitude: -44.1668877,
        phone: '4002-8922',
      })

    expect(response.statusCode).toEqual(201)
  })
})