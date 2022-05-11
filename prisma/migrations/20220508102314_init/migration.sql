/*
  Warnings:

  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `serialNumber` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
ADD COLUMN     "serialNumber" INTEGER NOT NULL,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("serialNumber");
