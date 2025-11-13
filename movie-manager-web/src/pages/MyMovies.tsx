import { PlusIcon, FilmSlateIcon } from '@phosphor-icons/react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { Divider } from '../components/Divider'
import Container from '../components/Container'
import { TextBelow } from '../components/TextBelow'
import { Link } from '../components/Link'
export function MyMovies() {
  return (
    <Container>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12 lg:mb-[37px]">
        <h1 className="text-2xl font-display text-custom-text-light whitespace-nowrap">
          Meus Filmes
        </h1>

        <div className="flex items-center gap-5">
          <Input icon={<MagnifyingGlassIcon />} placeholder="Pesquisar filme" />
          <Divider />
          <Button variant="primary" size="md" icon={<PlusIcon size={20} />}>
            Novo
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <FilmSlateIcon size={44} fill="#45455F" />
        <TextBelow className="mt-5 text-custom-text-brand">
          Nenhum filme registrado.
        </TextBelow>
        <TextBelow className="text-custom-text-brand">
          Que tal começar cadastrando seu primeiro filme?
        </TextBelow>

        <div className="mt-4">
          <Link
            variant="muted"
            href="/"
            className="flex items-center justify-center gap-1"
          >
            <PlusIcon size={20} />
            Cadastrar novo
          </Link>
        </div>
      </div>
    </Container>
  )
}
