import "reflect-metadata"
import express from 'express'
import './shared/container'
import cors from 'cors';
import { AppDataSource } from "./database/data-source"
import { useExpressServer } from "routing-controllers";
import HospedeController from "./hospede/hospede.controller";
import { CustomErrorHandler } from "./shared/middlewares";

AppDataSource.initialize().then(async () => {
  const app = express()
  app.use(cors());
  app.use(express.json());

  useExpressServer(app, {
    controllers: [HospedeController],
    defaultErrorHandler: false,
    middlewares: [CustomErrorHandler]
  })

  app.listen(3331, () => {
    console.log(`API RUNNING ON PORT: ${3331}`)
  });

}).catch(error => console.log(error))

