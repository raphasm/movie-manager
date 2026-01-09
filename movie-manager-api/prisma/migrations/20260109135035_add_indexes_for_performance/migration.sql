-- CreateIndex
CREATE INDEX "evaluations_movie_id_idx" ON "evaluations"("movie_id");

-- CreateIndex
CREATE INDEX "evaluations_user_id_idx" ON "evaluations"("user_id");

-- CreateIndex
CREATE INDEX "movies_user_id_idx" ON "movies"("user_id");

-- CreateIndex
CREATE INDEX "movies_category_idx" ON "movies"("category");

-- CreateIndex
CREATE INDEX "movies_averageRating_idx" ON "movies"("averageRating");
