import { api } from '../utils/api'

export async function logout() {
  await api.post('/logout')
}
