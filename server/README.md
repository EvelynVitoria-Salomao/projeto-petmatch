# PetMatch & Care - Backend API

API backend do PetMatch & Care desenvolvida com Elysia, Bun, Drizzle ORM e Better Auth.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Testes](#testes)
- [Endpoints](#endpoints)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Migrations e banco de dados](#migrations-e-banco-de-dados)
- [Autenticação](#autenticação)

## Sobre o projeto

O backend do PetMatch & Care fornece uma API RESTful completa para gerenciamento de pets e ONGs. Implementa autenticação com Better Auth (sessões e cookies), validação de dados, tratamento seguro de rotas protegidas e integração com PostgreSQL via Drizzle ORM.

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

tests/
├── setup.ts                   # Setup global do bun test
├── unit/                      # Testes unitários (services)
└── integration/               # Testes de integração (rotas Elysia)

bunfig.toml                    # Configuração do test runner (root/preload)
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

Isso iniciará um container PostgreSQL. Em seguida, execute as migrations:

```bash
bun run db:migrate
```

Opcionalmente, popule dados iniciais:

```bash
bun run db:seed
```

### 4. Executar o servidor em desenvolvimento

```bash
bun dev
```

O servidor estará disponível em `http://localhost:3000`.

## Testes

O projeto usa o test runner nativo do Bun com configuração em `bunfig.toml`:

```toml
[test]
root = "./tests"
preload = ["./tests/setup.ts"]
```

Scripts disponíveis:

```bash
# Suíte completa
bun test

# Somente unitários
bun run test:unit

# Somente integração
bun run test:integration

# Watch mode
bun run test:watch

# Cobertura
bun run test:coverage
```

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
| POST | `/api/ongs` | Cria uma nova ONG | ✅ ONG |
| PUT | `/api/ongs/{id}` | Atualiza uma ONG | ✅ ONG |

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/sign-up` | Registrar nova ONG |
| POST | `/api/auth/sign-in` | Fazer login |
| POST | `/api/auth/sign-out` | Fazer logout |
| GET | `/api/auth/get-session` | Sessão do usuário autenticado |

## Variáveis de ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
# Database
DATABASE_URL=postgresql://postgres:123456@localhost:5432/db_petmatch

# Better Auth
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
```

Veja `.env.example` para mais detalhes.

## Migrations e banco de dados

### Executar migrations

Para executar migrations manualmente:

```bash
bun run db:migrate
```

### Criar nova migration

```bash
bun run db:generate
```

Após isso, revise o arquivo gerado em `src/database/migrations/` e execute:

```bash
bun run db:migrate
```

### Outros comandos úteis de banco

```bash
# Sincronizar schema (sem migration)
bun run db:push

# Abrir Drizzle Studio
bun run db:studio
```

## Autenticação

O projeto utiliza **Better Auth** para gerenciar autenticação via sessões e cookies. 

- Sessões são gerenciadas automaticamente via cookies seguros
- Rotas protegidas verificam a sessão do usuário autenticado
- Integrações com OAuth estão configuradas em `src/lib/auth.ts`
- Para adicionar OAuth providers, configure em `src/lib/auth.ts` conforme documentação do Better Auth

Veja `src/lib/auth.ts` e `src/routes/route-security.ts` para detalhes de implementação.
