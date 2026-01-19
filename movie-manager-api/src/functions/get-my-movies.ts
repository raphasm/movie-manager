import { prisma } from '../lib/prisma'

interface GetMyMoviesParams {
  userId: string
  page: number
  query?: string
}

export async function getMyMovies({ userId, page, query }: GetMyMoviesParams) {
  // Buscar da tabela MyMovies (favoritos do usuário)
  const where = {
    user_id: userId,
    ...(query && {
      movie: {
        title: {
          contains: query,
          mode: 'insensitive' as const,
        },
      },
    }),
  }

  const [myMovies, totalCount] = await Promise.all([
    prisma.myMovie.findMany({
      where,
      take: 10,
      skip: (page - 1) * 10,
      include: {
        movie: true, // Incluir dados do filme
      },
      orderBy: {
        createdAt: 'desc', // Mais recentes primeiro
      },
    }),
    prisma.myMovie.count({ where }),
  ])

  // Extrair apenas os dados do filme
  const movies = myMovies.map((myMovie) => myMovie.movie)

  return {
    movies,
    meta: {
      pageIndex: page,
      perPage: 10,
      totalCount,
    },
  }
}
