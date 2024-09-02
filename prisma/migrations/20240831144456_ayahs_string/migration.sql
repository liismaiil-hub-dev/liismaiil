/*
  Warnings:

  - You are about to drop the `Ayah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AyahToStage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ayahs` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ayah_souraNb_order_key";

-- DropIndex
DROP INDEX "_AyahToStage_B_index";

-- DropIndex
DROP INDEX "_AyahToStage_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ayah";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AyahToStage";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stageId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "souraName" TEXT NOT NULL,
    "souraNb" INTEGER NOT NULL,
    "grid" INTEGER NOT NULL,
    "startOn" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "ayahs" TEXT NOT NULL
);
INSERT INTO "new_Stage" ("createdAt", "createdById", "grid", "id", "souraName", "souraNb", "stageId", "startOn") SELECT "createdAt", "createdById", "grid", "id", "souraName", "souraNb", "stageId", "startOn" FROM "Stage";
DROP TABLE "Stage";
ALTER TABLE "new_Stage" RENAME TO "Stage";
CREATE UNIQUE INDEX "Stage_stageId_key" ON "Stage"("stageId");
CREATE UNIQUE INDEX "Stage_createdById_souraNb_startOn_key" ON "Stage"("createdById", "souraNb", "startOn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
