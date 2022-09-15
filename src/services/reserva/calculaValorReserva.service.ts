import Reserva from "../../entity/Reserva";
import { ReservaRepository } from "../../repositories/reserva.repository";
import AppError from "../../shared/errors/AppError";
import moment from 'moment';

interface IRequest {
  data_checkin: string;
  data_checkout: string;
}

class CalculaValorReserva {
  public async execute(data: IRequest): Promise<Number> {
    
    const dia_checkin = moment(data.data_checkin)
    const dia_checkout = moment(data.data_checkout)
    
    const diasTotal = dia_checkout.diff(dia_checkin, 'days');
    
    // constante dado ao propósito do projeto e para agilizar. 
    // Imagino que o correto seria ter uma tabela para guardar
    // informações de cada quarto; como o valor, tipo, nº de camas etc...
    const valorQuartoPorNoite = 50

    return diasTotal * valorQuartoPorNoite
  }
}

export default CalculaValorReserva;