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
      <div class="flex h-full">
        <GithubLink class="hidden sm:flex" :label="false" />
        <BattleThemePlayer minimal />
        <BaseButton
          font="header"
          class="hidden h-full sm:inline-flex"
          :disabled="!authStore.user"
          icon-left="exit"
          variant="plain"
          @click="authStore.logout"
        />
        <BaseButton
          class="h-full sm:hidden"
          variant="plain"
          icon-left="bag"
          @click="showDrawer = true"
        />
        <Drawer
          v-model:visible="showDrawer"
          block-scroll
          position="right"
          class="font-content"
          :pt="{
            header: 'items-start'
          }"
        >
          <template #header>
            <div>
              <div class="flex flex-wrap">
                <BaseIcon class="mr-2" icon="logo" />
                <span class="font-header text-highlight">S</span
                ><span class="font-header text-primary">uch</span>
                <span class="font-header text-highlight">T</span
                ><span class="font-header text-primary">errific</span
                ><span class="font-header text-primary">League</span>
                <span class="ml-2 text-primary">
                  {{ `v${version}` }}
                </span>
              </div>
              <div class="inline-flex">
                <GithubLink class="mt-2" />
              </div>
            </div>
          </template>
          <template #closeicon>
            <BaseIcon icon="x_mark" />
          </template>
          <div class="flex-col">
            <BaseButton
              class="justify-start"
              variant="plain"
              fluid
              icon-left="star"
              :active="router.currentRoute.value.path === leaderboardRoute.path"
              @click="
                () => {
                  router.push(leaderboardRoute.path);
                  showDrawer = false;
                }
              "
            >
              <span class="text-xl">Leaderboard</span>
            </BaseButton>
            <BaseButton
              class="justify-start"
              variant="plain"
              fluid
              icon-left="swords"
              :active="router.currentRoute.value.path === battlesRoute.path"
              @click="
                () => {
                  router.push(battlesRoute.path);
                  showDrawer = false;
                }
              "
            >
              <span class="text-xl">Brawls</span>
            </BaseButton>
            <BaseButton
              class="justify-start"
              variant="plain"
              fluid
              icon-left="party"
              :active="router.currentRoute.value.path === playersRoute.path"
              @click="
                () => {
                  router.push(playersRoute.path);
                  showDrawer = false;
                }
              "
            >
              <span class="text-xl">Players</span>
            </BaseButton>
          </div>

          <template #footer>
            <div class="flex items-center justify-evenly">
              <div class="flex items-center text-xl">
                <BaseIcon class="mr-2" icon="user"></BaseIcon>
                {{ authStore.user?.email }}
              </div>
              <BaseButton
                font="header"
                :disabled="!authStore.user"
                icon-left="exit"
                variant="plain"
                @click="authStore.logout"
              >
                <span>Quit</span>
              </BaseButton>
            </div>
          </template>
        </Drawer>
      </div>
    </BaseClipCard>
  </header>
</template>

<script setup lang="ts">
import ButtonGroup from "primevue/buttongroup";
import Drawer from "primevue/drawer";
import { ref } from "vue";
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
import BattleThemePlayer from "./BattleThemePlayer.vue";
import GithubLink from "./GithubLink.vue";

const authStore = useAuthStore();
const router = useRouter();

const showDrawer = ref(false);
</script>

<style></style>
