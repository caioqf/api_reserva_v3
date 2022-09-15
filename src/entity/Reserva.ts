import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Hospede from "./Hospede";

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

  @Column('datetime', {
    default: new Date().toISOString().split('T')[0]
  })
  data_reserva: string

  @Column('date')
  data_checkin: string

  @Column('date')
  data_checkout: string

  @Column('varchar')
  status_reserva: string

  @ManyToOne((type)=> Hospede, (fk_hospede) => fk_hospede.id)
  fk_hospede:  number

}

export default Reserva