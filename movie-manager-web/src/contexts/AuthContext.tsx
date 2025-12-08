import { createContext, useContext, useCallback, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getMe, type User } from '../api/get-me'
import { api } from '../utils/api'

interface AuthContextData {
  user: User | null
  userId: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const logout = useCallback(async () => {
    try {
      await api.post('/logout')
    } catch {
      // Ignora erro se a rota não existir
    } finally {
      queryClient.setQueryData(['me'], null)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    }
  }, [queryClient])

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        userId: user?.userId ?? null,
        isAuthenticated: !!user && !isError,
        isAdmin: user?.role === 'ADMIN',
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
