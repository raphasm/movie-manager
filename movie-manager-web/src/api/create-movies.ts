import type { Categories } from '../interface/categories'
import { api } from '../utils/api'

export interface CreateMoviesBody {
  title: string
  file: File
  year: string
  category: Categories
  description: string
}

export async function createMovies({
  title,
  file,
  year,
  category,
  description,
}: CreateMoviesBody) {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('year', year)
  formData.append('category', category)
  formData.append('description', description)
  formData.append('file', file)

  await api.post('/movies', formData)
}
