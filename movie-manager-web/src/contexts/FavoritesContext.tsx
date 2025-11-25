import { createContext, useState, type ReactNode } from 'react'
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

  function addFavorite(movie: Movies) {
    setFavorites((prev) => {
      // Evita duplicadas
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  function removeFavorite(id: string | number) {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id))
  }

  function isFavorite(id: string | number) {
    return favorites.some((movie) => movie.id === id)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
