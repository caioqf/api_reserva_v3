import Hospede from "../entity/Hospede";
import HospedeService from "./interfaces/hospede.interface";
import { HospedeRepository } from "./hospede.repository";
import { CreateHospedeDto } from "./dto/create-hospede.dto";
import AppError from "../shared/errors/AppError";

export default class HospedeServiceImpl implements HospedeService {

  async createHospede(data: CreateHospedeDto): Promise<any>{

    const emailExiste = await HospedeRepository.findByEmail(data.email)
    
    if(emailExiste) {      
      throw new AppError('Email já cadastrado.', 403)
    }
    
    const hospede = HospedeRepository.create(data)
    
    await HospedeRepository.save(hospede);

    return { message: 'created' }
  }

  async getAllHospedes(): Promise<Hospede[]> {
    console.log('oi');
    
    const hospedes = HospedeRepository.find()

    return hospedes;
  }

  async getOneHospede(hospedeId: number): Promise<Hospede> {

    const hospede = await HospedeRepository.findById(hospedeId)
    
    if (!hospede) {
      throw new AppError('Hospede não encontrado', 403)
    }

    return hospede;
  }
}