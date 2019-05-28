import "@babel/polyfill";
import Vue from "vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "typeface-bangers";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import App from "./App.vue";
import { store } from "./store/store";
import { router } from "./router/router";

// Plugins
import "./plugins/vuetify";
import "./plugins/vue.notifications";

// Authentication
import { initFB } from "./firebase/db";
import { initAuthRouteGuard } from "./firebase/auth";
import { usefullDateFilter } from "./utils/filters";
import { injectIcons } from "./utils/prototypes";

// Prototypes
injectIcons();

// Mixins
usefullDateFilter();

Vue.config.productionTip = false;

export const VueRootInstance = new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    initFB();
    initAuthRouteGuard();
  }
}).$mount("#app");
