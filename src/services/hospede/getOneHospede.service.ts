import Hospede from "../../entity/Hospede";
import { HospedeRepository } from "../../repositories/hospede.repository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  id: number
}

class GetOneHospedeService {
  public async execute(data: IRequest): Promise<Hospede> {

    const hospede = await HospedeRepository.findById(data.id)
    console.log(hospede);
    
    if (!hospede) {
      throw new AppError('Hospede não encontrado', 403)
    }

    return hospede;
  }
}

export default GetOneHospedeService;