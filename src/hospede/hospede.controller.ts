import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { CreateHospedeDto } from "./dto/create-hospede.dto";
import HospedeServiceImpl from "./hospede.service";

const hospedeService = new HospedeServiceImpl()

@JsonController('/hospede')
export default class HospedeController {

  
  @Get('/:id')
  public async getOne(@Param('id') id: string): Promise<any> {
      
    const hospede = await hospedeService.getOneHospede(parseInt(id))
  
    return hospede
  }

  @Get('/')
  public async getAll() {

    const hospedes = await hospedeService.getAllHospedes()

    return hospedes
  }

  @Post('/')
  public async create(@Body() hospedeData: CreateHospedeDto) {
  
      const hospedeCriado = await hospedeService.createHospede(hospedeData)

      return hospedeCriado
  }
}