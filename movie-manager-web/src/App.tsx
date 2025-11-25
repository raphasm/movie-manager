import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/react-query'
import { FavoritesProvider } from './contexts/FavoritesContext'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </QueryClientProvider>
  )
}
