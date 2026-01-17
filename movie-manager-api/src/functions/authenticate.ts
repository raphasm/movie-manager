import { compare } from 'bcryptjs'
import { AppError } from '../error/app-error'
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
    throw new AppError('Credenciais invalidas.', 401)
  }

  const doesPasswordMatch = await compare(password, user.password)

  if (!doesPasswordMatch) {
    throw new AppError('Credenciais invalidas.', 401)
  }

  return {
    user,
  }
}
