import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'

export function AppLayout() {
  const location = useLocation()
  const activeMenu =
    location.pathname === '/my-movies' ? 'my-movies' : 'explore'

  return (
    <div className="min-h-screen bg-gray-darkest">
      <Navbar activeMenu={activeMenu} />
      <Outlet />
    </div>
  )
}
