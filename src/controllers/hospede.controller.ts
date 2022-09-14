import { Request, Response } from "express";
import CreateHospedeService from "../services/hospede/createHospede.service";
import GetAllHospedeService from "../services/hospede/getAllHospede.service";
import GetOneHospedeService from "../services/hospede/getOneHospede.service";
import AppError from "../shared/errors/AppError";

export default class HospedeController {
  public async getOne(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      const service = new GetOneHospedeService();
      
      const hospede = await service.execute({ id: parseInt(id)})
  
      return response.json(hospede)
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

    const service = new GetAllHospedeService();

    const hospedes = await service.execute()

    return response.json(hospedes)
  }

  public async create(request: Request, response: Response) {
    try {
      const service = new CreateHospedeService();
      const hospedeCriado = await service.execute(request.body)

      return response.json(hospedeCriado);

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