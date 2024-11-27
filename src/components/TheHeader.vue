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
          <span class="text-highlight">ST</span>
          <span class="text-primary">L</span>
        </BaseButton>
      </div>
      <!-- center -->
      <div class="flex h-full flex-1 justify-center sm:justify-normal">
        <ButtonGroup>
          <BaseButton
            class="h-full"
            variant="plain"
            icon-left="star"
            :active="router.currentRoute.value.path === leaderboardRoute.path"
            @click="router.push(leaderboardRoute.path)"
          >
            <span class="hidden text-xl sm:inline-flex">Leaderboard</span>
          </BaseButton>
          <BaseButton
            class="h-full"
            variant="plain"
            icon-left="swords"
            :active="router.currentRoute.value.path === battlesRoute.path"
            @click="router.push(battlesRoute.path)"
          >
            <span class="hidden text-xl sm:inline-flex">Brawls</span>
          </BaseButton>
          <BaseButton
            class="h-full"
            variant="plain"
            icon-left="party"
            :active="router.currentRoute.value.path === playersRoute.path"
            @click="router.push(playersRoute.path)"
          >
            <span class="hidden text-xl sm:inline-flex">Players</span>
          </BaseButton>
        </ButtonGroup>
      </div>
      <!-- end -->
      <div class="h-full">
        <BattleThemePlayer minimal />
        <BasePopover>
          <template #actor="{ toggle }">
            <BaseButton
              class="h-full"
              variant="plain"
              icon-left="bag"
              @click="toggle"
            />
          </template>
          <div class="mb-2 text-left text-primary">
            {{ `v${version}` }}
          </div>
          <GithubLink class="mb-2" />
          <div class="mb-2 flex items-center">
            <BaseIcon class="mr-2" icon="user"></BaseIcon>
            {{ authStore.user?.email }}
          </div>
          <BaseButton
            font="header"
            :disabled="!authStore.user"
            icon-left="exit"
            fluid
            @click="authStore.logout"
          >
            <span>Quit</span>
          </BaseButton>
        </BasePopover>
      </div>
    </BaseClipCard>
  </header>
</template>

<script setup lang="ts">
import ButtonGroup from "primevue/buttongroup";
import { useRouter } from "vue-router";

import { version } from "../../package.json";
import {
  battlesRoute,
  homeRoute,
  leaderboardRoute,
  playersRoute
} from "../router";
import { useAuthStore } from "../stores/auth.store";
import BaseButton from "./BaseButton.vue";
import BaseClipCard from "./BaseClipCard.vue";
import BaseIcon from "./BaseIcon.vue";
import BasePopover from "./BasePopover.vue";
import BattleThemePlayer from "./BattleThemePlayer.vue";
import GithubLink from "./GithubLink.vue";

const authStore = useAuthStore();
const router = useRouter();
</script>

<style></style>
