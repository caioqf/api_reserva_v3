
# Insomnia Collection

O projeto conta com uma collection do [Insomnia](https://docs.insomnia.rest/) com as rotas da API e seus respectivos endpoints.
- A collection **"endpoints.json"** pode ser encontrada na pasta **/contrib/**

Basta [importar o arquivo no Insomnia](https://docs.insomnia.rest/insomnia/import-export-data#import-data) para acessar as rotas.

# TypeORM commands

- criar migration:
````
$ npx typeorm migration:create src/migration/{**nome_da_migration**}
````

- rodar migrations:
````
$ npx typeorm-ts-node-esm migration:run -d ./src/data-source.ts 
````