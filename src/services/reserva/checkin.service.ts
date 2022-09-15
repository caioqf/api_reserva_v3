import Reserva from "../../entity/Reserva";
import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  id_reserva: number,
  id_hospede: number,
}

class CheckInService {
  public async execute(data: IRequest){
    
    // checagem se o checkin está sendo feito pelo dono da reserva
    // Na teoria imagino que o "data.id_hospede" deveria ser um id relacionado ao token do 
    // usuário, tornando impossivel de alterar e forçar uma reserva em nome de outra pessoa.
    
    const reserva = await ReservaRepository.findById(data.id_reserva)    
    if (data.id_hospede != reserva.hospede_id) {
      throw new AppError('Impossivel fazer checkin desta reserva.', 403)
    }

    if (reserva.status_reserva === "Check-in") {
      throw new AppError('Check-in já realizado para está reserva.', 403)
    }

    if (reserva.status_reserva === "Cancelada") {
      throw new AppError('Esta reserva foi cancelada.', 403)
    }

    if (reserva.status_reserva === "Check-out") {
      throw new AppError('Check-out já realizado para está reserva.', 403)
    }

    await ReservaRepository.updateStatus(data.id_reserva, 'Check-in')
    
    return { message: 'Check-in realizado' }
  }
}

export default CheckInService