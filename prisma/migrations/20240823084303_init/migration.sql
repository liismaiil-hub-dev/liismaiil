-- CreateTable
CREATE TABLE "Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "host" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "onLine" BOOLEAN NOT NULL,
    "endDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stageId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "souraName" TEXT NOT NULL,
    "souraNb" INTEGER NOT NULL,
    "grid" INTEGER NOT NULL,
    "startOn" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ayah" (
    "index" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "juz" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sprint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sprintId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "souraName" TEXT NOT NULL,
    "souraNb" INTEGER NOT NULL,
    "grid" INTEGER NOT NULL,
    "startOn" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "pblished" BOOLEAN NOT NULL
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
CREATE TABLE "_AyahToStage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AyahToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Ayah" ("index") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AyahToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
CREATE UNIQUE INDEX "_GuestToStage_AB_unique" ON "_GuestToStage"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestToStage_B_index" ON "_GuestToStage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuestToSprint_AB_unique" ON "_GuestToSprint"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestToSprint_B_index" ON "_GuestToSprint"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AyahToStage_AB_unique" ON "_AyahToStage"("A", "B");

-- CreateIndex
CREATE INDEX "_AyahToStage_B_index" ON "_AyahToStage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SprintToStage_AB_unique" ON "_SprintToStage"("A", "B");

-- CreateIndex
CREATE INDEX "_SprintToStage_B_index" ON "_SprintToStage"("B");
