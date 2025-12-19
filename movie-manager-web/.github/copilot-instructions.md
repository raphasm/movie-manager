# Movie Manager Web - Instruções para Agentes de IA

## Visão Geral do Projeto

Aplicação de gerenciamento de filmes usando React 19 + TypeScript + Vite com autenticação baseada em cookies. Utiliza Tailwind CSS 4 com design system customizado e React Query para gerenciamento de estado do servidor.

## Stack Tecnológica & Arquitetura

### Dependências Principais

- **React 19.1** com React Router 7 para roteamento
- **TanStack Query (React Query)** para todo o estado do servidor (queries + mutations)
- **Tailwind CSS 4** com diretiva `@theme` em [src/index.css](../src/index.css)
- **Radix UI** (Avatar, Select, Tooltip, Themes) para primitivos acessíveis
- **Tailwind Variants** (`tv()`) para estilização de componentes com variantes
- **React Hook Form + Zod** para validação de formulários
- **Axios** com `withCredentials: true` para autenticação via cookies
- **Sonner** para notificações toast

### Estrutura do Projeto

```
src/
  api/           # Chamadas de API (sign-in.ts, get-movies.ts, etc.)
  components/    # Componentes UI reutilizáveis com tailwind-variants
  contexts/      # AuthContext, FavoritesContext
  pages/         # Componentes de rotas
    layouts/     # Layouts aninhados (AuthLayout, ExploreLayout, etc.)
  utils/         # api.ts (instância axios), react-query.ts (config QueryClient)
  env.ts         # Variáveis de ambiente validadas com Zod
  routes.tsx     # Configuração do React Router
```

## Padrões Críticos

### 1. Fluxo de Autenticação

- Autenticação baseada em cookies com `withCredentials: true` em [src/utils/api.ts](../src/utils/api.ts)
- `AuthContext` usa React Query com chave `['me']` para estado do usuário
- Componente `ProtectedRoute` redireciona usuários não autenticados para `/sign-in`
- Logout invalida a query key `['me']`

### 2. Convenção de Estilização de Componentes

**Sempre use `tailwind-variants` para estilização de componentes:**

```tsx
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex items-center gap-2 rounded-md transition-all',
  variants: {
    variant: {
      primary: 'bg-custom-purple hover:bg-custom-purple-hover',
      secondary: 'bg-custom-bg-tab hover:bg-[#25263a]',
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-5 py-3 text-base',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  // props
}
```

Veja [src/components/Button.tsx](../src/components/Button.tsx), [src/components/Select.tsx](../src/components/Select.tsx) como referência.

### 3. Sistema de Cores Customizado

Use **tokens de cores customizadas** (não as cores padrão do Tailwind):

- `custom-purple`, `custom-purple-hover`, `custom-purple-active`, `custom-purple-tab`
- `custom-text-gray`, `custom-text-light`, `custom-text-brand`
- `custom-bg-menu`, `custom-bg-tab`, `custom-border-input`
- `custom-error`

Definidas em [src/index.css](../src/index.css) com variáveis CSS `--color-custom-*`.

### 4. Padrões do React Query

- **Queries:** Use `useQuery` com `queryKey` descritiva (ex: `['me']`, `['movies', { page, category }]`)
- **Mutations:** Use `useMutation` com `onSuccess: () => queryClient.invalidateQueries()`
- **Config:** Veja [src/utils/react-query.ts](../src/utils/react-query.ts) - 1min staleTime, 5min gcTime, sem refetch ao focar na janela

Exemplo de [src/pages/MovieDetails.tsx](../src/pages/MovieDetails.tsx):

```tsx
const { data: movie, isLoading } = useQuery({
  queryKey: ['movie', id],
  queryFn: () => getMovieDetails({ id: id! }),
  enabled: !!id,
})

const { mutateAsync: submitEvaluation } = useMutation({
  mutationFn: createEvaluation,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['movie', id] }),
})
```

### 5. Estrutura de Rotas

- Múltiplas rotas de layout compartilhando o path `/` (AuthLayout, ExploreLayout, MyMoviesLayout, DashboardLayout)
- Layouts envolvem seus filhos com UI compartilhada (ex: Navbar no AppLayout)
- Veja [src/routes.tsx](../src/routes.tsx) para configuração de rotas

### 6. Variáveis de Ambiente

- Use `env.ts` com validação de schema Zod
- Acesse via `env.VITE_API_URL`, `env.VITE_IMAGES_URL`
- Nunca use `import.meta.env` diretamente nos componentes

## Comandos de Desenvolvimento

```bash
npm run dev      # Inicia servidor de desenvolvimento (Vite)
npm run build    # Verificação TypeScript + build
npm run lint     # ESLint
npm run preview  # Preview do build de produção
```

## Referência do Design System

Veja [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) para especificações de componentes e exemplos de uso (Button, Input, Select, IconButton, etc.).

## Arquivos Chave para Referência

- [src/components/Button.tsx](../src/components/Button.tsx) - Exemplo canônico de tailwind-variants
- [src/contexts/AuthContext.tsx](../src/contexts/AuthContext.tsx) - Integração Auth + React Query
- [src/utils/api.ts](../src/utils/api.ts) - Instância Axios com withCredentials
- [src/index.css](../src/index.css) - Tema customizado Tailwind 4 e tokens de cores

## Tarefas Comuns

### Adicionar um novo endpoint de API

1. Crie uma função em `src/api/<nome-do-endpoint>.ts`
2. Use a instância `api` de `src/utils/api.ts`
3. Defina interfaces TypeScript para request/response
4. Use no componente com `useQuery` ou `useMutation`

### Criar um novo componente

1. Use `tailwind-variants` para estilização (veja Button.tsx)
2. Exporte interface TypeScript para props
3. Use tokens de cores customizadas (`custom-*`)
4. Suporte variantes via `VariantProps<typeof seuVariant>`

### Adicionar uma nova rota

1. Adicione configuração de rota em [src/routes.tsx](../src/routes.tsx)
2. Escolha o layout apropriado (AuthLayout, ExploreLayout, etc.)
3. Envolva com `ProtectedRoute` se autenticação for necessária
