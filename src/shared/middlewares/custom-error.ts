import { ValidationError } from "class-validator";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import AppError from "../errors/AppError";

@Middleware({type: 'after'})
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any): void {
    
    // console.error(error);
    
    // Verificar se o erro é conhecido, ou seja, gerado pela API propositalmente
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({statusCode: error.statusCode, message: error.message})
    }

    // Se não for conhecido, testa se o erro foi gerado a partir do class-validator
    if (error?.errors?.every((error: any) => error instanceof ValidationError)) {
      const erros = error?.errors?.map((error: ValidationError) => {
        return this.parseError(error)
      })
      return response.status(error.httpCode).json(erros)
    } 

    // exceptions não controladas
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