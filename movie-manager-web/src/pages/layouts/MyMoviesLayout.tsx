import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext'

export function MyMoviesLayout() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-darkest">
      <Navbar
        activeMenu="my-movies"
        currentUserId={user?.name}
        userEmail={user?.email}
        userAvatar={user?.imageUrl}
      />
      <Outlet />
    </div>
  )
}
