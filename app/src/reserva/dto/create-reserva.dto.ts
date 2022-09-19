import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength, NotContains } from "class-validator"

export class CreateReservaDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  nome_hotel:string
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  numero_do_quarto:string
  
  @IsDateString() // formato: 2020-07-10
  @IsNotEmpty()
  data_checkin:string 
  
  @IsDateString()// formato: 2020-07-10
  @IsNotEmpty()
  data_checkout:string

  @IsNumber()
  @IsNotEmpty()
  hospede_id: number
}