import { ValidationError } from "class-validator";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import AppError from "../errors/AppError";

@Middleware({type: 'after'})
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any): void {
    
    console.error(`[ERROR] ${error.message}`);
    
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({statusCode: error.statusCode, message: error.message})
    }

    if (error?.errors?.every((error: any) => error instanceof ValidationError)) {
      const erros = error?.errors?.map((error: ValidationError) => {
        return this.parseError(error)
      })
      return response.status(error.httpCode).json(erros)
    } 
    return response.status(error.httpCode || 500).json(error)
  }

  parseError(error: ValidationError): any {
    return {
      propriedade: error.property,
      valorRecebido: error?.value,
      validacoes: Object.values(error?.constraints ?? {})
    }
  }
}