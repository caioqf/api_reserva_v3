import { TsryingeAdapter } from "../adapters"
import { container } from "tsyringe"
import HospedeService from "../hospede/interfaces/hospede.interface"
import HospedeServiceImpl from "../hospede/hospede.service"
import { useContainer } from "routing-controllers"

export const setupContainer = (): void => {
  useContainer(new TsryingeAdapter(container))

  container.registerSingleton<HospedeService>(
    'HospedeService',
    HospedeServiceImpl
  )
}

