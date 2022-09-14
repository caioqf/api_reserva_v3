import { Request, Response } from "express";
import CreateHospedeService from "../services/hospede/createHospede.service";
import GetAllHospedeService from "../services/hospede/getAllHospede.service";

export default class HospedeController {
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
      response.status(403).json({
        message: error.message,
        statusCode: error.statusCode,
      })
    }
  } 
}