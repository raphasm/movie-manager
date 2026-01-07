import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext'

export function ExploreLayout() {
  const { user } = useAuth()
  const location = useLocation()

  // Só ativa "Explorar" se estiver em /home, não em /movie-details/:id
  const activeMenu = location.pathname === '/home' ? 'explore' : undefined

  return (
    <div className="min-h-screen bg-gray-darkest">
      <Navbar
        activeMenu={activeMenu}
        currentUserId={user?.name}
        userEmail={user?.email}
        userAvatar={user?.imageUrl}
      />
      <Outlet />
    </div>
  )
}
