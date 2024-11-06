import "./style.css";

import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/nora";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";

const stLeague = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed8aa",
      300: "#fdbb74",
      400: "#fb943c",
      500: "#f97516",
      600: "#f35f0f",
      700: "#c2430c",
      800: "#9a3512",
      900: "#7c2e12"
    }
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
        darkModeSelector: ".use-dark",
        cssLayer: {
          name: "primevue",
          order: "tailwind-base, primevue, tailwind-utilities"
        }
      }
    }
  })
  .use(ToastService)
  .mount("#app");
