import "./style.scss";

import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/nora";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";

import App from "./App.vue";
import { primaryPurple } from "./constants/colors.constants";
import { router } from "./router";

const stLeague = definePreset(Aura, {
  semantic: {
    primary: primaryPurple
  }
});

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: stLeague,
      options: {
        darkModeSelector: ".not-in-use",
        cssLayer: {
          name: "primevue",
          order: "tailwind-base, primevue, tailwind-utilities"
        }
      }
    }
  })
  .use(ToastService)
  .mount("#app");
