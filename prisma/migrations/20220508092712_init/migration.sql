-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "pw" TEXT NOT NULL,
    "petId" INTEGER[],
    "sex" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "introduction" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
