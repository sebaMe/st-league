<template>
  <div
    class="bg-content flex min-h-screen flex-col overflow-hidden bg-secondary font-content"
  >
    <div class="z-10">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
  <Toast position="top-center" />
</template>

<script setup lang="ts">
import { useFavicon } from "@vueuse/core";
import Toast from "primevue/toast";
import { RouterView, useRouter } from "vue-router";

import favIcon from "./assets/img/icons/sword_hit.png";
import { loginRoute } from "./router";
import { useAuthStore } from "./stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();

authStore.onAuthChange((user) => {
  if (!user) {
    router.push(loginRoute);
  }
});

useFavicon(favIcon);
</script>

<style></style>
