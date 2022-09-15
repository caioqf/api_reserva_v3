import "reflect-metadata"
import { DataSource } from "typeorm"
import Hospede from "../entity/Hospede"
import Reserva from "../entity/Reserva"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Hospede, Reserva],
    migrations: ['src/database/migration/*.ts'],
    subscribers: [],
    options: {
        encrypt: false
    },
    
})
