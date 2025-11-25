import { api } from '../utils/api'

export interface SignupBody {
  name: string
  email: string
  password: string
}

export async function signUp({ name, password, email }: SignupBody) {
  await api.post('/users', { name, password, email })
}
