import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto - dados ficam "fresh" por 1 min
      gcTime: 1000 * 60 * 5, // 5 minutos - cache fica na memória por 5 min
      refetchOnWindowFocus: false, // Não refaz requisição ao focar na janela
      retry: 1, // Tenta novamente apenas 1 vez em caso de erro
    },
  },
})
