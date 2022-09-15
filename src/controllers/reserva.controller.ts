import { Request, Response } from "express";
import CheckInService from "../services/reserva/checkin.service";
import CheckOutService from "../services/reserva/checkout.service";
import CreateReservaService from "../services/reserva/createReserva.service";
import GetAllReservaService from "../services/reserva/getAllReserva.service";
import GetOneReservaService from "../services/reserva/getOneReserva.service";

export default class ReservaController {
  public async getOne(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      const service = new GetOneReservaService();
      
      const reserva = await service.execute({ id: parseInt(id)})
  
      return response.json(reserva)
    } catch (error) {

      response
      .status(403)
      .json({
        message: error.message,
        statusCode: error.statusCode
      })
    }
  }

  public async getAll(request: Request, response: Response) {

    const service = new GetAllReservaService();

    const reservas = await service.execute()

    return response.json(reservas)
  }

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
  
  public async checkIn(request: Request, response: Response) {
    try {      
      const service = new CheckInService();

      const checkin = await service.execute(
        {
          id_reserva: parseInt(request.params.idReserva),
          id_hospede: parseInt(request.params.idHospede),
        }
      )

      return response.json(checkin);

    } catch (error) {
      response
      .status(403)
      .json({
        message: error.message,
        statusCode: error.statusCode,
      })
    }
  } 

  public async checkOut(request: Request, response: Response) {
    try {      
      const service = new CheckOutService();

      const checkin = await service.execute(
        {
          id_reserva: parseInt(request.params.idReserva),
          id_hospede: parseInt(request.params.idHospede),
        }
      )

      return response.json(checkin);

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