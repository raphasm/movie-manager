import { compare } from 'bcryptjs'
import { prisma } from '../lib/prisma'

interface AuthenticateParams {
  email: string
  password: string
}

export async function authenticate({ email, password }: AuthenticateParams) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error('Credenciais invalidas.')
  }

  const doesPasswordMatch = await compare(password, user.password)

  if (!doesPasswordMatch) {
    throw new Error('Credenciais invalidas.')
  }

  return {
    user,
  }
}
