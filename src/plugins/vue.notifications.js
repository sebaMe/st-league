import Vue from "vue";
import Notifications from "vue-notification";
import { VueRootInstance } from "../main";

Vue.use(Notifications);
Vue.notify({
  group: "general",
  duration: 10000,
  title: "Something went wrong, oops!",
  text: ""
});

export const notifyError = (text = "") => {
  VueRootInstance.$notify({
    group: "general",
    type: "error",
    title: "Something went wrong, oops!",
    text,
    duration: 8000
  });
};

export const notifyGeneral = (title = "", text = "") => {
  VueRootInstance.$notify({
    group: "general",
    type: "info",
    title,
    text,
    duration: 3000
  });
};
