/*
  Warnings:

  - You are about to drop the `sprint_stages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `arabName` on the `sprints` table. All the data in the column will be lost.
  - You are about to drop the column `grid` on the `sprints` table. All the data in the column will be lost.
  - You are about to drop the column `souraName` on the `sprints` table. All the data in the column will be lost.
  - You are about to drop the column `souraNb` on the `sprints` table. All the data in the column will be lost.
  - Added the required column `finishOn` to the `sprints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stageId` to the `sprints` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "sprint_stages";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sprints" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sprintId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startOn" DATETIME NOT NULL,
    "finishOn" DATETIME NOT NULL,
    "createdById" TEXT,
    "published" BOOLEAN NOT NULL,
    "stageId" TEXT NOT NULL,
    CONSTRAINT "sprints_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stages" ("stageId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sprints" ("createdAt", "createdById", "id", "published", "sprintId", "startOn") SELECT "createdAt", "createdById", "id", "published", "sprintId", "startOn" FROM "sprints";
DROP TABLE "sprints";
ALTER TABLE "new_sprints" RENAME TO "sprints";
CREATE UNIQUE INDEX "sprints_sprintId_key" ON "sprints"("sprintId");
CREATE INDEX "sprints_sprintId_stageId_idx" ON "sprints"("sprintId", "stageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
