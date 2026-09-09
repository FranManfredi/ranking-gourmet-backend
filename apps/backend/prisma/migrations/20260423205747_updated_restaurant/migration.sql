-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'MAR DEL PLATA',
ADD COLUMN     "tags" TEXT[];
