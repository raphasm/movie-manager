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
    {
      title: 'Alien: Covenant',
      filename: 'alien-covenant.png',
      year: '2017',
      category: 'FICCAO',
    },
    {
      title: 'Deadpool & Wolverine',
      filename: 'deadpool-wolverine.png',
      year: '2024',
      category: 'ACAO',
    },
    {
      title: 'Divertida Mente 2',
      filename: 'divertidamente-2.png',
      year: '2024',
      category: 'COMEDIA',
    },
    {
      title: 'Mad Max: Estrada da Fúria',
      filename: 'mad-max.png',
      year: '2015',
      category: 'ACAO',
    },
    {
      title: 'Meu Malvado Favorito 4',
      filename: 'meu-malvado-favorito.png',
      year: '2024',
      category: 'COMEDIA',
    },
    {
      title: 'O Corvo',
      filename: 'o-corvo.png',
      year: '2024',
      category: 'ACAO',
    },
    {
      title: 'Pobres Criaturas',
      filename: 'pobres-criaturas.png',
      year: '2023',
      category: 'DRAMA',
    },
    {
      title: 'O Senhor dos Anéis',
      filename: 'senhor-dos-aneis.png',
      year: '2001',
      category: 'AVENTURA',
    },
    // Novos filmes adicionados
    {
      title: 'Interestelar',
      filename: 'interestelar.png',
      year: '2014',
      category: 'FICCAO',
    },
    {
      title: 'O Poderoso Chefão',
      filename: 'o-poderoso-chefao.png',
      year: '1972',
      category: 'DRAMA',
    },
    {
      title: 'Pulp Fiction',
      filename: 'pulp-fiction.png',
      year: '1994',
      category: 'DRAMA',
    },
    {
      title: 'Clube da Luta',
      filename: 'clube-da-luta.png',
      year: '1999',
      category: 'DRAMA',
    },
    {
      title: 'Matrix',
      filename: 'matrix.png',
      year: '1999',
      category: 'FICCAO',
    },
    {
      title: 'Vingadores: Ultimato',
      filename: 'vingadores-ultimato.png',
      year: '2019',
      category: 'ACAO',
    },
    {
      title: 'Parasita',
      filename: 'parasita.png',
      year: '2019',
      category: 'SUSPENSE',
    },
    {
      title: 'Coringa',
      filename: 'coringa.png',
      year: '2019',
      category: 'DRAMA',
    },
    {
      title: 'Duna',
      filename: 'duna.png',
      year: '2021',
      category: 'FICCAO',
    },
    {
      title: 'Oppenheimer',
      filename: 'oppenheimer.png',
      year: '2023',
      category: 'DRAMA',
    },
    {
      title: 'Barbie',
      filename: 'barbie.png',
      year: '2023',
      category: 'COMEDIA',
    },
    {
      title: 'Top Gun: Maverick',
      filename: 'top-gun-maverick.png',
      year: '2022',
      category: 'ACAO',
    },
    {
      title: 'Avatar: O Caminho da Água',
      filename: 'avatar-o-caminho-da-agua.png',
      year: '2022',
      category: 'FICCAO',
    },
    {
      title: 'Homem-Aranha: Sem Volta Para Casa',
      filename: 'homem-aranha-sem-volta-para-casa.png',
      year: '2021',
      category: 'ACAO',
    },
    {
      title: 'Batman',
      filename: 'batman.png',
      year: '2022',
      category: 'ACAO',
    },
    {
      title: 'John Wick 4',
      filename: 'john-wick-4.png',
      year: '2023',
      category: 'ACAO',
    },
    {
      title: 'Guardiões da Galáxia Vol. 3',
      filename: 'guardioes-da-galaxia-vol-3.png',
      year: '2023',
      category: 'AVENTURA',
    },
    {
      title: 'A Baleia',
      filename: 'a-baleia.png',
      year: '2022',
      category: 'DRAMA',
    },
    {
      title: 'Tudo em Todo Lugar ao Mesmo Tempo',
      filename: 'tudo-em-todo-lugar-ao-mesmo-tempo.png',
      year: '2022',
      category: 'FICCAO',
    },
  ]

  const movies = []
  for (let i = 0; i < moviePosters.length; i++) {
    const posterData = moviePosters[i]
    const movie = await prisma.movie.create({
      data: {
        title: posterData.title,
        year: posterData.year,
        category: posterData.category as Categories,
        description: faker.lorem.words(200),
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
