jest.mock('../hospede.repository')
import AppError from "../../shared/errors/AppError"
import { HospedeRepository } from "../hospede.repository"
import HospedeServiceImpl from "../hospede.service"


describe("Hospede Service", () => {

  const hospedeService = new HospedeServiceImpl()

  describe("criar um hospede", () => {
    it('deve criar um hospede com sucesso', async () => {
      // Arrange
      const dados = {
        nome: "Fulano Detal",
        email: "fulano@gmail.com",
        data_aniversario: new Date('2022-09-16').toString(),
        telefone: "7399196707",
        cidade: "betim",
        estado: "mg",
        pais: "brasil"
      }

      const retornoEsperado = {
        nome: "Fulano Detal",
        email: "fulano@gmail.com",
        data_aniversario: new Date('2022-09-16'),
        telefone: "7399196707",
        cidade: "betim",
        estado: "mg",
        pais: "brasil",
        id: 1
      }

      // Act
      jest.spyOn(HospedeRepository, 'findByEmail').mockResolvedValueOnce(undefined)
      jest.spyOn(HospedeRepository, 'create').mockReturnValueOnce(retornoEsperado)
      jest.spyOn(HospedeRepository, 'save').mockResolvedValueOnce(undefined)

      const hospede = await hospedeService.createHospede(dados)

      // Assert
      expect(hospede).toMatchObject({ message: 'created' })
      expect(HospedeRepository.findByEmail).toBeCalled()
      expect(HospedeRepository.create).toBeCalled()
      expect(HospedeRepository.save).toBeCalled()

    })

    it('NÃO deve criar um hospede com email já existente', async () => {
      // Arrange
      const dados = {
        nome: "Fulano Detal",
        email: "fulano@gmail.com",
        data_aniversario: new Date('2022-09-16').toString(),
        telefone: "7399196707",
        cidade: "betim",
        estado: "mg",
        pais: "brasil"
      }

      const retornoEsperado = {
        nome: "Fulano Detal",
        email: "fulano@gmail.com",
        data_aniversario: new Date('2022-09-16'),
        telefone: "7399196707",
        cidade: "betim",
        estado: "mg",
        pais: "brasil",
        id: 1
      }

      // Act
      jest.spyOn(HospedeRepository, 'findByEmail').mockResolvedValueOnce(retornoEsperado)

      try {
        
        await hospedeService.createHospede(dados)

      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(AppError)
        expect(error.message).toBe("Email já cadastrado.")
        expect(error.statusCode).toBe(403)
      }

      expect(HospedeRepository.findByEmail).toBeCalled()
    })

  })
  
  describe("retornar todos os hospedes", () => {
    it('deve retornar todos hospedes com sucesso', () => {
      // Arrange 
      const hospedes = [{
        nome: "Fulano Detal",
        email: "fulano@gmail.com",
        data_aniversario: new Date('2022-09-16'),
        telefone: "3199196707",
        cidade: "betim",
        estado: "mg",
        pais: "brasil",
        id: 1
      },
      {
        nome: "ciclano Detal",
        email: "ciclano@gmail.com",
        data_aniversario: new Date('2022-09-16'),
        telefone: "3199196707",
        cidade: "betim",
        estado: "mg",
        pais: "brasil",
        id: 2
      }]

      // Act
      jest.spyOn(HospedeRepository, 'find').mockResolvedValueOnce(hospedes)
      const result = hospedeService.getAllHospedes()

      // Assert

      expect(hospedes).toEqual(hospedes)
      expect(HospedeRepository.find).toBeCalled()
    })
  })

  describe("retornar um hospede", () => {
    it('deve retornar um hospede relativo ao ID',async () => {
      // Arrange

      const hospede = {
        nome: "Fulano Detal",
        email: "fulano@gmail.com",
        data_aniversario: new Date('2022-09-16'),
        telefone: "7399196707",
        cidade: "betim",
        estado: "mg",
        pais: "brasil",
        id: 1
      }

      // Act
      jest.spyOn(HospedeRepository, 'findById').mockResolvedValueOnce(hospede)
      const result = await hospedeService.getOneHospede(1)

      // Assert
      expect(result).toMatchObject(hospede)
      expect(HospedeRepository.findById).toBeCalled()

    })

    it('NÃO deve retornar um hospede inexistente',async () => {
      // Arrange

      const hospede = {
        nome: "Fulano Detal",
        email: "fulano@gmail.com",
        data_aniversario: new Date('2022-09-16'),
        telefone: "7399196707",
        cidade: "betim",
        estado: "mg",
        pais: "brasil",
        id: 2
      }

      // Act
      jest.spyOn(HospedeRepository, 'findById').mockResolvedValueOnce(hospede)
      try {
        await hospedeService.getOneHospede(1)
      } catch (error) {
        
        // Assert
        expect(error).toBeInstanceOf(AppError)
        expect(error.message).toBe("Hospede não encontrado.")
        expect(error.statusCode).toBe(403)
        
      }

      expect(HospedeRepository.findById).toBeCalled()

    })
  })
})