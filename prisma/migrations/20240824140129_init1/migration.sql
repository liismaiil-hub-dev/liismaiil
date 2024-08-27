/*
  Warnings:

  - You are about to alter the column `tokenId` on the `Guest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `pblished` on the `Sprint` table. All the data in the column will be lost.
  - Added the required column `published` to the `Sprint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER NOT NULL,
    "host" INTEGER NOT NULL,
    "flag" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "onLine" BOOLEAN NOT NULL,
    "endDate" TEXT NOT NULL
);
INSERT INTO "new_Guest" ("collaboratorId", "country", "createdAt", "endDate", "flag", "host", "id", "onLine", "password", "tokenId") SELECT "collaboratorId", "country", "createdAt", "endDate", "flag", "host", "id", "onLine", "password", "tokenId" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE UNIQUE INDEX "Guest_tokenId_key" ON "Guest"("tokenId");
CREATE TABLE "new_Sprint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sprintId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "souraName" TEXT NOT NULL,
    "souraNb" INTEGER NOT NULL,
    "grid" INTEGER NOT NULL,
    "startOn" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL
);
INSERT INTO "new_Sprint" ("createdAt", "createdById", "grid", "id", "souraName", "souraNb", "sprintId", "startOn") SELECT "createdAt", "createdById", "grid", "id", "souraName", "souraNb", "sprintId", "startOn" FROM "Sprint";
DROP TABLE "Sprint";
ALTER TABLE "new_Sprint" RENAME TO "Sprint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
