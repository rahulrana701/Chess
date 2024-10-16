/*
  Warnings:

  - You are about to drop the column `gameId` on the `GameResult` table. All the data in the column will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `GameResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "GameResult" DROP CONSTRAINT "GameResult_gameId_fkey";

-- AlterTable
ALTER TABLE "GameResult" DROP COLUMN "gameId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Game";

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
