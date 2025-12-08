import { RouterProvider } from 'react-router-dom'
import './index.css'
import '@radix-ui/themes/styles.css'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/react-query'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'sonner'
import { Theme } from '@radix-ui/themes'
import { TooltipProvider } from './components/Tooltip'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme appearance="dark" accentColor="purple" grayColor="slate">
        <TooltipProvider>
          <AuthProvider>
            <Toaster richColors />
            <FavoritesProvider>
              <RouterProvider router={router} />
            </FavoritesProvider>
          </AuthProvider>
        </TooltipProvider>
      </Theme>
    </QueryClientProvider>
  )
}
