jest.mock('../reserva.repository.ts')
import { ReservaRepository } from '../reserva.repository'

import ReservaServiceImpl from '../reserva.service'

describe('Reserva Service', () => {
  let reservaService = new ReservaServiceImpl()
  
  describe("criar uma reserva", () => {
    it('deve criar uma reserva e retorna-la', async () => {

      // Arrange
      const data = {
        nome_hotel: "Trivago",
        numero_do_quarto: "B6",
        data_checkin: "2022-05-01",
        data_checkout: "2022-05-07",
        hospede_id: 1
      }

      const resultMustBe = {
        nome_hotel: "Trivago",
        numero_do_quarto: "B6",
        valor_reserva: "300",
        data_checkin: "2022-05-01",
        data_checkout: "2022-05-07",
        status_reserva: "Confirmada",
        hospede_id: 1,
        id: 5,
        data_reserva: new Date().toISOString(),
      }
      
      // Act
      jest.spyOn(ReservaRepository, 'create').mockReturnValueOnce(resultMustBe)
      jest.spyOn(ReservaRepository, 'findLatestById').mockReturnValueOnce(undefined)
      jest.spyOn(ReservaRepository, 'save').mockResolvedValueOnce(resultMustBe)
      
      const reserva = await reservaService.createReserva(data)
      
      // Assert
      expect(reserva).toMatchObject(resultMustBe)
      expect(ReservaRepository.findLatestById).toBeCalledTimes(1)
      expect(ReservaRepository.create).toBeCalledTimes(1)
      expect(ReservaRepository.save).toBeCalledTimes(1)
    })  
  })

  describe("retornar todas reservas", () => {
    it('deve retornar todas as reservas se hover', async () => {

      // Arrange
      const reservasMock = [{
        nome_hotel: "Trivago",
        numero_do_quarto: "A6",
        valor_reserva: "200",
        data_checkin: "2022-05-01",
        data_checkout: "2022-05-07",
        status_reserva: "Confirmada",
        hospede_id: 2,
        id: 5,
        data_reserva: new Date().toISOString(),
      },
      {
        nome_hotel: "Trivago",
        numero_do_quarto: "B6",
        valor_reserva: "300",
        data_checkin: "2022-05-01",
        data_checkout: "2022-05-07",
        status_reserva: "Confirmada",
        hospede_id: 1,
        id: 5,
        data_reserva: new Date().toISOString(),
      }]

      // Act
      jest.spyOn(ReservaRepository, 'find').mockResolvedValueOnce(reservasMock)

      const find = await reservaService.getAllReservas() 

      // Assert
      expect(find).toBe(reservasMock)
      expect(ReservaRepository.find).toBeCalledTimes(1)
    })
  })

  describe("calcular valor da reserva", () => {
    it('deve retornar o valor total da reserva baseado nas datas de checkin e checkout', async () => {
      
      // Act
      const resultado1 = await reservaService.calculaValorReserva('2022-04-23T09:54:51', '2022-04-24T09:54:51')
      const resultado2 = await reservaService.calculaValorReserva('2022-04-23T09:54:51', '2022-04-25T09:54:51')
      const resultado3 = await reservaService.calculaValorReserva('2022-04-23T09:54:51', '2022-04-26T09:54:51')
            
      // Assert
      expect(resultado1).toBe(50)
      expect(resultado2).toBe(100)
      expect(resultado3).toBe(150)
    })
  })

  describe("fazer checkin", () => {

    it("deve fazer um checkin de uma reserva válida e confirmada", async () => {
      // Arrange
      const reservaConfirmada = {
        nome_hotel: "Trivago",
        numero_do_quarto: "B6",
        valor_reserva: "300",
        data_checkin: "2022-05-01",
        data_checkout: "2022-05-07",
        status_reserva: "Confirmada",
        hospede_id: 1,
        id: 1, //da reserva
        data_reserva: new Date().toISOString(),
      }

      // Act
      jest.spyOn(ReservaRepository, 'findById').mockResolvedValueOnce(reservaConfirmada)
      
      const checkinFeito = await reservaService.makeCheckin(1, 1)

      // Assert
      expect(checkinFeito).toMatchObject({ message: 'Check-in realizado' })
      expect(ReservaRepository.findById).toBeCalledTimes(1)
    })

    it("NÃO deve fazer um checkin de uma reserva que nao pertence ao hospede", async () => {
      // Arrange
      const reservaConfirmada = {
        nome_hotel: "Trivago",
        numero_do_quarto: "B6",
        valor_reserva: "300",
        data_checkin: "2022-05-01",
        data_checkout: "2022-05-07",
        status_reserva: "Confirmada",
        hospede_id: 1,
        id: 1, // da reserva
        data_reserva: new Date().toISOString(),
      }

      // Act
      jest.spyOn(ReservaRepository, 'findById').mockResolvedValueOnce(reservaConfirmada)

      const checkinFeito = reservaService.makeCheckin(1, 2)
      expect(checkinFeito).toThrowError()

      // Assert
      expect(ReservaRepository.findById).toBeCalledTimes(1)
    })
  })

  describe("checar o status do quarto", () => {

    it('deve retornar true se quarto estiver ocupado', async () => {
      
      // Arrange
      const reserva = {
        nome_hotel: "Trivago",
        numero_do_quarto: "B6",
        valor_reserva: "300",
        data_checkin: "2022-05-01",
        data_checkout: "2022-05-07",
        status_reserva: "Confirmada",
        hospede_id: 1,
        id: 5,
        data_reserva: new Date().toISOString(),
      }

      // Acte
      jest.spyOn(ReservaRepository, 'findLatestById').mockResolvedValue(reserva)
      const ocupado = await reservaService.checkStatusQuarto("B6")
      
      // Assert
      expect(ocupado).toBe(true)
      expect(ReservaRepository.findLatestById).toBeCalledWith("B6")
    })

    it('deve retornar false se quarto NÃO estiver ocupado', async () => {

      // Acte
      jest.spyOn(ReservaRepository, 'findLatestById').mockResolvedValue(undefined)
      const ocupado = await reservaService.checkStatusQuarto("B6")
      
      // Assert
      expect(ocupado).toBe(false)
      expect(ReservaRepository.findLatestById).toBeCalledWith("B6")
    })
  })
})