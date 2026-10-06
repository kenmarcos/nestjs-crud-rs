<!-- CABEÇALHO -->
<div id="readme-top" align="center">
    <h1>
      NestJS CRUD API 
    </h1>
    <p>
        <a href="#%EF%B8%8F-sobre-o-projeto">Sobre o Projeto</a> •
        <a
         href="#%EF%B8%8F-funcionalidades">Funcionalidades</a> •
        <a href="#-endpoints-da-api">Endpoints</a> •
        <a
         href="#%EF%B8%8F-tecnologias">Tecnologias</a> •
        <a href="#-como-executar">Como executar</a> •
        <a href="#-autor">Autor</a>
    </p>
</div>

<!-- SOBRE O PROJETO -->

## 🖥️ Sobre o Projeto

Aplicação back-end desenvolvida com NestJS para gerenciamento básico de usuários. Expõe um CRUD de usuários protegido por autenticação JWT, em que cada usuário só pode alterar ou excluir a própria conta. A API é documentada com Swagger.

## 🕹️ Funcionalidades

- Cadastro de usuários
- Autenticação com e-mail e senha (JWT)
- Listagem e consulta de usuários para usuários autenticados
- Atualização e remoção de usuário restritas ao dono da conta
- Validação das requisições e remoção de propriedades não permitidas nos DTOs
- Tratamento de erros de domínio com filtro global de exceções
- Validação das variáveis de ambiente na inicialização
- Documentação interativa da API (Swagger UI)

## 💡 Endpoints da API

Todas as rotas possuem o prefixo `/api`.

| Método | Rota       | Objetivo              | Requisitos               |
| ------ | ---------- | --------------------- | ------------------------ |
| POST   | /login     | Autenticar usuário    | —                        |
| POST   | /users     | Criar usuário         | —                        |
| GET    | /users     | Listar usuários       | JWT                      |
| GET    | /users/:id | Buscar usuário por ID | JWT                      |
| PATCH  | /users/:id | Atualizar usuário     | JWT, ser o dono da conta |
| DELETE | /users/:id | Remover usuário       | JWT, ser o dono da conta |

A documentação Swagger fica disponível em `http://localhost:<PORT>/api/docs`.

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Passport (JWT)
- bcrypt
- class-validator / class-transformer
- Swagger

## 🚀 Como executar

### Pré-requisitos

- Node.js
- pnpm
- Banco de dados PostgreSQL em execução

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/BANCO"
SECRET_KEY="sua-chave-secreta-jwt"
```

### Instalação

```bash
# instalar as dependências
pnpm install

# gerar o client do Prisma
pnpm prisma generate

# executar as migrations
pnpm prisma migrate dev
```

### Execução

```bash
# desenvolvimento
pnpm run start

# modo watch
pnpm run start:dev

# produção
pnpm run build
pnpm run start:prod
```

## 👨‍💻 Autor

<img style="border-radius: 15%;" src="https://gitlab.com/uploads/-/system/user/avatar/8603970/avatar.png?width=400" width=70 alt="author-profile-picture"/>

Marcos Kenji Kuribayashi

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/marcos-kuribayashi/) [![Gmail Badge](https://img.shields.io/badge/-marcosken13@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white)](mailto:marcosken13@gmail.com)

---

_Desenvolvido por Marcos Kenji Kuribayashi. 😉_
