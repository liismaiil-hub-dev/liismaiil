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
    "startOn" DATETIME,
    "createdById" TEXT NOT NULL,
    "ayahs" TEXT NOT NULL
);
INSERT INTO "new_Stage" ("ayahs", "createdAt", "createdById", "grid", "id", "souraName", "souraNb", "stageId", "startOn") SELECT "ayahs", "createdAt", "createdById", "grid", "id", "souraName", "souraNb", "stageId", "startOn" FROM "Stage";
DROP TABLE "Stage";
ALTER TABLE "new_Stage" RENAME TO "Stage";
CREATE UNIQUE INDEX "Stage_stageId_key" ON "Stage"("stageId");
CREATE INDEX "Stage_stageId_idx" ON "Stage"("stageId");
CREATE UNIQUE INDEX "Stage_createdById_stageId_key" ON "Stage"("createdById", "stageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
