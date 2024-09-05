/*
  Warnings:

  - A unique constraint covering the columns `[createdById,souraNb]` on the table `Sprint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdById,souraNb]` on the table `Stage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Guest_country_collaboratorId_onLine_key";

-- DropIndex
DROP INDEX "Sprint_createdById_souraNb_grid_createdAt_key";

-- DropIndex
DROP INDEX "Stage_createdById_souraNb_startOn_key";

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_createdById_souraNb_key" ON "Sprint"("createdById", "souraNb");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_createdById_souraNb_key" ON "Stage"("createdById", "souraNb");
