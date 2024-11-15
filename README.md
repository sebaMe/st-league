# Such Terrific League

A demo-app for scoring games, displaying leaderboards and more - powered by

[vue](https://vuejs.org/)
[primevue](https://primevue.org/)
[tailwindcss](https://tailwindcss.com/)
[vite](https://vite.dev/)
[firebase](https://firebase.google.com/)

## Setup

Feel free to use / customize this app to suite your own game. Checkout the [firebase-documentation](https://firebase.google.com/docs/web/setup) to setup your app.

```ts
// main.store.ts
import { initializeApp } from "firebase/app";
import { defineStore } from "pinia";

import { firebaseConfig } from "../../fbConfig";

export const useMainStore = defineStore("main", () => {
  // use your own firebase config object here
  const app = initializeApp(firebaseConfig);

  return { app, firebaseConfig };
});
```

## Thanks

This app uses icons from [Justin's 16x16 Icon Pack](https://zeromatrix.itch.io/rpgiab-icons). Thanks for these awesome assets!