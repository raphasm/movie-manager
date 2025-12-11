import { categoriesEnum } from '../interface/categories'
import { ParsedMovieData } from '../utils/parse-multipart-movie'

interface ValidationResult {
  success: boolean
  error?: string
}

export function validateMovieData(data: ParsedMovieData): ValidationResult {
  const { title, year, category, description, fileData } = data

  if (!title || !year || !category || !description) {
    return {
      success: false,
      error: 'Todos os campos são obrigatórios',
    }
  }

  if (!fileData) {
    return {
      success: false,
      error: 'Imagem é obrigatória',
    }
  }

  const categoryResult = categoriesEnum.safeParse(category)
  if (!categoryResult.success) {
    return {
      success: false,
      error: 'Categoria inválida',
    }
  }

  return { success: true }
}
