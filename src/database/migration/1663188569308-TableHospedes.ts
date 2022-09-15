import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TableHospedes1663186279127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'hospede',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'data_aniversario',
                    type: 'varchar'
                },
                {
                    name: 'telefone',
                    type: 'varchar'
                },
                {
                    name: 'cidade',
                    type: 'varchar'
                },
                {
                    name: 'estado',
                    type: 'varchar'
                },
                {
                    name: 'pais',
                    type: 'varchar'
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('hospede')
    }

}
