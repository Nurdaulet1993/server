import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PublicItems1740512979490 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'test',
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
                      name: 'name',
                      type: 'varchar',
                      length: '255',
                      isNullable: false
                  }
              ]
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('test');
    }

}
