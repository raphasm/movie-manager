import { useState } from 'react'
import {
  MagnifyingGlass,
  Heart,
  BookmarkSimple,
  User,
  Lock,
  Eye,
  EyeSlash,
  Plus,
} from '@phosphor-icons/react'
import {
  Button,
  IconButton,
  Input,
  TextArea,
  Rating,
  Link,
  TextBelow,
  MenuTab,
  MovieCard,
} from '../components'

// Import a movie cover for the card example
import pobresCriaturas from '../assets/movies/pobres-criaturas.png'

export function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('')
  const [textAreaValue, setTextAreaValue] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [rating, setRating] = useState(3.5)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#0f0f1a' }}>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: '#e5e2e9' }}
          >
            Design System Components
          </h1>
          <TextBelow size="md" variant="secondary" align="center">
            Componentes baseados no Figma design system
          </TextBelow>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Buttons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Primary
              </h3>
              <Button variant="primary" size="sm" fullWidth={false}>
                Small Button
              </Button>
              <Button variant="primary" size="md">
                Medium Button
              </Button>
              <Button variant="primary" size="lg">
                Large Button
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Secondary
              </h3>
              <Button variant="secondary" size="sm" fullWidth={false}>
                Small Button
              </Button>
              <Button variant="secondary" size="md">
                Medium Button
              </Button>
              <Button variant="secondary" size="lg">
                Large Button
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Ghost
              </h3>
              <Button variant="ghost" size="sm" fullWidth={false}>
                Small Button
              </Button>
              <Button variant="ghost" size="md">
                Medium Button
              </Button>
              <Button variant="ghost" size="lg">
                Large Button
              </Button>
            </div>
          </div>
        </section>

        {/* Icon Buttons Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Icon Buttons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Primary
              </h3>
              <div className="flex gap-2">
                <IconButton
                  icon={<Plus size={16} />}
                  variant="primary"
                  size="sm"
                />
                <IconButton
                  icon={<Heart size={20} />}
                  variant="primary"
                  size="md"
                />
                <IconButton
                  icon={<BookmarkSimple size={24} />}
                  variant="primary"
                  size="lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Secondary
              </h3>
              <div className="flex gap-2">
                <IconButton
                  icon={<Plus size={16} />}
                  variant="secondary"
                  size="sm"
                />
                <IconButton
                  icon={<Heart size={20} />}
                  variant="secondary"
                  size="md"
                />
                <IconButton
                  icon={<BookmarkSimple size={24} />}
                  variant="secondary"
                  size="lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Ghost
              </h3>
              <div className="flex gap-2">
                <IconButton
                  icon={<Plus size={16} />}
                  variant="ghost"
                  size="sm"
                />
                <IconButton
                  icon={<Heart size={20} />}
                  variant="ghost"
                  size="md"
                />
                <IconButton
                  icon={<BookmarkSimple size={24} />}
                  variant="ghost"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Inputs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                icon={<User size={20} />}
                placeholder="Nome completo"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                icon={<MagnifyingGlass size={20} />}
                placeholder="Pesquisar..."
                size="sm"
              />
              <Input
                icon={<Lock size={20} />}
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                rightElement={
                  <IconButton
                    icon={
                      showPassword ? <EyeSlash size={16} /> : <Eye size={16} />
                    }
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Campo com erro"
                error
                errorMessage="Este campo é obrigatório"
              />
              <Input placeholder="Campo desabilitado" disabled />
              <Input placeholder="Campo grande" size="lg" />
            </div>
          </div>
        </section>

        {/* TextArea Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Text Area
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextArea
              placeholder="Escreva sua resenha..."
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              rows={4}
            />
            <TextArea
              placeholder="Comentário (máximo 280 caracteres)"
              maxLength={280}
              showCounter
              rows={4}
            />
          </div>
        </section>

        {/* Menu Tabs Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Menu Tabs
          </h2>

          <div className="max-w-md">
            <MenuTab
              tabs={['Explorar', 'Meus Filmes', 'Favoritos']}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </section>

        {/* Rating Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Rating
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Static
              </h3>
              <Rating rating={4.5} size="sm" />
              <Rating rating={3.8} size="md" />
              <Rating rating={2.1} size="lg" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Interactive
              </h3>
              <Rating
                rating={rating}
                size="md"
                interactive
                onChange={setRating}
              />
              <TextBelow>Clique nas estrelas para avaliar</TextBelow>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg" style={{ color: '#b5b6c9' }}>
                Without Value
              </h3>
              <Rating rating={4.2} showValue={false} size="md" />
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Link variant="primary">Link primário</Link>
              <Link variant="secondary">Link secundário</Link>
              <Link variant="muted">Link discreto</Link>
            </div>

            <div className="space-y-2">
              <Link variant="primary" underline>
                Link com sublinhado
              </Link>
              <Link variant="primary" size="sm">
                Link pequeno
              </Link>
              <Link variant="primary" size="lg">
                Link grande
              </Link>
            </div>

            <div className="space-y-2">
              <Link href="https://example.com" variant="primary">
                Link externo
              </Link>
              <Link onClick={() => alert('Clicou!')} variant="secondary">
                Link com ação
              </Link>
            </div>
          </div>
        </section>

        {/* Text Below Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Text Below
          </h2>

          <div className="space-y-4">
            <TextBelow variant="muted" size="xs">
              Texto muito pequeno e discreto
            </TextBelow>
            <TextBelow variant="secondary" size="sm">
              Texto secundário padrão
            </TextBelow>
            <TextBelow variant="light" size="md">
              Texto mais claro e destacado
            </TextBelow>
            <TextBelow variant="muted" size="sm" align="center">
              Texto centralizado
            </TextBelow>
            <TextBelow variant="secondary" size="sm" align="right">
              Texto alinhado à direita
            </TextBelow>
          </div>
        </section>

        {/* Movie Card Section */}
        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
          >
            Movie Card
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MovieCard
              title="Pobres Criaturas"
              category="Drama"
              year="2023"
              rating="4.5"
              cover={pobresCriaturas}
              size="sm"
            />
            <MovieCard
              title="Pobres Criaturas"
              category="Drama"
              year="2023"
              rating="4.5"
              cover={pobresCriaturas}
              size="md"
            />
            <MovieCard
              title="Pobres Criaturas"
              category="Drama"
              year="2023"
              rating="4.5"
              cover={pobresCriaturas}
              size="lg"
            />
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <TextBelow variant="muted" align="center">
            Design System implementado com base no Figma
          </TextBelow>
        </div>
      </div>
    </div>
  )
}
