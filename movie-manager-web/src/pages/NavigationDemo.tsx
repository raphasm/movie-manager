import { useNavigate, useLocation } from 'react-router-dom'
import { Button, RouterLink, TextBelow } from '../components'

export function NavigationDemo() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex flex-col gap-6 p-8 max-w-2xl mx-auto">
      <div>
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ fontFamily: 'var(--font-title)', color: '#e5e2e9' }}
        >
          React Router DOM Navigation Demo
        </h2>

        <TextBelow variant="secondary" size="md">
          Página atual: <strong>{location.pathname}</strong>
        </TextBelow>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium" style={{ color: '#b5b6c9' }}>
          Navegação Programática (useNavigate)
        </h3>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="sm"
            fullWidth={false}
            onClick={() => navigate('/sign-in')}
          >
            Ir para Sign-in
          </Button>

          <Button
            variant="secondary"
            size="sm"
            fullWidth={false}
            onClick={() => navigate('/home')}
          >
            Ir para Home
          </Button>

          <Button
            variant="ghost"
            size="sm"
            fullWidth={false}
            onClick={() => navigate('/showcase')}
          >
            Ver Showcase
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium" style={{ color: '#b5b6c9' }}>
          Links Declarativos (RouterLink)
        </h3>

        <div className="flex flex-wrap gap-4">
          <RouterLink
            to="/sign-in"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Link para Sign-in
          </RouterLink>

          <RouterLink
            to="/home"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Link para Home
          </RouterLink>

          <RouterLink
            to="/showcase"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Link para Showcase
          </RouterLink>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium" style={{ color: '#b5b6c9' }}>
          Navegação com Opções
        </h3>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="sm"
            fullWidth={false}
            onClick={() => navigate(-1)}
          >
            Voltar (History)
          </Button>

          <Button
            variant="secondary"
            size="sm"
            fullWidth={false}
            onClick={() => navigate(1)}
          >
            Avançar (History)
          </Button>

          <Button
            variant="ghost"
            size="sm"
            fullWidth={false}
            onClick={() => navigate('/sign-in', { replace: true })}
          >
            Replace para Sign-in
          </Button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <TextBelow variant="muted" size="sm">
          <strong>Dica:</strong> Todas essas navegações atualizam a URL do
          navegador e funcionam com os botões back/forward nativos! 🚀
        </TextBelow>
      </div>
    </div>
  )
}
