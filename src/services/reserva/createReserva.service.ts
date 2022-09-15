import Reserva from "../../entity/Reserva";
import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";
import CheckQuartoStatus from "./checkQuartoStatus.service";

interface IRequest {
  nome_hotel: string;
  numero_do_quarto: string;
  valor_reserva: any;
  data_checkin: any;
  data_checkout: any;
  status_reserva: string;
  id_hospede: number;
}

class CreateReservaService {
  public async execute(data: IRequest): Promise<Reserva> {

    const {numero_do_quarto } = data
    
    const checkQuartoStatus = new CheckQuartoStatus
    const ocupado = await checkQuartoStatus.execute({numero_do_quarto})
    
    if(ocupado) {
      throw new AppError("Quarto se encontra ocupado.", 403);
    }

    const reserva = await ReservaRepository.create({
      nome_hotel: data.nome_hotel,
      numero_do_quarto: data.numero_do_quarto,
      valor_reserva: data.valor_reserva,
      data_checkin: data.data_checkin,
      data_checkout: data.data_checkout,
      fk_hospede: data.id_hospede,
      status_reserva: "Confirmada",
    })

    await ReservaRepository.save(reserva)

    return reserva
  }
}

export default CreateReservaService;