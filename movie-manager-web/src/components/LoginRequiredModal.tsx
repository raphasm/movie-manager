import { tv } from 'tailwind-variants'
import { X, SignIn, UserPlus } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from './IconButton'
import { Button } from './Button'
import { useEffect } from 'react'

const loginRequiredModalVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4',
    content:
      'bg-[#0F0F1A] border border-[#1A1B2D] rounded-[18px] w-full max-w-[400px] relative',
    closeButton: 'absolute top-4 right-4',
    container: 'p-8 flex flex-col items-center gap-6 text-center',
    iconWrapper:
      'w-16 h-16 rounded-full bg-custom-purple/20 flex items-center justify-center',
    icon: 'text-custom-purple',
    title:
      'text-xl leading-[1.276] font-title font-bold text-custom-text-tagline',
    description: 'text-sm leading-[1.6] font-body text-custom-text-brand',
    buttons: 'flex flex-col gap-3 w-full mt-2',
  },
})

interface LoginRequiredModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginRequiredModal({
  isOpen,
  onClose,
}: LoginRequiredModalProps) {
  const styles = loginRequiredModalVariants()
  const navigate = useNavigate()

  useEffect(() => {
    // Quando o modal ABRE (isOpen = true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      // Quando o modal FECHA (isOpen = false)
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen]) // Executa toda vez que isOpen muda

  if (!isOpen) return null

  function handleLogin() {
    onClose()
    navigate('/sign-in')
  }

  function handleSignUp() {
    onClose()
    navigate('/sign-up')
  }

  return (
    <div className={styles.overlay()} onClick={onClose}>
      <div className={styles.content()} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButton()}>
          <IconButton
            variant="secondary"
            icon={<X size={20} weight="bold" />}
            onClick={onClose}
          />
        </div>

        <div className={styles.container()}>
          <div className={styles.iconWrapper()}>
            <SignIn size={32} className={styles.icon()} />
          </div>

          <h2 className={styles.title()}>Faça login para avaliar</h2>

          <p className={styles.description()}>
            Para fazer essa ação, você precisa estar logado na sua conta.
          </p>

          <div className={styles.buttons()}>
            <Button variant="primary" fullWidth onClick={handleLogin}>
              <SignIn size={20} />
              Entrar
            </Button>

            <Button variant="secondary" fullWidth onClick={handleSignUp}>
              <UserPlus size={20} />
              Criar conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
