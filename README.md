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
- Docker e Docker Compose instalados

### 1. Clonar o repositório

```bash
git clone https://github.com/EvelynVitoria-Salomao/projeto-petmatch.git
cd projeto-petmatch
```

### 2. Subir o backend

```bash
cd server
bun install
docker compose up -d
bun db:migrate
bun db:seed
bun dev
```

Backend disponível em `http://localhost:3000`.

### 3. Subir o frontend

Em outro terminal:

```bash
cd web
npm install
npm run dev
```

Frontend disponível em `http://localhost:5173`.

### 4. Parar os serviços

Para parar o backend, use `Ctrl + C` no terminal onde ele está rodando.
Para derrubar o banco:

```bash
cd server
docker compose down -v
```

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
- [ ] Tela de detalhes de pet com contato rápido da ONG
- [ ] Filtros avançados por cidade/porte/espécie
- [ ] Dashboard administrativo para ONGs
- [ ] Testes automatizados para fluxos principais

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
	</tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Este projeto segue a especificação all-contributors.