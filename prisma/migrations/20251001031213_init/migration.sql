-- CreateTable
CREATE TABLE "public"."Release" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);
