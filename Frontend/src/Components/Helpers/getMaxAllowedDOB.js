export const getMaxiAllowedDOB = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split("T")[0]; // returns 'YYYY-MM-DD'
};
