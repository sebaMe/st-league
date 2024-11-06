<template>
  <audio ref="battleAudio">
    <source :src="battleTheme" type="audio/mp3" />
  </audio>
  <BaseButton
    v-if="minimal"
    variant="plain"
    class="h-full"
    text
    @click="playBattleTheme"
  >
    <BaseIcon icon="music" :class="{ 'animate-bounce': isPlayingAudio }" />
  </BaseButton>
  <BaseButton
    v-else
    class="h-full w-56 justify-evenly border-2 border-dashed border-white bg-highlight font-header text-xs text-white"
    @click="playBattleTheme"
  >
    <BaseIcon icon="music" :class="{ 'animate-bounce': isPlayingAudio }" />
    <span>Play Epic Battle-Theme!</span>
  </BaseButton>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

import battleTheme from "../assets/audio/battle_theme.mp3";
import BaseButton from "./BaseButton.vue";
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
