import z from 'zod'

export const categoriesEnum = z.enum([
  'ACAO',
  'AVENTURA',
  'COMEDIA',
  'DRAMA',
  'DOCUMENTARIO',
  'TERROR',
  'SUSPENSE',
  'FICCAO',
  'ANIME',
  'ROMANCE',
])

export type CategoryType = z.infer<typeof categoriesEnum>
