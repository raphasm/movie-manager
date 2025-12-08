import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext'

export function ExploreLayout() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-darkest">
      <Navbar activeMenu="explore" currentUserId={user?.name} />
      <Outlet />
    </div>
  )
}
