- [] Adicionar As avaliações "Evaluations" e comentários quando vc busca um filme pelo id
- [] Calcular a média total e fazer o valor atualizar no banco
- [] Fazer uma função para atualizar e calcular a média sempre que o valor altera

- [] arrumar o upload do arquivo no swagger
- [] criar seed no banco de dados
- [] criar teste unitários

  <!--  -->

  // return await prisma.$transaction(async (tx) => {
  // const ratings = await tx.evaluation.groupBy({
  // by: ['movie_id'],
  // \_avg: { rating: true },
  // where: {
  // rating: { not: null },
  // },
  // })

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
