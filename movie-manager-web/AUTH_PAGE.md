# Página de Autenticação (Sign-In)

A página de autenticação foi completamente reformulada utilizando o design system implementado.

## 🔐 Funcionalidades

### **Login**
- ✅ Validação de e-mail em tempo real
- ✅ Validação de senha (mínimo 6 caracteres)
- ✅ Toggle para mostrar/ocultar senha
- ✅ Estado de carregamento durante o processo
- ✅ Mensagens de erro contextuais
- ✅ Link para "Esqueci minha senha"

### **Cadastro**
- ✅ Validação de nome (mínimo 2 caracteres)
- ✅ Validação de e-mail
- ✅ Validação de senha com requisitos visuais
- ✅ Toggle para mostrar/ocultar senha
- ✅ Estado de carregamento durante o processo
- ✅ Mensagens de erro contextuais

### **Interface**
- ✅ Navegação por abas (Login/Cadastro)
- ✅ Design responsivo
- ✅ Validação visual com cores de erro
- ✅ Links para termos de uso e política de privacidade
- ✅ Feedback visual para estados de loading

## 🎨 Componentes Utilizados

A página utiliza exclusivamente os componentes do design system:

```tsx
// Componentes principais
import { 
  MenuTab,      // Navegação entre login/cadastro
  Input,        // Campos de entrada com validação
  Button,       // Botões com estados de loading
  Link,         // Links para termos e esqueci senha
  TextBelow,    // Textos de apoio e erros
  IconButton    // Botão para mostrar/ocultar senha
} from '../components'
```

## 🔄 Fluxo de Navegação

1. **Página inicial**: Mostra a tela de autenticação
2. **Login bem-sucedido**: Redireciona para a Home
3. **Cadastro bem-sucedido**: Faz login automático e vai para a Home
4. **Logout**: Retorna para a tela de autenticação

## ⚡ Validações Implementadas

### **E-mail**
- Formato válido de e-mail
- Campo obrigatório

### **Senha**
- Mínimo 6 caracteres
- Campo obrigatório

### **Nome (apenas cadastro)**
- Mínimo 2 caracteres
- Campo obrigatório

### **UX Melhorias**
- Erros são limpos ao digitar
- Formulários são resetados ao trocar de aba
- Estados de loading desabilitam interações
- Feedback visual imediato

## 🎯 Estados Visuais

- **Normal**: Campos com borda padrão
- **Erro**: Campos com borda vermelha + mensagem
- **Loading**: Botões desabilitados com texto "Entrando..." / "Criando..."
- **Focus**: Campos com borda roxa (--color-custom-purple)

## 📱 Responsividade

A página é totalmente responsiva com breakpoints:
- **Desktop**: Layout lado a lado (imagem + formulário)
- **Tablet**: Imagem reduzida + formulário centralizado
- **Mobile**: Imagem no topo + formulário embaixo

## 🔧 Customização

Para personalizar a página:

1. **Cores**: Edite as variáveis CSS em `src/index.css`
2. **Validações**: Modifique `validateForm()` e `validateEmail()`
3. **Fluxo**: Ajuste as funções `handleLogin()` e `handleRegister()`
4. **Layout**: Modifique as classes Tailwind CSS

---

A página está pronta para integração com APIs reais e oferece uma experiência de usuário moderna e acessível! 🚀