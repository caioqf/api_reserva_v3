import "reflect-metadata"
import express, { NextFunction, Response, Request, response } from 'express'
import cors from 'cors';
import routes from './shared/router';
import AppError from './shared/errors/AppError';
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
  const app = express()

app.use(cors());
app.use(express.json());

app.use(routes)

// middleware pra tratamento de erros
app.use(
  (
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
      console.log(error);
      
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        })
      }
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
      })
});

app.listen(3331, () => {
  console.log(`API RUNNING ON PORT: ${3331}`)
});

}).catch(error => console.log(error))

