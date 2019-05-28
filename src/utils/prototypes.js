import Vue from "vue";
import { icons } from "../statics/icons";

export const injectIcons = () => {
  Vue.prototype.$icons = icons;
};
