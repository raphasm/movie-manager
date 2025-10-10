/*
  Warnings:

  - You are about to drop the column `user_Id` on the `movies` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_user_Id_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "user_Id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
