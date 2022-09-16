import { IsDateString, IsNotEmpty, IsNumber, IsString, NotContains } from "class-validator"

export class CreateReservaDto {

  @IsString()
  @IsNotEmpty()
  nome_hotel:string
  
  @IsString()
  @IsNotEmpty()
  numero_do_quarto:string
  
  @IsDateString() // formato: 2020-07-10 15:00:00.000
  @IsNotEmpty()
  data_checkin:string 
  
  @IsDateString()// formato: 2020-07-10 15:00:00.000
  @IsNotEmpty()
  data_checkout:string

  @IsNumber()
  @IsNotEmpty()
  hospede_id: number
}