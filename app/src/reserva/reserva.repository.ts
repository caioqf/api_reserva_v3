import Reserva from "../entity/Reserva";
import { AppDataSource } from "../database/data-source";

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
  },

  updateStatus(id: number, status: string) {
    return this.createQueryBuilder('reserva')
    .update(Reserva)
    .set({
      status_reserva: status
    })
    .where('reserva.id = :id', { id })
    .execute()
  }
})