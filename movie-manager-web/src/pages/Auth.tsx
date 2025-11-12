import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Envelope, Lock, User, Eye, EyeSlash } from '@phosphor-icons/react'

import logoImage from '../assets/logo.svg'
import loginBgImage from '../assets/login-image.png'
import { MenuTab } from '../components/MenuTab'
import { TextBelow } from '../components/TextBelow'
import { Input } from '../components/Input'
import { IconButton } from '../components/IconButton'
import { Link } from '../components/Link'
import { Button } from '../components/Button'

interface AuthProps {
  onLogin?: () => void
}

export function Auth({ onLogin }: AuthProps) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (isLogin: boolean) => {
    const newErrors: { [key: string]: string } = {}

    if (isLogin) {
      if (!loginData.email) {
        newErrors.email = 'E-mail é obrigatório'
      } else if (!validateEmail(loginData.email)) {
        newErrors.email = 'E-mail inválido'
      }

      if (!loginData.password) {
        newErrors.password = 'Senha é obrigatória'
      } else if (loginData.password.length < 6) {
        newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
      }
    } else {
      if (!registerData.name) {
        newErrors.name = 'Nome é obrigatório'
      } else if (registerData.name.length < 2) {
        newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
      }

      if (!registerData.email) {
        newErrors.email = 'E-mail é obrigatório'
      } else if (!validateEmail(registerData.email)) {
        newErrors.email = 'E-mail inválido'
      }

      if (!registerData.password) {
        newErrors.password = 'Senha é obrigatória'
      } else if (registerData.password.length < 6) {
        newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(true)) return

    setIsLoading(true)
    setErrors({})

    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Login:', loginData)
      // Aqui você faria a chamada real para a API
      onLogin?.() // Chamar callback de sucesso
      navigate('/home') // Navegar para home
    } catch {
      setErrors({ general: 'Erro ao fazer login. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(false)) return

    setIsLoading(true)
    setErrors({})

    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Register:', registerData)
      // Aqui você faria a chamada real para a API
      onLogin?.() // Chamar callback de sucesso (após registro, faz login automático)
      navigate('/home') // Navegar para home
    } catch {
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="flex w-full min-h-screen"
      style={{ backgroundColor: '#0f0f1a' }}
    >
      {/* Thumbnail Section */}
      <div className="relative w-[695px] h-screen flex-shrink-0 overflow-hidden max-lg:w-full max-lg:h-[300px] max-md:h-[200px]">
        <img
          src={loginBgImage}
          alt="Login"
          className="absolute top-4 left-3 w-[calc(100%-32px)] h-[calc(100%-32px)] object-cover rounded-[18px]"
        />
        <div
          className="relative w-full h-full p-12 flex flex-col justify-between max-md:p-6"
          style={{
            background:
              'linear-gradient(45deg, rgba(26, 27, 45, 0.9) 0%, rgba(26, 27, 45, 0.75) 100%)',
          }}
        >
          <img src={logoImage} alt="Logo" className="w-16 h-16" />
          <div className="flex flex-col gap-3 w-[346px] max-md:w-full">
            <h2
              className="text-base leading-[1.689] m-0 max-md:text-sm"
              style={{ fontFamily: 'var(--font-display)', color: '#b5b6c9' }}
            >
              ab filmes
            </h2>
            <h1
              className="text-xl leading-[1.689] m-0 max-md:text-base"
              style={{ fontFamily: 'var(--font-display)', color: '#e4e5ec' }}
            >
              O guia definitivo para os amantes do cinema
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex items-center justify-center p-12 max-md:p-6">
        <div className="flex flex-col gap-[52px] w-[328px] max-lg:w-full max-lg:max-w-[400px]">
          <MenuTab
            tabs={['Login', 'Cadastro']}
            activeTab={activeTab}
            onTabChange={(index) => {
              setActiveTab(index)
              setErrors({})
              setShowPassword(false)
              setShowRegisterPassword(false)
            }}
          />

          {activeTab === 0 ? (
            <form className="flex flex-col gap-8 w-full" onSubmit={handleLogin}>
              <div className="flex flex-col gap-5 w-full">
                <h1
                  className="text-2xl leading-[1.689] m-0 max-md:text-xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#e5e2e9',
                  }}
                >
                  Acesse sua conta
                </h1>

                {errors.general && (
                  <TextBelow variant="muted" size="sm" align="center">
                    <span style={{ color: '#dd3444' }}>{errors.general}</span>
                  </TextBelow>
                )}

                <div className="flex flex-col gap-4 w-full">
                  <Input
                    icon={<Envelope size={20} weight="regular" />}
                    placeholder="E-mail"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => {
                      setLoginData({ ...loginData, email: e.target.value })
                      if (errors.email) {
                        setErrors({ ...errors, email: '' })
                      }
                    }}
                    error={!!errors.email}
                    errorMessage={errors.email}
                    disabled={isLoading}
                  />
                  <Input
                    icon={<Lock size={20} weight="regular" />}
                    placeholder="Senha"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value })
                      if (errors.password) {
                        setErrors({ ...errors, password: '' })
                      }
                    }}
                    error={!!errors.password}
                    errorMessage={errors.password}
                    disabled={isLoading}
                    rightElement={
                      <IconButton
                        icon={
                          showPassword ? (
                            <EyeSlash size={16} />
                          ) : (
                            <Eye size={16} />
                          )
                        }
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      />
                    }
                  />
                </div>

                <div className="flex justify-center">
                  <Link
                    variant="primary"
                    size="sm"
                    onClick={() => console.log('Esqueci minha senha')}
                  >
                    Esqueci minha senha
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>

                <TextBelow variant="muted" size="sm" align="center">
                  Ao continuar, você concorda com nossos{' '}
                  <Link variant="primary" size="sm">
                    Termos de Uso
                  </Link>
                </TextBelow>
              </div>
            </form>
          ) : (
            <form
              className="flex flex-col gap-8 w-full"
              onSubmit={handleRegister}
            >
              <div className="flex flex-col gap-5 w-full">
                <h1
                  className="text-2xl leading-[1.689] m-0 max-md:text-xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#e5e2e9',
                  }}
                >
                  Crie sua conta
                </h1>

                {errors.general && (
                  <TextBelow variant="muted" size="sm" align="center">
                    <span style={{ color: '#dd3444' }}>{errors.general}</span>
                  </TextBelow>
                )}

                <div className="flex flex-col gap-4 w-full">
                  <Input
                    icon={<User size={20} weight="regular" />}
                    placeholder="Nome completo"
                    type="text"
                    value={registerData.name}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, name: e.target.value })
                      if (errors.name) {
                        setErrors({ ...errors, name: '' })
                      }
                    }}
                    error={!!errors.name}
                    errorMessage={errors.name}
                    disabled={isLoading}
                  />
                  <Input
                    icon={<Envelope size={20} weight="regular" />}
                    placeholder="E-mail"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => {
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                      if (errors.email) {
                        setErrors({ ...errors, email: '' })
                      }
                    }}
                    error={!!errors.email}
                    errorMessage={errors.email}
                    disabled={isLoading}
                  />
                  <Input
                    icon={<Lock size={20} weight="regular" />}
                    placeholder="Senha (min. 6 caracteres)"
                    type={showRegisterPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => {
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                      if (errors.password) {
                        setErrors({ ...errors, password: '' })
                      }
                    }}
                    error={!!errors.password}
                    errorMessage={errors.password}
                    disabled={isLoading}
                    rightElement={
                      <IconButton
                        icon={
                          showRegisterPassword ? (
                            <EyeSlash size={16} />
                          ) : (
                            <Eye size={16} />
                          )
                        }
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowRegisterPassword(!showRegisterPassword)
                        }
                        disabled={isLoading}
                      />
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Criando...' : 'Criar conta'}
                </Button>

                <TextBelow variant="muted" size="sm" align="center">
                  Ao criar uma conta, você concorda com nossos{' '}
                  <Link variant="primary" size="sm">
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link variant="primary" size="sm">
                    Política de Privacidade
                  </Link>
                </TextBelow>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
