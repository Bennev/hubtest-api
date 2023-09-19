import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1695086518399 implements MigrationInterface {
  name = 'AddUser1695086518399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL,
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
