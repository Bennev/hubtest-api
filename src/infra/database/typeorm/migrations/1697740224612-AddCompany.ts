import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompany1697740224612 implements MigrationInterface {
  name = 'AddCompany1697740224612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "company_type_orm" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "website" character varying NOT NULL,
        "cnpj" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "userId" uuid,
        CONSTRAINT "PK_07e99702395bf2301d6d87f8300" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "company_type_orm"
      ADD CONSTRAINT "FK_2d4ce21e3aa852f0a91da423c74" FOREIGN KEY ("userId") REFERENCES "user_type_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "company_type_orm" DROP CONSTRAINT "FK_2d4ce21e3aa852f0a91da423c74"
    `);
    await queryRunner.query(`
      DROP TABLE "company_type_orm"
    `);
  }
}
