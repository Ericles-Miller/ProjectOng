# 🚀 ProjectOng API

API para gerenciamento de ONGs e voluntários, permitindo a criação de projetos, campanhas de doação e sistema de avaliações.

## 🛠️ Tecnologias Utilizadas

- **Framework:** NestJS 11
- **Banco de Dados:** PostgreSQL
- **ORM:** TypeORM
- **Autenticação:** JWT (JSON Web Tokens)
- **Validação:** class-validator + class-transformer
- **Documentação:** Swagger/OpenAPI
- **Containerização:** Docker
- **Linguagem:** TypeScript

## 📋 Pré-requisitos

- Node.js 18+ 
- Yarn ou npm
- Docker
- PostgreSQL (via Docker ou local)

## 🚀 Configuração e Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd ProjectOng
```

### 2. Instale as dependências
```bash
yarn install
```

### 3. Configure o banco de dados

#### Opção A: Docker (Recomendado)
```bash
docker run --name postgres-ong \
  -e POSTGRES_DB=voluntariar \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15
```

#### Opção B: PostgreSQL local
Configure um banco PostgreSQL local com as credenciais especificadas no `.env`

### 4. Configure as variáveis de ambiente
```bash
cp env.example .env
# Edite o arquivo .env com suas configurações
```

### 5. Execute a aplicação
```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn build
yarn start:prod
```

## 🌐 Endpoints da API

### 🔐 Autenticação

#### `POST /api/auth/register`
- **Descrição:** Cadastro de usuário voluntário
- **Autenticação:** Não requerida
- **Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "city": "São Paulo",
  "state": "SP",
  "skills": ["Gestão", "Comunicação"],
  "preferredCauses": ["Educação", "Meio Ambiente"]
}
```

#### `POST /api/auth/login`
- **Descrição:** Login de usuário voluntário
- **Autenticação:** Não requerida
- **Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

#### `POST /api/auth/logout`
- **Descrição:** Logout do usuário
- **Autenticação:** JWT Bearer Token
- **Headers:** `Authorization: Bearer <token>`

### 👥 Usuários

#### `GET /api/users/profile`
- **Descrição:** Obter perfil do usuário autenticado
- **Autenticação:** JWT Bearer Token
- **Headers:** `Authorization: Bearer <token>`

#### `PUT /api/users/profile`
- **Descrição:** Atualizar perfil do usuário
- **Autenticação:** JWT Bearer Token
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Dados do perfil (parciais)

### 🏢 ONGs

#### `POST /api/ngos`
- **Descrição:** Cadastro de nova ONG
- **Autenticação:** Não requerida
- **Body:**
```json
{
  "organizationName": "ONG Exemplo",
  "cnpj": "12.345.678/0001-90",
  "description": "Organização sem fins lucrativos",
  "email": "contato@ongexemplo.org",
  "password": "senha123",
  "city": "São Paulo",
  "state": "SP",
  "causes": ["Educação", "Saúde"],
  "areas": ["Assistência Social"],
  "skills": ["Gestão de Projetos"],
  "preferredCauses": ["Educação Infantil"]
}
```

#### `POST /api/ngos/login`
- **Descrição:** Login de ONG
- **Autenticação:** Não requerida
- **Body:**
```json
{
  "email": "contato@ongexemplo.org",
  "password": "senha123"
}
```

#### `GET /api/ngos`
- **Descrição:** Listar todas as ONGs
- **Autenticação:** Não requerida
- **Query Params:**
  - `city` (opcional): Filtrar por cidade
  - `state` (opcional): Filtrar por estado
  - `causes` (opcional): Filtrar por causas (separadas por vírgula)

#### `GET /api/ngos/:id`
- **Descrição:** Obter ONG específica
- **Autenticação:** Não requerida

### 📋 Projetos

#### `POST /api/projects`
- **Descrição:** Criar novo projeto (APENAS ONGs)
- **Autenticação:** JWT Bearer Token (ONG)
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "title": "Projeto de Reflorestamento",
  "description": "Ajudar a plantar árvores",
  "location": "São Paulo, SP",
  "cause": "Meio Ambiente",
  "startDate": "2024-02-01",
  "endDate": "2024-02-28",
  "maxVolunteers": 10
}
```

#### `GET /api/projects`
- **Descrição:** Listar todos os projetos
- **Autenticação:** Não requerida
- **Query Params:**
  - `cause` (opcional): Filtrar por causa
  - `location` (opcional): Filtrar por localização
  - `status` (opcional): Filtrar por status

#### `GET /api/projects/:id`
- **Descrição:** Obter projeto específico
- **Autenticação:** Não requerida

#### `POST /api/projects/:id/join`
- **Descrição:** Inscrever-se em projeto (APENAS voluntários)
- **Autenticação:** JWT Bearer Token (voluntário)
- **Headers:** `Authorization: Bearer <token>`
- **Query Params:**
  - `status` (opcional): Status da inscrição
  - `notes` (opcional): Observações

### 🎯 Campanhas

#### `GET /api/campaigns`
- **Descrição:** Listar todas as campanhas
- **Autenticação:** Não requerida

#### `GET /api/campaigns/:id`
- **Descrição:** Obter campanha específica
- **Autenticação:** Não requerida

#### `POST /api/campaigns/:id/donate`
- **Descrição:** Fazer doação para campanha
- **Autenticação:** Não requerida
- **Body:**
```json
{
  "amount": 100.50,
  "donorName": "João Silva",
  "donorEmail": "joao@email.com",
  "message": "Parabéns pelo trabalho!",
  "anonymous": false
}
```

### ⭐ Avaliações

#### `POST /api/ratings`
- **Descrição:** Criar avaliação
- **Autenticação:** Não requerida
- **Body:**
```json
{
  "userId": "uuid-do-usuario",
  "score": 5,
  "comment": "Excelente trabalho!",
  "projectId": "uuid-do-projeto"
}
```

#### `GET /api/ratings/user/:id`
- **Descrição:** Obter avaliações de um usuário
- **Autenticação:** Não requerida

#### `GET /api/ratings/ong/:id`
- **Descrição:** Obter avaliações de uma ONG
- **Autenticação:** Não requerida

## 🔐 Sistema de Autenticação

### Tipos de Usuário
- **`volunteer`:** Usuários que podem se inscrever em projetos
- **`ngo`:** ONGs que podem criar projetos

### Tokens JWT
- **Expiração:** 365 dias (não expira)
- **Invalidação:** Apenas via logout
- **Formato:** `Authorization: Bearer <token>`

### Guards de Autenticação
- **`JwtAuthGuard`:** Para rotas que requerem qualquer usuário autenticado
- **`NgoAuthGuard`:** Para rotas que requerem apenas ONGs autenticadas

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais
- **`users`:** Voluntários
- **`ngos`:** Organizações não governamentais
- **`projects`:** Projetos de voluntariado
- **`campaigns`:** Campanhas de doação
- **`donations`:** Doações para campanhas
- **`enrollments`:** Inscrições em projetos
- **`ratings`:** Avaliações de usuários/ONGs

### Relacionamentos
- Usuários podem se inscrever em múltiplos projetos
- ONGs podem criar múltiplos projetos
- Projetos pertencem a uma ONG
- Campanhas pertencem a uma ONG

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
yarn start:dev

# Build
yarn build

# Produção
yarn start:prod

# Lint
yarn lint


## 📚 Documentação da API

Após iniciar a aplicação, acesse:
- **Swagger UI:** `http://localhost:3000/api`
- **API Base URL:** `http://localhost:3000/api`

## 🔧 Variáveis de Ambiente

Veja o arquivo `env.example` para todas as variáveis necessárias.



