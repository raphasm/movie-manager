import { MultipartFile } from '@fastify/multipart'
import { prisma } from '../lib/prisma'
import { DiskStorage } from '../providers/disk-storage'

interface EditProfileParams {
  userId: string
  email?: string
  name?: string
  imageUrl?: MultipartFile
}

export async function editProfile({
  userId,
  email,
  name,
  imageUrl,
}: EditProfileParams) {
  const currentUser = await prisma.user.findFirst({
    where: { id: userId },
  })

  if (!currentUser) {
    throw new Error('Usuário não encontrado')
  }

  const updateData: Record<string, string> = {}

  // Validar e adicionar nome se fornecido
  if (name) {
    const trimmedName = name.trim()

    if (trimmedName !== currentUser.name) {
      const nameExists = await prisma.user.findFirst({
        where: { name: trimmedName, NOT: { id: userId } },
      })

      if (nameExists) {
        throw new Error('Nome já está em uso')
      }

      updateData.name = trimmedName
    }
  }

  // Validar e adicionar email se fornecido
  if (email) {
    const trimmedEmail = email.trim()

    if (trimmedEmail !== currentUser.email) {
      const emailExists = await prisma.user.findFirst({
        where: { email: trimmedEmail, NOT: { id: userId } },
      })

      if (emailExists) {
        throw new Error('Email já está em uso')
      }

      updateData.email = trimmedEmail
    }
  }

  // Processar upload de imagem
  if (imageUrl) {
    const diskStorage = new DiskStorage()

    try {
      const fileInfo = await diskStorage.uploadFile(imageUrl)
      await diskStorage.saveFile(fileInfo.filename)

      // Deletar imagem antiga
      if (currentUser.imageUrl) {
        await diskStorage
          .deleteFile(currentUser.imageUrl, 'upload')
          .catch(() => {})
      }

      updateData.imageUrl = fileInfo.filename
    } catch (error) {
      throw error
    }
  }

  // Se não há nada para atualizar, retornar usuário atual
  if (Object.keys(updateData).length === 0) {
    return { user: currentUser }
  }

  // Atualizar usuário
  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
    },
  })

  return { user }
}
