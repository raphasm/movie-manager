/*
  Warnings:

  - You are about to alter the column `averageRating` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "averageRating" DROP NOT NULL,
ALTER COLUMN "averageRating" SET DEFAULT 0,
ALTER COLUMN "averageRating" SET DATA TYPE DECIMAL(2,1);
