import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuth } from '@/utils/test/createAndAuth'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to search gyms', async () => {
    const { token } = await createAndAuth(app, true)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Ts-Gym',
        description: 'Gym-e2e',
        latitude: -19.946186,
        longitude: -44.1668877,
        phone: '4002-8922',
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Js Gym',
        description: '2-Gym-e2e',
        latitude: -19.946186,
        longitude: -44.1668877,
        phone: '4002-8922',
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Ts',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gym).toHaveLength(1)
    expect(response.body.gym).toEqual([
      expect.objectContaining({
        title: 'Ts-Gym',
      }),
    ])
  })
})
