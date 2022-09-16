import IReserva from "../../entity/interfaces/IReserva"
import { CreateReservaDto } from "../dto/create-reserva.dto"
import { UpdateReservaDTO } from "../dto/update-reserva.dto"

export default interface ReservaService {
  createReserva(data: CreateReservaDto): Promise<IReserva>
  getOneReserva(id: number): Promise<IReserva>
  getAllReservas(): Promise<IReserva[]>
  checkStatusQuarto(numeroDoQuarto: string): Promise<boolean>;
  makeCheckin(id_reserva: number, id_hospede: number): Promise<Object>;
  makeCheckout(id_reserva: number, id_hospede: number): Promise<Object>;
}