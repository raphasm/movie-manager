import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Exemplo: verifica se existe token no localStorage
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  return isAuthenticated ? children : <Navigate to="/sign-in" replace />
}
