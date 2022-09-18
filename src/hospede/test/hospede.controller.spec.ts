jest.mock('../hospede.service.ts')
import HospedeController from "../hospede.controller";
import HospedeServiceImpl from "../hospede.service";

describe('Hospede Controller', () => {
  
  const hospedeSerivce = new HospedeServiceImpl()
  const hospedeController = new HospedeController(hospedeSerivce)

  describe('POST /hospede', () => {
    it('deve chamar o metodo hospedeService.createHospede()',async () => {
      
      //Arrange
      const reqBody = {
        "nome": "Caio Faria",
        "email": "caio@gmail.com",
        "data_aniversario": "2001-07-12",
        "telefone": "3199196707",
        "cidade": "lagoa santa",
        "estado": "mg",
        "pais": "brasil"
      }

      // Act
      const result = hospedeController.create(reqBody)
      
      // Assert
      expect(hospedeSerivce.createHospede).toBeCalledWith(reqBody)
    })
  })
})