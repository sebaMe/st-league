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
import Toast from "primevue/toast";
import { RouterView, useRouter } from "vue-router";

import { loginRoute } from "./router";
import { useAuthStore } from "./stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();

authStore.onAuthChange((user) => {
  if (!user) {
    router.push(loginRoute);
  }
});
</script>

<style lang="scss">
#app {
  .slide-in-enter-active {
    transition: all 0.3s ease-in-out;
  }

  .slide-in-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  /* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
  .list-leave-active {
    position: absolute;
  }

  &::before {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-image: url("assets/img/bg/comic-bg.jpg");
    content: "";
  }
}
</style>
