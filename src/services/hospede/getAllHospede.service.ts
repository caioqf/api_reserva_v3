import Hospede from "../../entity/Hospede";
import { HospedeRepository } from "../../repositories/hospede.repository";

class GetAllHospedeService {
  public async execute(): Promise<Hospede[]> {

    const hospedes = HospedeRepository.find()

    return hospedes;
  }
}

export default GetAllHospedeService;