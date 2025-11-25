import { env } from '../env'

export function getImageUrl(filename: string): string {
  return `http://localhost:${env.PORT}/uploads/${filename}`
}
