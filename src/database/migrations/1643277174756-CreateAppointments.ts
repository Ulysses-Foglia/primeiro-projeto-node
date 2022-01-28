import {MigrationInterface, QueryRunner, Table} from "typeorm";

/* Precisei excluir [ ] do nome da classe --> [CreateAppointments]1643277174756 */
export default class CreateAppointments1643277174756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'date',
                    type: 'timestamp with time zone',
                    isNullable: false
                }
            ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
 
}
