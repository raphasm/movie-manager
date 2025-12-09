import { z } from 'zod'

// Fonte única de verdade: chave = valor do enum, valor = label
const CATEGORIES = {
  ACAO: 'Ação',
  AVENTURA: 'Aventura',
  COMEDIA: 'Comédia',
  DRAMA: 'Drama',
  DOCUMENTARIO: 'Documentário',
  TERROR: 'Terror',
  SUSPENSE: 'Suspense',
  FICCAO: 'Ficção Científica',
  ANIME: 'Anime',
  ROMANCE: 'Romance',
} as const

// Tipo derivado das chaves do objeto
export type Categories = keyof typeof CATEGORIES

// Schema derivado das chaves
export const categoriesSchema = z.enum(
  Object.keys(CATEGORIES) as [Categories, ...Categories[]],
  { message: 'Categoria é obrigatória' },
)

// Options para o Select, derivado do objeto
export const CATEGORIES_OPTIONS = Object.entries(CATEGORIES).map(
  ([value, label]) => ({
    value: value as Categories,
    label,
  }),
)
