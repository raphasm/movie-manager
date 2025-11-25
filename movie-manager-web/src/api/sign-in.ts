import { api } from '../utils/api'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn({ password, email }: SignInBody) {
  await api.post('/sessions', { password, email })
}
