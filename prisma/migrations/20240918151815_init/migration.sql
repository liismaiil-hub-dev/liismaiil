-- CreateTable
CREATE TABLE "guests" (
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
CREATE TABLE "favorites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hostId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "stages" (
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

-- CreateTable
CREATE TABLE "sprints" (
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
CREATE TABLE "guest_stages" (
    "tokenId" INTEGER NOT NULL,
    "stageId" TEXT NOT NULL,
    "rate" INTEGER,
    "review" TEXT,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("tokenId", "stageId"),
    CONSTRAINT "guest_stages_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "guests" ("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "guest_stages_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stages" ("stageId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "guest_sprints" (
    "tokenId" INTEGER NOT NULL,
    "sprintId" TEXT NOT NULL,
    "rate" INTEGER,
    "review" TEXT,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("sprintId", "tokenId"),
    CONSTRAINT "guest_sprints_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "guests" ("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "guest_sprints_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "sprints" ("sprintId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sprint_stages" (
    "tokenId" TEXT NOT NULL,
    "sprintId" TEXT NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("sprintId", "tokenId"),
    CONSTRAINT "sprint_stages_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "stages" ("stageId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sprint_stages_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "sprints" ("sprintId") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE UNIQUE INDEX "stages_stageId_key" ON "stages"("stageId");

-- CreateIndex
CREATE INDEX "stages_stageId_idx" ON "stages"("stageId");

-- CreateIndex
CREATE UNIQUE INDEX "sprints_sprintId_key" ON "sprints"("sprintId");

-- CreateIndex
CREATE INDEX "sprints_sprintId_idx" ON "sprints"("sprintId");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToGuest_AB_unique" ON "_FavoriteToGuest"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToGuest_B_index" ON "_FavoriteToGuest"("B");
