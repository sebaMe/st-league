import { useDateFormat } from "@vueuse/core";
import { Timestamp } from "firebase/firestore";

export enum DateFormats {
  TIME = "HH:mm",
  DATE_TIME = "ddd/DD.MMM/HH:mm",
  FULL_DATE_TIME = "DD.MMM YYYY/HH:mm",
  DATE = "ddd/DD.MMM",
  FULL_DATE = "DD.MMM YYYY"
}

export const getFormattedFirestoreDate = (
  firestoreTs: Timestamp,
  format = DateFormats.DATE
) => useDateFormat(firestoreTs?.toDate(), format);
