import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'

interface CreateUserParams {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserParams) {
  const userWithTheSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithTheSameEmail) {
    throw new Error('email already register.')
  }

  const hashedPassword = await hash(password, 8)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })
}
