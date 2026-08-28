import { GearReview } from "./gear";

export function getGearRating(
  reviews: GearReview[],
) {
  const ratings = reviews
    .map((review) => review.rating)
    .filter(
      (rating): rating is number =>
        typeof rating === "number" &&
        rating >= 1 &&
        rating <= 5,
    );

  if (ratings.length === 0) {
    return 0;
  }

  const total = ratings.reduce(
    (sum, rating) => sum + rating,
    0,
  );

  return Number(
    (total / ratings.length).toFixed(1),
  );
}
