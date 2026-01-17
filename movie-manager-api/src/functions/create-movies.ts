import { MultipartFile } from '@fastify/multipart'
import { Categories } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { DiskStorage } from '../providers/disk-storage'

interface CreateMovieRequest {
  title: string
  year: string
  category: string
  description: string
  fileData: MultipartFile
  userId: string
}

export async function createMovie({
  title,
  year,
  category,
  description,
  fileData,
  userId,
}: CreateMovieRequest) {
  // Validação dos dados
  if (!title || !year || !category || !description) {
    throw new Error('Todos os campos são obrigatórios')
  }

  if (!fileData) {
    throw new Error('Imagem é obrigatória')
  }

  // Verifica se o usuário existe
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('Usuário não encontrado')
  }
  const diskStorage = new DiskStorage()

  // Faz o upload do arquivo
  const fileInfo = await diskStorage.uploadFile(fileData)

  // Move o arquivo para a pasta de uploads
  await diskStorage.saveFile(fileInfo.filename)

  // Cria o filme no banco de dados
  const movie = await prisma.movie.create({
    data: {
      title,
      year,
      category: category as Categories,
      description,
      filename: fileInfo.filename,
      user_id: userId,
    },
  })

  return { movieId: movie.id }
}
