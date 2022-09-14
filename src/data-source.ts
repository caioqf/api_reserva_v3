import "reflect-metadata"
import { DataSource } from "typeorm"
import Hospede from "./entity/Hospede"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "@teste1746",
    database: "hotel",
    synchronize: true,
    logging: true,
    entities: [Hospede],
    migrations: ['src/migration/*.ts'],
    subscribers: [],
    options: {
        encrypt: false
    },
    
})
