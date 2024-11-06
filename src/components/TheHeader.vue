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
        <BaseButton
          class="h-full"
          variant="plain"
          @click="router.push(homeRoute.path)"
        >
          <span class="text-primary">ST</span>
          <span class="text-highlight">L</span>
        </BaseButton>
      </div>
      <!-- center -->
      <div class="flex h-full flex-1 justify-center sm:justify-normal">
        <ButtonGroup>
          <BaseButton
            class="h-full"
            variant="plain"
            icon-left="swords"
            :class="{
              'bg-primary-200':
                router.currentRoute.value.path === battlesRoute.path
            }"
            @click="router.push(battlesRoute.path)"
          >
            <span class="hidden text-xl sm:inline-flex">Battles</span>
          </BaseButton>
          <BaseButton
            class="h-full"
            variant="plain"
            icon-left="party"
            :class="{
              'bg-primary-200':
                router.currentRoute.value.path === playersRoute.path
            }"
            @click="router.push(playersRoute.path)"
          >
            <span class="hidden text-xl sm:inline-flex">Players</span>
          </BaseButton>
        </ButtonGroup>
      </div>
      <!-- end -->
      <div class="h-full">
        <TheBattleThemePlayer minimal />
        <BaseButton
          class="h-full"
          variant="plain"
          icon-left="player"
          @click="userPop?.toggle"
        />
        <Popover ref="userPop" class="rounded-md text-center font-content">
          <div class="text-xl">{{ authStore.user?.email }}</div>
          <BaseButton
            font="header"
            :disabled="!authStore.user"
            icon-left="exit"
            @click="authStore.logout"
          >
            <span>Quit</span>
          </BaseButton>
        </Popover>
      </div>
    </BaseClipCard>
  </header>
</template>

<script setup lang="ts">
import ButtonGroup from "primevue/buttongroup";
import Popover from "primevue/popover";
import { useTemplateRef } from "vue";
import { useRouter } from "vue-router";

import { battlesRoute, homeRoute, playersRoute } from "../router";
import { useAuthStore } from "../stores/auth.store";
import BaseButton from "./BaseButton.vue";
import BaseClipCard from "./BaseClipCard.vue";
import TheBattleThemePlayer from "./TheBattleThemePlayer.vue";

const authStore = useAuthStore();
const router = useRouter();

const userPop = useTemplateRef("userPop");
</script>

<style></style>
