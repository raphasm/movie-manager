import {
  Envelope,
  Lock,
  User,
  EyeIcon,
  EyeSlashIcon,
} from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { IconButton } from '../components/IconButton'
import { MenuTab } from '../components/MenuTab'
import { useState } from 'react'

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleTabChange = (index: number) => {
    if (index === 0) {
      navigate('/sign-in')
    } else {
      navigate('/sign-up')
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-12 max-md:p-6">
      <div className="flex flex-col gap-[52px] w-[328px] max-lg:w-full max-lg:max-w-[400px]">
        <MenuTab
          tabs={['Login', 'Cadastro']}
          activeTab={1}
          onTabChange={handleTabChange}
        />

        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-5 w-full">
            <h1 className="text-2xl leading-[1.689] m-0 max-md:text-xl font-display text-custom-text-light">
              Crie sua conta
            </h1>

            <div className="flex flex-col gap-4 w-full">
              <Input
                icon={<User size={20} weight="regular" />}
                placeholder="Nome completo"
                type="text"
              />
              <Input
                icon={<Envelope size={20} weight="regular" />}
                placeholder="E-mail"
                type="email"
              />
              <Input
                icon={<Lock size={20} weight="regular" />}
                placeholder="Senha (min. 6 caracteres)"
                type={showPassword ? 'text' : 'password'}
                rightElement={
                  <IconButton
                    icon={
                      showPassword ? (
                        <EyeIcon size={16} />
                      ) : (
                        <EyeSlashIcon size={16} />
                      )
                    }
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/home">
              <Button>Criar conta</Button>
            </Link>

            <p className="text-xs text-center text-custom-text-gray">
              Já tem uma conta?{' '}
              <Link
                to="/sign-in"
                className="text-custom-purple hover:text-custom-purple-hover transition-colors"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
