-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'TECHNICIAN', 'ADMIN');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "assignedToId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
