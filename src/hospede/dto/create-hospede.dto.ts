import { IsDateString, IsEmail, IsPhoneNumber, IsString, MaxLength } from "class-validator"

export class CreateHospedeDto {

  @IsString()
  nome: string

  @MaxLength(50)
  @IsEmail()
  email: string
	
  @IsDateString() // formato: 2020-07-10
  data_aniversario: string
	
  @IsPhoneNumber('BR') // formato: 55XXxxxxxxxxx  ex: 5531999196707
  telefone: string

  @MaxLength(20)
  @IsString()
  cidade: string
	
  @MaxLength(20)
  @IsString()
  estado: string
	
  @MaxLength(15)
  @IsString()
  pais: string
}