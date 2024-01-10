/*
  Warnings:

  - Added the required column `cidade` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cars" ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL;
