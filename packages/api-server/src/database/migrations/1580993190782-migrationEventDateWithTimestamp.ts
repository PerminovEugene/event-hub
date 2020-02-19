import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationEventDateWithTimestamp1580993190782 implements MigrationInterface {
    name = 'migrationEventDateWithTimestamp1580993190782'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "date"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "date"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "date" date NOT NULL`, undefined);
    }

}
