# API RESERVAS


## Sumário

- [Sobre](#sobre)
- [Por onde começar](#por-onde-começar)
- [Rodando](#rodando)
- [Rodando Testes](#rodando-testes)
- [Insomnia Collection](#insomnia-collection)
- [Comandos do TypeORM](#typeorm-commands)

## Sobre

Uma API REST para gerenciamento de hospedes e reservas dos hospedes de um hotel. Testada utilizando Jest.

---


## Por onde começar

Primeiramente é necessário clonar o projeto e entrar na pasta do mesmo:

````
$ git clone https://github.com/caioqf/api_reserva_v3.git
````
depois..
````
$ cd api_reserva_v3
````

## Pré-requisitos

- Ter o npm ^8.15 instalado 

O projeto foi dockerizado, tirando toda a necessidade de setup manual da aplicação e do banco de dados. Para subir os containers siga as intruções abaixo:
- É necessário ter o Docker e docker-compose instalado* e configurado na máquina.

- Garantir que as seguintes portas da máquina estejam livres:
  - 9229 - Node.js
  - 1433 - MS SQLServer

> ***_Obs_:** na versão 3.2.1 em diante do Docker, o [docker-compose se integrou ao CLI da ferramenta](https://docs.docker.com/compose/#compose-v2-and-the-new-docker-compose-command) por padrão. Então, desta versão em diante, não precisará necessariamente ter o plugin docker-compose instalado. 
Como até o momento há retro-compatibilidade entre os comandos, usaremos nesta documentação a sintaxe antiga **(docker-compose)**.


## Rodando
Na pasta do projeto, rode o seguinte comando no terminal:
````
$ docker-compose up --build
````


## Rodando os testes

A API possui testes automatizados. Para roda-los é necessário estar na root do projeto e rodar um dos seguintes comandos:


- Para apenas rodar os testes
````
$ npm run test
````

- Para rodar os testes mostrando a cobertura de código
````
$ npm run test:coverage
````
- Para rodar os testes em modo "watch"
````
$ npm run test:watch
````

___

## Insomnia Collection

O projeto conta com uma collection do [Insomnia](https://docs.insomnia.rest/) com as rotas da API e seus respectivos endpoints.
- A collection **"endpoints.json"** pode ser encontrada na pasta **/contrib/**

Basta [importar o arquivo no Insomnia](https://docs.insomnia.rest/insomnia/import-export-data#import-data) para acessar as rotas.

## TypeORM commands

- criar migration:
````
$ npx typeorm migration:create src/migration/{**nome_da_migration**}
````

- rodar migrations:
````
$ npx typeorm-ts-node-esm migration:run -d ./src/data-source.ts 
````
