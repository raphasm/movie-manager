import { api } from '../utils/api'

export interface CreateEvaluationBody {
  rating?: string | null
  comment: string
  movieId: string
}

export async function createEvaluation({
  rating,
  comment,
  movieId,
}: CreateEvaluationBody) {
  await api.post(`/evaluations/${movieId}`, { rating, comment })
}
