import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TableReservas1663188819871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'reserva',

            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'nome_hotel',
                    type: 'varchar'
                },
                {
                    name: 'numero_do_quarto',
                    type: 'varchar'
                },
                {
                    name: 'valor_reserva',
                    type: 'money'
                },
                {
                    name: 'data_reserva_efetuada',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'data_checkin',
                    type: 'date'
                },
                {
                    name: 'data_checkout',
                    type: 'date'
                },
                {
                    name: 'status_reserva',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reservas')
    }

}
