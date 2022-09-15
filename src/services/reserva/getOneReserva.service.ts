import Reserva from "../../entity/Reserva";
import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  id: number
}

class GetOneReservaService {
  public async execute(data: IRequest): Promise<Reserva> {

    const reserva = await ReservaRepository.findById(data.id)
    
    if (!reserva) {
      throw new AppError('Reserva não encontrada.', 403)
    }

    return reserva;
  }
}

export default GetOneReservaService;