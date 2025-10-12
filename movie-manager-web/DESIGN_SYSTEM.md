# Design System - Movie Manager

Este projeto implementa um design system completo baseado no Figma, com componentes React reutilizáveis seguindo as especificações visuais fornecidas.

## 🎨 Componentes Implementados

### 1. **Button**
Botão versátil com múltiplas variantes e tamanhos.

```tsx
<Button variant="primary" size="md" fullWidth={false}>
  Clique aqui
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'ghost'`
- `size`: `'sm' | 'md' | 'lg'`
- `fullWidth`: `boolean`
- `disabled`: `boolean`

### 2. **IconButton**
Botão circular apenas com ícone.

```tsx
<IconButton 
  icon={<Plus size={20} />} 
  variant="primary" 
  size="md" 
/>
```

**Props:**
- `icon`: `React.ReactNode`
- `variant`: `'primary' | 'secondary' | 'ghost'`
- `size`: `'sm' | 'md' | 'lg'`

### 3. **Input**
Campo de entrada com ícone e funcionalidades avançadas.

```tsx
<Input
  icon={<User size={20} />}
  placeholder="Nome completo"
  value={value}
  onChange={onChange}
  error={false}
  errorMessage="Mensagem de erro"
/>
```

**Props:**
- `icon`: `React.ReactNode` (opcional)
- `placeholder`: `string`
- `error`: `boolean`
- `errorMessage`: `string`
- `rightElement`: `React.ReactNode`
- `size`: `'sm' | 'md' | 'lg'`

### 4. **TextArea**
Área de texto com contador de caracteres opcional.

```tsx
<TextArea
  placeholder="Escreva aqui..."
  maxLength={280}
  showCounter={true}
  rows={4}
/>
```

**Props:**
- `placeholder`: `string`
- `maxLength`: `number`
- `showCounter`: `boolean`
- `rows`: `number`

### 5. **Rating**
Sistema de avaliação com estrelas.

```tsx
<Rating 
  rating={4.5} 
  maxRating={5}
  interactive={true}
  onChange={setRating}
  size="md"
/>
```

**Props:**
- `rating`: `number`
- `maxRating`: `number`
- `interactive`: `boolean`
- `showValue`: `boolean`
- `size`: `'sm' | 'md' | 'lg'`

### 6. **Link**
Links com diferentes variantes visuais.

```tsx
<Link variant="primary" underline={true}>
  Link texto
</Link>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'muted'`
- `size`: `'sm' | 'md' | 'lg'`
- `underline`: `boolean`

### 7. **TextBelow**
Textos secundários com diferentes variantes.

```tsx
<TextBelow variant="muted" size="sm" align="center">
  Texto de apoio
</TextBelow>
```

**Props:**
- `variant`: `'muted' | 'secondary' | 'light'`
- `size`: `'xs' | 'sm' | 'md'`
- `align`: `'left' | 'center' | 'right'`

### 8. **MenuTab**
Navegação em abas estilizada.

```tsx
<MenuTab
  tabs={['Tab 1', 'Tab 2', 'Tab 3']}
  activeTab={activeIndex}
  onTabChange={setActiveIndex}
/>
```

### 9. **MovieCard**
Card de filme com múltiplos tamanhos.

```tsx
<MovieCard
  title="Nome do Filme"
  category="Gênero"
  year="2023"
  rating="4.5"
  cover={imageUrl}
  size="md"
  showRating={true}
/>
```

**Props:**
- `size`: `'sm' | 'md' | 'lg'`
- `showRating`: `boolean`

### 10. **Navbar**
Barra de navegação principal do aplicativo.

## 🎨 Sistema de Cores

O design system utiliza uma paleta de cores consistente definida em CSS custom properties:

```css
--color-custom-purple: #892ccd;
--color-custom-purple-hover: #9d3ee0;
--color-custom-purple-active: #7624b8;
--color-custom-purple-tab: #a85fdd;
--color-custom-text-gray: #7a7b9f;
--color-custom-text-gray-hover: #9d9eb9;
--color-custom-text-light: #e5e2e9;
--color-custom-text-brand: #b5b6c9;
--color-custom-text-tagline: #e4e5ec;
--color-custom-bg-menu: #131320;
--color-custom-bg-tab: #1a1b2d;
--color-custom-border-input: #1a1b2d;
```

## 🔤 Tipografia

Utiliza três famílias de fontes distintas:

- **Display**: 'Rammetto One' - Títulos principais
- **Title**: 'Rajdhani' - Subtítulos e headings
- **Body**: 'Nunito Sans' - Texto corrido e interfaces

## 🚀 Como Usar

1. Importe os componentes necessários:
```tsx
import { Button, Input, Rating } from '../components'
```

2. Use os componentes com suas props específicas:
```tsx
function MeuComponente() {
  return (
    <div>
      <Input placeholder="Digite aqui..." />
      <Button variant="primary">Enviar</Button>
      <Rating rating={4.5} />
    </div>
  )
}
```

## 📱 Responsividade

Todos os componentes são construídos com Tailwind CSS e são responsivos por padrão. Os tamanhos se adaptam automaticamente aos diferentes breakpoints.

## 🎯 Demonstração

Para ver todos os componentes em ação, acesse a página de showcase clicando no botão "Ver Design System" no canto superior direito da aplicação.

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Phosphor Icons** - Ícones
- **Vite** - Build tool

---

Este design system fornece uma base sólida e consistente para construir interfaces de usuário modernas e acessíveis, seguindo as melhores práticas de design e desenvolvimento.