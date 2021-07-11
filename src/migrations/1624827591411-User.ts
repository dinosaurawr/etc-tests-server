import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1624827591411 implements MigrationInterface {
  name = 'User1624827591411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "surname" varchar NOT NULL, "login" varchar NOT NULL, "middleName" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
