import { prisma } from '../lib/prisma'

interface GetProfileParams {
  userId: string
}

export async function getProfile({ userId }: GetProfileParams) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      role: true,
    },
  })

  if (!user) {
    throw new Error('User not found.')
  }

  return {
    user,
  }
}
