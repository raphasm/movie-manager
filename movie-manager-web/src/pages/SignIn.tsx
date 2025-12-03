import { Envelope, Lock, EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { IconButton } from '../components/IconButton'
import { MenuTab } from '../components/MenuTab'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { signIn } from '../api/sign-in'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'

const signInFormSchema = z.object({
  email: z.email('E-mail é obrigatório'),
  password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      })
      // Invalida a query do /me para buscar os dados do usuário logado
      await queryClient.invalidateQueries({ queryKey: ['me'] })
      navigate('/home')
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          'E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.'
        form.setError('root', {
          message: errorMessage,
        })
      } else {
        form.setError('root', {
          message: 'Erro inesperado. Tente novamente.',
        })
      }
    }
  }

  function handleTabChange(index: number) {
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
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={form.handleSubmit(handleSignIn)}
          >
            <h1 className="text-2xl leading-[1.689] m-0 max-md:text-xl font-display text-custom-text-light">
              Acesse sua conta
            </h1>
            <div className="flex flex-col gap-4 w-full">
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
                placeholder="Senha"
                type={showPassword ? 'text' : 'password'}
                {...form.register('password')}
                id="password"
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

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-custom-purple hover:text-custom-purple-hover transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <Button disabled={form.formState.isSubmitting} type="submit">
                Entrar
              </Button>

              {form.formState.errors.root && (
                <p className="text-sm text-red-500 text-center">
                  {form.formState.errors.root.message}
                </p>
              )}

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
          </form>
        </div>
      </div>
    </div>
  )
}
