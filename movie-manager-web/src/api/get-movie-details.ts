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
    evaluationsCount?: number | null
  }[]

  evaluationsMeta: {
    page: number
    perPage: number
    totalCount: number
  }
}

interface GetMovieDetailsParams {
  movieId: string
  page?: number
  perPage?: number
}

export async function getMovieDetails({
  movieId,
  page = 1,
  perPage = 5,
}: GetMovieDetailsParams) {
  const response = await api.get<GetMovieDetailsResponse>(
    `/movies/${movieId}`,
    {
      params: { page, perPage },
    },
  )
  return response.data
}
