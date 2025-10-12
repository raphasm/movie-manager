import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useState } from 'react'
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { ComponentShowcase } from './pages/ComponentShowcase'
import { NavigationDemo } from './pages/NavigationDemo'
import { Button } from './components'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate('/home')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate('/sign-in')
  }

  const renderTopNavigation = () => {
    if (location.pathname === '/sign-in') return null

    return (
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {(location.pathname === '/showcase' ||
          location.pathname === '/navigation-demo') && (
          <Button
            variant="secondary"
            size="sm"
            fullWidth={false}
            onClick={() => navigate('/home')}
          >
            Voltar para Home
          </Button>
        )}
      </div>
    )
  }

  const renderBottomNavigation = () => {
    if (location.pathname === '/sign-in') return null

    return (
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 p-4 rounded-xl border backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(26, 27, 45, 0.8)',
          borderColor: '#131320',
        }}
      >
        {location.pathname === '/home' && (
          <>
            <div className="text-center mb-1">
              <span
                className="text-xs leading-[1.6]"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#7a7b9f',
                }}
              >
                Demos
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              fullWidth={false}
              onClick={() => navigate('/showcase')}
            >
              Design System
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth={false}
              onClick={() => navigate('/navigation-demo')}
            >
              Navigation Demo
            </Button>
            <div
              className="w-full h-px my-1"
              style={{ backgroundColor: '#131320' }}
            />
          </>
        )}

        {isAuthenticated && (
          <Button
            variant="ghost"
            size="sm"
            fullWidth={false}
            onClick={handleLogout}
          >
            Sair
          </Button>
        )}
      </div>
    )
  }

  return (
    <div>
      {renderTopNavigation()}
      {renderBottomNavigation()}
      <Routes>
        <Route path="/sign-in" element={<Auth onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/sign-in" replace />
          }
        />
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="/navigation-demo" element={<NavigationDemo />} />
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </div>
  )
}

export default App
