import {
  SignOutIcon,
  PopcornIcon,
  FilmSlateIcon,
  UserIcon,
  ChartBarIcon,
  SignInIcon,
} from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import logoImage from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from './Avatar'
import { logout } from '../api/logout'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { AdminBadge } from './Badge'
import { Button } from './Button'

const navbarVariants = tv({
  slots: {
    nav: 'flex items-center justify-between px-6 py-0 w-full h-20 border-b border-custom-bg-menu',
    logo: 'w-12 h-12',
    menuContainer: 'flex items-center justify-center gap-6',
    menuButton:
      'flex items-center justify-center gap-2 px-3 py-2 rounded-md text-base leading-[1.5] font-body transition-all group',
    menuIcon: 'transition-colors',
    userContainer: 'flex items-center justify-center gap-3 rounded-[10px]',
    userInfo: 'flex items-center gap-3',
    userName: 'text-sm leading-[1.6] font-body text-custom-text-brand',
    userAvatar: 'w-8 h-8 rounded-md border border-[#7435db] object-cover',
    divider: 'w-px h-8 bg-custom-bg-tab',
    logoutButton:
      'flex items-center justify-center w-8 h-8 rounded-md bg-custom-bg-tab transition-colors hover:bg-[#25263a]',
    logoutIcon: 'text-white',
  },
  variants: {
    active: {
      true: {
        menuButton: 'text-custom-purple-tab bg-custom-bg-tab',
        menuIcon: 'text-custom-purple-tab',
      },
      false: {
        menuButton: 'text-custom-text-gray hover:text-white bg-transparent',
        menuIcon: 'text-custom-text-gray group-hover:text-white',
      },
    },
  },
})

interface NavbarProps {
  activeMenu?: 'explore' | 'my-movies' | 'dashboard'
  currentUserId?: string | null
}

export function Navbar({ activeMenu, currentUserId }: NavbarProps) {
  const styles = navbarVariants()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  // DEBUG: Verificar dados do usuário
  // console.log('Navbar Debug:', { user, isAdmin, role: user?.role })

  const { mutateAsync: logoutFn } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <nav className={styles.nav()}>
      {/* Logo */}
      <Link to="/home">
        <img src={logoImage} alt="Logo" className={styles.logo()} />
      </Link>

      {/* Menu */}
      <div className={styles.menuContainer()}>
        <Link
          to="/home"
          className={styles.menuButton({ active: activeMenu === 'explore' })}
        >
          <PopcornIcon
            size={20}
            weight="regular"
            className={styles.menuIcon({ active: activeMenu === 'explore' })}
          />
          Explorar
        </Link>
        <Link
          to="/my-movies"
          className={styles.menuButton({ active: activeMenu === 'my-movies' })}
        >
          <FilmSlateIcon
            size={20}
            weight="regular"
            className={styles.menuIcon({
              active: activeMenu === 'my-movies',
            })}
          />
          Meus filmes
        </Link>

        {/* Dashboard - Apenas para admins */}
        {isAdmin && (
          <Link
            to="/dashboard"
            className={styles.menuButton({
              active: activeMenu === 'dashboard',
            })}
          >
            <ChartBarIcon
              size={20}
              weight="regular"
              className={styles.menuIcon({
                active: activeMenu === 'dashboard',
              })}
            />
            Dashboard
          </Link>
        )}
      </div>

      {/* User Info */}
      <div className={styles.userContainer()}>
        {currentUserId ? (
          <>
            {/* User logado */}
            <div className={styles.userInfo()}>
              <span className={styles.userName()}>
                Olá, {currentUserId} {isAdmin && <AdminBadge size="md" />}
              </span>
              <Avatar size="sm" icon={<UserIcon size={24} weight="light" />} />
            </div>

            <div className={styles.divider()}></div>

            {/* Logout Button */}
            <button
              className={styles.logoutButton()}
              onClick={() => logoutFn()}
              title="Sair"
            >
              <SignOutIcon
                size={20}
                weight="regular"
                className={styles.logoutIcon()}
              />
            </button>
          </>
        ) : (
          /* Usuário não logado */
          <Link to="/sign-in">
            <Button variant="primary" size="sm" className="!gap-1">
              <SignInIcon size={17} weight="regular" />
              Fazer Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
