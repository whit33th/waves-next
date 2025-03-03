/*
  Warnings:

  - You are about to drop the column `userId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_userId_fkey";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserTrack" (
    "userId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "UserTrack_pkey" PRIMARY KEY ("userId","trackId")
);

-- AddForeignKey
ALTER TABLE "UserTrack" ADD CONSTRAINT "UserTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTrack" ADD CONSTRAINT "UserTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
