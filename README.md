# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


# TypeORM commands


- criar migration:
````
$ npx typeorm migration:create src/migration/{**nome_da_migration**}
````

- rodar migrations:
````
$ npx typeorm-ts-node-esm migration:run -d ./src/data-source.ts 
````