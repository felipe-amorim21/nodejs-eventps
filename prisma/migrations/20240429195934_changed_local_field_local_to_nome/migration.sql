/*
  Warnings:

  - You are about to drop the column `local` on the `locais` table. All the data in the column will be lost.
  - Added the required column `nome` to the `locais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locais" DROP COLUMN "local",
ADD COLUMN     "nome" TEXT NOT NULL;
