import Hospede from "../entity/Hospede";
import { AppDataSource } from "../data-source";

export const HospedeRepository = AppDataSource.getRepository(Hospede).extend({

  findByName(name: string): Promise<Hospede | undefined> {
    return this.createQueryBuilder('hospede')
    .where('hospede.name = :name', { name })
    .getMany()
  },
  
  findByEmail(email: string): Promise<Hospede | undefined> {
    return this.createQueryBuilder('hospede')
    .where('hospede.email = :email', { email })
    .getOne()
  }
})