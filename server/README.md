# PetMatch & Care - Backend API

API backend do PetMatch & Care desenvolvida com Elysia, Bun, Drizzle ORM e Better Auth.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Endpoints](#endpoints)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Migrations e banco de dados](#migrations-e-banco-de-dados)
- [Autenticação](#autenticação)

## Sobre o projeto

O backend do PetMatch & Care fornece uma API RESTful completa para gerenciamento de pets e ONGs. Implementa autenticação JWT, validação de dados, tratamento seguro de rotas protegidas e integração com PostgreSQL via Drizzle ORM.

## Tecnologias

- **Bun** - Runtime JavaScript rápido e moderno
- **Elysia** - Framework web tipo-seguro para Bun
- **Drizzle ORM** - ORM type-safe para TypeScript
- **PostgreSQL** - Banco de dados relacional (via Docker)
- **Better Auth** - Solução de autenticação completa
- **TypeScript** - Linguagem principal

## Estrutura do projeto

```
src/
├── index.ts                    # Ponto de entrada da aplicação
├── database/
│   ├── connection.ts          # Configuração de conexão com DB
│   ├── schema.ts              # Definição das tabelas
│   ├── seed.ts                # Script de seed inicial
│   └── migrations/            # Histórico de migrações
├── lib/
│   ├── auth.ts                # Configuração de autenticação
│   └── auth-openapi.ts        # Integração com OpenAPI
├── repositories/              # Camada de acesso a dados
│   ├── ong-repository.ts
│   └── pet-repository.ts
├── services/                  # Regras de negócio
│   ├── ong-service.ts
│   └── pet-service.ts
├── routes/                    # Definição de endpoints
│   ├── ong-route.ts
│   ├── pet-route.ts
│   └── route-security.ts      # Middleware de segurança
└── types/                     # Tipos TypeScript
    ├── custom-errors.ts
    ├── ong-types.ts
    └── pet-types.ts

tests/                         # Testes automatizados
```

## Como executar

### Pré-requisitos

- **Bun** instalado ([bun.sh](https://bun.sh))
- **Docker** e **Docker Compose** instalados

### 1. Instalar dependências

```bash
cd server
bun install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `server`:

```bash
cp .env.example .env
```

Configure as variáveis conforme necessário (veja [Variáveis de ambiente](#variáveis-de-ambiente)).

### 3. Subir o banco de dados

```bash
docker compose up -d
```

Isso iniciará um container PostgreSQL com as migrations aplicadas automaticamente.

### 4. Executar o servidor em desenvolvimento

```bash
bun dev
```

O servidor estará disponível em `http://localhost:3000`.

### 5. Parar os serviços

Para parar o servidor:
```bash
# Pressione Ctrl + C no terminal
```

Para derrubar o banco de dados:
```bash
docker compose down -v
```

## Endpoints

### Pets

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/pets` | Lista todos os pets (com filtros) | ❌ |
| GET | `/api/pets/{id}` | Detalha um pet específico | ❌ |
| POST | `/api/pets` | Cria um novo pet | ✅ ONG |
| PUT | `/api/pets/{id}` | Atualiza um pet | ✅ ONG |
| DELETE | `/api/pets/{id}` | Remove um pet | ✅ ONG |

### ONGs

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/ongs` | Lista todas as ONGs | ❌ |
| GET | `/api/ongs/{id}` | Detalha uma ONG específica | ❌ |
| POST | `/api/ongs` | Cria uma nova ONG | ❌ |
| PUT | `/api/ongs/{id}` | Atualiza uma ONG | ✅ ONG |

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/sign-up` | Registrar nova ONG |
| POST | `/api/auth/sign-in` | Fazer login |
| POST | `/api/auth/sign-out` | Fazer logout |
| GET | `/api/auth/me` | Dados do usuário autenticado |

## Variáveis de ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
# Database
DATABASE_URL=postgresql://petmatch:password@localhost:5432/petmatch

# Better Auth
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# JWT (se aplicável)
JWT_SECRET=your_jwt_secret_here

# CORS
CORS_ORIGIN=http://localhost:5173

# Node Environment
NODE_ENV=development
```

Veja `.env.example` para mais detalhes.

## Migrations e banco de dados

### Executar migrations

As migrations são executadas automaticamente ao iniciar o container Docker. Para executar manualmente:

```bash
bun run migrate
```

### Criar nova migration

```bash
bun run drizzle-kit generate
```

Após isso, revise o arquivo gerado em `src/database/migrations/` e execute:

```bash
bun run migrate
```

## Autenticação

O projeto utiliza **Better Auth** para gerenciar autenticação, sessões e tokens JWT. 

- Rotas protegidas verificam tokens JWT automaticamente
- Sessões são gerenciadas via cookies seguros
- Integrações com OAuth estão configuradas em `src/lib/auth.ts`

Veja `src/lib/auth.ts` e `src/routes/route-security.ts` para detalhes de implementação.