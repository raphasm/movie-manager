import { MultipartFile } from '@fastify/multipart'
import { Categories } from '@prisma/client'
import { DiskStorage } from '../providers/disk-storage'
import { createMovies } from './create-movies'
import { uploadFile } from './upload-file'

interface CreateMovieWithUploadParams {
  title: string
  year: string
  category: string
  description: string
  fileData: MultipartFile
  userId: string
}

interface CreateMovieWithUploadResult {
  movieId: string
}

export async function createMovieWithUpload({
  title,
  year,
  category,
  description,
  fileData,
  userId,
}: CreateMovieWithUploadParams): Promise<CreateMovieWithUploadResult> {
  // Faz o upload do arquivo
  const fileInfo = await uploadFile(fileData)

  // Move o arquivo para a pasta de uploads
  const diskStorage = new DiskStorage()
  await diskStorage.saveFile(fileInfo.filename)

  // Cria o filme no banco de dados
  const { movies } = await createMovies({
    title,
    year,
    category: category as Categories,
    description,
    filename: fileInfo.filename,
    user_id: userId,
  })

  return { movieId: movies.id }
}
