import IHospede from "../../entity/interfaces/IHospede"
import { CreateHospedeDto } from "../dto/create-hospede.dto"

export default interface HospedeService {
  createHospede(data: any): Promise<CreateHospedeDto>
  getOneHospede(id: number): Promise<IHospede>
  getAllHospedes(): Promise<IHospede[]>
}