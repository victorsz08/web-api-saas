# 🚀 Web Api - Projeto Notetools

Projeto back-end desenvolvido para uma equipe de operadores de vendas, com intuito de melhorar metas e gestão de contratos realizados, para que possa acompanhar desde sua criação a conclusão de intalação do serviço.

Projeto desenvolvido utilizando de arquitura MVC utlizando de Clean Arquiture.

--------
### 📋 Dependências


- Node.js >=20.17
- Banco de Dados: PostgresSQL.
- Prisma >=6.4
- Express >=4.12
- Demais dependências listadas no arquivo `package.json`

-----

### Instalação

- Todos os passos para baixar e instalar todos os pacotes com npm.

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

### Autenticação

><sub>Autenticação utilizando do JsonWebToken, com o Bearer Token nos headers das requisições.</sub>

```json
    "Authorization":
    "Bearer" <token>
```

Endpoint para autenticação de usuário.

```POST/auth/login```

body da requisição ```.json```:


-----
### Endpoints

