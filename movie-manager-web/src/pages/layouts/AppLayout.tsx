import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext'

export function AppLayout() {
  const { user } = useAuth()

  const location = useLocation()
  const activeMenu =
    location.pathname === '/my-movies' ? 'my-movies' : 'explore'

  return (
    <div className="min-h-screen bg-gray-darkest">
      <Navbar activeMenu={activeMenu} currentUserId={user?.name} />
      <Outlet />
    </div>
  )
}
