export const isValidDate = date => {
  return date instanceof Date;
};

export const toDate = date => {
  if (isValidDate(date)) {
    return date;
  } else if (!isNaN(date)) {
    return new Date(parseInt(date));
  }
  return undefined;
};

export const daysBetween = (start, end) => {
  const startDate = toDate(start);
  const endDate = toDate(end);

  if (startDate && endDate) {
    const days = Math.floor((endDate - startDate) / 1000 / 86400);
    if (days > 0) return days;
  }
  return 0;
};

export const getDayName = (date, short = false) => {
  if (isValidDate(date)) {
    switch (date.getDay()) {
      case 0:
        return short ? "SUN" : "Sunday";
      case 1:
        return short ? "MON" : "Monday";
      case 2:
        return short ? "TUE" : "Tuesday";
      case 3:
        return short ? "WED" : "Wednesday";
      case 4:
        return short ? "THU" : "Thursday";
      case 5:
        return short ? "FRI" : "Friday";
      case 6:
        return short ? "SAT" : "Saturday";
      default:
        return undefined;
    }
  }
  return undefined;
};

export const getMonthName = (date, short = false) => {
  if (isValidDate(date)) {
    switch (date.getMonth()) {
      case 0:
        return short ? "JAN" : "January";
      case 1:
        return short ? "FEB" : "February";
      case 2:
        return short ? "MAR" : "March";
      case 3:
        return short ? "APR" : "April";
      case 4:
        return short ? "MAY" : "May";
      case 5:
        return short ? "JUN" : "June";
      case 6:
        return short ? "JUL" : "July";
      case 7:
        return short ? "AUG" : "August";
      case 8:
        return short ? "SEP" : "September";
      case 9:
        return short ? "OCT" : "October";
      case 10:
        return short ? "NOV" : "November";
      case 11:
        return short ? "DEC" : "December";
      default:
        return undefined;
    }
  }
  return undefined;
};

export const addLeadingZero = number => {
  const parsedNumber = parseInt(number);
  return isNaN(parsedNumber)
    ? ""
    : parsedNumber < 10
    ? "0" + parsedNumber
    : "" + parsedNumber;
};

export const getDay = date => {
  if (isValidDate(date)) {
    const day = date.getDate();
    return addLeadingZero(day);
  }
  return "";
};

export const getFullDate = ts => {
  const date = toDate(ts);
  return `${getDayName(date, true)}, ${getDay(date)} ${getMonthName(
    date,
    true
  )} ${date.getFullYear()} - ${addLeadingZero(
    date.getHours()
  )}:${addLeadingZero(date.getMinutes())}`;
};
