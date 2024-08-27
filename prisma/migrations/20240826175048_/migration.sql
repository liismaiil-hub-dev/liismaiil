/*
  Warnings:

  - The primary key for the `Ayah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Ayah` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_AyahToStage` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - A unique constraint covering the columns `[country,collaboratorId,onLine]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdById,createdAt,souraNb,grid]` on the table `Sprint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdById,souraNb,startOn]` on the table `Stage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `souraNb` to the `Ayah` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ayah" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "souraNb" INTEGER NOT NULL,
    "juz" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL
);
INSERT INTO "new_Ayah" ("id", "juz", "order", "text") SELECT "id", "juz", "order", "text" FROM "Ayah";
DROP TABLE "Ayah";
ALTER TABLE "new_Ayah" RENAME TO "Ayah";
CREATE UNIQUE INDEX "Ayah_souraNb_order_key" ON "Ayah"("souraNb", "order");
CREATE TABLE "new__AyahToStage" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AyahToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Ayah" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AyahToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("stageId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__AyahToStage" ("A", "B") SELECT "A", "B" FROM "_AyahToStage";
DROP TABLE "_AyahToStage";
ALTER TABLE "new__AyahToStage" RENAME TO "_AyahToStage";
CREATE UNIQUE INDEX "_AyahToStage_AB_unique" ON "_AyahToStage"("A", "B");
CREATE INDEX "_AyahToStage_B_index" ON "_AyahToStage"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Guest_country_collaboratorId_onLine_key" ON "Guest"("country", "collaboratorId", "onLine");

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_createdById_createdAt_souraNb_grid_key" ON "Sprint"("createdById", "createdAt", "souraNb", "grid");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_createdById_souraNb_startOn_key" ON "Stage"("createdById", "souraNb", "startOn");
