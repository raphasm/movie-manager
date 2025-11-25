import { fakerPT_BR as faker } from '@faker-js/faker'
import { Categories } from '@prisma/client'
import { hash } from 'bcrypt'
import { prisma } from '../src/lib/prisma'
import { calculateAvg } from '../src/utils/calculate-avg'

export async function seed() {
  await prisma.evaluation.deleteMany()
  await prisma.movie.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await hash('123456', 6)

  const users = []
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: `John Doe ${i}`,
        email: `johnDoe${i}.example@hotmail.com`,
        password: hashedPassword,
      },
    })
    users.push(user)
  }
  const randomUsers = users[Math.floor(Math.random() * users.length)]

  const moviePosters = [
    { title: 'Alien: Covenant', filename: 'alien-covenant.png', year: '2017' },
    {
      title: 'Deadpool & Wolverine',
      filename: 'deadpool-wolverine.png',
      year: '2024',
    },
    {
      title: 'Divertida Mente 2',
      filename: 'divertidamente-2.png',
      year: '2024',
    },
    {
      title: 'Mad Max: Estrada da Fúria',
      filename: 'mad-max.png',
      year: '2015',
    },
    {
      title: 'Meu Malvado Favorito 4',
      filename: 'meu-malvado-favorito.png',
      year: '2024',
    },
    { title: 'O Corvo', filename: 'o-corvo.png', year: '2024' },
    {
      title: 'Pobres Criaturas',
      filename: 'pobres-criaturas.png',
      year: '2023',
    },
    {
      title: 'O Senhor dos Anéis',
      filename: 'senhor-dos-aneis.png',
      year: '2001',
    },
  ]

  const movies = []
  for (let i = 0; i < moviePosters.length; i++) {
    const posterData = moviePosters[i]
    const movie = await prisma.movie.create({
      data: {
        title: posterData.title,
        year: posterData.year,
        category: faker.helpers.enumValue(Categories),
        description: faker.lorem.words(10),
        filename: posterData.filename,
        user_id: randomUsers.id,
      },
    })
    movies.push(movie)
  }

  const evaluations = []
  for (let i = 0; i < 13; i++) {
    const randomMovies = movies[Math.floor(Math.random() * movies.length)]

    const evaluation = await prisma.evaluation.create({
      data: {
        comment: faker.lorem.text(),
        movie_id: randomMovies.id,
        user_id: randomUsers.id,
        rating: faker.number.int({ min: 1, max: 5 }),
      },
    })
    await calculateAvg(randomMovies.id)

    evaluations.push(evaluation)
  }
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})
