-- CreateTable
CREATE TABLE "guests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER NOT NULL,
    "host" INTEGER NOT NULL,
    "flag" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "guestPassword" TEXT,
    "collaboratorId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "onLine" BOOLEAN DEFAULT false,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hostId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "stages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stageId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "souraName" TEXT NOT NULL,
    "arabName" TEXT,
    "souraNb" INTEGER NOT NULL,
    "grid" INTEGER NOT NULL,
    "startOn" TEXT,
    "createdById" TEXT NOT NULL,
    "ayahs" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sprints" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sprintId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "startOn" TEXT,
    "finishOn" TEXT,
    "createdById" TEXT,
    "published" BOOLEAN,
    "stageId" TEXT NOT NULL,
    CONSTRAINT "sprints_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stages" ("stageId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "guest_stages" (
    "tokenId" INTEGER NOT NULL,
    "stageId" TEXT NOT NULL,
    "rate" INTEGER,
    "review" TEXT,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "guest_stages_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stages" ("stageId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "guest_stages_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "guests" ("tokenId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "guest_sprints" (
    "tokenId" INTEGER NOT NULL,
    "sprintId" TEXT NOT NULL,
    "rate" INTEGER,
    "review" TEXT,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "guest_sprints_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "sprints" ("sprintId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "guest_sprints_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "guests" ("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FavoriteToGuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FavoriteToGuest_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoriteToGuest_B_fkey" FOREIGN KEY ("B") REFERENCES "guests" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "guests_tokenId_key" ON "guests"("tokenId");

-- CreateIndex
CREATE INDEX "guests_tokenId_idx" ON "guests"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_hostId_guestId_key" ON "favorites"("hostId", "guestId");

-- CreateIndex
CREATE UNIQUE INDEX "stages_stageId_key" ON "stages"("stageId");

-- CreateIndex
CREATE INDEX "stages_stageId_idx" ON "stages"("stageId");

-- CreateIndex
CREATE UNIQUE INDEX "sprints_sprintId_key" ON "sprints"("sprintId");

-- CreateIndex
CREATE UNIQUE INDEX "sprints_sprintId_stageId_key" ON "sprints"("sprintId", "stageId");

-- CreateIndex
CREATE UNIQUE INDEX "guest_stages_tokenId_stageId_key" ON "guest_stages"("tokenId", "stageId");

-- CreateIndex
CREATE UNIQUE INDEX "guest_sprints_sprintId_tokenId_added_at_key" ON "guest_sprints"("sprintId", "tokenId", "added_at");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToGuest_AB_unique" ON "_FavoriteToGuest"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToGuest_B_index" ON "_FavoriteToGuest"("B");
