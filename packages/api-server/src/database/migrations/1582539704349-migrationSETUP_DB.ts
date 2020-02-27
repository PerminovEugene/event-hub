import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationSETUPDB1582539704349 implements MigrationInterface {
    name = 'migrationSETUPDB1582539704349'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "app_user" ("id" SERIAL NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "salt" text NOT NULL, "role" text NOT NULL, "status" text NOT NULL, CONSTRAINT "UQ_3fa909d0e37c531ebc237703391" UNIQUE ("email"), CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "type" text NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "event_tags_tag" ("eventId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_7ebe96b5d788dd52b1f5a37571b" PRIMARY KEY ("eventId", "tagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c04045ef5aceb3f9a5d1297ece" ON "event_tags_tag" ("eventId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_28a457412550e4d06eb24673b6" ON "event_tags_tag" ("tagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "event_tags_tag" ADD CONSTRAINT "FK_c04045ef5aceb3f9a5d1297eceb" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "event_tags_tag" ADD CONSTRAINT "FK_28a457412550e4d06eb24673b68" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event_tags_tag" DROP CONSTRAINT "FK_28a457412550e4d06eb24673b68"`, undefined);
        await queryRunner.query(`ALTER TABLE "event_tags_tag" DROP CONSTRAINT "FK_c04045ef5aceb3f9a5d1297eceb"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_28a457412550e4d06eb24673b6"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c04045ef5aceb3f9a5d1297ece"`, undefined);
        await queryRunner.query(`DROP TABLE "event_tags_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "event"`, undefined);
        await queryRunner.query(`DROP TABLE "tag"`, undefined);
        await queryRunner.query(`DROP TABLE "app_user"`, undefined);
    }

}
