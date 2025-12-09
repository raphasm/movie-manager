import { tv, type VariantProps } from 'tailwind-variants'
import { ShieldCheckIcon, CrownIcon, StarIcon } from '@phosphor-icons/react'

const badgeStyles = tv({
  slots: {
    root: 'inline-flex items-center justify-center gap-1 px-1 py-0.5 rounded-full text-xs font-medium',
    icon: '',
  },
  variants: {
    variant: {
      // Badge "Você" - roxo sólido
      you: {
        root: 'bg-custom-purple text-white',
      },
      // Badge Admin - gradiente coral/rosa (como na imagem)
      admin: {
        root: 'bg-gradient-to-b from-orange-400 via-rose-500 to-pink-600 text-white',
        icon: 'text-white',
      },
      // Badge Moderador - gradiente roxo
      moderator: {
        root: 'bg-gradient-to-b from-purple-400 via-purple-500 to-purple-700 text-white',
        icon: 'text-white',
      },
      // Badge VIP - gradiente dourado
      vip: {
        root: 'bg-gradient-to-b from-yellow-400 via-amber-500 to-orange-500 text-white',
        icon: 'text-white',
      },
    },
    size: {
      sm: {
        root: 'text-[10px] px-1 py-0',
      },
      md: {
        root: 'text-xs px-2 py-0.5',
      },
      lg: {
        root: 'text-sm px-2.5 py-1',
      },
    },
  },
  defaultVariants: {
    variant: 'you',
    size: 'md',
  },
})

type BadgeVariants = VariantProps<typeof badgeStyles>

interface BadgeProps extends BadgeVariants {
  children: React.ReactNode
  showIcon?: boolean
  className?: string
}

/**
 * Componente Badge para exibir tags de status do usuário
 *
 * @example
 * // Badge "Você"
 * <Badge variant="you">Você</Badge>
 *
 * // Badge Admin com ícone
 * <Badge variant="admin" showIcon>Admin</Badge>
 *
 * // Badge VIP
 * <Badge variant="vip" showIcon>VIP</Badge>
 */
export function Badge({
  children,
  variant,
  size,
  showIcon = false,
  className,
}: BadgeProps) {
  const { root, icon } = badgeStyles({ variant, size })

  // Escolhe o ícone baseado na variante
  const IconComponent = {
    admin: ShieldCheckIcon,
    moderator: ShieldCheckIcon,
    vip: CrownIcon,
    you: StarIcon,
  }[variant || 'you']

  return (
    <span className={root({ className })}>
      {showIcon && IconComponent && (
        <IconComponent size={11} weight="fill" className={icon()} />
      )}
      {children}
    </span>
  )
}

/**
 * Badge específico para Admin com ícone de escudo
 */
export function AdminBadge({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <Badge variant="admin" size={size} showIcon>
      Admin
    </Badge>
  )
}

/**
 * Badge específico para "Você"
 */
export function YouBadge({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <Badge variant="you" size={size}>
      Você
    </Badge>
  )
}
