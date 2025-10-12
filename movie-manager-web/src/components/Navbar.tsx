import { SignOutIcon, PopcornIcon, FilmSlateIcon } from '@phosphor-icons/react'
import logoImage from '../assets/logo.svg'
import userAvatar from '../assets/movies/user-avatar.png'

interface NavbarProps {
  activeMenu?: 'explore' | 'my-movies'
  userName?: string
  onLogout?: () => void
  onMenuChange?: (menu: 'explore' | 'my-movies') => void
}

export function Navbar({
  activeMenu = 'explore',
  userName = 'Jordan',
  onLogout,
  onMenuChange,
}: NavbarProps) {
  return (
    <nav
      className="flex items-center justify-between px-6 py-0 w-full h-20 border-b"
      style={{ borderColor: '#131320' }}
    >
      {/* Logo */}
      <img src={logoImage} alt="Logo" className="w-12 h-12" />

      {/* Menu */}
      <div className="flex items-center justify-center gap-6">
        <button
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-base leading-[1.5] transition-all group ${
            activeMenu === 'explore'
              ? 'text-[#A85FDD]'
              : 'text-[#7a7b9f] hover:text-white'
          }`}
          onClick={() => onMenuChange?.('explore')}
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor:
              activeMenu === 'explore' ? '#1a1b2d' : 'transparent',
          }}
        >
          <PopcornIcon
            size={20}
            weight="regular"
            className={`transition-colors ${
              activeMenu === 'explore'
                ? 'text-[#A85FDD]'
                : 'text-[#7a7b9f] group-hover:text-white'
            }`}
          />
          Explorar
        </button>
        <button
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-base leading-[1.5] transition-all group ${
            activeMenu === 'my-movies'
              ? 'text-[#A85FDD]'
              : 'text-[#7a7b9f] hover:text-white'
          }`}
          onClick={() => onMenuChange?.('my-movies')}
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor:
              activeMenu === 'my-movies' ? '#1a1b2d' : 'transparent',
          }}
        >
          <FilmSlateIcon
            size={20}
            weight="regular"
            className={`transition-colors ${
              activeMenu === 'my-movies'
                ? 'text-[#A85FDD]'
                : 'text-[#7a7b9f] group-hover:text-white'
            }`}
          />
          Meus filmes
        </button>
      </div>

      {/* User Info */}
      <div className="flex items-center justify-center gap-3 rounded-[10px]">
        {/* User */}
        <div className="flex items-center gap-3">
          <span
            className="text-sm leading-[1.6]"
            style={{ fontFamily: 'var(--font-body)', color: '#b5b6c9' }}
          >
            Olá, {userName}
          </span>
          <img
            src={userAvatar}
            alt={userName}
            className="w-8 h-8 rounded-md border object-cover"
            style={{ borderColor: '#7435db' }}
          />
        </div>

        {/* Divider */}
        <div className="w-px h-8" style={{ backgroundColor: '#1a1b2d' }}></div>

        {/* Logout Button */}
        <button
          className="flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-[#25263a]"
          style={{ backgroundColor: '#1a1b2d' }}
          onClick={onLogout}
          title="Sair"
        >
          <SignOutIcon size={20} weight="regular" className="text-white" />
        </button>
      </div>
    </nav>
  )
}
