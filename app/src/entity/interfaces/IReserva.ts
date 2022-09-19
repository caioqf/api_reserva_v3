export default interface IReserva {
  id: number;
  nome_hotel: string;
  numero_do_quarto: string 
  valor_reserva: string
  data_reserva: string
  data_checkin: string
  data_checkout: string
  status_reserva: string
  hospede_id: number
}