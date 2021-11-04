-- CreateTable
CREATE TABLE "social_medias" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "linkedin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "social_medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_medias_id_key" ON "social_medias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "social_medias_user_id_key" ON "social_medias"("user_id");

-- AddForeignKey
ALTER TABLE "social_medias" ADD CONSTRAINT "social_medias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
