import "reflect-metadata"
import { DataSource } from "typeorm"
import Hospede from "../entity/Hospede"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: 'localhost',
    port: 1433,
    username: 'sa',
    password: '@teste1746',
    database: 'master',
    synchronize: true,
    logging: false,
    entities: [Hospede],
    migrations: ['src/database/migration/*.ts'],
    subscribers: [],
    options: {
        encrypt: false
    },
    
})
