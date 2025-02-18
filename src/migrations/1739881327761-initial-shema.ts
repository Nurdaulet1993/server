import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class InitialShema1739881327761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isNullable: true
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }));
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isNullable: true
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }));
        await queryRunner.addColumn(
          'tasks',
          new TableColumn({
            name: 'userId',
            type: 'integer',
          })
        )
        await queryRunner.createForeignKey(
          'tasks',
          new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'CASCADE',
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
     const table = await queryRunner.getTable('tasks');
     const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);

     await queryRunner.dropForeignKey('tasks', foreignKey);
     await queryRunner.dropColumn('tasks', 'userId');
     await queryRunner.dropTable('tasks');
     await queryRunner.dropTable('users');
    }

}
