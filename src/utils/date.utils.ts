import { DateLike, useDateFormat } from "@vueuse/core";
import { Ref } from "vue";

export enum DateFormats {
  TIME = "HH:mm",
  DATE_TIME = "ddd/DD.MMM/HH:mm",
  FULL_DATE_TIME = "DD.MMM YYYY/HH:mm",
  DATE = "ddd/DD.MMM",
  FULL_DATE = "DD.MMM YYYY"
}

export const getFormattedDate = (
  date: Ref<DateLike>,
  format = DateFormats.DATE
) => useDateFormat(date, format);

export const getPrevOrFutureDate = (
  daysBeforeOrAfter: number,
  startDate = new Date()
) => {
  return new Date(
    startDate.getTime() + daysBeforeOrAfter * 24 * 60 * 60 * 1000
  );
};

export const getDaysInBetween = (startDate: Date, endDate: Date) => {
  const dayInMs = 24 * 60 * 60 * 1000;
  const startUnix = startDate?.getTime();
  const endUnix = endDate?.getTime();

  if (startUnix && endUnix) {
    return Math.ceil(Math.abs((startUnix - endUnix) / dayInMs));
  }

  return undefined;
};
