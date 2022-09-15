# API RESERVAS
----
## Sobre

Uma simples API REST para gerenciamento de hospedes e reservas dos hospedes de um hotel.

---

## Por onde começar

Primeiramente é necessário clonar o projeto e entrar na pasta do mesmo:

````
$ git clone https://github.com/caioqf/api_reservas_v2.git
````
depois..
````
$ cd api_reservas_v2
````


## Formas de rodar 

- [Docker](#docker-recomendado)
<!-- - [Manualmente](#manuamente) -->


### Docker (recomendado)

O projeto foi dockerizado, tirando toda a necessidade de setup manual da aplicação e do banco de dados. Para subir os containers siga as intruções abaixo:
#### Pré-requisitos
- É necessário ter o Docker e docker-compose instalado* e configurado na máquina.

> ***Obs:** na versão 3.2.1 em diante do Docker, o [docker-compose se integrou ao CLI da ferramenta](https://docs.docker.com/compose/#compose-v2-and-the-new-docker-compose-command) por padrão. Então, desta versão em diante, não precisará necessariamente ter o plugin docker-compose instalado. 
Como até o momento há retro-compatibilidade entre os comandos, usaremos nesta documentação a sintaxe antiga **(docker-compose)**.

- Garantir que as seguintes portas da máquina estejam livres:
  - 9229 - Node.js
  - 1433 - MS SQLServer

#### Rodando
Na pasta do projeto, rode o seguinte comando no terminal:
````
$ docker-compose up
````

___
<!-- ### Manuamente

É uma forma mais trabalhosa de rodar o projeto, mas caso o Docker não seja uma realidade no seu ambiente, é a unica forma de subir a aplicação.

#### Pré-requisitos

- Node v17.4
- SQLServer

#### Rodando

É necessário fazer o setup do banco de dados SQLServer com as seguintes informações:

- Os parâmetros para conexão:
    - porta: 1433,
    - usuário: sa,
    - senha: @teste1746,

- Um banco com nome **hotel** quem contem o esquema **dbo**. Que é onde todas as tabelas serão armazenadas.  

Na pasta do projeto rodar o comando 
````
$ npm install 
````

depois...

````
npm run dev 
````-->

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