import Vue from "vue";
import { icons } from "../statics/icons";

export const useIconsMixin = () => {
  Vue.mixin({
    icons
  });
};
