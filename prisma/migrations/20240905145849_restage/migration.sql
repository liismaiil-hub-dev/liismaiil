-- CreateTable
CREATE TABLE "_GuestToStage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GuestToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GuestToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuestToStage_AB_unique" ON "_GuestToStage"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestToStage_B_index" ON "_GuestToStage"("B");
