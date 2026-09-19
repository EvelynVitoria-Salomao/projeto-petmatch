# PetMatch & Care

Sistema para adoção e cuidado animal, com API em Elysia/Bun e interface web em React/Vite.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Tecnologias](#tecnologias)
- [Como executar o projeto](#como-executar-o-projeto)
- [Endpoints principais](#endpoints-principais)
- [Roadmap](#roadmap)
- [Padrão de commits](#padrão-de-commits)
- [Contribuição](#contribuição)
- [Autores](#autores)
- [Contribuidores](#contribuidores)

## Suporte

- Reportar bug: https://github.com/EvelynVitoria-Salomao/projeto-petmatch/issues/new
- Solicitar feature: https://github.com/EvelynVitoria-Salomao/projeto-petmatch/issues/new

## Sobre o projeto

O PetMatch & Care conecta ONGs e adotantes, permitindo cadastro e consulta de pets para adoção.

> **Status:** este projeto foi iniciado em equipe (veja [Autores](#autores)) e, após o grupo se dispersar, está sendo finalizado e mantido por [Evelyn Vitoria Salomão](https://github.com/EvelynVitoria-Salomao) como projeto de portfólio. O histórico de commits do time original foi mantido integralmente.

## Estrutura do repositório

- `server`: API backend (Elysia + Bun + Drizzle + Better Auth)
- `web`: aplicação frontend (React + Vite + Tailwind)

### Estrutura backend

- `src/database`: conexão, schema, seed e migrations
- `src/repositories`: acesso a dados (CRUD)
- `src/services`: regras de negócio
- `src/routes`: definição dos endpoints e segurança

### Estrutura frontend

- `src/components`: componentes reutilizáveis de interface
- `src/pages`: páginas da aplicação
- `src/assets`: arquivos estáticos (imagens e outros recursos)
- `public`: arquivos públicos servidos pelo Vite
- `src/main.jsx`: ponto de entrada da aplicação
- `src/App.jsx`: componente raiz

## Tecnologias

### Backend

- Bun
- Elysia
- Drizzle ORM
- Better Auth
- PostgreSQL (via Docker)

### Frontend

- React
- Vite
- Tailwind CSS

## Como executar o projeto

### Pré-requisitos

- Bun instalado
- Node.js instalado
- Uma instância PostgreSQL — local via Docker, **ou** um banco gratuito hospedado (ex: [Supabase](https://supabase.com), que também oferece armazenamento de imagens)
- Docker e Docker Compose (só necessário se for usar a Opção A abaixo)

### 1. Clonar o repositório

```bash
git clone https://github.com/EvelynVitoria-Salomao/projeto-petmatch.git
cd projeto-petmatch
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

As credenciais de exemplo no `.env.example` pertencem ao time original e não são válidas — cada pessoa rodando o projeto localmente precisa gerar as suas próprias:

- **Google OAuth** (`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`): crie um app OAuth no [Google Cloud Console](https://console.cloud.google.com/).
- **Resend** (`RESEND_API_KEY`): crie uma conta gratuita em [resend.com](https://resend.com).
- **Supabase** (`SUPABASE_URL`/`SUPABASE_KEY`/`SUPABASE_BUCKET`): crie um projeto gratuito em [supabase.com](https://supabase.com) e um bucket público (ex: `images`) em Storage.

Se algum desses serviços não for usado agora (ex: só quer testar a listagem de pets), pode deixar um valor qualquer não vazio nessas variáveis — o servidor exige que existam, mas só falha de verdade se a funcionalidade correspondente for usada (login Google, envio de e-mail, upload de imagem).

### Opção A — com Docker (todos os serviços num único ambiente)

No fluxo com **todos os serviços no Compose**, mantenha em `DATABASE_URL` o host **`database`** (nome do serviço no `docker-compose.yml`); `localhost` só funciona quando o backend roda na sua máquina e não dentro do container.

```bash
docker compose up -d
docker compose exec server bun db:migrate
docker compose exec server bun db:seed
```

Backend disponível em `http://localhost:3000`.
Frontend disponível em `http://localhost:5173`.

Para parar os serviços:

```bash
docker compose down
```

### Opção B — sem Docker (Bun local + banco hospedado)

Útil se você não tem Docker/virtualização habilitada na máquina. Use um `DATABASE_URL` de um banco hospedado (ex: Supabase). **Atenção:** conexões diretas do Supabase (porta 5432, host `db.<ref>.supabase.co`) usam IPv6 por padrão e podem falhar em redes só-IPv4; use a connection string do **Session pooler** (Project Settings → Database → Connect) nesse caso.

O Bun e o Vite só carregam o `.env` da própria pasta onde o comando é rodado — copie o arquivo `.env` também para dentro de `server/` e de `web/`:

```bash
cp .env server/.env
cp .env web/.env
```

Depois, em dois terminais separados:

```bash
# terminal 1 — backend
cd server
bun install
bun db:migrate
bun db:seed
bun dev
```

```bash
# terminal 2 — frontend
cd web
npm install
npm run dev
```

Acesse sempre por `http://localhost:5173` (não pelo endereço de rede tipo `192.168.x.x` que o Vite também exibe — o backend só aceita requisições vindas de `localhost`).

## Endpoints principais

### Pets

- `GET /api/pets`: lista pets (com filtros)
- `GET /api/pets/{id}`: detalha um pet
- `POST /api/pets`: cria pet (rota protegida)
- `PUT /api/pets/{id}`: atualiza pet (rota protegida)
- `DELETE /api/pets/{id}`: remove pet (rota protegida)

### ONGs

- `GET /api/ongs`: lista ONGs
- `GET /api/ongs/{id}`: detalha uma ONG
- `POST /api/ongs`: cria ONG (rota protegida)
- `PUT /api/ongs/{id}`: atualiza ONG (rota protegida)

## Roadmap

- [ ] Cadastro e autenticação completos no frontend
- [x] Tela de detalhes de pet com contato rápido da ONG
- [x] Filtros avançados por cidade/porte/espécie
- [ ] Dashboard administrativo para ONGs
- [ ] Testes automatizados para fluxos principais (frontend)

## Padrão de commits

Este projeto adota commits semânticos inspirados no padrão Conventional Commits e nas referências:

- https://github.com/iuricode/padroes-de-commits
- https://www.conventionalcommits.org/pt-br

Formato recomendado:

```text
tipo: descrição curta
```

Exemplo:

```text
feat: adicionar filtro por cidade na listagem de pets
```

Tipos mais usados:

- `feat`: nova funcionalidade
- `fix`: correção de bug
- `docs`: mudanças na documentação
- `style`: formatação/estilo de código (sem mudança de regra de negócio)
- `refactor`: refatoração sem alterar comportamento esperado
- `perf`: melhoria de performance
- `test`: criação/ajuste de testes
- `build`: mudanças de build e dependências
- `chore`: tarefas de manutenção/configuração
- `ci`: alterações de integração contínua
- `cleanup`: limpeza de código
- `remove`: remoção de arquivos/funcionalidades
- `raw`: ajustes em dados/configurações

Opcionalmente, você pode usar emoji no início da mensagem para facilitar leitura visual do histórico.

## Contribuição

Contribuições são bem-vindas.

1. Faça um fork do projeto
2. Crie uma branch para sua feature ou correção
3. Realize suas alterações e valide localmente
4. Siga o padrão de commits
5. Envie seu branch para o seu fork
6. Abra um Pull Request com contexto claro do que foi alterado

Fluxo sugerido:

```bash
git checkout -b feature/nome-da-feature
git add .
git commit -m "feat: descrição curta"
git push origin feature/nome-da-feature
```

## Autores

- **João Vitor (joaovjo)** - _Developer & Contributor of PetMatch_ - [GitHub](https://github.com/joaovjo)
- **Hilan (Hilan-CP)** - _Developer & Contributor of PetMatch_ - [GitHub](https://github.com/Hilan-CP)
- **Prika Souza (prikasouzadev)** - _Developer & Contributor of PetMatch_ - [GitHub](https://github.com/prikasouzadev)
- **Athos (Athos13)** - _Developer & Contributor of PetMatch_ - [GitHub](https://github.com/Athos13)
- **Evelyn Vitoria Salomao (EvelynVitoria-Salomao)** - _Developer & Contributor of PetMatch_ - [GitHub](https://github.com/EvelynVitoria-Salomao)
- **Wescley Henrique (WescleyHenrique)** - _Developer & Contributor of PetMatch_ - [GitHub](https://github.com/WescleyHenrique)
- **Gustavo Lima (Gustavo08Lima)** - _Developer & Contributor of PetMatch_ - [GitHub](https://github.com/Gustavo08Lima)
- **Victor Geruso Gomes (vgeruso)** - _Developer & Contributor of PetMatch_ - [GitHub](https://github.com/vgeruso)

<p align="center">Made with 🐾</p>

## Contribuidores ✨

Nosso obrigado vai para essas pessoas incríveis:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
	<tr>
		<td align="center"><a href="https://github.com/joaovjo"><img src="https://github.com/joaovjo.png?size=100" width="100px;" alt="joaovjo"/><br /><sub><b>joaovjo</b></sub></a><br /><a href="https://github.com/EvelynVitoria-Salomao/projeto-petmatch/commits?author=joaovjo" title="Code">💻</a></td>
		<td align="center"><a href="https://github.com/Hilan-CP"><img src="https://github.com/Hilan-CP.png?size=100" width="100px;" alt="Hilan-CP"/><br /><sub><b>Hilan-CP</b></sub></a><br /><a href="https://github.com/EvelynVitoria-Salomao/projeto-petmatch/commits?author=Hilan-CP" title="Code">💻</a></td>
		<td align="center"><a href="https://github.com/prikasouzadev"><img src="https://github.com/prikasouzadev.png?size=100" width="100px;" alt="prikasouzadev"/><br /><sub><b>prikasouzadev</b></sub></a><br /><a href="https://github.com/EvelynVitoria-Salomao/projeto-petmatch/commits?author=prikasouzadev" title="Code">💻</a></td>
		<td align="center"><a href="https://github.com/Athos13"><img src="https://github.com/Athos13.png?size=100" width="100px;" alt="Athos13"/><br /><sub><b>Athos13</b></sub></a><br /><a href="https://github.com/EvelynVitoria-Salomao/projeto-petmatch/commits?author=Athos13" title="Code">💻</a></td>
	</tr>
	<tr>
		<td align="center"><a href="https://github.com/EvelynVitoria-Salomao"><img src="https://github.com/EvelynVitoria-Salomao.png?size=100" width="100px;" alt="EvelynVitoria-Salomao"/><br /><sub><b>EvelynVitoria-Salomao</b></sub></a><br /><a href="https://github.com/EvelynVitoria-Salomao/projeto-petmatch/commits?author=EvelynVitoria-Salomao" title="Code">💻</a></td>
		<td align="center"><a href="https://github.com/WescleyHenrique"><img src="https://github.com/WescleyHenrique.png?size=100" width="100px;" alt="WescleyHenrique"/><br /><sub><b>WescleyHenrique</b></sub></a><br /><a href="https://github.com/EvelynVitoria-Salomao/projeto-petmatch/commits?author=WescleyHenrique" title="Code">💻</a></td>
		<td align="center"><a href="https://github.com/Gustavo08Lima"><img src="https://github.com/Gustavo08Lima.png?size=100" width="100px;" alt="Gustavo08Lima"/><br /><sub><b>Gustavo08Lima</b></sub></a><br /><a href="https://github.com/EvelynVitoria-Salomao/projeto-petmatch/commits?author=Gustavo08Lima" title="Code">💻</a></td>
		<td align="center"><a href="https://github.com/vgeruso"><img src="https://github.com/vgeruso.png?size=100" width="100px;" alt="vgeruso"/><br /><sub><b>vgeruso</b></sub></a><br /><a href="https://github.com/EvelynVitoria-Salomao/projeto-petmatch/commits?author=vgeruso" title="Code">💻</a></td>
	</tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Este projeto segue a especificação all-contributors.