import Hospede from "../../../entity/Hospede";
import { CreateHospedeDto } from "../../../hospede/dto/create-hospede.dto";

export default interface HospedeService {
  createHospede(data: any): Promise<CreateHospedeDto>
  getOneHospede(id: number): Promise<Hospede>
  getAllHospedes(): Promise<Hospede[]>
}