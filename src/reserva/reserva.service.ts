import Reserva from "../entity/Reserva";
import { CreateReservaDto } from "./dto/create-reserva.dto";
import AppError from "../shared/errors/AppError";
import { ReservaRepository } from "./reserva.repository";
import ReservaService from "./interfaces/reserva.interface";
import moment from "moment";

export default class ReservaServiceImpl implements ReservaService {

  async createReserva(data: CreateReservaDto): Promise<any>{

    const estaOcupado = await this.checkStatusQuarto(data.numero_do_quarto)

    if(estaOcupado) {
      throw new AppError("Quarto se encontra ocupado.", 403);
    }
    const valorDaReserva = await this.calculaValorReserva(data.data_checkin, data.data_checkout);

    const reserva = ReservaRepository.create({
      nome_hotel: data.nome_hotel,
      numero_do_quarto: data.numero_do_quarto,
      valor_reserva: valorDaReserva.toString(),
      data_checkin: data.data_checkin,
      data_checkout: data.data_checkout,
      hospede_id: data.hospede_id,
      status_reserva: "Confirmada",
    })

    await ReservaRepository.save(reserva);

    return reserva
  }

  async getAllReservas(): Promise<Reserva[]> {
    
    const Reservas = ReservaRepository.find()

    return Reservas;
  }

  async getOneReserva(id_reserva: number): Promise<Reserva> {

    const reserva = await ReservaRepository.findById(id_reserva)
    
    if (!reserva) {
      throw new AppError('Reserva não encontrada.', 403)
    }

    return reserva;
  }

  async calculaValorReserva(data_checkin: string, data_checkout: string) {
    const dia_checkin = moment(data_checkin)
    const dia_checkout = moment(data_checkout)
    
    const diasTotal = dia_checkout.diff(dia_checkin, 'days');
    
    // constante dado ao propósito do projeto e para agilizar. 
    // Imagino que o correto seria ter uma tabela para guardar
    // informações de cada quarto; como o valor, tipo, nº de camas etc...
    const valorQuartoPorNoite = 50

    return diasTotal * valorQuartoPorNoite
  }

  async makeCheckin(id_reserva: number, id_hospede: number): Promise<Object>{
    
    // checagem se o checkin está sendo feito pelo dono da reserva
    // Na teoria imagino que o "data.id_hospede" deveria ser um id relacionado ao token do 
    // usuário, tornando impossivel de alterar e forçar uma reserva em nome de outra pessoa.
    
    const reserva = await ReservaRepository.findOneBy({id: id_reserva})    
    
    if(!reserva) {
      throw new AppError('Reserva não encontrada.', 403)
    }

    if (id_hospede != reserva.hospede_id) {
      throw new AppError('Impossivel fazer checkin desta reserva.', 403)
    }

    if (reserva.status_reserva === "Check-in") {
      throw new AppError('Check-in já realizado para está reserva.', 403)
    }

    if (reserva.status_reserva === "Cancelada") {
      throw new AppError('Esta reserva foi cancelada.', 403)
    }

    if (reserva.status_reserva === "Check-out") {
      throw new AppError('Check-out já realizado para esta reserva.', 403)
    }

    await ReservaRepository.updateStatus(id_reserva, 'Check-in')
    
    return { message: 'Check-in realizado' }
  }

  async makeCheckout(id_reserva: number, id_hospede: number): Promise<Object>{

    const reserva = await this.getOneReserva(id_reserva)
     
    if (id_hospede != reserva.hospede_id) {
      throw new AppError('Impossivel fazer checkout desta reserva.', 403)
    }

    if (reserva.status_reserva === "Check-out") {
      throw new AppError('Check-out já realizado.', 403)
    }

    if (reserva.status_reserva != "Check-in") {
      throw new AppError('Impossivel fazer check-out para reserva sem check-in.', 403)
    }

    await ReservaRepository.updateStatus(id_reserva, 'Check-out')
    
    return { message: 'Check-out realizado' }
  }

  async checkStatusQuarto(numeroDoQuarto: string): Promise<boolean> {
    // true = ocupado
    // false = desocupado
    const ocupado = await ReservaRepository.findLatestById(numeroDoQuarto)
    console.log(ocupado);
    
    if (!ocupado) return false
    
    if(ocupado.status_reserva === "Check-in" || ocupado.status_reserva === "Confirmada") return true
  
    return false
  }
}