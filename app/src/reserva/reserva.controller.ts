import { Body, Get, JsonController, Param, Params, Post } from "routing-controllers";
import { inject, injectable } from "tsyringe";
import { CreateReservaDto } from "./dto/create-reserva.dto";
import ReservaService from "./interfaces/reserva.interface";


@JsonController('/reserva')
@injectable()
export default class ReservaController {
  constructor(
    @inject('ReservaService')
    private readonly reservaService: ReservaService) {}

  @Get('/:id')
  public async getOne(@Param('id') id: string): Promise<any> {

    const reserva = await this.reservaService.getOneReserva(parseInt(id))
    return reserva
  }

  @Get('/')
  public async getAll() {

    const reservas = await this.reservaService.getAllReservas();
    return reservas
  }

  @Post('/')
  public async create(@Body() reservaData: CreateReservaDto) {

    const reservaCriada = await this.reservaService.createReserva(reservaData)
    return reservaCriada
  } 
  
  @Post('/:idReserva/hospede/:idHospede/checkin')
  public async checkIn(
    @Param('idReserva') idReserva: string,
    @Param('idHospede') idHospede: string
    ) {
      const checkin = await this.reservaService.makeCheckin(
        parseInt(idReserva),
        parseInt(idHospede),
      )
      return checkin
  } 

  @Post('/:idReserva/hospede/:idHospede/checkout')
  public async checkOut(
    @Param('idReserva') idReserva: string,
    @Param('idHospede') idHospede: string
    ) {
      const checkin = await this.reservaService.makeCheckout(
        parseInt(idReserva),
        parseInt(idHospede),
      )
      return checkin
  } 
  
}