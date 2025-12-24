# Movie Manager Web - Instruções para Agentes de IA

## Visão Geral do Projeto

Aplicação de gerenciamento de filmes usando React 19 + TypeScript + Vite com autenticação baseada em cookies. Utiliza Tailwind CSS 4 com design system customizado e React Query para gerenciamento de estado do servidor.

**Idioma:** Português (código, comentários e documentação em PT-BR)

## Stack Tecnológica & Arquitetura

### Dependências Principais

- **React 19.1** com React Router 7 para roteamento
- **TanStack Query (React Query)** para todo o estado do servidor (queries + mutations)
- **Tailwind CSS 4** com diretiva `@theme` em [src/index.css](../src/index.css)
- **Radix UI** (Avatar, Select, Tooltip, Themes) para primitivos acessíveis
- **Tailwind Variants** (`tv()`) para estilização de componentes com variantes
- **React Hook Form + Zod** para validação de formulários
- **Axios** com `withCredentials: true` para autenticação via cookies
- **Sonner** para notificações toast (configurado em [src/App.tsx](../src/App.tsx))

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
  // propriedades do componente
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

### 7. Gerenciamento de Estado de URL (Paginação e Filtros)

Use `useSearchParams` do React Router para estado sincronizado com a URL:

```tsx
const [searchParams, setSearchParams] = useSearchParams()

// Ler parâmetros (ex: ?page=2&query=matrix&category=action)
const searchQuery = searchParams.get('query')
const pageIndex = z.coerce
  .number()
  .transform((page) => page - 1)
  .parse(searchParams.get('page') ?? '1')

// Atualizar URL preservando outros parâmetros
setSearchParams((prev) => {
  prev.set('page', String(newPage + 1))
  return prev
})
```

Padrão usado em [src/pages/Home.tsx](../src/pages/Home.tsx) para filtros e paginação.

### 8. Validação de Formulários

Padrão **React Hook Form + Zod** em todos os formulários:

```tsx
const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type FormData = z.infer<typeof formSchema>

const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
})

// Registrar inputs com spread
<Input {...form.register('email')} error={npm run devform.formState.errors.email} />

// Erro global (ex: erro de API)
form.setError('root', { message: 'Erro ao fazer login' })
```

Veja [src/pages/SignIn.tsx](../src/pages/SignIn.tsx) para exemplo completo.

### 9. Gerenciamento de Estado

- **Estado do Servidor:** React Query (queries/mutations) - SEMPRE
- **Estado Global UI:** React Context (AuthContext, FavoritesContext)
- **Estado Local:** useState, useReducer
- **Formulários:** React Hook Form

**AuthContext** integra React Query - query key `['me']` fornece dados do usuário autenticado.

### 10. Padrão de Upload de Arquivos

Use o custom hook `useFileUpload` para drag-and-drop e preview:

```tsx
const { file, previewUrl, error, handleClick, handleDrop, ... } = useFileUpload({
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ['image/'],
})
```

Veja [src/hooks/useFileUpload.ts](../src/hooks/useFileUpload.ts) e [src/components/InputFile.tsx](../src/components/InputFile.tsx).

### 11. Atualização Otimista

Use `queryClient.setQueryData()` para atualização imediata + `invalidateQueries()` para sincronizar:

```tsx
const { mutateAsync } = useMutation({
  mutationFn: createEvaluation,
  onSuccess: (_, variables) => {
    // Atualiza o cache local instantaneamente
    queryClient.setQueryData(['movie', id], (old) => ({
      ...old,
      evaluations: [{ ...variables }, ...old.evaluations],
    }))
    // Sincroniza com o servidor em background
    queryClient.invalidateQueries({ queryKey: ['movie', id] })
  },
})
```

Exemplo em [src/pages/MovieDetails.tsx](../src/pages/MovieDetails.tsx) linha 74-98.

### 12. Estrutura de API Functions

Todas as funções de API seguem o mesmo padrão em `src/api/`:

```tsx
// src/api/exemplo.ts
import { api } from '../utils/api'

export interface ExemploBody {
  campo: string
}

export interface ExemploResponse {
  data: string
}

export async function exemplo({ campo }: ExemploBody) {
  const response = await api.post<ExemploResponse>('/endpoint', { campo })
  return response.data
}
```

- Sempre defina interfaces TypeScript para request e response
- Use a instância `api` de `src/utils/api.ts` (nunca axios direto)
- Retorne `response.data` (não a response completa)
- Veja [src/api/sign-in.ts](../src/api/sign-in.ts) e [src/api/get-all-movies.ts](../src/api/get-all-movies.ts)

### 13. Hierarquia de Contextos

Ordem de providers em [src/App.tsx](../src/App.tsx):

```tsx
QueryClientProvider → Theme → TooltipProvider → AuthProvider → FavoritesProvider → RouterProvider
```

- `AuthProvider` depende de React Query (deve estar dentro de `QueryClientProvider`)
- `FavoritesProvider` é Context API puro (local state, não persiste)

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
- [src/components/Select.tsx](../src/components/Select.tsx) - Radix UI + tailwind-variants
- [src/contexts/AuthContext.tsx](../src/contexts/AuthContext.tsx) - Integração Auth + React Query
- [src/contexts/FavoritesContext.tsx](../src/contexts/FavoritesContext.tsx) - Context com useMemo/useCallback
- [src/pages/SignIn.tsx](../src/pages/SignIn.tsx) - React Hook Form + Zod + error handling
- [src/pages/MovieDetails.tsx](../src/pages/MovieDetails.tsx) - Atualização otimista completa
- [src/hooks/useFileUpload.ts](../src/hooks/useFileUpload.ts) - Custom hook para upload
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
