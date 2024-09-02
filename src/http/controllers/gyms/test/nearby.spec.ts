import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuth } from '@/utils/test/createAndAuth'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to search to nearby gyms', async () => {
    const { token } = await createAndAuth(app, true)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near Gym',
        description: 'Gym-e2e',
        latitude: -19.9498051,
        longitude: -44.1569465,
        phone: '4002-8922',
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        description: '2-Gym-e2e',
        latitude: -19.9172732,
        longitude: -44.0529553,
        phone: '4002-8922',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -19.9468343,
        longitude: -44.166921,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gym).toHaveLength(1)
    expect(response.body.gym).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
