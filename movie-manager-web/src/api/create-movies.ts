import type { Categories } from '../interface/categories'
import { api } from '../utils/api'

export interface CreateMoviesBody {
  title: string
  filename: string
  year: string
  category: Categories[]
}

export async function createMovies({
  title,
  filename,
  year,
  category,
}: CreateMoviesBody) {
  await api.post(`/movies`, { title, filename, year, category })
}
