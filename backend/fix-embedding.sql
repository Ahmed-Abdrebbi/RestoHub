ALTER TABLE "MenuItem" DROP COLUMN IF EXISTS embedding;
ALTER TABLE "MenuItem" ADD COLUMN embedding vector(384);
