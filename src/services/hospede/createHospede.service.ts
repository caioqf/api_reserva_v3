import Hospede from "../../entity/Hospede";
import { HospedeRepository } from "../../repositories/hospede.repository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  nome: string;
  email: string 
  data_aniversario: string
  telefone: string
  cidade: string
  estado: string
  pais: string
}

class CreateHospedeService {
  public async execute(data: IRequest): Promise<Hospede> {

    const emailExiste = await HospedeRepository.findByEmail(data.email)
    
    if(emailExiste) {      
      throw new AppError('Email já cadastrado.', 403)
    }
    
    const hospede = HospedeRepository.create(data)
    await HospedeRepository.save(hospede);

    return hospede
  }
}

export default CreateHospedeService;