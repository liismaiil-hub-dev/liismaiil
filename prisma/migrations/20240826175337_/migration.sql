/*
  Warnings:

  - A unique constraint covering the columns `[createdById,souraNb,grid,createdAt]` on the table `Sprint` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Sprint_createdById_createdAt_souraNb_grid_key";

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_createdById_souraNb_grid_createdAt_key" ON "Sprint"("createdById", "souraNb", "grid", "createdAt");
