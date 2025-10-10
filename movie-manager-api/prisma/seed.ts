import { fakerPT_BR as faker } from '@faker-js/faker'
import { prisma } from '../src/lib/prisma'
import { hash } from 'bcrypt'
import { Categories } from '@prisma/client'
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

  const movies = []
  for (let i = 0; i < 15; i++) {
    const movie = await prisma.movie.create({
      data: {
        title: `As cronicas de ${faker.person.firstName()}`,
        year: faker.date.past().getFullYear().toString(),
        category: faker.helpers.enumValue(Categories),
        description: faker.lorem.words(10),
        filename: 'arquivo.png',
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
