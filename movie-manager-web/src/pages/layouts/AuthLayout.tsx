import { Outlet } from 'react-router-dom'
import { Thumbnail } from '../../components/Thumbnail'

export function AuthLayout() {
  return (
    <div className="flex w-full min-h-screen bg-gray-darkest">
      <Thumbnail />
      <Outlet />
    </div>
  )
}
