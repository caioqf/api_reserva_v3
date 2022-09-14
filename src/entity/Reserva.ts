import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Reserva {  

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  nome_hotel: string;

  @Column('varchar')
  numero_do_quarto: string // TODO-> deveria ter tipo propro, criar se der tempo

  @Column('money')
  valor_reserva: string

  @Column('datetime')
  data_reserva: string

  @Column('date')
  date_checkin: string

  @Column('date')
  date_checkout: string

  @Column('varchar')
  status_reserva: string

  @Column('int')
  FK_reserva_hospede

}

export default Reserva