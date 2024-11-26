<template>
  <div
    class="relative flex items-center justify-end"
    :class="[
      { 'h-14 flex-col': variant !== 'inline' },
      { 'h-8': variant === 'inline' }
    ]"
  >
    <div>
      <BaseIcon
        v-if="result"
        class="absolute"
        :class="
          variant === 'big-result' ? 'size-6 -top-3' : 'top-0 z-10 size-4'
        "
        :icon="mapResultToIcon(result)"
      />
      <img
        :key="avatarSrc"
        class="size-6 min-w-6 drop-shadow-md hover:z-10 hover:scale-125"
        :class="[
          { 'animate-bounce': animate && result === ResultTypes.WON },
          { 'animate-pulse': animate && result === ResultTypes.LOST }
        ]"
        :src="avatarSrc"
      />
    </div>
    <div
      class="h-4 font-header"
      :class="[
        { 'text-xs': variant !== 'inline' },
        { 'ml-2 text-sm': variant === 'inline' }
      ]"
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
import { mapResultToIcon } from "../utils/result.utils";
import BaseIcon from "./BaseIcon.vue";

const props = withDefaults(
  defineProps<{
    avatar?: string;
    color?: string;
    tag?: string;
    result?: ResultTypes | undefined;
    animate?: boolean;
    variant?: "big-result" | "inline";
  }>(),
  {
    avatar: undefined,
    color: undefined,
    tag: undefined,
    result: undefined,
    animate: false,
    variant: undefined
  }
);

const avatarSrc = computed(() => `img/avatars/${props.avatar}.png`);
</script>

<style></style>
