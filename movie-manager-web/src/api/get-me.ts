import { api } from '../utils/api'

export interface User {
  userId: string
  name: string
  email: string
  imageUrl: string | null
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>('/me')
  return response.data
}
