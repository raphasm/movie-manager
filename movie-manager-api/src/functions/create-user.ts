import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

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
    throw new Error(
      'Erro ao criar conta. Este e-mail pode já estar cadastrado.',
    )
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
