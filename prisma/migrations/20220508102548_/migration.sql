-- AlterTable
CREATE SEQUENCE "member_serialnumber_seq";
ALTER TABLE "Member" ALTER COLUMN "serialNumber" SET DEFAULT nextval('member_serialnumber_seq');
ALTER SEQUENCE "member_serialnumber_seq" OWNED BY "Member"."serialNumber";
