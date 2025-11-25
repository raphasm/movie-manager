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
}

export async function getMovieDetails(movieId: string) {
  const response = await api.get<GetMovieDetailsResponse[]>(
    `/movies/${movieId}`,
  )

  return response.data[0]
}
