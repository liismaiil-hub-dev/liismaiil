/*
  Warnings:

  - A unique constraint covering the columns `[hostId,guestId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sprints" ADD COLUMN "arabName" TEXT;

-- AlterTable
ALTER TABLE "stages" ADD COLUMN "arabName" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guest_stages" (
    "tokenId" INTEGER NOT NULL,
    "stageId" TEXT NOT NULL,
    "rate" INTEGER,
    "review" TEXT,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("tokenId", "stageId"),
    CONSTRAINT "guest_stages_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "guests" ("tokenId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "guest_stages_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stages" ("stageId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_guest_stages" ("added_at", "rate", "review", "stageId", "tokenId") SELECT "added_at", "rate", "review", "stageId", "tokenId" FROM "guest_stages";
DROP TABLE "guest_stages";
ALTER TABLE "new_guest_stages" RENAME TO "guest_stages";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "favorites_hostId_guestId_key" ON "favorites"("hostId", "guestId");
