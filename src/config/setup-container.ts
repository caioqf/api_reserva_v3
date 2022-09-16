import { TsryingeAdapter } from "../adapters"
import { container } from "tsyringe"
import HospedeService from "../hospede/interfaces/hospede.interface"
import HospedeServiceImpl from "../hospede/hospede.service"
import { useContainer } from "routing-controllers"
import ReservaService from "../reserva/interfaces/reserva.interface"
import ReservaServiceImpl from "../reserva/reserva.service"
import { ReservaRepository } from "../reserva/reserva.repository"
import IReservaRepository from "../reserva/interfaces/IReservaRepository"
import { Repository } from "typeorm"

export const setupContainer = (): void => {
  useContainer(new TsryingeAdapter(container))

  container.registerSingleton<HospedeService>(
    'HospedeService',
    HospedeServiceImpl
  )

  container.registerSingleton<ReservaService>(
    'ReservaService',
    ReservaServiceImpl
  )

  container.registerSingleton(
    'Repository',
    Repository
  )


}

