import { initializeApp } from "firebase/app";
import { defineStore } from "pinia";

import { firebaseConfig } from "../../fbConfig";

export const useMainStore = defineStore("main", () => {
  const app = initializeApp(firebaseConfig);

  return { app, firebaseConfig };
});
