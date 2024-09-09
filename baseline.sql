-- CreateTable
CREATE TABLE "Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER NOT NULL,
    "host" INTEGER NOT NULL,
    "flag" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "guestPassword" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "onLine" BOOLEAN NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hostId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Stage" (
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

-- CreateTable
CREATE TABLE "Sprint" (
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

-- CreateTable
CREATE TABLE "_GuestToStage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GuestToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GuestToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GuestToSprint" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GuestToSprint_A_fkey" FOREIGN KEY ("A") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GuestToSprint_B_fkey" FOREIGN KEY ("B") REFERENCES "Sprint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FavoriteToGuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FavoriteToGuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoriteToGuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SprintToStage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SprintToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Sprint" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SprintToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_tokenId_key" ON "Guest"("tokenId");

-- CreateIndex
CREATE INDEX "Guest_tokenId_idx" ON "Guest"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_hostId_guestId_key" ON "Favorite"("hostId", "guestId");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_stageId_key" ON "Stage"("stageId");

-- CreateIndex
CREATE INDEX "Stage_stageId_idx" ON "Stage"("stageId");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_createdById_souraNb_key" ON "Stage"("createdById", "souraNb");

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_sprintId_key" ON "Sprint"("sprintId");

-- CreateIndex
CREATE INDEX "Sprint_sprintId_idx" ON "Sprint"("sprintId");

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_createdById_souraNb_key" ON "Sprint"("createdById", "souraNb");

-- CreateIndex
CREATE UNIQUE INDEX "_GuestToStage_AB_unique" ON "_GuestToStage"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestToStage_B_index" ON "_GuestToStage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuestToSprint_AB_unique" ON "_GuestToSprint"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestToSprint_B_index" ON "_GuestToSprint"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToGuest_AB_unique" ON "_FavoriteToGuest"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToGuest_B_index" ON "_FavoriteToGuest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SprintToStage_AB_unique" ON "_SprintToStage"("A", "B");

-- CreateIndex
CREATE INDEX "_SprintToStage_B_index" ON "_SprintToStage"("B");

