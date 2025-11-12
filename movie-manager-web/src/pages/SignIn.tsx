import { Envelope, Lock, EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { IconButton } from '../components/IconButton'
import { MenuTab } from '../components/MenuTab'
import { useState } from 'react'

export function SignIn() {
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
          activeTab={0}
          onTabChange={handleTabChange}
        />

        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-5 w-full">
            <h1 className="text-2xl leading-[1.689] m-0 max-md:text-xl font-display text-custom-text-light">
              Acesse sua conta
            </h1>

            <div className="flex flex-col gap-4 w-full">
              <Input
                icon={<Envelope size={20} weight="regular" />}
                placeholder="E-mail"
                type="email"
              />
              <Input
                icon={<Lock size={20} weight="regular" />}
                placeholder="Senha"
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

            <div className="flex justify-end">
              <button className="text-sm text-custom-purple hover:text-custom-purple-hover transition-colors">
                Esqueci minha senha
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/home">
              <Button>Entrar</Button>
            </Link>

            <p className="text-xs text-center text-custom-text-gray">
              Não tem uma conta?{' '}
              <Link
                to="/sign-up"
                className="text-custom-purple hover:text-custom-purple-hover transition-colors"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
