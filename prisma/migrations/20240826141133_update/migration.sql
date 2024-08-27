-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
INSERT INTO "new_Sprint" ("createdAt", "createdById", "grid", "id", "published", "souraName", "souraNb", "sprintId", "startOn") SELECT "createdAt", "createdById", "grid", "id", "published", "souraName", "souraNb", "sprintId", "startOn" FROM "Sprint";
DROP TABLE "Sprint";
ALTER TABLE "new_Sprint" RENAME TO "Sprint";
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
INSERT INTO "new_Stage" ("createdAt", "createdById", "grid", "id", "souraName", "souraNb", "stageId", "startOn") SELECT "createdAt", "createdById", "grid", "id", "souraName", "souraNb", "stageId", "startOn" FROM "Stage";
DROP TABLE "Stage";
ALTER TABLE "new_Stage" RENAME TO "Stage";
CREATE UNIQUE INDEX "Stage_stageId_key" ON "Stage"("stageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
