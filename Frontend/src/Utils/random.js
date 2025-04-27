export const getRandomWarranty = () => {
  const arr = ["1 year", "6 months", "2 years", "3 months"];
  const ind = Math.floor(Math.random() * arr.length);
  return arr[ind];
};

export const getRandomRatings = () => {
  const ratings = [2, 2.5, 3, 3.5, 4, 4.5, 5];
  const rating = ratings[Math.floor(Math.random() * ratings.length)];
  const ratingCount = Math.floor(Math.random() * 5000) + 1;
  return { rating, ratingCount };
};