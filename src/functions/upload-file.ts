import { pipeline } from 'stream'
import { promisify } from 'util'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import uploadConfig from '../configs/upload'

const pump = promisify(pipeline)

export async function uploadFile(data: any) {
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
