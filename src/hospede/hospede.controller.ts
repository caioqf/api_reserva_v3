import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { inject, injectable } from "tsyringe";
import { CreateHospedeDto } from "./dto/create-hospede.dto";
import HospedeService from "./interfaces/hospede.interface";

@JsonController('/hospede')
@injectable()
export default class HospedeController {
  constructor(
    @inject('HospedeService')
    private readonly hospedeService: HospedeService){}
  
  @Get('/:id')
  public async getOne(@Param('id') id: string): Promise<any> {

      const hospede = await this.hospedeService.getOneHospede(parseInt(id))
      return hospede
  }

  @Get('/')
  public async getAll() {

    const hospedes = await this.hospedeService.getAllHospedes()
    return hospedes
  }

  @Post('/')
  public async create(@Body() hospedeData: CreateHospedeDto) {
  
      const hospedeCriado = await this.hospedeService.createHospede(hospedeData)
      return hospedeCriado
  }
}