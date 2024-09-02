import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuth } from '@/utils/test/createAndAuth'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to show to user profile', async () => {
    const { token } = await createAndAuth(app)

    const profile = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profile.body.user).toEqual(
      expect.objectContaining({
        email: 'jontest@example.com',
      }),
    )
  })
})
