import { api } from '../utils/api'

export interface getAllMoviesQuery {
  query?: string | null
  page?: number | null
  categories?: string[]
}

export interface getAllMoviesResponse {
  movies: {
    averageRating: string | null
    id: string
    title: string
    year: string
    category: string
    description: string
    filename: string
    imageUrl: string
  }[]

  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
    count: number
  }
}

export async function getAllMovies({
  query,
  page,
  categories,
}: getAllMoviesQuery) {
  const response = await api.get<getAllMoviesResponse>('/movies', {
    params: {
      query,
      page,
      categories:
        categories && categories.length > 0 ? categories[0] : undefined,
    },
  })

  return response.data
}
