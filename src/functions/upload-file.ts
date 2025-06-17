import { pipeline } from 'stream'
import { promisify } from 'util'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import uploadConfig from '../configs/upload'

const pump = promisify(pipeline)

export async function uploadFile(data: any) {
  if (!data) {
    throw new Error('Arquivo não encontrado')
  }

  if (!uploadConfig.ACCEPTED_IMAGE_TYPES.includes(data.mimetype)) {
    throw new Error('Tipo de arquivo não suportado')
  }

  if (
    data.file.truncated === true ||
    data.file.bytesRead > uploadConfig.MAX_FILE_SIZE
  ) {
    throw new Error('Arquivo excede o tamanho máximo de 3MB')
  }

  // Gera um nome único para o arquivo
  const fileHash = crypto.randomBytes(10).toString('hex')
  const fileName = `${fileHash}-${data.filename}`

  // Garante que o diretório temporário existe
  await fs.promises.mkdir(uploadConfig.TMP_FOLDER, { recursive: true })

  const filePath = path.join(uploadConfig.TMP_FOLDER, fileName)
  await pump(data.file, fs.createWriteStream(filePath))

  return {
    filename: fileName,
    mimetype: data.mimetype,
    size: data.file.bytesRead,
    path: filePath,
  }
}
