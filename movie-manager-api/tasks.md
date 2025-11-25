- [] Criar tabela pivo MyMovies para listar os filmes que o usuário salvou
- [] Adicionar As avaliações "Evaluations" e comentários quando vc busca um filme pelo id
- [x] Poder buscar os filmes por categoria

- [] tirar a coluna filename do banco de dados e deixar apenas a imageUrl


- [x] criar seed no banco de dados
- [] criar teste unitários
- [] arrumar o upload do arquivo no swagger

  <!--  -->

  // return await prisma.$transaction(async (tx) => {
  // const ratings = await tx.evaluation.groupBy({
  // by: ['movie_id'],
  // \_avg: { rating: true },
  // where: {
  // rating: { not: null },
  // },
  // })

  <!--  -->

  <!--  -->

// const movies = await tx.movie.findMany()

// const moviesWithAverage = movies.map(async (movie) => {
// const ratingGroup = ratings.find((rating) => rating.movie_id === movie.id)

// const average =
// ratingGroup && ratingGroup.\_avg.rating
// ? Math.floor(Number(ratingGroup.\_avg.rating) \* 10) / 10
// : 0

// // return {
// // ...movie,
// // averageRating: average,
// // }
// return tx.movie.update({
// where: { id: movie.id },
// data: { averageRating: average },
// })
// })

// await Promise.all(moviesWithAverage)

// const updatedMovies = await tx.movie.findMany()

// return {
// movies: updatedMovies,
// }
// })
