import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from './pages/layouts/AuthLayout'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { ComponentShowcase } from './pages/ComponentsShowcase'
import { ExploreLayout } from './pages/layouts/ExploreLayout'
import { MyMoviesLayout } from './pages/layouts/MyMoviesLayout'
import { DashboardLayout } from './pages/layouts/DashboardLayout'
import { MyMovies } from './pages/MyMovies'
import { Home } from './pages/Home'
import { MovieDetails } from './pages/MovieDetails'
import { Dashboard } from './pages/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { element: <Navigate to="/sign-in" replace /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },

  // Rotas de Explorar (Home, MovieDetails)
  {
    path: '/',
    element: <ExploreLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'movie-details/:id', element: <MovieDetails /> },
    ],
  },

  // Rotas de Meus Filmes
  {
    path: '/',
    element: <MyMoviesLayout />,
    children: [{ path: 'my-movies', element: <MyMovies /> }],
  },

  // Rotas de Dashboard (Admin)
  {
    path: '/',
    element: <DashboardLayout />,
    children: [{ path: 'dashboard', element: <Dashboard /> }],
  },

  {
    path: '/components',
    element: <ComponentShowcase />,
  },
])
