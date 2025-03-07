# **API Restfull Node.js, Typescript, Express e Postgrees** 🚀

**Api Rest** desenvolvida utilizando **Typescript, Node.js e Express** para uma equipe de operadores de vendas, com intuito de melhorar metas e gestão de contratos realizados, para que possa acompanhar desde sua criação a conclusão de intalação do serviço.


##### Desenvolvido por **Victor Siqueira** 💡 | [Meu Linkedin](https://www.linkedin.com/in/victorsiqueiradeveloper) 📥


## Requisitos de instalação 📄
- [Node.js](https://nodejs.org/pt) (>=20.17)
- [Typescript](https://www.typescriptlang.org/download/) (>=5.7) 


## Clonar Projeto 📑
```sh
# Clone repository
git clone (https://github.com/victorsz08/web-api-saas)
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
```

```sh
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
# Estrutura de pastas

```
    ├──📂dist
    ├──📂node_modules
    ├──📂src 
    │   ├──📂docs
    │   │   └──📄swagger.json
    │   ├──📂domain
    │   │   ├──📂entities
    │   │   │   └──📄**.entity.ts
    │   │   │ 
    │   │   └──📂gateway
    │   │       └──📄**.gateway.ts
    │   │   
    │   ├──📂infra
    │   │   ├──📂api
    │   │   │   ├──📄api.ts
    │   │   │   └──📂express
    │   │   │       ├──📂routes
    │   │   │       │   ├──📂**
    │   │   │       │   │   └──📄**.express.route.ts
    │   │   │       │   └──📄route.express.ts
    │   │   │       └──📄api.express.ts
    │   │   └──📂repositories
    │   │       └──📄**.repository.prisma.ts
    │   ├──📂middlewares
    │   │   └──📄**.middleware.ts
    │   ├──📂package
    │   │   ├──📂prisma   
    │   │   │   └──📄prisma.ts
    │   │   └──📂exception-error
    │   │       └──📄exception.error.ts
    │   ├──📂usecase
    │   │   ├──📂***
    │   │   │   └──📄**.usecase.ts
    │   │   └──📄usecase.ts
    │   └──📄server.ts
    ├──📄LICENSE.md
    ├──📄package-lock.json
    ├──📄package.json
    ├──📄README.md
    └──📄tsconfig.json
```
# Variáveis de ambiente
*Variaveis .env*

```
# Conexão com banco de dados PostgresSQL 
DATABASE_URL=******

# Chave MD5 secret para criação de tokens JWT
SECRET=********
```


# Rotas da API

*Documentação de rotas com Swagger - Acessando a rota*


> *Rota de documentação em ambiente de desenvolvimento de endpoints* http://localhost:3000/api-docs/ 


## License MIT

LICENSE MIT: [LICENSE.md](./LICENSE.md)

-----------------