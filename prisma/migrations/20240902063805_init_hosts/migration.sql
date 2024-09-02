/*
  Warnings:

  - Added the required column `guestPassword` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER NOT NULL,
    "host" INTEGER NOT NULL,
    "flag" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "guestPassword" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "onLine" BOOLEAN NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TEXT NOT NULL
);
INSERT INTO "new_Guest" ("collaboratorId", "country", "endDate", "flag", "host", "id", "onLine", "startDate", "status", "tokenId") SELECT "collaboratorId", "country", "endDate", "flag", "host", "id", "onLine", "startDate", "status", "tokenId" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE UNIQUE INDEX "Guest_tokenId_key" ON "Guest"("tokenId");
CREATE UNIQUE INDEX "Guest_country_collaboratorId_onLine_key" ON "Guest"("country", "collaboratorId", "onLine");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
