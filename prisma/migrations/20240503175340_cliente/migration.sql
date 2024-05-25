/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAdmin` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");
