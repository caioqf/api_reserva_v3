import Hospede from "../../entity/Hospede"
import { CreateHospedeDto } from "../dto/create-hospede.dto"
import IHospedeRepository from "./IHospedeRepository"

export default interface HospedeService {
  createHospede(data: any): Promise<CreateHospedeDto>
  getOneHospede(id: number): Promise<Hospede>
  getAllHospedes(): Promise<Hospede[]>
}