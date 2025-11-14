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
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signUpFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('E-mail é obrigatório'),
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  function handleSubmit(payload: SignUpForm) {
    console.log(payload)
  }

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

            <form
              className="flex flex-col gap-8"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="flex flex-col gap-4 w-full">
                <Input
                  icon={<User size={20} weight="regular" />}
                  placeholder="Nome completo"
                  type="text"
                  id="name"
                  {...form.register('name')}
                  error={!!form.formState.errors.name?.message}
                  errorMessage={form.formState.errors.name?.message}
                />
                <Input
                  icon={<Envelope size={20} weight="regular" />}
                  placeholder="E-mail"
                  type="email"
                  id="email"
                  {...form.register('email')}
                  error={!!form.formState.errors.email?.message}
                  errorMessage={form.formState.errors.email?.message}
                />
                <Input
                  icon={<Lock size={20} weight="regular" />}
                  placeholder="Senha (min. 6 caracteres)"
                  type={showPassword ? 'text' : 'password'}
                  {...form.register('password')}
                  error={!!form.formState.errors.password?.message}
                  errorMessage={form.formState.errors.password?.message}
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

              <div className="flex flex-col gap-3">
                <Button type="submit">Criar conta</Button>

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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
