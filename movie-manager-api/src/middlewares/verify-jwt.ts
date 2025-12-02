import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }

    await request.jwtVerify({ onlyCookie: true })
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
