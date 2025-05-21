# Company Registration REST API

## English (en-US)

A RESTful API built with Node.js, TypeScript, Express, SQLite, and Docker for registering and listing sales companies.

### Features

- Register companies with name, CNPJ, email, and phone
- List all registered companies
- Data persistence with SQLite
- Containerized with Docker and Docker Compose

### Technical Stack

- Node.js with TypeScript
- Express.js for HTTP routes
- SQLite for data storage
- Docker and Docker Compose for containerization
- MVC architecture

### Getting Started

1. Clone the repository
2. Run with Docker Compose:
   ```
   docker-compose up -d
   ```
3. The API will be available at http://localhost:3000

### API Endpoints

- **POST /companies** - Register a new company
  ```
  curl -X POST http://localhost:3000/companies \
    -H "Content-Type: application/json" \
    -d '{"name":"XYZ Store", "cnpj":"12345678000100", "email":"contact@xyz.com", "phone":"(11) 90000-0000"}'
  ```

- **GET /companies** - List all companies
  ```
  curl http://localhost:3000/companies
  ```

---

## Português (pt-BR)

Uma API RESTful construída com Node.js, TypeScript, Express, SQLite e Docker para cadastro e listagem de empresas de vendas.

### Funcionalidades

- Cadastrar empresas com nome, CNPJ, email e telefone
- Listar todas as empresas cadastradas
- Persistência de dados com SQLite
- Containerizado com Docker e Docker Compose

### Stack Técnica

- Node.js com TypeScript
- Express.js para rotas HTTP
- SQLite para armazenamento de dados
- Docker e Docker Compose para containerização
- Arquitetura MVC

### Como Iniciar

1. Clone o repositório
2. Execute com Docker Compose:
   ```
   docker-compose up -d
   ```
3. A API estará disponível em http://localhost:3000

### Endpoints da API

- **POST /companies** - Cadastrar uma nova empresa
  ```
  curl -X POST http://localhost:3000/companies \
    -H "Content-Type: application/json" \
    -d '{"name":"Loja XYZ", "cnpj":"12345678000100", "email":"contato@xyz.com", "phone":"(11) 90000-0000"}'
  ```

- **GET /companies** - Listar todas as empresas
  ```
  curl http://localhost:3000/companies
  ```