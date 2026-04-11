# PetMatch & Care - Frontend

Interface web do PetMatch & Care desenvolvida com React, Vite e Tailwind CSS.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Componentes principais](#componentes-principais)
- [Páginas](#páginas)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Build e deploy](#build-e-deploy)

## Sobre o projeto

O frontend do PetMatch & Care é a interface web para adotantes e ONGs interagirem com o sistema. Permite visualizar pets disponíveis para adoção, registrar ONGs, gerenciar perfis e entrar em contato com organizações.

## Tecnologias

- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool moderno e rápido
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript/JSX** - Linguagem principal
- **ESLint** - Linter para padronização de código

## Estrutura do projeto

```
src/
├── main.jsx                   # Ponto de entrada da aplicação
├── App.jsx                    # Componente raiz
├── App.css                    # Estilos globais
├── index.css                  # Configurações iniciais de estilo
├── assets/
│   └── img/                   # Imagens e ícones do projeto
├── components/                # Componentes reutilizáveis
│   ├── About.jsx              # Seção "Sobre"
│   ├── Contact.jsx            # Seção "Contato"
│   ├── Footer.jsx             # Rodapé
│   ├── Header.jsx             # Cabeçalho/Navegação
│   ├── HeroSection.jsx        # Seção hero da landing page
│   ├── ModalPet.jsx           # Modal de visualização de pet
│   ├── ModalPetRegister.jsx   # Modal para registrar pet
│   ├── PetCard.jsx            # Card individual de pet
│   └── PreviewPetList.jsx     # Lista de preview de pets
└── pages/                     # Páginas da aplicação
    ├── Login.jsx              # Página de login
    ├── OnRegister.jsx        # Página de registro de ONG
    └── PetList.jsx            # Página de listagem de pets

public/                        # Assets estáticos
```

## Como executar

### Pré-requisitos

- **Node.js** versão 20.19.0+ ou 22.12.0+ (requerido pelo Vite 8) ou **Bun** instalados
- **npm** ou **bun** como gerenciador de pacotes
- **Backend** rodando em `http://localhost:3000`

### 1. Instalar dependências

```bash
cd web
npm install
# ou
bun install
```

### 2. Executar em desenvolvimento

```bash
npm run dev
# ou
bun run dev
```

O navegador abrirá automaticamente em `http://localhost:5173`.

### 3. Parar o servidor

Pressione `Ctrl + C` no terminal.

## Componentes principais

### Header
Componente de navegação principal com menu e links para seções da página.

**Props:** Nenhuma  
**Uso:** Importado em `App.jsx` como componente raiz

```jsx
<Header />
```

### HeroSection
Seção inicial com call-to-action e apresentação visual do projeto.

**Props:** Nenhuma  
**Uso:** Componente de landing page

```jsx
<HeroSection />
```

### CardPet
Card exibindo informações resumidas de um pet (foto, nome, localização).

**Props:**
- `img` (string): URL da imagem do pet
- `nome` (string): Nome do pet
- `localizacao` (string): Localização do pet

**Uso:**

```jsx
import CardPet from './components/PetCard';

<CardPet img={petImage} nome="Rex" localizacao="São Paulo, SP" />
```

### ModalPet
Modal para visualizar detalhes completos de um pet e entrar em contato.

**Props:**
- `pet` (object): Dados do pet
- `onClose` (function): Callback para fechar modal

```jsx
<ModalPet pet={selectedPet} onClose={() => setSelectedPet(null)} />
```

### ModalPetRegister
Modal para ONGs cadastrarem novos pets no sistema.

**Props:**
- `onClose` (function): Callback para fechar modal
- `onSuccess` (function): Callback após registro bem-sucedido

```jsx
<ModalPetRegister onClose={() => setIsOpen(false)} onSuccess={refreshPets} />
```

### PreviewPetList
Lista de pets com cards em grid, exibindo destacados da plataforma.

**Props:**
- `pets` (array): Array de pets a exibir
- `onPetClick` (function): Callback ao clicar em um pet

```jsx
<PreviewPetList pets={petsData} onPetClick={handlePetClick} />
```

## Páginas

### Login
Página de autenticação para ONGs e adotantes.

**Rota:** `/login`

**Funcionalidades:**
- Formulário de email/senha
- Integração com backend para autenticação
- Redirecionamento após login bem-sucedido

### OnRegister
Página de registro de novas ONGs no sistema.

**Rota:** `/register`

**Funcionalidades:**
- Formulário com dados da ONG
- Validação de campos
- Integração com API de registro

### PetList
Página principal com listagem de todos os pets disponíveis.

**Rota:** `/pets` ou `/`

**Funcionalidades:**
- Grid de pets
- Filtros por espécie/raça/localidade (roadmap)
- Modal de detalhes ao clicar em pet
- Botão para registrar novo pet (se autenticado)

## Variáveis de ambiente

Atualmente o frontend não usa arquivos `.env` de configuração. As URLs de API estão configuradas no código-fonte.

## Build e deploy

### Build para produção

```bash
npm run build
# ou
bun run build
```

O build será gerado na pasta `dist/`.

### Visualizar build localmente

```bash
npm run preview
# ou
bun run preview
```

### Deploy

O projeto pode ser deployado em plataformas como:
- **Vercel** (recomendado para Vite)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

Veja a documentação de cada plataforma para instruções específicas.