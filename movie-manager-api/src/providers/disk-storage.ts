import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import uploadConfig from '../configs/upload'
import { sanitizeFilename } from '../utils/sanitize-filename'

export class DiskStorage {
  async uploadFile(data: any) {
    const pump = promisify(pipeline)

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

    const sanitizedFilename = sanitizeFilename(data.filename)

    const fileHash = crypto.randomBytes(7).toString('hex')
    const timestamp = Date.now()
    const fileName = `${fileHash}-${timestamp}-${sanitizedFilename}`

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

  async saveFile(file: string) {
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file)
    const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.access(tmpPath)
    } catch (error) {
      throw new Error(`Arquivo não encontrado: ${tmpPath}`)
    }

    await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true })

    // Remove arquivo de destino se já existir
    try {
      await fs.promises.access(destPath)
      await fs.promises.unlink(destPath)
    } catch {
      // Arquivo não existe, continua normalmente
    }

    await fs.promises.rename(tmpPath, destPath)

    return file
  }

  async deleteFile(file: string, type: 'tmp' | 'upload') {
    const pathFile =
      type === 'tmp' ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER

    const filePath = path.resolve(pathFile, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
