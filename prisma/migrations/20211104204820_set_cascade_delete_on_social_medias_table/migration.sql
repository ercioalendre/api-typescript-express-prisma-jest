-- DropForeignKey
ALTER TABLE "social_medias" DROP CONSTRAINT "social_medias_user_id_fkey";

-- AddForeignKey
ALTER TABLE "social_medias" ADD CONSTRAINT "social_medias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
