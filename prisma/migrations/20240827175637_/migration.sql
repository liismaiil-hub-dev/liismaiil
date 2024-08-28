/*
  Warnings:

  - The primary key for the `Guest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sprint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Stage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `B` on the `_AyahToStage` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GuestToSprint` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GuestToStage` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_SprintToStage` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_SprintToStage` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `id` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Sprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Stage` table without a default value. This is not possible if the table is not empty.

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
INSERT INTO "new_Guest" ("collaboratorId", "country", "createdAt", "endDate", "flag", "host", "onLine", "password", "tokenId") SELECT "collaboratorId", "country", "createdAt", "endDate", "flag", "host", "onLine", "password", "tokenId" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE UNIQUE INDEX "Guest_tokenId_key" ON "Guest"("tokenId");
CREATE UNIQUE INDEX "Guest_country_collaboratorId_onLine_key" ON "Guest"("country", "collaboratorId", "onLine");
CREATE TABLE "new_Sprint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sprintId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "souraName" TEXT NOT NULL,
    "souraNb" INTEGER NOT NULL,
    "grid" INTEGER NOT NULL,
    "startOn" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL
);
INSERT INTO "new_Sprint" ("createdAt", "createdById", "grid", "published", "souraName", "souraNb", "sprintId", "startOn") SELECT "createdAt", "createdById", "grid", "published", "souraName", "souraNb", "sprintId", "startOn" FROM "Sprint";
DROP TABLE "Sprint";
ALTER TABLE "new_Sprint" RENAME TO "Sprint";
CREATE UNIQUE INDEX "Sprint_sprintId_key" ON "Sprint"("sprintId");
CREATE UNIQUE INDEX "Sprint_createdById_souraNb_grid_createdAt_key" ON "Sprint"("createdById", "souraNb", "grid", "createdAt");
CREATE TABLE "new_Stage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stageId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "souraName" TEXT NOT NULL,
    "souraNb" INTEGER NOT NULL,
    "grid" INTEGER NOT NULL,
    "startOn" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL
);
INSERT INTO "new_Stage" ("createdAt", "createdById", "grid", "souraName", "souraNb", "stageId", "startOn") SELECT "createdAt", "createdById", "grid", "souraName", "souraNb", "stageId", "startOn" FROM "Stage";
DROP TABLE "Stage";
ALTER TABLE "new_Stage" RENAME TO "Stage";
CREATE UNIQUE INDEX "Stage_stageId_key" ON "Stage"("stageId");
CREATE UNIQUE INDEX "Stage_createdById_souraNb_startOn_key" ON "Stage"("createdById", "souraNb", "startOn");
CREATE TABLE "new__AyahToStage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AyahToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Ayah" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AyahToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__AyahToStage" ("A", "B") SELECT "A", "B" FROM "_AyahToStage";
DROP TABLE "_AyahToStage";
ALTER TABLE "new__AyahToStage" RENAME TO "_AyahToStage";
CREATE UNIQUE INDEX "_AyahToStage_AB_unique" ON "_AyahToStage"("A", "B");
CREATE INDEX "_AyahToStage_B_index" ON "_AyahToStage"("B");
CREATE TABLE "new__GuestToSprint" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GuestToSprint_A_fkey" FOREIGN KEY ("A") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GuestToSprint_B_fkey" FOREIGN KEY ("B") REFERENCES "Sprint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GuestToSprint" ("A", "B") SELECT "A", "B" FROM "_GuestToSprint";
DROP TABLE "_GuestToSprint";
ALTER TABLE "new__GuestToSprint" RENAME TO "_GuestToSprint";
CREATE UNIQUE INDEX "_GuestToSprint_AB_unique" ON "_GuestToSprint"("A", "B");
CREATE INDEX "_GuestToSprint_B_index" ON "_GuestToSprint"("B");
CREATE TABLE "new__GuestToStage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GuestToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GuestToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GuestToStage" ("A", "B") SELECT "A", "B" FROM "_GuestToStage";
DROP TABLE "_GuestToStage";
ALTER TABLE "new__GuestToStage" RENAME TO "_GuestToStage";
CREATE UNIQUE INDEX "_GuestToStage_AB_unique" ON "_GuestToStage"("A", "B");
CREATE INDEX "_GuestToStage_B_index" ON "_GuestToStage"("B");
CREATE TABLE "new__SprintToStage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SprintToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Sprint" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SprintToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__SprintToStage" ("A", "B") SELECT "A", "B" FROM "_SprintToStage";
DROP TABLE "_SprintToStage";
ALTER TABLE "new__SprintToStage" RENAME TO "_SprintToStage";
CREATE UNIQUE INDEX "_SprintToStage_AB_unique" ON "_SprintToStage"("A", "B");
CREATE INDEX "_SprintToStage_B_index" ON "_SprintToStage"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
