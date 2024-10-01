-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sprints" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sprintId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startOn" DATETIME,
    "finishOn" DATETIME,
    "createdById" TEXT,
    "published" BOOLEAN,
    "stageId" TEXT NOT NULL,
    CONSTRAINT "sprints_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stages" ("stageId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sprints" ("createdAt", "createdById", "finishOn", "id", "published", "sprintId", "stageId", "startOn") SELECT "createdAt", "createdById", "finishOn", "id", "published", "sprintId", "stageId", "startOn" FROM "sprints";
DROP TABLE "sprints";
ALTER TABLE "new_sprints" RENAME TO "sprints";
CREATE UNIQUE INDEX "sprints_sprintId_key" ON "sprints"("sprintId");
CREATE INDEX "sprints_sprintId_stageId_idx" ON "sprints"("sprintId", "stageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
