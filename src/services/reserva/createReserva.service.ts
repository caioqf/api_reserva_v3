import Reserva from "../../entity/Reserva";
import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";
import CalculaValorReserva from "./calculaValorReserva.service";
import CheckQuartoStatus from "./checkQuartoStatus.service";

interface IRequest {
  nome_hotel: string;
  numero_do_quarto: string;
  data_checkin: any;
  data_checkout: any;
  status_reserva: string;
  hospede_id: number;
}

class CreateReservaService {
  public async execute(data: IRequest): Promise<Reserva> {

    const {numero_do_quarto } = data
    
    const checkQuartoStatus = new CheckQuartoStatus
    const ocupado = await checkQuartoStatus.execute({numero_do_quarto})
    
    if(ocupado) {
      throw new AppError("Quarto se encontra ocupado.", 403);
    }

    const calculaReserva = new CalculaValorReserva
    
    const valorDaReserva = await calculaReserva.execute({data_checkin: data.data_checkin, data_checkout: data.data_checkout})

    const reserva = await ReservaRepository.create({
      nome_hotel: data.nome_hotel,
      numero_do_quarto: data.numero_do_quarto,
      valor_reserva: valorDaReserva.toString(),
      data_checkin: data.data_checkin,
      data_checkout: data.data_checkout,
      hospede_id: data.hospede_id,
      status_reserva: "Confirmada",
    })

    await ReservaRepository.save(reserva)

    return reserva
  }
}

export default CreateReservaService;