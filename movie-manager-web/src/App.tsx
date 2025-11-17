import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/react-query'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
