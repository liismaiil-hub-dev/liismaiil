/*
  Warnings:

  - The primary key for the `Ayah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `index` on the `Ayah` table. All the data in the column will be lost.
  - Added the required column `id` to the `Ayah` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ayah" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "juz" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL
);
INSERT INTO "new_Ayah" ("juz", "order", "text") SELECT "juz", "order", "text" FROM "Ayah";
DROP TABLE "Ayah";
ALTER TABLE "new_Ayah" RENAME TO "Ayah";
CREATE UNIQUE INDEX "Ayah_id_key" ON "Ayah"("id");
CREATE TABLE "new__AyahToStage" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AyahToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Ayah" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AyahToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__AyahToStage" ("A", "B") SELECT "A", "B" FROM "_AyahToStage";
DROP TABLE "_AyahToStage";
ALTER TABLE "new__AyahToStage" RENAME TO "_AyahToStage";
CREATE UNIQUE INDEX "_AyahToStage_AB_unique" ON "_AyahToStage"("A", "B");
CREATE INDEX "_AyahToStage_B_index" ON "_AyahToStage"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
