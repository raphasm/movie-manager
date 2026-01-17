import { hash } from 'bcryptjs'
import { AppError } from '../error/app-error'
import { prisma } from '../lib/prisma'

interface CreateUserParams {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserParams) {
  // Busca em uma única query se existe email OU nome já cadastrado
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { name }],
    },
    select: {
      email: true,
      name: true,
    },
  })

  if (existingUser) {
    // Prioriza erro de email se ambos forem duplicados
    if (existingUser.email === email) {
      throw new AppError(
        'Erro ao criar conta. Este e-mail já esta cadastrado.',
        409,
      )
    }
    if (existingUser.name === name) {
      throw new AppError('Nome de usuário já existente, use outro nome', 409)
    }
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
