import { makeUserProfileService } from '@/services/factories/make.user.profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, replay: FastifyReply) {
  const getUserProfile = makeUserProfileService()
  const { user } = await getUserProfile.handle({
    userId: request.user.sub,
  })

  return replay.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
