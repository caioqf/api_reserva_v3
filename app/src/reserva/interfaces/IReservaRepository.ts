import IReserva from "../../entity/interfaces/IReserva";
import { CreateReservaDto } from "../dto/create-reserva.dto";

export default interface IReservaRepository {
  findById(id: number): Promise<IReserva | undefined>;
  findLatestById(numeroDoQuarto: string): Promise<IReserva | undefined>
  create(data: CreateReservaDto): Promise<IReserva>;
  save(Reserva: IReserva): Promise<any>;
  find(): Promise<IReserva[]>
}