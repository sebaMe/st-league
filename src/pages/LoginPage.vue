<template>
  <!-- login-page -->
  <div class="mx-auto flex min-h-screen max-w-screen-md flex-col items-center">
    <BaseClipCard class="w-full max-w-screen-sm sm:mt-4" br="90">
      <img :src="battleGif" class="h-60 w-full object-cover" />
    </BaseClipCard>

    <BaseClipCard
      class="mb-4 w-80"
      tl="3"
      :pt="{ content: 'px-2 py-4 flex flex-col' }"
    >
      <div class="mb-2 text-center font-header text-2xl text-highlight">
        <span class="text-primary">S</span><span>uch</span>
        <span class="text-primary">T</span><span>errific League</span>
      </div>

      <TheBattleThemePlayer />

      <InputGroup
        class="mt-4 w-56 border-2 border-dashed"
        :class="isEmailValid ? 'border-highlight' : 'border-danger-500'"
      >
        <InputGroupAddon class="border-0 text-highlight">
          <BaseIcon icon="user" />
        </InputGroupAddon>
        <FloatLabel variant="on">
          <InputText v-model="email" class="border-0 text-xl focus:outline-0" />
          <label class="text-xl">Email</label>
        </FloatLabel>
      </InputGroup>

      <InputGroup
        class="mt-4 w-56 border-2 border-dashed"
        :class="isPasswordValid ? 'border-highlight' : 'border-danger-500'"
      >
        <InputGroupAddon class="border-0 text-highlight">
          <BaseIcon icon="lock" />
        </InputGroupAddon>

        <FloatLabel variant="on">
          <InputText
            v-model="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            class="border-0 text-xl focus:outline-0"
          />
          <label class="text-xl">Password</label>
        </FloatLabel>
        <InputGroupAddon class="border-0 text-highlight">
          <BaseIcon
            class="cursor-pointer"
            :icon="isPasswordVisible ? 'eye_show' : 'eye_hide'"
            @click="isPasswordVisible = !isPasswordVisible"
          />
        </InputGroupAddon>
      </InputGroup>

      <Button
        class="mt-4 min-h-12 w-56 border-2 border-dashed border-white font-header text-sm"
        :class="{ 'animate-pulse': !authStore.user && email && password }"
        :disabled="
          !!authStore.user || authStore.authenticating || !email || !password
        "
        @keyup.="doLogin"
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
      </Button>
    </BaseClipCard>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { useRouter } from "vue-router";

import battleGif from "../assets/img/battle.gif";
import BaseClipCard from "../components/BaseClipCard.vue";
import BaseIcon from "../components/BaseIcon.vue";
import TheBattleThemePlayer from "../components/TheBattleThemePlayer.vue";
import { homeRoute } from "../router";
import { useAuthStore } from "../stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();

const email = ref<string>();
const isEmailValid = ref<boolean>(true);
const password = ref<string>();
const isPasswordValid = ref<boolean>(true);
const isPasswordVisible = ref<boolean>(false);

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
