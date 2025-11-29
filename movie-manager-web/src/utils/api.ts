import axios, { type AxiosRequestConfig } from 'axios'
import { env } from '../env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

// Adiciona o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
  api.get(url, options).then((res) => res.data)
