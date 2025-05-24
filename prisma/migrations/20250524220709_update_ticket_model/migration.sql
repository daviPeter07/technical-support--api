/*
  Warnings:

  - You are about to drop the column `statusId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('ABERTO', 'EM_ANDAMENTO', 'RESOLVIDO');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE');

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_statusId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "statusId",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'MEDIA',
ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'ABERTO';

-- DropTable
DROP TABLE "Status";
