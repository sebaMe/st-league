<template>
  <audio ref="battleAudio">
    <source :src="battleTheme" type="audio/mp3" />
  </audio>
  <Button v-if="minimal" class="h-full" text @click="playBattleTheme">
    <BaseIcon icon="music" :class="{ 'animate-bounce': isPlayingAudio }" />
  </Button>
  <Button
    v-else
    class="h-full w-56 justify-evenly border-2 border-dashed border-white bg-highlight font-header text-xs text-white"
    @click="playBattleTheme"
  >
    <BaseIcon icon="music" :class="{ 'animate-bounce': isPlayingAudio }" />
    Play Epic Battle-Theme!
  </Button>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { ref, useTemplateRef } from "vue";

import battleTheme from "../assets/audio/battle_theme.mp3";
import BaseIcon from "./BaseIcon.vue";

withDefaults(
  defineProps<{
    minimal?: boolean;
  }>(),
  { minimal: false }
);

const battleAudioEl = useTemplateRef("battleAudio");
const isPlayingAudio = ref(false);

const playBattleTheme = () => {
  const player = battleAudioEl.value;

  if (player) {
    player.volume = 0.4;

    if (!player.paused) {
      player.pause();
      player.currentTime = 0;
      isPlayingAudio.value = false;
    } else {
      player.play();
      isPlayingAudio.value = true;
    }
  }
};
</script>

<style></style>
