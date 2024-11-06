<template>
  <header class="fixed left-0 top-0 z-10 w-full drop-shadow-md">
    <BaseClipCard
      class="mx-auto max-w-screen-md"
      br="80"
      :pt="{
        content: 'h-14 max-w-screen-md'
      }"
    >
      <!-- start -->
      <div class="h-full font-header">
        <Button class="h-full" text @click="router.push(homeRoute.path)">
          <span class="text-primary">ST</span>
          <span class="text-highlight">L</span>
        </Button>
      </div>
      <!-- center -->
      <div class="flex h-full flex-1 justify-center sm:justify-normal">
        <ButtonGroup>
          <Button
            class="h-full"
            text
            :class="{
              'bg-primary-200':
                router.currentRoute.value.path === battlesRoute.path
            }"
            @click="router.push(battlesRoute.path)"
          >
            <BaseIcon icon="swords" />
            <span class="hidden text-xl sm:inline-flex">Battles</span>
          </Button>
          <Button
            class="h-full"
            text
            :class="{
              'bg-primary-200':
                router.currentRoute.value.path === playersRoute.path
            }"
            @click="router.push(playersRoute.path)"
          >
            <BaseIcon icon="party" />
            <span class="hidden text-xl sm:inline-flex">Players</span>
          </Button>
        </ButtonGroup>
      </div>
      <!-- end -->
      <div class="h-full">
        <TheBattleThemePlayer minimal />
        <Button class="h-full" text @click="userPop?.toggle">
          <BaseIcon icon="user" />
        </Button>
        <Popover ref="userPop" class="rounded-md text-center font-content">
          <div class="text-xl">{{ authStore.user?.email }}</div>
          <Button
            class="border-2 border-dashed border-white font-header text-sm text-white"
            :disabled="!authStore.user"
            @click="authStore.logout"
          >
            <BaseIcon icon="exit" />
            <span>Quit</span>
          </Button>
        </Popover>
      </div>
    </BaseClipCard>
  </header>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import ButtonGroup from "primevue/buttongroup";
import Popover from "primevue/popover";
import { useTemplateRef } from "vue";
import { useRouter } from "vue-router";

import { battlesRoute, homeRoute, playersRoute } from "../router";
import { useAuthStore } from "../stores/auth.store";
import BaseClipCard from "./BaseClipCard.vue";
import BaseIcon from "./BaseIcon.vue";
import TheBattleThemePlayer from "./TheBattleThemePlayer.vue";

const authStore = useAuthStore();
const router = useRouter();

const userPop = useTemplateRef("userPop");
</script>

<style></style>
