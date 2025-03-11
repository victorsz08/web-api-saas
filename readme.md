# **API Restfull Node.js, Typescript, Express e Postgrees** 🚀

API Rest desenvolvida com **Node.js**, **TypeScript** e **Express**, destinada a auxiliar equipes de vendas no acompanhamento e gestão de contratos, desde a criação até a conclusão da instalação dos serviços.


##### Desenvolvido por **Victor Siqueira** 💡 | [Meu Linkedin](https://www.linkedin.com/in/victorsiqueiradeveloper) 📥


## Requisitos de instalação 📄
- [Node.js](https://nodejs.org/pt) (>=20.17)
- [Typescript](https://www.typescriptlang.org/download/) (>=5.7) 

## Índice
- [**API Restfull Node.js, Typescript, Express e Postgrees** 🚀](#api-restfull-nodejs-typescript-express-e-postgrees-)
        - [Desenvolvido por **Victor Siqueira** 💡 | Meu Linkedin 📥](#desenvolvido-por-victor-siqueira---meu-linkedin-)
  - [Requisitos de instalação 📄](#requisitos-de-instalação-)
  - [Índice](#índice)
  - [Clonar Projeto 📑](#clonar-projeto-)
  - [Instalação](#instalação)
  - [Execução ✅](#execução-)
  - [Autenticação 🔐](#autenticação-)
- [Middlewares](#middlewares)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rotas da API](#rotas-da-api)
  - [License MIT](#license-mit)

## Clonar Projeto 📑
```sh
# Clone repository
git clone https://github.com/victorsz08/web-api-saas
```

## Instalação
```sh
# Instalar todas as dependências do projeto
npm install 
```

## Execução ✅

```sh
# Comando para rodar o projeto em ambiente de desenvolvimento.
npm run dev

# Comando para buildar a aplicação de typescript para javascript.
npm run build

# Após fazer o build, para inciar o projeto compilado e rodar em ambiente de pridução.
npm run start
```

## Autenticação 🔐
>*Autenticação utilizando do Token JWT.*


```
    Authorization:
    Bearer <token>
```
# Middlewares

- Middleware de Autenticação
>O middleware auth verifica a presença e a validade do token JWT nas requisições, garantindo que apenas usuários autenticados acessem as rotas protegidas.

- Middleware de Controle de Acesso
  >

# Estrutura de pastas

```
├─ prisma/
│  ├─ config/
│  │  └─ config.ts
├─ src/
│  ├─ docs/
│  │  └─ swagger.json
│  ├─ domain/
│  │  ├─ entities/
│  │  │  └─ **.entity.ts
│  │  └─ gateway/
│  │     └─ **.gateway.ts
│  ├─ infra/
│  │  ├─ api/
│  │  │  ├─ express/
│  │  │  │  ├─ routes/
│  │  │  │  │  ├─ **/
│  │  │  │  │  │  └─ **.express.route.ts
│  │  │  │  │  └─ route.express.ts
│  │  │  │  └─ api.express.ts
│  │  │  └─ api.ts
│  │  └─ repositories/
│  │     └─ ***.repository.prisma.ts
│  ├─ middlewares/
│  │  └─ **.middleware.ts
│  ├─ package/
│  │  ├─ exception-error/
│  │  │  └─ exception.error.ts
│  │  └─ prisma/
│  │     └─ prisma.ts
│  ├─ usecase/
│  │  ├─ ****/
│  │  │  └─ **.usecase.ts
│  │  └─ usecase.ts
│  └─ server.ts
├─ LICENSE.md
├─ package-lock.json
├─ package.json
├─ readme.md
└─ tsconfig.json

```
# Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

```sh
# Conexão com o banco de dados PostgreSQL
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco

# Chave secreta para criação de tokens JWT
SECRET=sua_chave_secreta
```


# Exemplo do Rotas

- **Criar Usuário**
  - Método: `POST`
  - Endpoint: `/users`
  - Descrição: Cria um novo usuário no sistema.

- **Listar Usuários**
  - Método: `GET`
  - Endpoint: `/users`
  - Descrição: Retorna uma lista de todos os usuários.

- **Atualizar Usuário**
  - Método: `PUT`
  - Endpoint: `/users/{id}`
  - Descrição: Atualiza as informações de um usuário específico.


*Documentação de rotas completa no Swagger acessando a rota*


> *Rota de documentação em ambiente de desenvolvimento de endpoints* **/api-docs**


## License MIT

LICENSE MIT: [LICENSE.md](./LICENSE.md)

-----------------