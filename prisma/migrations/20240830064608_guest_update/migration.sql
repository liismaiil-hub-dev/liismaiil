/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Guest` table. All the data in the column will be lost.
  - Added the required column `status` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hostId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteToGuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FavoriteToGuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoriteToGuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER NOT NULL,
    "host" INTEGER NOT NULL,
    "flag" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "onLine" BOOLEAN NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TEXT NOT NULL
);
INSERT INTO "new_Guest" ("collaboratorId", "country", "endDate", "flag", "host", "id", "onLine", "tokenId") SELECT "collaboratorId", "country", "endDate", "flag", "host", "id", "onLine", "tokenId" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE UNIQUE INDEX "Guest_tokenId_key" ON "Guest"("tokenId");
CREATE UNIQUE INDEX "Guest_country_collaboratorId_onLine_key" ON "Guest"("country", "collaboratorId", "onLine");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_hostId_guestId_key" ON "Favorite"("hostId", "guestId");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToGuest_AB_unique" ON "_FavoriteToGuest"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToGuest_B_index" ON "_FavoriteToGuest"("B");
