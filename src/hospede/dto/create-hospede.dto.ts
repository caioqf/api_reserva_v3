import { IsDateString, IsEmail, IsPhoneNumber, IsString } from "class-validator"

export class CreateHospedeDto {

  @IsString()
  nome: string

  @IsEmail()
  email: string
	
  @IsDateString() // formato: 2020-07-10 15:00:00.000
  data_aniversario: string
	
  @IsPhoneNumber('BR') // formato: 55XXxxxxxxxxx  ex: 5531999196707
  telefone: string
	
  @IsString()
  cidade: string
	
  @IsString()
  estado: string
	
  @IsString()
  pais: string
}