import { MultipartFile } from '@fastify/multipart'
import { FastifyRequest } from 'fastify'

export interface ParsedMovieData {
  title: string
  year: string
  category: string
  description: string
  fileData: MultipartFile | null
}

export async function parseMultipartMovie(
  request: FastifyRequest,
): Promise<ParsedMovieData> {
  const formData = await request.file()

  // console.log('formData:', formData)
  // console.log('fields:', formData?.fields)

  if (!formData) {
    return {
      title: '',
      year: '',
      category: '',
      description: '',
      fileData: null,
    }
  }

  const fields = formData.fields

  const getFieldValue = (fieldName: string): string => {
    const field = fields[fieldName]
    if (field && 'value' in field) {
      return field.value as string
    }
    return ''
  }

  return {
    title: getFieldValue('title'),
    year: getFieldValue('year'),
    category: getFieldValue('category'),
    description: getFieldValue('description'),
    fileData: formData,
  }
}
