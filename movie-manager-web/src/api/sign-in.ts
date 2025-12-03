import { api } from '../utils/api'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn({ password, email }: SignInBody): Promise<void> {
  await api.post('/sessions', { password, email })
  // Cookie é setado automaticamente pelo backend
}
