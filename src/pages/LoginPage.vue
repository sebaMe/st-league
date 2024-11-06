<template>
  <!-- login-page -->
  <div class="mx-auto flex min-h-screen max-w-screen-md flex-col items-center">
    <BaseClipCard class="w-full max-w-screen-sm sm:mt-4" br="90">
      <img :src="battleGif" class="h-60 w-full object-cover" />
    </BaseClipCard>

    <BaseClipCard
      class="mb-4 w-80"
      tl="10"
      :pt="{ content: 'px-2 py-4 flex flex-col' }"
    >
      <div class="mb-2 text-center font-header text-2xl text-primary">
        <span class="text-highlight">S</span><span>uch</span>
        <span class="text-highlight">T</span><span>errific League</span>
      </div>

      <TheBattleThemePlayer />

      <BaseInput v-model="email" icon-left="player" label="Email" />

      <BaseInput v-model="password" label="Password" type="password" />

      <BaseButton
        class="mt-4 min-h-12 w-56"
        font="header"
        :class="{ 'animate-pulse': !authStore.user && email && password }"
        :disabled="
          !!authStore.user || authStore.authenticating || !email || !password
        "
        @click="doLogin"
      >
        <BaseIcon
          v-if="authStore.authenticating"
          icon="hourglas"
          class="animate-spin"
        />
        <template v-else>
          <BaseIcon icon="button_a" />
          <span>Press Start</span>
        </template>
      </BaseButton>
    </BaseClipCard>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";
import { ref } from "vue";
import { useRouter } from "vue-router";

import battleGif from "../assets/img/battle.gif";
import BaseButton from "../components/BaseButton.vue";
import BaseClipCard from "../components/BaseClipCard.vue";
import BaseIcon from "../components/BaseIcon.vue";
import BaseInput from "../components/BaseInput.vue";
import TheBattleThemePlayer from "../components/TheBattleThemePlayer.vue";
import { homeRoute } from "../router";
import { useAuthStore } from "../stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();

const email = ref<string>();
const isEmailValid = ref<boolean>(true);
const password = ref<string>();
const isPasswordValid = ref<boolean>(true);

const doLogin = () => {
  if (!authStore.user && email.value && password.value) {
    authStore
      .login(email.value, password.value)
      .then(({ emailValid, passwordValid }) => {
        isEmailValid.value = emailValid;
        isPasswordValid.value = passwordValid;

        if (emailValid && passwordValid) {
          router.push(homeRoute);
        }
      });
  }
};

onKeyStroke(["Enter", "a"], (e) => {
  e.preventDefault();
  doLogin();
});
</script>

<style></style>
