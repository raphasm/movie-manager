import axios, { type AxiosRequestConfig } from 'axios'
import { env } from '../env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
  api.get(url, options).then((res) => res.data)
