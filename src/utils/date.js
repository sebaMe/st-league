export const isValidDate = date => {
  return date instanceof Date && !isNaN(date);
};

export const daysBetween = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isValidDate(startDate) && isValidDate(endDate)) {
    const days = Math.floor((endDate - startDate) / 1000 / 86400);
    if (days > 0) return days;
  }
  return 0;
};
