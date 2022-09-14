import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Hospede {  

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  nome: string;

  @Column('varchar')
  email: string // TODO-> deveria ter tipo propro, criar se der tempo

  @Column('varchar')
  data_aniversario: string

  @Column('varchar')
  telefone: string

  @Column('varchar')
  cidade: string

  @Column('varchar')
  estado: string

  @Column('varchar')
  pais: string

}

export default Hospede