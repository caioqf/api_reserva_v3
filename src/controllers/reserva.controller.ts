import { Request, Response } from "express";
import CreateReservaService from "../services/reserva/createReserva.service";
// import GetAllReservaService from "../services/reserva/getAllReserva.service";
// import GetOneReservaService from "../services/reserva/getOneReserva.service";
import AppError from "../shared/errors/AppError";

export default class ReservaController {
  // public async getOne(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const { id } = request.params

  //     const service = new GetOneReservaService();
      
  //     const reserva = await service.execute({ id: parseInt(id)})
  
  //     return response.json(reserva)
  //   } catch (error) {

  //     response
  //     .status(403)
  //     .json({
  //       message: error.message,
  //       statusCode: error.statusCode
  //     })
  //   }
  // }

  // public async getAll(request: Request, response: Response) {

  //   const service = new GetAllReservaService();

  //   const reservas = await service.execute()

  //   return response.json(reservas)
  // }

  public async create(request: Request, response: Response) {
    try {
      const service = new CreateReservaService();

      const reservaCriada = await service.execute(request.body)

      return response.json(reservaCriada);

    } catch (error) {
      response
      .status(403)
      .json({
        message: error.message,
        statusCode: error.statusCode,
      })
    }
  } 
}