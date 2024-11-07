<template>
  <div class="relative flex h-14 flex-col items-center justify-end px-2">
    <BaseIcon
      v-if="result"
      class="absolute"
      :class="bigResult ? 'size-6 -top-3' : 'top-0 z-10 size-4'"
      :icon="mapResultToIcon(result)"
    />
    <img
      :key="avatarSrc"
      class="size-6 drop-shadow-md hover:z-10 hover:scale-125"
      :src="avatarSrc"
    />
    <div
      class="h-4 font-header text-xs"
      :style="{
        color
      }"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ResultTypes } from "../stores/games.store";
import BaseIcon, { IconTypes } from "./BaseIcon.vue";

const props = withDefaults(
  defineProps<{
    avatar: string;
    color: string;
    tag: string;
    result?: ResultTypes | undefined;
    bigResult?: boolean;
  }>(),
  {
    result: undefined,
    bigResult: false
  }
);

const avatarSrc = computed(() => `img/avatars/${props.avatar}.png`);

const mapResultToIcon = (result?: ResultTypes): IconTypes | undefined => {
  switch (result) {
    case ResultTypes.MISSED:
      return "x_mark";
    case ResultTypes.PARTICIPATED:
      return "check_mark";
    case ResultTypes.WON:
      return "crown";
    case ResultTypes.LOST:
      return "skull";
    default:
      return undefined;
  }
};
</script>

<style></style>
