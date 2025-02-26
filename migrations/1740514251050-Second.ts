import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Second1740514251050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'posts',
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
                      isNullable: true
                  }
              ]
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }

}
