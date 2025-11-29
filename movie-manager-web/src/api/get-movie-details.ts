import { api } from '../utils/api'

export interface GetMovieDetailsResponse {
  id: string
  title: string
  year: string
  category: string
  description: string
  filename: string
  imageUrl: string
  averageRating: number | null
  ratingsCount: number

  evaluations: {
    userId?: string
    name: string
    rating?: number | null
    comment?: string | null
  }[]
}

export async function getMovieDetails(movieId: string) {
  const response = await api.get<GetMovieDetailsResponse>(`/movies/${movieId}`)
  return response.data
}
