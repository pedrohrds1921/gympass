import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, replay: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await replay.jwtSign(
    {
      role: request.user.role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await replay.jwtSign(
    {
      role: request.user.role,
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )
  return replay
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
