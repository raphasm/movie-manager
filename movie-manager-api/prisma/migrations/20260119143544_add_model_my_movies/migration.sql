-- CreateTable
CREATE TABLE "my_movies" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,

    CONSTRAINT "my_movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "my_movies_user_id_idx" ON "my_movies"("user_id");

-- CreateIndex
CREATE INDEX "my_movies_movie_id_idx" ON "my_movies"("movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "my_movies_user_id_movie_id_key" ON "my_movies"("user_id", "movie_id");

-- AddForeignKey
ALTER TABLE "my_movies" ADD CONSTRAINT "my_movies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_movies" ADD CONSTRAINT "my_movies_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
