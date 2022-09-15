import Reserva from "../../entity/Reserva";
import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";
import CheckQuartoStatus from "./checkQuartoStatus.service";

interface IRequest {
  id_reserva: number; 
  id_hospede: number;
  nome_hotel?: string;
  numero_do_quarto?: string;
  valor_reserva?: any;
  data_checkin?: any;
  data_checkout?: any;
}

class UpdateReservaService {
  public async execute(data: IRequest): Promise<Reserva> {

    const {numero_do_quarto } = data
    
    const checkQuartoStatus = new CheckQuartoStatus
    const ocupado = await checkQuartoStatus.execute({numero_do_quarto})
    
    if(ocupado) {
      throw new AppError("Quarto se encontra ocupado.", 403);
    }

    const reserva = await ReservaRepository.update('id', data)

    return reserva
  }
}

export default UpdateReservaService;