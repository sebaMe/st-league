import { useDateFormat } from "@vueuse/core";
import { Timestamp } from "firebase/firestore";

export enum DateFormats {
  TIME = "HH:mm",
  DATE = "ddd, DD MMM HH:mm",
  FULL_DATE = "DD MMM YYYY - HH:mm"
}

export const getFormattedFirestoreDate = (
  firestoreTs: Timestamp,
  format = DateFormats.DATE
) => useDateFormat(firestoreTs?.toDate(), format);
