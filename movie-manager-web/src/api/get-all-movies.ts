import { api } from '../utils/api'

export interface getAllMoviesQuery {
  query?: string | null
  page?: number | null
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

export async function getAllMovies({ query, page }: getAllMoviesQuery) {
  const response = await api.get<getAllMoviesResponse>('/movies', {
    params: {
      query,
      page,
    },
  })

  return response.data
}
