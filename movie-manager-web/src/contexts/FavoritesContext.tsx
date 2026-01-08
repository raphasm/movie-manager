import { createContext, useState, useMemo, useCallback, type ReactNode } from 'react'
import type { Movies } from '../interface/movies'

interface FavoritesContextType {
  favorites: Movies[]
  addFavorite: (movie: Movies) => void
  removeFavorite: (id: string | number) => void
  isFavorite: (id: string | number) => boolean
}

export const FavoritesContext = createContext({} as FavoritesContextType)

interface FavoriteProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<Movies[]>([])

  const addFavorite = useCallback((movie: Movies) => {
    setFavorites((prev) => {
      // Evita duplicadas
      const find = prev.some((fav) => fav.id === movie.id)

      if (find) return prev
      return [...prev, movie]
    })
  }, [])

  const removeFavorite = useCallback((id: string | number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id))
  }, [])

  const isFavorite = useCallback((id: string | number) => {
    return favorites.some((movie) => movie.id === id)
  }, [favorites])

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites, addFavorite, removeFavorite, isFavorite]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
