import Reserva from "../../entity/Reserva";
import { ReservaRepository } from "../../repositories/reserva.repository";

class GetAllReservaService {
  public async execute(): Promise<Reserva[]> {

    const reservas = ReservaRepository.find()

    return reservas;
  }
}

export default GetAllReservaService;