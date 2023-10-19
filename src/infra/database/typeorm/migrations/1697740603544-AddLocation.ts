import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocation1697740603544 implements MigrationInterface {
  name = 'AddLocation1697740603544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "location_type_orm" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "cep" character varying NOT NULL,
        "street" character varying NOT NULL,
        "number" character varying NOT NULL,
        "neighborhood" character varying NOT NULL,
        "city" character varying NOT NULL,
        "state" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "companyId" uuid,
        CONSTRAINT "PK_2daae1801cbbdd13af6a5419a50" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "location_type_orm"
      ADD CONSTRAINT "FK_fb17805e8c77f0f5dcbdb3695da" FOREIGN KEY ("companyId") REFERENCES "company_type_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "location_type_orm" DROP CONSTRAINT "FK_fb17805e8c77f0f5dcbdb3695da"
    `);
    await queryRunner.query(`
      DROP TABLE "location_type_orm"
    `);
  }
}
