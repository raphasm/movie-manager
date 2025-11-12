import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from './pages/layouts/AuthLayout'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { ComponentShowcase } from './pages/ComponentsShowcase'
import { AppLayout } from './pages/layouts/AppLayout'
import { MyMovies } from './pages/MyMovies'
import { Home } from './pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/sign-in" replace /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },

  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'my-movies', element: <MyMovies /> },
      { path: 'home', element: <Home /> },
    ],
  },

  {
    path: '/components',
    element: <ComponentShowcase />,
  },
])
