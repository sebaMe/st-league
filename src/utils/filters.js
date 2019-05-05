import Vue from "vue";
import { getFullDate } from "./date";

export const usefullDateFilter = () => {
  Vue.filter("fullDate", function(value) {
    return getFullDate(value);
  });
};
