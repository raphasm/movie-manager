# 🎬 Movie Manager Web

Aplicação web moderna para gerenciamento e avaliação de filmes, construída com React 19, TypeScript e Vite.

## 📋 Sobre o Projeto

Movie Manager é uma plataforma completa para explorar, gerenciar e avaliar filmes. Os usuários podem navegar por um catálogo de filmes, deixar avaliações, favoritar títulos e gerenciar suas coleções pessoais. Administradores têm acesso a funcionalidades exclusivas através do dashboard.

## 🚀 Stack Tecnológica

### Core
- **React 19.1** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router 7** - Roteamento e navegação

### Gerenciamento de Estado
- **TanStack Query (React Query)** - Gerenciamento de estado do servidor
- **React Context API** - Estado global (Auth, Favorites)

### Estilização
- **Tailwind CSS 4** - Framework CSS com design system customizado
- **Tailwind Variants (tv)** - Sistema de variantes para componentes
- **Radix UI** - Componentes primitivos acessíveis

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Comunicação HTTP
- **Axios** - Cliente HTTP com suporte a cookies

### UI/UX
- **Phosphor Icons** - Biblioteca de ícones
- **Sonner** - Notificações toast

## 🎨 Design System

O projeto implementa um design system completo com:

- **Paleta de cores customizada** - Tons de roxo, cinza e feedback
- **Tipografia** - 3 famílias de fontes (Display, Title, Body)
- **Componentes reutilizáveis** - Button, Input, Select, Rating, Modal, etc.
- **Tokens CSS** - Variáveis CSS customizadas para cores

Consulte [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) para especificações completas.

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação
- **Sign In/Sign Up** - Sistema de login e cadastro
- **Autenticação por Cookies** - Sessão persistente via HTTP-only cookies
- **Rotas Protegidas** - Controle de acesso baseado em autenticação
- **Logout** - Encerramento de sessão com invalidação de cache

### 🎬 Exploração de Filmes
- **Listagem de Filmes** - Navegação por catálogo completo
- **Filtros e Categorias** - Busca por gênero, ano, etc.
- **Paginação** - Navegação eficiente entre páginas
- **Detalhes do Filme** - Visualização completa de informações

### ⭐ Sistema de Avaliação
- **Rating com Estrelas** - Avaliação de 1 a 5 estrelas
- **Comentários** - Deixar reviews detalhadas
- **Listagem de Avaliações** - Visualizar todas as avaliações de um filme
- **Atualização Otimista** - Feedback instantâneo ao avaliar

### ❤️ Favoritos
- **Adicionar/Remover Favoritos** - Marcar filmes favoritos
- **Gerenciamento de Coleção** - Visualizar lista de favoritos
- **Contexto Global** - Estado sincronizado em toda aplicação

### 👤 Perfil do Usuário
- **Modal de Perfil** - Visualização de dados do usuário
- **Upload de Avatar** - Alteração de foto de perfil
- **Exibição de Email** - Informações de contato
- **Badge Admin** - Identificação visual de administradores
- **Estatísticas** - Contador de reviews
- **Animação de Engrenagem** - Ícone de configurações com rotação suave

### 🎛️ Dashboard Admin
- **Gerenciamento de Filmes** - CRUD completo (Criar, Ler, Atualizar, Deletar)
- **Upload de Imagens** - Sistema de upload de pôsteres
- **Formulários Validados** - Validação com Zod

### 📱 Interface do Usuário
- **Navbar Responsiva** - Navegação principal com suporte mobile
- **User Area** - Card de usuário com animações
- **Profile Modal** - Modal separado e reutilizável para perfil
- **Skeleton Loading** - Placeholders durante carregamento
- **Spinners** - Indicadores de loading
- **Toasts** - Notificações não-intrusivas
- **Modais** - Overlays para ações contextuais

### 🔄 Otimizações
- **React Query Cache** - Cache inteligente de requisições (1min staleTime, 5min gcTime)
- **Memoização** - Componentes otimizados com React.memo
- **Atualização Otimista** - UI responsiva sem esperar servidor
- **Lazy Loading** - Carregamento sob demanda

## 📁 Estrutura do Projeto

