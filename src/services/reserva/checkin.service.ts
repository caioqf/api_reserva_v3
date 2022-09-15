import Reserva from "../../entity/Reserva";
import { HospedeRepository } from "../../repositories/hospede.repository";
import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  id_reserva: number,
  id_hospede: number,
}

class CheckInService {
  public async execute(data: IRequest): Promise<Reserva> {
    
    const reserva = await ReservaRepository.findById(data.id_reserva)
    console.log(reserva);
    
    // checagem se o checkin está sendo feito pelo dono da reserva
    // Na teoria o "id_hospede" deveria ser um id relacionado ao login do usuário, sendo impossivel de alterar

    if (reserva.hospede_id != data.id_hospede) {
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

    // TODO -> criar service de update para reserva
    const updateReserva = new UpdateReserva();
    await updateReserva.execute({
      status_reserva: "Check-in"
    })

    
    
    return 
  }
}

export default CheckInService