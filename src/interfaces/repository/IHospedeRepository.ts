import IHospede from "../../entity/interfaces/IHospede";
import { CreateHospedeDto } from "../../hospede/dto/create-hospede.dto";

export default interface IHospedeRepository {
  findByName(name: string): Promise<IHospede | undefined>;
  findByEmail(email: string): Promise<IHospede | undefined>;
  findById(id: number): Promise<IHospede | undefined>
  create(data: CreateHospedeDto): Promise<IHospede>;
  save(hospede: IHospede) ;
}