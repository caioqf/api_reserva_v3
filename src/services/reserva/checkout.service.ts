import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  id_reserva: number,
  id_hospede: number,
}

class CheckOutService {
  public async execute(data: IRequest){
    
    const reserva = await ReservaRepository.findById(data.id_reserva)    
    if (data.id_hospede != reserva.hospede_id) {
      throw new AppError('Impossivel fazer checkout desta reserva.', 403)
    }

    if (reserva.status_reserva === "Check-out") {
      throw new AppError('Check-out já realizado.', 403)
    }

    if (reserva.status_reserva != "Check-in") {
      throw new AppError('Impossivel fazer check-out para reserva sem check-in.', 403)
    }

    await ReservaRepository.updateStatus(data.id_reserva, 'Check-out')
    
    return { message: 'Check-out realizado' }
  }
}

export default CheckOutService