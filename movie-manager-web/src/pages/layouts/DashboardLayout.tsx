import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext'

export function DashboardLayout() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-darkest">
      <Navbar activeMenu="dashboard" currentUserId={user?.name} />
      <Outlet />
    </div>
  )
}
