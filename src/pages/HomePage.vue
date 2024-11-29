<template>
  <div>
    <TheHeader />
    <div class="mx-auto max-w-screen-md pt-14">
      <router-view v-if="configStore.isSubscribed" v-slot="{ Component }">
        <transition name="slide-in-top" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

import TheHeader from "../components/TheHeader.vue";
import { useConfigStore } from "../stores/config.store";
import { useGamesStore } from "../stores/games.store";
import { usePlayersStore } from "../stores/players.store";

const configStore = useConfigStore();
const playersStore = usePlayersStore();
const gamesStore = useGamesStore();

onMounted(() => {
  // subscribe to all relevant docs
  configStore.subscribe();
  playersStore.subscribe();
  gamesStore.subscribe();
});

onBeforeUnmount(() => {
  // unsubscribe to all relevant docs
  configStore.unsubscribe();
  playersStore.unsubscribe();
  gamesStore.unsubscribe();
});
</script>

<style lang="scss"></style>
