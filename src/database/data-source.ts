import "reflect-metadata"
import { DataSource } from "typeorm"
import Hospede from "../entity/Hospede"
import Reserva from "../entity/Reserva"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: 'localhost',
    port: 1433,
    username: 'sa',
    password: '@teste1746',
    database: 'master',
    synchronize: true,
    logging: false,
    entities: [Hospede, Reserva],
    migrations: ['src/database/migration/*.ts'],
    subscribers: [],
    options: {
        encrypt: false
    },
    
})
