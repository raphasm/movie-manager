import { api } from '../utils/api'

export interface User {
  userId: string
  name: string
  email: string
  imageUrl: string | null
  role: 'ADMIN' | 'USER'
}

export async function getMe() {
  const response = await api.get<User>('/me')
  return response.data
}
