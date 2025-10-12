import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Navbar, MovieCard, Input } from '../components'

// Import movie covers
import pobresCriaturas from '../assets/movies/pobres-criaturas.png'
import meuMalvadoFavorito from '../assets/movies/meu-malvado-favorito.png'
import deadpoolWolverine from '../assets/movies/deadpool-wolverine.png'
import oCorvo from '../assets/movies/o-corvo.png'
import senhorDosAneis from '../assets/movies/senhor-dos-aneis.png'
import alienCovenant from '../assets/movies/alien-covenant.png'
import divertidamente2 from '../assets/movies/divertidamente-2.png'
import madMax from '../assets/movies/mad-max.png'

const movies = [
  {
    id: 1,
    title: 'Pobres Criaturas',
    category: 'Drama',
    year: '2023',
    rating: '4,5',
    cover: pobresCriaturas,
    description:
      'Uma jovem mulher embarca em uma jornada de autodescoberta e aventura em um mundo fantástico e surreal. asfasmdkfmsakfmksaomfkdsoamfkosamfklsamflksamfaslkfmdsalkmfdsklamflksamfdkjolsadmflksad flksamflksamdkl',
  },
  {
    id: 2,
    title: 'Meu Malvado Favorito 4',
    category: 'Animação',
    year: '2024',
    rating: '4,5',
    cover: meuMalvadoFavorito,
    description:
      'Gru enfrenta novos desafios familiares enquanto os Minions causam mais confusão em uma nova aventura hilariante.',
  },
  {
    id: 3,
    title: 'Deadpool & Wolverine',
    category: 'Ação',
    year: '2023',
    rating: '4,5',
    cover: deadpoolWolverine,
    description:
      'O mercenário tagarela une forças com Wolverine em uma aventura épica cheia de ação e humor irreverente.',
  },
  {
    id: 4,
    title: 'O Corvo',
    category: 'Fantasia',
    year: '2024',
    rating: '4,5',
    cover: oCorvo,
    description:
      'Uma história sombria de vingança e redenção que explores os limites entre a vida e a morte.',
  },
  {
    id: 5,
    title: 'O Senhor dos Anéis: A Sociedade do Anel',
    category: 'Aventura',
    year: '2001',
    rating: '4,5',
    cover: senhorDosAneis,
    description:
      'Um hobbit embarca em uma jornada épica para destruir um anel poderoso e salvar a Terra-média.',
  },
  {
    id: 6,
    title: 'Alien: Covenant',
    category: 'Horror',
    year: '2017',
    rating: '4,5',
    cover: alienCovenant,
    description:
      'Uma tripulação espacial descobre um planeta misterioso que esconde uma ameaça mortal e terrifying.',
  },
  {
    id: 7,
    title: 'Divertidamente 2',
    category: 'Animação',
    year: '2024',
    rating: '4,5',
    cover: divertidamente2,
    description:
      'Riley entra na adolescência e suas emoções enfrentam novos desafios em sua mente em transformação.',
  },
  {
    id: 8,
    title: 'Mad Max: Estrada da Fúria',
    category: 'Ação',
    year: '2015',
    rating: '4,5',
    cover: madMax,
    description:
      'Em um mundo pós-apocalíptico, Max se une a Furiosa em uma fuga épica pelo deserto hostil.',
  },
]

export function Home() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeMenu, setActiveMenu] = useState<'explore' | 'my-movies'>(
    'explore',
  )

  const handleMovieClick = (movieId: number) => {
    console.log('Movie clicked:', movieId)
  }

  const handleLogout = () => {
    navigate('/sign-in')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1a' }}>
      <Navbar
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        onLogout={handleLogout}
      />

      <main className="mt-16 mb-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-12 lg:mb-[37px]">
          <h1
            className="text-base sm:text-xl lg:text-2xl xl:text-2xl leading-[1.689] m-0"
            style={{ fontFamily: 'var(--font-display)', color: '#e5e2e9' }}
          >
            Explorar
          </h1>

          {/* Search Input */}
          <div className="w-full sm:w-[200px] md:w-[240px] lg:w-[264px]">
            <Input
              icon={<MagnifyingGlass size={20} weight="regular" />}
              placeholder="Pesquisar filme"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-4 lg:gap-8 justify-items-center">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              category={movie.category}
              year={movie.year}
              rating={movie.rating}
              cover={movie.cover}
              description={movie.description}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
