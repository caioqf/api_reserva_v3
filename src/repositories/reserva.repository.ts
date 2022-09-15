import Reserva from "../entity/Reserva";
import { AppDataSource } from "../data-source";

export const ReservaRepository = AppDataSource.getRepository(Reserva).extend({

  findById(id: number): Promise<Reserva | undefined> {
    return this.createQueryBuilder('reserva')
    .where('reserva.id = :id', { id })
    .getOne()
  },

  findLatestById(numeroDoQuarto: string): Promise<Reserva | undefined>{
    
    return this.createQueryBuilder('reserva')
    .where('reserva.numero_do_quarto = :numeroDoQuarto', { numeroDoQuarto })
    .orderBy('reserva.data_reserva', 'DESC')
    .getOne()
    
  }
})