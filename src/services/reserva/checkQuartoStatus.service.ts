import Reserva from "../../entity/Reserva";
import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  numero_do_quarto: string;
}

class CheckQuartoStatus {
  public async execute(data: IRequest): Promise<Boolean> {

  const ocupado = await ReservaRepository.findLatestById(data.numero_do_quarto)
  
  if (!ocupado) return false
  
  if(ocupado.status_reserva === "Check-in" || ocupado.status_reserva === "Confirmada") return true

  return false
  }
}

export default CheckQuartoStatus;