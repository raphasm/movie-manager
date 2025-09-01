/*
  Warnings:

  - Changed the type of `category` on the `movies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('ACAO', 'AVENTURA', 'COMEDIA', 'DRAMA', 'DOCUMENTARIO', 'TERROR', 'SUSPENSE', 'FICCAO', 'ANIME', 'ROMANCE');

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "category",
ADD COLUMN     "category" "Categories" NOT NULL;