```
src/
├── api/              # Funções de chamada à API
│   ├── sign-in.ts
│   ├── sign-up.ts
│   ├── get-movies.ts
│   ├── get-movie-details.ts
│   ├── create-evaluation.ts
│   ├── create-movies.ts
│   ├── logout.ts
│   └── get-me.ts
├── components/       # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── TextArea.tsx
│   ├── Avatar.tsx
│   ├── Badge.tsx
│   ├── Rating.tsx
│   ├── Navbar.tsx
│   ├── UserArea.tsx
│   ├── ProfileModal.tsx
│   ├── MovieCard.tsx
│   ├── Evaluations.tsx
│   ├── Pagination.tsx
│   ├── Skeleton.tsx
│   ├── Spinner.tsx
│   └── ...
├── contexts/         # Contextos React
│   ├── AuthContext.tsx
│   └── FavoritesContext.tsx
├── pages/            # Componentes de páginas
│   ├── Home.tsx
│   ├── MovieDetails.tsx
│   ├── MyMovies.tsx
│   ├── Dashboard.tsx
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   └── layouts/      # Layouts aninhados
│       ├── AuthLayout.tsx
│       ├── ExploreLayout.tsx
│       ├── MyMoviesLayout.tsx
│       └── DashboardLayout.tsx
├── utils/            # Utilitários
│   ├── api.ts        # Instância Axios
│   └── react-query.ts # Config React Query
├── env.ts            # Variáveis de ambiente (Zod)
├── routes.tsx        # Configuração de rotas
└── index.css         # Tema Tailwind CSS 4
```

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta do projeto
cd movie-manager-web

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env com:
VITE_API_URL=http://localhost:3000
VITE_IMAGES_URL=http://localhost:3000/images
```

### Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint
```

## 🔑 Variáveis de Ambiente

```env
VITE_API_URL=        # URL da API backend
VITE_IMAGES_URL=     # URL base para imagens
```

## 🎯 Padrões de Desenvolvimento

### Componentes
- Use `tailwind-variants` (`tv()`) para estilização com slots
- Exporte interfaces TypeScript para props
- Componentes funcionais com hooks
- Memoização quando apropriado (`React.memo`)

### Estado do Servidor (React Query)
- `useQuery` para leitura de dados (GET)
- `useMutation` para escrita (POST, PUT, DELETE)
- Invalidação de cache após mutations (`queryClient.invalidateQueries`)
- Atualização otimista com `queryClient.setQueryData`
- Query keys descritivas (ex: `['movie-details', id]`)

### Autenticação
- Cookies HTTP-only via `withCredentials: true` no Axios
- Query key `['me']` para estado do usuário
- `AuthContext` com React Query integrado
- `ProtectedRoute` para rotas privadas

### Estilização
- Tokens de cores customizadas (`custom-*`)
- Slots do tailwind-variants para componentes complexos
- Mobile-first responsive design
- Animações suaves com `transition-*` do Tailwind

### Estrutura de Arquivos
- Um componente por arquivo
- Interfaces no mesmo arquivo do componente
- API calls em `/src/api/`
- Evitar `any`, sempre tipar com TypeScript

## 📚 Documentação Adicional

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Especificações completas do Design System
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - Guia detalhado para desenvolvimento

## 🎨 Componentes do Design System

### Componentes Básicos
- **Button** - 3 variantes (primary, secondary, ghost), 4 tamanhos
- **IconButton** - Botão circular apenas com ícone
- **Input** - Campo de entrada com ícone e validação
- **TextArea** - Área de texto com contador de caracteres
- **Select** - Select customizado com Radix UI

### Componentes de Feedback
- **Rating** - Sistema de avaliação com estrelas
- **Skeleton** - Placeholders de carregamento
- **Spinner** - Indicador de loading
- **Toast** - Notificações (via Sonner)

### Componentes de Layout
- **Navbar** - Navegação principal
- **MenuTab** - Navegação em abas
- **Container** - Wrapper com max-width

### Componentes de Dados
- **MovieCard** - Card de filme com 3 tamanhos
- **Avatar** - Avatar de usuário com fallback
- **Badge** - Badge de admin
- **Pagination** - Controles de paginação

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

---

⭐ Se este projeto foi útil, considere dar uma estrela!
