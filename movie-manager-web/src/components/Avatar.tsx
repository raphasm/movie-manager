import * as RadixAvatar from '@radix-ui/react-avatar'
import type React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

// Estilos do Avatar usando tailwind-variants
const avatarStyles = tv({
  slots: {
    // Container externo - borda com gradiente roxo vibrante
    root: 'inline-flex items-center justify-center p-[1.7px] select-none bg-gradient-to-b from-purple-400 via-purple-600 to-purple-800',
    // Área interna com fundo escuro
    inner: 'flex items-center justify-center bg-custom-bg-menu w-full h-full',
    image: 'h-full w-full object-cover',
    // Fallback para o ícone - cor roxa suave
    fallback: 'flex h-full w-full items-center justify-center text-purple-400',
  },
  variants: {
    size: {
      sm: { root: 'h-[31px] w-[31px]' },
      md: { root: 'h-[38px] w-[38px]' },
      lg: { root: 'h-12 w-12' },
      xl: { root: 'h-16 w-16' },
    },
    shape: {
      circle: {
        root: 'rounded-full',
        inner: 'rounded-full',
        image: 'rounded-full',
        fallback: 'rounded-full',
      },
      square: {
        root: 'rounded-lg',
        inner: 'rounded-md',
        image: 'rounded-md',
        fallback: 'rounded-md',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
})

type AvatarVariants = VariantProps<typeof avatarStyles>

interface AvatarProps extends AvatarVariants {
  src?: string
  alt?: string
  icon?: React.ReactNode
  className?: string
}

/**
 *
 *
 * Exibe uma imagem de perfil do usuário com fallback automático
 * para iniciais ou ícone quando a imagem não está disponível.
 *
 * @example
 * // Circular (padrão)
 * <Avatar src="/path/to/image.jpg" alt="John Doe" />
 *
 * // Quadrado com bordas arredondadas
 * <Avatar src="/path/to/image.jpg" shape="square" size="lg" />
 *
 * // Com ícone de fallback
 * <Avatar icon={<User size={20} />} shape="square" />
 */
export function Avatar({
  src,
  alt = '',
  icon,
  size,
  shape,
  className = '',
}: AvatarProps) {
  const {
    root,
    inner,
    image,
    fallback: fallbackStyle,
  } = avatarStyles({ size, shape })

  return (
    <RadixAvatar.Root className={root({ className })}>
      {/* SVG com definição do gradiente para o ícone */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient
            id="avatar-gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Container interno com fundo escuro */}
      <div className={inner()}>
        {/* Imagem do avatar - carrega de forma assíncrona */}
        <RadixAvatar.Image src={src} alt={alt} className={image()} />

        {/* Fallback - exibido enquanto a imagem carrega ou se falhar */}
        <RadixAvatar.Fallback delayMs={600} className={fallbackStyle()}>
          {icon}
        </RadixAvatar.Fallback>
      </div>
    </RadixAvatar.Root>
  )
}

// Estilos do AvatarGroup usando tailwind-variants
const avatarGroupStyles = tv({
  slots: {
    container: 'flex -space-x-2',
    counter:
      'inline-flex items-center justify-center rounded-full bg-zinc-600 border-2 border-zinc-900 font-medium text-white',
  },
  variants: {
    size: {
      sm: { counter: 'h-8 w-8 text-xs' },
      md: { counter: 'h-10 w-10 text-sm' },
      lg: { counter: 'h-12 w-12 text-base' },
      xl: { counter: 'h-16 w-16 text-lg' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type AvatarGroupVariants = VariantProps<typeof avatarGroupStyles>

interface AvatarGroupProps extends AvatarGroupVariants {
  children: React.ReactNode
  max?: number
}

/**
 * Componente AvatarGroup para exibir múltiplos avatares empilhados
 *
 * @example
 * <AvatarGroup max={3}>
 *   <Avatar src="/user1.jpg" fallback="U1" />
 *   <Avatar src="/user2.jpg" fallback="U2" />
 *   <Avatar src="/user3.jpg" fallback="U3" />
 *   <Avatar src="/user4.jpg" fallback="U4" />
 * </AvatarGroup>
 */
export function AvatarGroup({ children, max = 3, size }: AvatarGroupProps) {
  const { container, counter } = avatarGroupStyles({ size })
  const childArray = Array.isArray(children) ? children : [children]
  const visibleChildren = childArray.slice(0, max)
  const remainingCount = childArray.length - max

  return (
    <div className={container()}>
      {visibleChildren}

      {/* Mostra contador se houver mais avatares do que o máximo */}
      {remainingCount > 0 && <div className={counter()}>+{remainingCount}</div>}
    </div>
  )
}
