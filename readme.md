# 🚀 **Notetools API Rest**

**Api Rest** desenvolvida utilizando **Typescrip, Node e Express** com Node.js para uma equipe de operadores de vendas, com intuito de melhorar metas e gestão de contratos realizados, para que possa acompanhar desde sua criação a conclusão de intalação do serviço.

Projeto desenvolvido utilizando de arquitura MVC.

##### Desenvolvido por **Victor Siqueira** | [Meu Linkedin](https://www.linkedin.com/in/victorsiqueiradeveloper)

--------
### 📋 Dependências


- **Node.js** >=20.17
- **Banco de Dados** PostgresSQL.
- **Prisma** >=6.4
- **Express** >=4.12
- Demais dependências listadas no arquivo `package.json`

-----

### Instalação

Todos os passos para baixar e instalar todos os pacotes com npm.

```sh
# Clonar repositório
git clone (https://github.com/victorsz08/web-api-saas)

# Diretório do projeto
cd web-api-saas

# Instalar todas as dependências do projeto
npm install
```

### Execução

Apos instalação das dependências do projeto, aqui está o comando para iniciar o server.

```sh
# Comando para rodar o projeto em ambiente de desenvolvimento.
npm run dev
```

```sh
# Comando para buildar a aplicação de typescript para javascript.
npm run build

# Após fazer o build, para inciar o projeto compilado e rodar em ambiente de pridução.
npm run start
```

------

### Middlewares

##### Middleware de autenticação

>Autenticação utilizando do JsonWebToken, com o Bearer Token nos headers das requisições.

```
    Authorization:
    Bearer <token>
```
-----

### Estrutura de pastas

| DIRETÓRIO | CONTEÚDO |
|-------|----------|
| **/src/domain/entities/** | Entitades correpondentes a um tabela no banco de dados. |
| **/src/domain/gateway/** | Interfaces de metodos para fazer requisições ao banco de bados |
| **/src/infra/api/express** | Instância da app Express  para inciar o server e mapear rotas |
| **src/infra/api/routes/** | Todas as instâncias de rotas com express |
| **/src/middlewares/** | Middlewares de autenticação e autorização |
| **/src/package/prisma/** | Instância do PrismaClient |
| **/src/package/exception-error/** | Classe customizada de errors http |
| **/src/usecase/** | Diretório onde se encontra todas as regras de contratos dos métodos de requisições |
| **/prisma/** | Todos os esquemas do banco de dados, utilizando prisma |

-------------

### Errors

##### Codigos de erros


| STATUS CODE | ERRORS |
|------|-------|
| 404 | Não encontrado |
| 401 | Não Autorizado |
| 409 | Conflito de dados |
| 400 | Dados incorretos|
| 500 | Erro interno do servidor |

-----------------